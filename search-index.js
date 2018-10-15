var N = null;var searchIndex = {};
searchIndex["oursh"]={"doc":"This shell should be both POSIX compatible and yet modern and exciting. Fancy features should not be prevented by POSIX compatibility. This will effect the design of the shell.","items":[[0,"job","oursh","Subprocess execution management.",N,N],[3,"Job","oursh::job","A job to be executed by various means.",N,N],[11,"new","","Create a new job from the given command.",0,[[["vec",["cstring"]]],["self"]]],[11,"run","","Run a shell job, waiting for the command to finish.",0,[[["self"]]]],[0,"program","oursh","Parsing and handling program syntax(es) of the shell.",N,N],[5,"parse_primary","oursh::program","Parse a program of the primary type.",N,[[["r"]],["result",["primaryprogram"]]]],[5,"parse","","Parse a program of the given type.",N,[[["r"]],["result"]]],[0,"basic","","Single command programs with no features.",N,N],[3,"Program","oursh::program::basic","A basic program with only a single command.",N,N],[3,"Command","","A single poorly parsed command.",N,N],[0,"posix","oursh::program","The ubiquitous POSIX shell command language.",N,N],[0,"ast","oursh::program::posix","Abstract Syntax Tree for the POSIX language.",N,N],[3,"Program","oursh::program::posix::ast","A program is the result of parsing a sequence of commands.",N,N],[12,"0","","",1,N],[3,"BridgedProgram","","A program's text and the interpreter to be used.",N,N],[12,"0","","",2,N],[12,"1","","",2,N],[3,"Word","","A parsed word, already having gone through expansion.",N,N],[12,"0","","",3,N],[4,"Command","","A command is a highly mutually-recursive node with the main features of the POSIX language.",N,N],[13,"Simple","","Just a single command, with it's arguments.",4,N],[13,"Compound","","A full program embedded in a compound command.",4,N],[13,"Not","","Performs boolean negation to the status code of the inner command.",4,N],[13,"And","","Perform the first command, conditionally running the next upon success.",4,N],[13,"Or","","Perform the first command, conditionally running the next upon failure.",4,N],[13,"Subshell","","Run the inner program in a sub-shell environment.",4,N],[13,"Pipeline","","Run a command's output through to the input of another.",4,N],[13,"Background","","Run a command in the background.",4,N],[13,"Bridgeshell","","Run a program through another parser/interpreter.",4,N],[0,"ast","oursh::program","Abstract Syntax Tree for programs between multiple languages.",N,N],[4,"Interpreter","oursh::program::ast","Either explicit or implicit declaration of the interperator for a bridged program.",N,N],[13,"Primary","","",5,N],[13,"Alternate","","",5,N],[13,"Other","","",5,N],[6,"PrimaryProgram","oursh::program","The primary program type, used for unannotated blocks.",N,N],[6,"AlternateProgram","","TODO: alt explain",N,N],[8,"Command","","A command is a task given by the user as part of a `Program`.",N,N],[10,"run","","Run the command, returning a result of it's work.",6,[[["self"]],["result"]]],[11,"name","","Return the name of this command.",6,[[["self"]],["cstring"]]],[8,"Program","","A program is as large as a file or as small as a line.",N,N],[16,"Command","","The type of each of this program's commands.",7,N],[10,"parse","","Parse a whole program from the given `reader`.",7,[[["r"]],["result"]]],[10,"commands","","Return a list of all the commands in this program.",7,N],[11,"run","","Run the program sequentially.",7,[[["self"]],["result"]]],[0,"repl","oursh","Quick and effective raw mode repl library for ANSI terminals.",N,N],[3,"Prompt","oursh::repl","A status prompt to be displayed in interactive sessions before each program.",N,N],[5,"start","","Start a REPL over the strings the user provides.",N,[[["stdin"],["stdout"],["f"]]]],[0,"completion","","",N,N],[5,"complete","oursh::repl::completion","",N,[[["str"]],["string"]]],[5,"executable_complete","","",N,[[["str"]],["vec",["string"]]]],[0,"history","oursh::repl","Keeps a record of previous commands, used for completion and archeology.",N,N],[3,"History","oursh::repl::history","The history of a user's provided commands.",N,N],[11,"reset_index","","",8,[[["self"]]]],[11,"add","","",8,[[["self"],["str"],["usize"]]]],[11,"get_up","","",8,[[["self"]],["option",["string"]]]],[11,"get_down","","",8,[[["self"]],["option",["string"]]]],[11,"load","","",8,[[],["self"]]],[11,"save","","",8,[[["self"]]]],[18,"DEFAULT_FORMAT","oursh::repl","The most basic possible prompt.",9,N],[11,"new","","",9,[[],["self"]]],[11,"sh_style","","",9,[[["self"]],["self"]]],[11,"nixpulvis_style","","",9,[[["self"]],["self"]]],[11,"long_style","","",9,[[["self"]],["self"]]],[11,"short_style","","",9,[[["self"]],["self"]]],[11,"display","","",9,N],[14,"debug","oursh","Print debug information to stderr..",N,N],[11,"from","oursh::job","",0,[[["t"]],["t"]]],[11,"into","","",0,[[["self"]],["u"]]],[11,"try_from","","",0,[[["u"]],["result"]]],[11,"borrow","","",0,[[["self"]],["t"]]],[11,"get_type_id","","",0,[[["self"]],["typeid"]]],[11,"borrow_mut","","",0,[[["self"]],["t"]]],[11,"try_into","","",0,[[["self"]],["result"]]],[11,"from","oursh::program::basic","",10,[[["t"]],["t"]]],[11,"into","","",10,[[["self"]],["u"]]],[11,"try_from","","",10,[[["u"]],["result"]]],[11,"borrow","","",10,[[["self"]],["t"]]],[11,"get_type_id","","",10,[[["self"]],["typeid"]]],[11,"borrow_mut","","",10,[[["self"]],["t"]]],[11,"try_into","","",10,[[["self"]],["result"]]],[11,"from","","",11,[[["t"]],["t"]]],[11,"into","","",11,[[["self"]],["u"]]],[11,"try_from","","",11,[[["u"]],["result"]]],[11,"borrow","","",11,[[["self"]],["t"]]],[11,"get_type_id","","",11,[[["self"]],["typeid"]]],[11,"borrow_mut","","",11,[[["self"]],["t"]]],[11,"try_into","","",11,[[["self"]],["result"]]],[11,"from","oursh::program::posix::ast","",1,[[["t"]],["t"]]],[11,"into","","",1,[[["self"]],["u"]]],[11,"to_owned","","",1,[[["self"]],["t"]]],[11,"clone_into","","",1,N],[11,"try_from","","",1,[[["u"]],["result"]]],[11,"borrow","","",1,[[["self"]],["t"]]],[11,"get_type_id","","",1,[[["self"]],["typeid"]]],[11,"borrow_mut","","",1,[[["self"]],["t"]]],[11,"try_into","","",1,[[["self"]],["result"]]],[11,"from","","",2,[[["t"]],["t"]]],[11,"into","","",2,[[["self"]],["u"]]],[11,"to_owned","","",2,[[["self"]],["t"]]],[11,"clone_into","","",2,N],[11,"try_from","","",2,[[["u"]],["result"]]],[11,"borrow","","",2,[[["self"]],["t"]]],[11,"get_type_id","","",2,[[["self"]],["typeid"]]],[11,"borrow_mut","","",2,[[["self"]],["t"]]],[11,"try_into","","",2,[[["self"]],["result"]]],[11,"from","","",3,[[["t"]],["t"]]],[11,"into","","",3,[[["self"]],["u"]]],[11,"to_owned","","",3,[[["self"]],["t"]]],[11,"clone_into","","",3,N],[11,"try_from","","",3,[[["u"]],["result"]]],[11,"borrow","","",3,[[["self"]],["t"]]],[11,"get_type_id","","",3,[[["self"]],["typeid"]]],[11,"borrow_mut","","",3,[[["self"]],["t"]]],[11,"try_into","","",3,[[["self"]],["result"]]],[11,"from","","",4,[[["t"]],["t"]]],[11,"into","","",4,[[["self"]],["u"]]],[11,"to_owned","","",4,[[["self"]],["t"]]],[11,"clone_into","","",4,N],[11,"try_from","","",4,[[["u"]],["result"]]],[11,"borrow","","",4,[[["self"]],["t"]]],[11,"get_type_id","","",4,[[["self"]],["typeid"]]],[11,"borrow_mut","","",4,[[["self"]],["t"]]],[11,"try_into","","",4,[[["self"]],["result"]]],[11,"from","oursh::program::ast","",5,[[["t"]],["t"]]],[11,"into","","",5,[[["self"]],["u"]]],[11,"to_owned","","",5,[[["self"]],["t"]]],[11,"clone_into","","",5,N],[11,"try_from","","",5,[[["u"]],["result"]]],[11,"borrow","","",5,[[["self"]],["t"]]],[11,"get_type_id","","",5,[[["self"]],["typeid"]]],[11,"borrow_mut","","",5,[[["self"]],["t"]]],[11,"try_into","","",5,[[["self"]],["result"]]],[11,"from","oursh::repl","",9,[[["t"]],["t"]]],[11,"into","","",9,[[["self"]],["u"]]],[11,"try_from","","",9,[[["u"]],["result"]]],[11,"borrow","","",9,[[["self"]],["t"]]],[11,"get_type_id","","",9,[[["self"]],["typeid"]]],[11,"borrow_mut","","",9,[[["self"]],["t"]]],[11,"try_into","","",9,[[["self"]],["result"]]],[11,"from","oursh::repl::history","",8,[[["t"]],["t"]]],[11,"into","","",8,[[["self"]],["u"]]],[11,"try_from","","",8,[[["u"]],["result"]]],[11,"borrow","","",8,[[["self"]],["t"]]],[11,"get_type_id","","",8,[[["self"]],["typeid"]]],[11,"borrow_mut","","",8,[[["self"]],["t"]]],[11,"try_into","","",8,[[["self"]],["result"]]],[11,"run","oursh::program::basic","Treat each space blindly as an argument delimiter.",11,[[["self"]],["result"]]],[11,"run","oursh::program::posix::ast","",4,[[["self"]],["result"]]],[11,"parse","oursh::program::basic","Create a new program from the given reader.",10,[[["r"]],["result"]]],[11,"commands","","Return the single parsed command.",10,N],[11,"parse","oursh::program::posix::ast","",1,[[["r"]],["result"]]],[11,"commands","","",1,N],[11,"clone","","",1,[[["self"]],["program"]]],[11,"clone","","",2,[[["self"]],["bridgedprogram"]]],[11,"clone","","",4,[[["self"]],["command"]]],[11,"clone","","",3,[[["self"]],["word"]]],[11,"clone","oursh::program::ast","",5,[[["self"]],["interpreter"]]],[11,"fmt","oursh::program::basic","",10,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",11,[[["self"],["formatter"]],["result"]]],[11,"fmt","oursh::program::posix::ast","",1,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",2,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",4,[[["self"],["formatter"]],["result"]]],[11,"fmt","","",3,[[["self"],["formatter"]],["result"]]],[11,"fmt","oursh::program::ast","",5,[[["self"],["formatter"]],["result"]]],[11,"fmt","oursh::repl::history","",8,[[["self"],["formatter"]],["result"]]]],"paths":[[3,"Job"],[3,"Program"],[3,"BridgedProgram"],[3,"Word"],[4,"Command"],[4,"Interpreter"],[8,"Command"],[8,"Program"],[3,"History"],[3,"Prompt"],[3,"Program"],[3,"Command"]]};
initSearch(searchIndex);
