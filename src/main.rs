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
    repl::{
        self,
        Prompt,
    },
    program::{
        parse_primary, parse_alternate,
        Result, Error,
        Program,
    },
};

// Write the Docopt usage string.
const USAGE: &'static str = "
Usage:
    oursh    [options] [<file> [<arguments>...]]
    oursh -c [options] <command_string> [<command_name> [<arguments>...]]
    oursh -s [options] [<arguments>...]

Options:
    -h --help       Show this screen.
    -v --verbose    Print extra information.
    -a --ast        Print program ASTs.
    -# --alternate  Use alternate program syntax.
";

// Our shell, for the greater good. Ready and waiting.
fn main() -> Result<()> {
    // Parse argv and exit the program with an error message if it fails.
    let args = Docopt::new(USAGE)
                      .and_then(|d| d.argv(env::args().into_iter()).parse())
                      .unwrap_or_else(|e| e.exit());

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
            // A styled static (for now) prompt.
            let prompt = Prompt::new().sh_style();
            repl::start(prompt, stdin, stdout, parse_and_run(&args));
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
