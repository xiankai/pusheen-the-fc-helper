var crawl = function(url, evaluateFunction, args, cb) {
	var page = require('webpage').create();
	page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
	page.open(url, function(status) {
	  	if (status !== 'success') {
			console.log('Unable to access network');
		} else {
			if (page.injectJs('jquery.js')) {
				try {
				    var ua = page.evaluate(evaluateFunction, args);
				    cb(ua);	
				} catch (err) {
					console.error(err);
				}
				phantom.exit();
			} else {
				console.log('Unable to inject jQuery');
			}
	  	}
	});
}

var spawn = require('child_process').spawn;
var publishJob = function(script, args) {
	var proc = spawn('redis-cli', [
		'LPUSH',
		'jobs',
		script + '*' + JSON.stringify(args)
	]);
}

var storeJobResults = function(key, result) {
	var proc = spawn('redis-cli', [
		'SET',
		key,
		result
	]);
}

var pushJobResults = function(key, result) {
	var proc = spawn('redis-cli', [
		'RPUSH',
		key,
		result
	]);
}

module.exports = {
	crawl: crawl,
	publishJob: publishJob,
	storeJobResults: storeJobResults,
	pushJobResults: pushJobResults
};