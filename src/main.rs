extern crate oursh;
extern crate termion;

use std::env;
use std::process::exit;
use std::io::{self, Read, Write};
use oursh::program::{parse_primary, Program};
use oursh::repl;
use termion::is_tty;
use termion::event::Key;
use termion::input::TermRead;
use termion::raw::IntoRawMode;

// Our shell, for the greater good. Ready and waiting.
fn main() {
    // Process text in raw mode style if we're attached to a tty.
    if is_tty(&io::stdin()) {
        // Standard input file descriptor (0), used for user input from the
        // user of the shell.
        let stdin = io::stdin();

        // Standard output file descriptor (1), used to display program output
        // to the user of the shell.
        let mut stdout = io::stdout().into_raw_mode()
            .expect("error opening raw mode");

        // Load history from file in $HOME.
        let mut history = repl::History::load();

        // A styled static (for now) prompt.
        let prompt = repl::Prompt::new()
            .nixpulvis_style();

        prompt.display(&mut stdout);

        let mut text = String::new();
        let mut cursor = 0usize;
        for c in stdin.keys() {
            match c.unwrap() {
                Key::Esc => {
                    // Load history from file in $HOME.
                    history.save();
                    exit(0)
                },
                Key::Char('\n') => {
                    print!("\n\r");
                    stdout.flush().unwrap();

                    stdout.suspend_raw_mode().unwrap();
                    history.add(&text);
                    parse_and_run(&text);
                    history.reset_index();
                    stdout.activate_raw_mode().unwrap();

                    // Reset the text for the next program.
                    text.clear();

                    // Reset the cursor.
                    cursor = 0;

                    // Print a boring static prompt.
                    prompt.display(&mut stdout);
                },
                Key::Up => {
                    print!("{}{}",
                           termion::clear::CurrentLine,
                           termion::cursor::Left(prompt.len() as u16));
                    prompt.display(&mut stdout);
                    if let Some(history_text) = history.get_up() {
                        cursor = history_text.len();
                        text = history_text;
                        print!("{}", text);
                    }
                    stdout.flush().unwrap();
                },
                Key::Down => {
                    print!("{}{}",
                           termion::clear::CurrentLine,
                           termion::cursor::Left(prompt.len() as u16));
                    prompt.display(&mut stdout);

                    match history.get_down() {
                        Some(history_text) => {
                            cursor = history_text.len();
                            text = history_text;
                            print!("{}", text);
                        },
                        None => text = String::new(),
                    }
                    stdout.flush().unwrap();
                },
                Key::Left => {
                    cursor = cursor.saturating_sub(1);
                    print!("{}", termion::cursor::Left(1));
                    stdout.flush().unwrap();
                },
                Key::Right => {
                    cursor = cursor.saturating_add(1);
                    print!("{}", termion::cursor::Right(1));
                    stdout.flush().unwrap();
                },
                Key::Char(c) => {
                    cursor = cursor.saturating_add(1);
                    text.push(c);
                    print!("{}", c);
                    stdout.flush().unwrap();
                },
                Key::Backspace => {
                    if !text.is_empty() {
                        cursor = cursor.saturating_sub(1);
                        print!("{}{}",
                               termion::cursor::Left(1),
                               termion::clear::UntilNewline);
                        text.remove(cursor);
                        print!("{}", &text[cursor..]);
                        print!("{}", termion::cursor::Left((text.len() - cursor) as u16));
                        stdout.flush().unwrap();
                    }
                }
                Key::Ctrl('c') => {
                    text.clear();
                    print!("\n\r");
                    prompt.display(&mut stdout);
                },
                _ => {}
            }
        }
    } else {
        let stdin = io::stdin();
        let mut text = String::new();
        stdin.lock().read_to_string(&mut text).unwrap();
        parse_and_run(&text);
    }
}

fn parse_and_run(text: &String) {
    // Parse with the primary grammar and run each command in order.
    match parse_primary(text.as_bytes()) {
        Ok(program) => {
            if let Some(arg1) = env::args().nth(1) {
                if arg1 == "-v" || arg1 == "--verbose" {
                    println!("{:#?}", program);
                }
            }

            program.run()
                .expect(&format!("error running program: {:?}", program));
        },
        Err(()) => {
            println!("error parsing text: {}", text);
        }
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_has_a_test() {}
}
