var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';

const baseURL = 'http://na.finalfantasyxiv.com/lodestone/linkshell/';
const query = '?q=&worldname=Jenova&character_count=&order=3';

page.open(baseURL + query, function(status) {
  	if (status !== 'success') {
		console.log('Unable to access network');
	} else {
		if (page.injectJs('jquery.js')) {
		    var ua = page.evaluate(function() {
				var linkshells = [];
		      	$('.linkshell_name').parents('tr').each(function() {
		      		var a = $(this).find('a');
					var linkshell = {
						id: a.attr('href').match(/\d+/)[0],
						name: a.text(),
						qty: $(this).find('.right_txt').html().match(/\d+/)[0]
					};
					linkshells.push(linkshell);
		      	});
		      	return linkshells;
		    });

		  	var spawn = require("child_process").spawn;
		  	for (i in ua) {
		  		var linkshell = ua[i];
	      		spawn('redis-cli', [
	      			'SET',
	      			'linkshells:' + linkshell.id,
	      			'"' + linkshell.name + ':' + linkshell.qty + '"'
      			]);
		  	}

			phantom.exit();
		} else {
			console.log('Unable to inject jQuery');
		}
  	}
});
