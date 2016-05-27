var url = require('system').args[1];

function crawl(evaluateFunction, args, cb) {
	var page = require('webpage').create();
	page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
	page.open(url, function(status) {
	  	if (status !== 'success') {
			console.log('Unable to access network');
		} else {
			if (page.injectJs('jquery.js')) {
			    var ua = page.evaluate(evaluateFunction, args);
			    cb(ua);
				phantom.exit();
			} else {
				console.log('Unable to inject jQuery');
			}
	  	}
	});
}

module.exports = crawl;