var N = null;var searchIndex = {};
searchIndex["oursh"]={"doc":"This shell should be both POSIX compatible and yet modern and exciting. Fancy features should not be prevented by POSIX compatibility. This will effect the design of the shell.","items":[[0,"job","oursh","Subprocess execution management.",N,N],[3,"Job","oursh::job","A job to be executed by various means.",N,N],[11,"new","","Create a new job from the given command.",0,[[["vec",["cstring"]]],["self"]]],[11,"run","","Run a shell job, waiting for the command to finish.",0,[[["self"]],["result",["waitstatus"]]]],[11,"run_background","","Run a shell job in the background.",0,[[["self"]],["result"]]],[0,"program","oursh","Parsing and handling program syntax(es) of the shell.",N,N],[4,"Error","oursh::program","",N,N],[13,"Read","","",1,N],[13,"Parse","","",1,N],[13,"Runtime","","",1,N],[5,"parse_primary","","Parse a program of the primary type.",N,[[["r"]],["result",["primaryprogram"]]]],[5,"parse","","Parse a program of the given type.",N,[[["r"]],["result"]]],[0,"basic","","Single command programs with no features.",N,N],[3,"Program","oursh::program::basic","A basic program with only a single command.",N,N],[3,"Command","","A single poorly parsed command.",N,N],[0,"posix","oursh::program","This shell language (often called `sh`) is at the heart of the most popular shells, namely `bash` and `zsh`. While shells typically implement many extensions to the POSIX standard we'll be implementing only the most basic set of functionality and offloading all extensions to the `modern` language.",N,N],[0,"builtin","oursh::program::posix","Commands that are run from the shell directly, without forking another process.",N,N],[3,"Exit","oursh::program::posix::builtin","Exit builtin, alternative to ctrl-d.",N,N],[3,"Cd","","Change directory (`cd`) builtin.",N,N],[3,"Null","","Noop builtin, same idea as `true`.",N,N],[8,"Builtin","","A builtin is a custom shell command, often changing the state of the shell in some way.",N,N],[10,"run","","Execute the shell builtin command, returning a retult of the completion.",2,[[["vec",["cstring"]]],["result",["waitstatus"]]]],[0,"ast","oursh::program::posix","Abstract Syntax Tree for the POSIX language.",N,N],[3,"Program","oursh::program::posix::ast","A program is the result of parsing a sequence of commands.",N,N],[12,"0","","",3,N],[3,"BridgedProgram","","A program's text and the interpreter to be used.",N,N],[12,"0","","",4,N],[12,"1","","",4,N],[3,"Word","","A parsed word, already having gone through expansion.",N,N],[12,"0","","",5,N],[4,"Command","","A command is a highly mutually-recursive node with the main features of the POSIX language.",N,N],[13,"Simple","","Just a single command, with it's arguments.",6,N],[13,"Compound","","A full program embedded in a compound command.",6,N],[13,"Not","","Performs boolean negation to the status code of the inner command.",6,N],[13,"And","","Perform the first command, conditionally running the next upon success.",6,N],[13,"Or","","Perform the first command, conditionally running the next upon failure.",6,N],[13,"Subshell","","Run the inner program in a sub-shell environment.",6,N],[13,"Pipeline","","Run a command's output through to the input of another.",6,N],[13,"Background","","Run a command in the background.",6,N],[13,"Bridgeshell","","Run a program through another parser/interpreter.",6,N],[0,"lex","oursh::program::posix","",N,N],[3,"Lexer","oursh::program::posix::lex","A lexer to feed the parser gernerated by LALRPOP.",N,N],[4,"Error","","A lexer error.",N,N],[13,"UnrecognizedChar","","",7,N],[4,"Token","","Every token in the langauge, these are the terminals of the grammar.",N,N],[13,"Space","","",8,N],[13,"Tab","","",8,N],[13,"Linefeed","","",8,N],[13,"Semi","","",8,N],[13,"Amper","","",8,N],[13,"RBrace","","",8,N],[13,"LBrace","","",8,N],[13,"RParen","","",8,N],[13,"LParen","","",8,N],[13,"Backtick","","",8,N],[13,"Bang","","",8,N],[13,"Pipe","","",8,N],[13,"Dollar","","",8,N],[13,"Equals","","",8,N],[13,"Backslash","","",8,N],[13,"DoubleQuote","","",8,N],[13,"SingleQuote","","",8,N],[13,"RCaret","","",8,N],[13,"LCaret","","",8,N],[13,"And","","",8,N],[13,"Or","","",8,N],[13,"If","","",8,N],[13,"Then","","",8,N],[13,"Else","","",8,N],[13,"Elif","","",8,N],[13,"Fi","","",8,N],[13,"Do","","",8,N],[13,"Done","","",8,N],[13,"Case","","",8,N],[13,"Esac","","",8,N],[13,"While","","",8,N],[13,"Until","","",8,N],[13,"For","","",8,N],[13,"Word","","",8,N],[13,"Shebang","","",8,N],[13,"Text","","",8,N],[6,"Span","","A result type wrapping a token with start and end locations.",N,N],[11,"new","","Create a new lexer from an input &str.",9,[[["str"]],["self"]]],[0,"parse","oursh::program::posix","",N,N],[3,"CommandParser","oursh::program::posix::parse","",N,N],[3,"ProgramParser","","",N,N],[11,"new","","",10,[[],["commandparser"]]],[11,"parse","","",10,[[["self"],["str"],["__tokens"]],["result",["command","parseerror"]]]],[11,"new","","",11,[[],["programparser"]]],[11,"parse","","",11,[[["self"],["str"],["__tokens"]],["result",["program","parseerror"]]]],[8,"__ToTriple","","",N,N],[16,"Error","","",12,N],[10,"to_triple","","",12,[[["self"]],["result"]]],[0,"ast","oursh::program","Abstract Syntax Tree for programs between multiple languages.",N,N],[4,"Interpreter","oursh::program::ast","Either explicit or implicit declaration of the interperator for a bridged program.",N,N],[13,"Primary","","",13,N],[13,"Alternate","","",13,N],[13,"Other","","",13,N],[6,"Result","oursh::program","",N,N],[6,"PrimaryProgram","","The primary program type, used for unannotated blocks.",N,N],[6,"AlternateProgram","","TODO: alt explain",N,N],[8,"Program","","A program is as large as a file or as small as a line.",N,N],[16,"Command","","The type of each of this program's commands.",14,N],[10,"parse","","Parse a whole program from the given `reader`.",14,[[["r"]],["result"]]],[10,"commands","","Return a list of all the commands in this program.",14,N],[11,"run","","Run the program sequentially.",14,[[["self"]],["result",["waitstatus"]]]],[11,"run_background","","",14,[[["self"]],["result"]]],[8,"Command","","A command is a task given by the user as part of a `Program`.",N,N],[10,"run","","Run the command, returning a result of it's work.",15,[[["self"]],["result",["waitstatus"]]]],[10,"run_background","","",15,[[["self"]],["result"]]],[11,"name","","Return the name of this command.",15,[[["self"]],["cstring"]]],[0,"repl","oursh","Quick and effective raw mode repl library for ANSI terminals.",N,N],[3,"Prompt","oursh::repl","A status prompt to be displayed in interactive sessions before each program.",N,N],[5,"start","","Start a REPL over the strings the user provides.",N,[[["stdin"],["stdout"],["f"]]]],[0,"completion","","User text completion for REPL interations.",N,N],[4,"Completion","oursh::repl::completion","The result of a query for text completion.",N,N],[13,"None","","Nothing completes the user text.",16,N],[13,"Partial","","The user text could match multiple complete values.",16,N],[13,"Complete","","A single complete value.",16,N],[5,"complete","","Return a completed (valid) program text from the partial string given.",N,[[["str"]],["completion"]]],[5,"executable_completions","","Return a list of the matches from the given partial program text.",N,[[["str"]],["completion"]]],[5,"path_complete","","Complete a path at the end of the given string.",N,[[["str"]],["completion"]]],[11,"is_complete","","Returns true if this completion is a single option.",16,[[["self"]],["bool"]]],[11,"first","","Return the first (lexicographically) option if there are multiple possibilities.",16,[[["self"]],["string"]]],[11,"possibilities","","Return a list of all the possibile complete matches.",16,[[["self"]],["vec",["string"]]]],[0,"history","oursh::repl","Keeps a record of previous commands, used for completion and archeology.",N,N],[3,"History","oursh::repl::history","The history of a user's provided commands.",N,N],[11,"reset_index","","",17,[[["self"]]]],[11,"add","","",17,[[["self"],["str"],["usize"]]]],[11,"get_up","","",17,[[["self"]],["option",["string"]]]],[11,"get_down","","",17,[[["self"]],["option",["string"]]]],[11,"load","","",17,[[],["self"]]],[11,"save","","",17,[[["self"]]]],[18,"DEFAULT_FORMAT","oursh::repl","The most basic possible prompt.",18,N],[11,"new","","",18,[[],["self"]]],[11,"sh_style","","",18,[[["self"]],["self"]]],[11,"nixpulvis_style","","",18,[[["self"]],["self"]]],[11,"long_style","","",18,[[["self"]],["self"]]],[11,"short_style","","",18,[[["self"]],["self"]]],[11,"display","","",18,N],[14,"debug","oursh","Print debug information to stderr.",N,N],[11,"into","oursh::job","",0,[[["self"]],["u"]]],[11,"from","","",0,[[["t"]],["t"]]],[11,"try_from","","",0,[[["u"]],["result"]]],[11,"borrow","","",0,[[["self"]],["t"]]],[11,"borrow_mut","","",0,[[["self"]],["t"]]],[11,"try_into","","",0,[[["self"]],["result"]]],[11,"get_type_id","","",0,[[["self"]],["typeid"]]],[11,"into","oursh::program","",1,[[["self"]],["u"]]],[11,"from","","",1,[[["t"]],["t"]]],[11,"try_from","","",1,[[["u"]],["result"]]],[11,"borrow","","",1,[[["self"]],["t"]]],[11,"borrow_mut","","",1,[[["self"]],["t"]]],[11,"try_into","","",1,[[["self"]],["result"]]],[11,"get_type_id","","",1,[[["self"]],["typeid"]]],[11,"into","oursh::program::basic","",19,[[["self"]],["u"]]],[11,"from","","",19,[[["t"]],["t"]]],[11,"try_from","","",19,[[["u"]],["result"]]],[11,"borrow","","",19,[[["self"]],["t"]]],[11,"borrow_mut","","",19,[[["self"]],["t"]]],[11,"try_into","","",19,[[["self"]],["result"]]],[11,"get_type_id","","",19,[[["self"]],["typeid"]]],[11,"into","","",20,[[["self"]],["u"]]],[11,"from","","",20,[[["t"]],["t"]]],[11,"try_from","","",20,[[["u"]],["result"]]],[11,"borrow","","",20,[[["self"]],["t"]]],[11,"borrow_mut","","",20,[[["self"]],["t"]]],[11,"try_into","","",20,[[["self"]],["result"]]],[11,"get_type_id","","",20,[[["self"]],["typeid"]]],[11,"into","oursh::program::posix::builtin","",21,[[["self"]],["u"]]],[11,"from","","",21,[[["t"]],["t"]]],[11,"try_from","","",21,[[["u"]],["result"]]],[11,"borrow","","",21,[[["self"]],["t"]]],[11,"borrow_mut","","",21,[[["self"]],["t"]]],[11,"try_into","","",21,[[["self"]],["result"]]],[11,"get_type_id","","",21,[[["self"]],["typeid"]]],[11,"into","","",22,[[["self"]],["u"]]],[11,"from","","",22,[[["t"]],["t"]]],[11,"try_from","","",22,[[["u"]],["result"]]],[11,"borrow","","",22,[[["self"]],["t"]]],[11,"borrow_mut","","",22,[[["self"]],["t"]]],[11,"try_into","","",22,[[["self"]],["result"]]],[11,"get_type_id","","",22,[[["self"]],["typeid"]]],[11,"into","","",23,[[["self"]],["u"]]],[11,"from","","",23,[[["t"]],["t"]]],[11,"try_from","","",23,[[["u"]],["result"]]],[11,"borrow","","",23,[[["self"]],["t"]]],[11,"borrow_mut","","",23,[[["self"]],["t"]]],[11,"try_into","","",23,[[["self"]],["result"]]],[11,"get_type_id","","",23,[[["self"]],["typeid"]]],[11,"into","oursh::program::posix::ast","",3,[[["self"]],["u"]]],[11,"to_owned","","",3,[[["self"]],["t"]]],[11,"clone_into","","",3,N],[11,"from","","",3,[[["t"]],["t"]]],[11,"try_from","","",3,[[["u"]],["result"]]],[11,"borrow","","",3,[[["self"]],["t"]]],[11,"borrow_mut","","",3,[[["self"]],["t"]]],[11,"try_into","","",3,[[["self"]],["result"]]],[11,"get_type_id","","",3,[[["self"]],["typeid"]]],[11,"into","","",4,[[["self"]],["u"]]],[11,"to_owned","","",4,[[["self"]],["t"]]],[11,"clone_into","","",4,N],[11,"from","","",4,[[["t"]],["t"]]],[11,"try_from","","",4,[[["u"]],["result"]]],[11,"borrow","","",4,[[["self"]],["t"]]],[11,"borrow_mut","","",4,[[["self"]],["t"]]],[11,"try_into","","",4,[[["self"]],["result"]]],[11,"get_type_id","","",4,[[["self"]],["typeid"]]],[11,"into","","",5,[[["self"]],["u"]]],[11,"to_owned","","",5,[[["self"]],["t"]]],[11,"clone_into","","",5,N],[11,"from","","",5,[[["t"]],["t"]]],[11,"try_from","","",5,[[["u"]],["result"]]],[11,"borrow","","",5,[[["self"]],["t"]]],[11,"borrow_mut","","",5,[[["self"]],["t"]]],[11,"try_into","","",5,[[["self"]],["result"]]],[11,"get_type_id","","",5,[[["self"]],["typeid"]]],[11,"into","","",6,[[["self"]],["u"]]],[11,"to_owned","","",6,[[["self"]],["t"]]],[11,"clone_into","","",6,N],[11,"from","","",6,[[["t"]],["t"]]],[11,"try_from","","",6,[[["u"]],["result"]]],[11,"borrow","","",6,[[["self"]],["t"]]],[11,"borrow_mut","","",6,[[["self"]],["t"]]],[11,"try_into","","",6,[[["self"]],["result"]]],[11,"get_type_id","","",6,[[["self"]],["typeid"]]],[11,"into","oursh::program::posix::lex","",9,[[["self"]],["u"]]],[11,"from","","",9,[[["t"]],["t"]]],[11,"into_iter","","",9,[[["self"]],["i"]]],[11,"try_from","","",9,[[["u"]],["result"]]],[11,"borrow","","",9,[[["self"]],["t"]]],[11,"borrow_mut","","",9,[[["self"]],["t"]]],[11,"try_into","","",9,[[["self"]],["result"]]],[11,"get_type_id","","",9,[[["self"]],["typeid"]]],[11,"into","","",7,[[["self"]],["u"]]],[11,"from","","",7,[[["t"]],["t"]]],[11,"try_from","","",7,[[["u"]],["result"]]],[11,"borrow","","",7,[[["self"]],["t"]]],[11,"borrow_mut","","",7,[[["self"]],["t"]]],[11,"try_into","","",7,[[["self"]],["result"]]],[11,"get_type_id","","",7,[[["self"]],["typeid"]]],[11,"into","","",8,[[["self"]],["u"]]],[11,"from","","",8,[[["t"]],["t"]]],[11,"try_from","","",8,[[["u"]],["result"]]],[11,"borrow","","",8,[[["self"]],["t"]]],[11,"borrow_mut","","",8,[[["self"]],["t"]]],[11,"try_into","","",8,[[["self"]],["result"]]],[11,"get_type_id","","",8,[[["self"]],["typeid"]]],[11,"into","oursh::program::posix::parse","",10,[[["self"]],["u"]]],[11,"from","","",10,[[["t"]],["t"]]],[11,"try_from","","",10,[[["u"]],["result"]]],[11,"borrow","","",10,[[["self"]],["t"]]],[11,"borrow_mut","","",10,[[["self"]],["t"]]],[11,"try_into","","",10,[[["self"]],["result"]]],[11,"get_type_id","","",10,[[["self"]],["typeid"]]],[11,"into","","",11,[[["self"]],["u"]]],[11,"from","","",11,[[["t"]],["t"]]],[11,"try_from","","",11,[[["u"]],["result"]]],[11,"borrow","","",11,[[["self"]],["t"]]],[11,"borrow_mut","","",11,[[["self"]],["t"]]],[11,"try_into","","",11,[[["self"]],["result"]]],[11,"get_type_id","","",11,[[["self"]],["typeid"]]],[11,"into","oursh::program::ast","",13,[[["self"]],["u"]]],[11,"to_owned","","",13,[[["self"]],["t"]]],[11,"clone_into","","",13,N],[11,"from","","",13,[[["t"]],["t"]]],[11,"try_from","","",13,[[["u"]],["result"]]],[11,"borrow","","",13,[[["self"]],["t"]]],[11,"borrow_mut","","",13,[[["self"]],["t"]]],[11,"try_into","","",13,[[["self"]],["result"]]],[11,"get_type_id","","",13,[[["self"]],["typeid"]]],[11,"into","oursh::repl","",18,[[["self"]],["u"]]],[11,"from","","",18,[[["t"]],["t"]]],[11,"try_from","","",18,[[["u"]],["result"]]],[11,"borrow","","",18,[[["self"]],["t"]]],[11,"borrow_mut","","",18,[[["self"]],["t"]]],[11,"try_into","","",18,[[["self"]],["result"]]],[11,"get_type_id","","",18,[[["self"]],["typeid"]]],[11,"into","oursh::repl::completion","",16,[[["self"]],["u"]]],[11,"from","","",16,[[["t"]],["t"]]],[11,"try_from","","",16,[[["u"]],["result"]]],[11,"borrow","","",16,[[["self"]],["t"]]],[11,"borrow_mut","","",16,[[["self"]],["t"]]],[11,"try_into","","",16,[[["self"]],["result"]]],[11,"get_type_id","","",16,[[["self"]],["typeid"]]],[11,"into","oursh::repl::history","",17,[[["self"]],["u"]]],[11,"from","","",17,[[["t"]],["t"]]],[11,"try_from","","",17,[[["u"]],["result"]]],[11,"borrow","","",17,[[["self"]],["t"]]],[11,"borrow_mut","","",17,[[["self"]],["t"]]],[11,"try_into","","",17,[[["self"]],["result"]]],[11,"get_type_id","","",17,[[["self"]],["typeid"]]],[11,"parse","oursh::program::basic","Create a new program from the given reader.",19,[[["r"]],["result"]]],[11,"commands","","Return the single parsed command.",19,N],[11,"parse","oursh::program::posix::ast","",3,[[["r"]],["result"]]],[11,"commands","","",3,N],[11,"run","oursh::program::basic","Treat each space blindly as an argument delimiter.",20,[[["self"]],["result",["waitstatus"]]]],[11,"run_background","","",20,[[["self"]],["result"]]],[11,"run","oursh::program::posix::ast","",6,[[["self"]],["result",["waitstatus"]]]],[11,"run_background","","",6,[[["self"]],["result"]]],[11,"run","oursh::program::posix::builtin","",21,[[["vec",["cstring"]]],["result",["waitstatus"]]]],[11,"run","","",22,[[["vec",["cstring"]]],["result",["waitstatus"]]]],[11,"run","","",23,[[["vec",["cstring"]]],["result",["waitstatus"]]]],[11,"next","oursh::program::posix::lex","",9,[[["self"]],["option"]]],[11,"clone","oursh::program::posix::ast","",3,[[["self"]],["program"]]],[11,"clone","","",4,[[["self"]],["bridgedprogram"]]],[11,"clone","","",6,[[["self"]],["command"]]],[11,"clone","","",5,[[["self"]],["word"]]],[11,"clone","oursh::program::ast","",13,[[["self"]],["interpreter"]]],[11,"fmt","oursh::program","",1,[[["self"],["formatter"]],["result"]]],[11,"fmt","oursh::program::basic","",19,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",20,[[["self"],["formatter"]],["result"]]],[11,"fmt","oursh::program::posix::ast","",3,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",4,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",6,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",5,[[["self"],["formatter"]],["result"]]],[11,"fmt","oursh::program::posix::lex","",7,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",8,[[["self"],["formatter"]],["result"]]],[11,"fmt","oursh::program::ast","",13,[[["self"],["formatter"]],["result"]]],[11,"fmt","oursh::repl::completion","",16,[[["self"],["formatter"]],["result"]]],[11,"fmt","oursh::repl::history","",17,[[["self"],["formatter"]],["result"]]]],"paths":[[3,"Job"],[4,"Error"],[8,"Builtin"],[3,"Program"],[3,"BridgedProgram"],[3,"Word"],[4,"Command"],[4,"Error"],[4,"Token"],[3,"Lexer"],[3,"CommandParser"],[3,"ProgramParser"],[8,"__ToTriple"],[4,"Interpreter"],[8,"Program"],[8,"Command"],[4,"Completion"],[3,"History"],[3,"Prompt"],[3,"Program"],[3,"Command"],[3,"Exit"],[3,"Cd"],[3,"Null"]]};
initSearch(searchIndex);
