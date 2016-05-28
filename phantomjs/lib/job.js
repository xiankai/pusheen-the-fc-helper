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

const listenForJob = () => {
	console.log('worker created');
	let worker = createClient();
	worker.send('RPOP', ['jobs']).then(job => {
		if (job) {
			let [script, args] = job.split('*');
			args = JSON.parse(args);
			doJob(script, args, listenForJob);
		} else {
			// no mo jobs, one last try to see if any jobs
			setTimeout(() => {
				listenForJob();
			}, 1000)
			console.log('worker killed off');
			return;
		}
	});
}

module.exports = {
	doJob,
	listenForJob
}