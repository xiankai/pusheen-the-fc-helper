let { hookUpProcess } = require('./console');
let { createClient } = require('then-redis');
let spawn = require("child_process").spawn;

const doJob = (script, args, cb) => {
	let phantomjs = spawn('phantomjs', [
		'--load-images=false',
		`phantomjs/${script}`,
		...args
	]);
	hookUpProcess(phantomjs, cb);
}

const listenForJob = (retry = true) => {
	console.log('worker hired');
	let worker = createClient();
	worker.send('RPOP', ['jobs']).then(job => {
		if (job) {
			let [script, args] = job.split('*');
			args = JSON.parse(args);
			doJob(script, args, listenForJob);
		} else if (retry) {
			// no mo jobs, one last try to see if any jobs
			setTimeout(() => {
				listenForJob(false);
			}, 10000);
		} else {
			console.log('worked fired');
		}
	});
}

module.exports = {
	doJob,
	listenForJob
}