// http://zurb.com/forrst/posts/Add_color_to_console_warn_and_console_error_outp-Go0
require('colors');
function makeColorConsole(fct, color){
  return function(){
    for (var i in arguments)
      if (arguments[i] instanceof Object)
        arguments[i] = sys.inspect(arguments[i]);
    fct(Array.prototype.join.call(arguments," ")[color]);
  };
}
console.warn = makeColorConsole(console.warn, "yellow");
console.error = makeColorConsole(console.error, "red");

var handleStdOut = function(data) {
  	console.log('stdout: ' + data);
};

var handleStdErr = function(data) {
  	console.error('stderr: ' + data);
};

var handleExit = function(code) {
	if (code !== 0) {
	  	console.error(`child process exited with code ${code}`);
	}
};

var hookUpProcess = function(proc, cb) {
	proc.stdout.on('data', handleStdOut);
	proc.stderr.on('data', handleStdOut);
	proc.on('close', function(code) {
		handleExit(code);
		if (cb) {
			cb();
		}
	});
}

module.exports = {
	handleStdOut: handleStdOut,
	handleStdErr: handleStdErr,
	handleExit: handleExit,
	hookUpProcess: hookUpProcess
};