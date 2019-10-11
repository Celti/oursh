extern crate docopt;
extern crate nix;
extern crate oursh;
extern crate termion;

use std::{
    env,
    process,
    fs::File,
    io::{self, Read},
};
use docopt::{Docopt, ArgvMap, Value};
use termion::is_tty;
use oursh::{
    repl,
    program::{
        parse_primary, parse_alternate,
        Result, Error,
        Program,
    },
};

// Write the Docopt usage string.
const USAGE: &'static str = "
Usage:
    oursh [options] [<file> [<arguments>...]]
    oursh -c [options] <command_string> [<command_name> [<arguments>...]]
        Read commands from the `command_string` operand. Set the value of
        special parameter 0 (see Section 2.5.2, Special Parameters) from the
        value of the `command_name` operand and the positional parameters
        ($1, $2, and so on) in sequence from the remaining `arguments` operands.
        No commands shall be read from the standard input.
    oursh -s [options] [<arguments>...]
        Read commands from the standard input.

Options:
    -i  Specify that the shell is interactive; see below. An implementation may
        treat specifying the −i option as an error if the real user ID of the
        calling process does not equal the effective user ID or if the real
        group ID does not equal the effective group ID.
    --alternate        Use alternate program syntax.
    --ast              Print program ASTs.
    --debug
    --debugger
    --dump-po-strings
    --dump-strings
    --help
    --init-file
    --login
    --noediting
    --noprofile
    --norc
    --posix
    --pretty-print
    --rcfile
    --restricted
    --verbose
    --version

If there are no operands and the −c option is not specified, the −s option
shallbe assumed.

If the −i option is present, or if there are no operands and the shell's
standard input and standard error are attached to a terminal, the shell is
considered to be interactive.

Operands:
    −   A single <hyphen> shall be treated as the first operand and then
        ignored. If both '−' and '--' are given as arguments, or if other
        operands precede the single <hyphen>, the results are undefined.

    `arguments`  The positional parameters ($1, $2, and so on) shall be set to
                 arguments, if any.

    `command_file`
        The pathname of a file containing commands. If the pathname contains
        one or more <slash> characters, the implementation attempts to read
        that file; the file need not be executable. If the pathname does
        not contain a <slash> character:

        *  The implementation shall attempt to read that file from the current
           working directory; the file need not be executable.

        *  If the file is not in the current working directory, the implementa‐
           tion may perform a search for an executable file using the value of
           PATH, as described in Section 2.9.1.1, Command Search and Execution.

        Special parameter 0 (see Section 2.5.2, Special Parameters) shall  be
        set to  the value of command_file.  If sh is called using a synopsis
        form that omits command_file, special parameter 0 shall be set to the
        value  of  the first  argument passed to sh from its parent (for
        example, argv[0] for a C program), which is normally a pathname used to
        execute the sh utility.

    `command_name`
        A string assigned to special parameter 0 when executing the commands in
        command_string. If command_name is not specified, special parameter 0
        shall be set to the value of the first argument passed to sh from its
        parent (for example, argv[0] for a C program), which is normally a
        pathname used to execute the sh utility.

    `command_string`
        A string that shall be interpreted by the shell as one or more
        commands, as if the string were the argument to the system() function
        defined in the System Interfaces volume of POSIX.1‐2008. If the
        command_string operand is an empty string, sh shall exit with a zero
        exit status.
";

// Our shell, for the greater good. Ready and waiting.
fn main() -> Result<()> {
    // Parse argv and exit the program with an error message if it fails.
    let args = Docopt::new(USAGE)
                      .and_then(|d| d.argv(env::args().into_iter()).parse())
                      .unwrap_or_else(|e| e.exit());

    println!("{:#?}", args);

    if let Some(Value::Plain(Some(ref c))) = args.find("<command_string>") {
        parse_and_run(&args)(c)
    } else if let Some(Value::Plain(Some(ref filename))) = args.find("<file>") {
        let mut file = File::open(filename)
            .expect(&format!("error opening file: {}", filename));

        // Fill a string buffer from the file.
        let mut text = String::new();
        file.read_to_string(&mut text)
            .expect("error reading file");

        // Run the program.
        parse_and_run(&args)(&text)
    } else {
        // Standard input file descriptor (0), used for user input from the
        // user of the shell.
        let stdin = io::stdin();

        // TODO: Verify we don't actually need to do anything with this flag
        // since we process STDIN from the repl regardless.
        //
        // args.get_bool("-s")

        // Process text in raw mode style if we're attached to a tty.
        if is_tty(&stdin) {
            // Standard output file descriptor (1), used to display program output
            // to the user of the shell.
            let stdout = io::stdout();

            // Start a program running repl.
            repl::start(stdin, stdout, parse_and_run(&args));
            Ok(())
        } else {
            // Fill a string buffer from STDIN.
            let mut text = String::new();
            stdin.lock().read_to_string(&mut text).unwrap();

            // Run the program.
            match parse_and_run(&args)(&text) {
                Ok(u) => Ok(u),
                Err(Error::Read) => {
                    process::exit(1);
                },
                Err(Error::Parse) => {
                    process::exit(2);
                },
                Err(Error::Runtime) => {
                    // TODO: Exit with the last status code?
                    process::exit(127);
                }
            }
        }
    }
}

fn parse_and_run<'a>(args: &'a ArgvMap) -> impl Fn(&String) -> Result<()> + 'a {
    move |text: &String| {
        // Parse with the primary grammar and run each command in order.
        if args.get_bool("-#") {
            let program = match parse_alternate(text.as_bytes()) {
                Ok(program) => program,
                Err(e) => {
                    eprintln!("{:?}: {:#?}", e, text);
                    return Err(e);
                }
            };

            // Print the program if the flag is given.
            if args.get_bool("--ast") {
                eprintln!("{:#?}", program);
            }

            // Run it!
            program.run().map(|_| ())
        } else {
            let program = match parse_primary(text.as_bytes()) {
                Ok(program) => program,
                Err(e) => {
                    eprintln!("{:?}: {:#?}", e, text);
                    return Err(e);
                }
            };

            // Print the program if the flag is given.
            if args.get_bool("--ast") {
                eprintln!("{:#?}", program);
            }

            // Run it!
            program.run().map(|_| ())
        }
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_has_a_test() {}
}
