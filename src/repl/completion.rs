//! User text completion for REPL interations.
//!
//! Simple use cases for this module should be as easy as the following
//! example taken from the current REPL.
//!
//! ```
//! use oursh::repl::completion;
//!
//! // String holding the user's input.
//! let mut text = "car".to_string();
//!
//! // Perform the completion, on `\t` perhaps.
//! text = completion::complete(&text);
//!
//! // The user's input is updated to the complete executable.
//! assert_eq!("cargo", &text);
//! ```

use std::cmp::Ordering::Equal;
use std::os::unix::fs::PermissionsExt;
use std::{env, fs};

/// Return a completed (valid) program text from the partial string
/// given.
///
/// ### Examples
///
/// ```
/// use oursh::repl::completion;
///
/// assert_eq!("ls", completion::complete("l"));
/// assert_eq!("pwd", completion::complete("pw"));
/// ```
pub fn complete(text: &str) -> String {
    match text {
        "la" => "ls -la".into(),
        t @ _ => {
            let mut matches = executable_completions(t);
            matches.sort_by(|a, b| {
                match a.len().cmp(&b.len()) { Equal => b.cmp(&a), o => o }
            });
            matches.first().unwrap_or(&"".to_string()).clone()
        },
    }
}

/// Return a list of the matches from the given partial program text.
///
/// ### Examples
///
/// ```
/// use oursh::repl::completion;
///
/// assert!(completion::executable_completions("ru")
///     .contains(&"rustc".into()));
/// assert!(completion::executable_completions("ru")
///     .contains(&"ruby".into()));
/// ```
pub fn executable_completions(text: &str) -> Vec<String> {
    match env::var_os("PATH") {
        Some(paths) => {
            let mut matches = vec![];
            for dir in env::split_paths(&paths) {
                if let Ok(executables) = fs::read_dir(dir) {
                    let paths = executables.filter_map(|e| {
                        match e { Ok(p) => Some(p.path()), _ => None }
                    });
                    for path in paths {
                        let metadata = fs::metadata(&path);
                        if let Some(filename) = path.file_name() {
                            let filename = filename.to_string_lossy();
                            if (metadata.unwrap().permissions().mode() & 0o111 != 0) &&
                                filename.starts_with(text)
                            {
                                matches.push(filename.into());
                            }
                        }
                    }
                }
            }
            matches
        }
        None => panic!("PATH is undefined"),
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn lexicographical_order() {
        assert_eq!("cat", complete("ca"));
    }
}
