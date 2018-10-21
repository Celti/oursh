//! Commands that are run from the shell directly, without forking another
//! process.
//!
//! These commands take precedence over any executables with the same name
//! in the `$PATH`.
use std::ffi::CString;
use std::{env, process};
use nix::unistd::{chdir, Pid};
use nix::sys::wait::WaitStatus;
use program::{Result, Error};

/// A builtin is a custom shell command, often changing the state of the
/// shell in some way.
pub trait Builtin {
    /// Execute the shell builtin command, returning a retult of the
    /// completion.
    fn run(argv: Vec<CString>) -> Result<WaitStatus>;
}

/// Exit builtin, alternative to ctrl-d.
pub struct Exit;

impl Builtin for Exit {
    fn run(argv: Vec<CString>) -> Result<WaitStatus> {
        match argv.len() {
            0 => {
                panic!("command name not passed in argv[0]");
            },
            1 => {
                process::exit(0)
            },
            2 => {
                if let Ok(n) = str::parse(argv[1].to_str().unwrap()) {
                    process::exit(n)
                } else {
                    process::exit(2)
                }
            },
            _ => {
                eprintln!("too many arguments");
                Ok(WaitStatus::Exited(Pid::this(), 1))
            }
        }
    }
}

/// Change directory (`cd`) builtin.
pub struct Cd;

impl Builtin for Cd {
    fn run(argv: Vec<CString>) -> Result<WaitStatus> {
        match argv.len() {
            0 => {
                panic!("command name not passed in argv[0]");
            },
            1 => {
                let home = match env::var("HOME") {
                    Ok(path) => path,
                    Err(_) => return Err(Error::Runtime),
                };
                chdir(home.as_str()).map(|_| WaitStatus::Exited(Pid::this(), 0))
                          .map_err(|_| Error::Runtime)
            },
            2 => {
                println!("hit");
                chdir(&*argv[1].to_string_lossy().as_ref())
                    .map(|_| WaitStatus::Exited(Pid::this(), 1))
                    .map_err(|_| Error::Runtime)
            },
            _ => {
                eprintln!("too many arguments");
                Ok(WaitStatus::Exited(Pid::this(), 1))
            }
        }
    }
}

/// Noop builtin, same idea as `true`.
pub struct Null;

impl Builtin for Null {
    fn run(_: Vec<CString>) -> Result<WaitStatus> {
        Ok(WaitStatus::Exited(Pid::this(), 0))
    }
}
