//! Quick and effective raw mode repl library for ANSI terminals.
//!
//! There will be *absolutely no* blocking STDIN/OUT/ERR on things like tab
//! completion or other potentially slow, or user defined behavior.

use std::io::{Write, Stdin, Stdout};
use std::process::exit;
use nix::unistd;
use pwd::Passwd;
use termion::event::Key;
use termion::input::TermRead;
use termion::raw::IntoRawMode;
use termion::{style, color};

/// Start a REPL over the strings the user provides.
// TODO: Partial syntax, completion.
pub fn start<F: Fn(&String)>(stdin: Stdin, stdout: Stdout, runner: F) {
    // Load history from file in $HOME.
    let mut history = History::load();

    // A styled static (for now) prompt.
    let prompt = Prompt::new().sh_style();

    // Convert the tty's stdout into raw mode.
    let mut stdout = stdout.into_raw_mode()
        .expect("error opening raw mode");

    // Display the inital prompt.
    prompt.display(&mut stdout);

    // TODO #5: We need a better state object for these values.
    let mut text = String::new();
    let mut cursor = 0usize;

    // Iterate the keys as a user presses them.
    // TODO #5: Mouse?
    for c in stdin.keys() {
        match c.unwrap() {
            Key::Esc => {
                // Save history to file in $HOME.
                history.save();
                exit(0)
            },
            Key::Char('\n') => {
                // Perform a raw mode line break.
                print!("\n\r");
                stdout.flush().unwrap();

                // Run the command.
                stdout.suspend_raw_mode().unwrap();
                runner(&text);
                history.add(&text, 1);
                history.reset_index();
                stdout.activate_raw_mode().unwrap();

                // Reset for the next program.
                text.clear();
                cursor = 0;

                // Print a boring static prompt.
                prompt.display(&mut stdout);
            },
            Key::Up => {
                print!("{}{}", termion::cursor::Left(text.len() as u16),
                               termion::clear::UntilNewline);

                if let Some(history_text) = history.get_up() {
                    cursor = history_text.len();
                    text = history_text;
                    print!("{}", text);
                }
                stdout.flush().unwrap();
            },
            Key::Down => {
                print!("{}{}", termion::cursor::Left(text.len() as u16),
                               termion::clear::UntilNewline);

                if let Some(history_text) = history.get_down() {
                    cursor = history_text.len();
                    text = history_text;
                    print!("{}", text);
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
                    text.remove(cursor);
                    cursor = cursor.saturating_sub(1);
                    let shift = (text.len() - cursor) as u16;
                    print!("{}{}", termion::cursor::Left(shift),
                                     termion::clear::UntilNewline);
                                     // &text[cursor..]);
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
}

/// A status prompt to be displayed in interactive sessions before each
/// program.
pub struct Prompt(String);

impl Prompt {
    pub const DEFAULT_FORMAT: &'static str = "$ ";

    pub fn new() -> Self {
        Prompt(format!("{}", Self::DEFAULT_FORMAT))
    }

    pub fn len(&self) -> usize {
        self.0.len()
    }

    pub fn sh_style(self) -> Self {
        let version = "4.4";
        Prompt(format!("sh-{}$ ", version))
    }

    pub fn nixpulvis_style(self) -> Self {
        let mut buf = [0u8; 64];
        let hostname_cstr = unistd::gethostname(&mut buf)
            .expect("error getting hostname");
        let hostname = hostname_cstr.to_str()
            .expect("hostname wasn't valid UTF-8");
        let passwd = Passwd::current_user()
            .expect("error i don't exist, passwd validation failed!");
        let whoami = passwd.name;
        let cwd = unistd::getcwd()
            .expect("error reading cwd");
        Prompt(format!("{}{}{}@{}{}{}:{}{}{}{}$ ",
            color::Fg(color::Red),
            whoami,
            color::Fg(color::Reset),
            color::Fg(color::Blue),
            hostname,
            color::Fg(color::Reset),
            color::Fg(color::Green),
            cwd.display(),
            color::Fg(color::Reset),
            " "))
    }

    pub fn long_style(self) -> Self {
        let mut buf = [0u8; 64];
        let hostname_cstr = unistd::gethostname(&mut buf)
            .expect("error getting hostname");
        let hostname = hostname_cstr.to_str()
            .expect("hostname wasn't valid UTF-8");
        Prompt(format!("{}{} {} $ {} {} {} {} {}{} ",
            style::Invert,
            color::Fg(color::Green),
            hostname,
            color::Fg(color::Yellow),
            color::Fg(color::Red),
            color::Fg(color::Magenta),
            color::Fg(color::Cyan),
            color::Fg(color::Reset),
            style::Reset))
    }

    pub fn short_style(self) -> Self {
        Prompt(format!("{}{}our$h{}{} ",
            color::Fg(color::Red),
            style::Invert,
            color::Fg(color::Reset),
            style::Reset))
    }

    pub fn display(&self, stdout: &mut impl Write) {
        write!(stdout, "{}", self.0).unwrap();
        stdout.flush().unwrap();
    }
}

use std::fs::File;
use std::path::Path;
use std::io::prelude::*;

#[derive(Debug)]
pub struct History(Option<usize>, Vec<(String, usize)>);

impl History {
    pub fn reset_index(&mut self) {
        self.0 = None;
    }

    pub fn add(&mut self, text: &str, count: usize) {
        if text.is_empty() {
            return;
        }

        // HACK: There's got to be a cleaner way.
        let mut index = 0;
        if self.1.iter().enumerate().find(|(i, (t, _))| {
            index = *i;
            text == t
        }).is_some() {
            self.1[index].1 += count;
            let text = self.1.remove(index);
            self.1.insert(0, text);
        } else {
            self.1.insert(0, (text.to_owned(), count));
        }

        println!("adding history item: {:?}", self.1[0]);
    }

    pub fn get_up(&mut self) -> Option<String> {
        let text_len = self.1.len();
        if text_len > 0 {
            match self.0 {
                Some(i) => {
                    self.0 = Some(i.saturating_add(1)
                                   .min(text_len - 1));
                },
                None => self.0 = Some(0),
            }
        } else {
            self.0 = None;
        }

        match self.0 {
            Some(i) => Some(self.1[i].0.clone()),
            None => None,
        }
    }

    pub fn get_down(&mut self) -> Option<String> {
        match self.0 {
            Some(i) if i == 0 => self.0 = None,
            Some(i) => self.0 = Some(i.saturating_sub(1)),
            None => {},
        };

        match self.0 {
            Some(i) => Some(self.1[i].0.clone()),
            None => None,
        }
    }

    pub fn load() -> Self {
        let mut history = History(None, vec![]);

        if Path::new("/home/nixpulvis/.oursh_history").exists() {
            let mut f = File::open("/home/nixpulvis/.oursh_history")
                .expect("error cannot find history");
            let mut contents = String::new();
            f.read_to_string(&mut contents)
                .expect("error reading history");
            // TODO: We really need something like serde or serde-json
            //       for the pair if we want to have historical run counts.
            // let hist = contents.split("\n").map(|s| {
            //     String::from(s).split(" ").map(|s| {
            //         println!("{:?}", s);
            //     })
            // }).collect::<Vec<String, usize>>();
            let hist = contents.split("\n").map(|s| {
                (String::from(s), 0)
            });

            // Add each entry to the history in order.
            for (text, index) in hist {
                history.add(&text, index);
            }

            // Reverse the order so users get the most recent commands first.
            history.1 = history.1.into_iter().rev().collect();
        }

        history
    }

    pub fn save(&self) {
        let mut f = File::create("/home/nixpulvis/.oursh_history")
            .expect("error cannot find history");
        let text = self.1.iter().map(|(t, _)| t.to_owned()).collect::<Vec<String>>().join("\n");
        f.write_all(text.as_bytes())
            .expect("error writing history");
    }
}
