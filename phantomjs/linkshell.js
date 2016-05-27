var crawl = require('./lib/page');
crawl(function() {
	var linkshells = [];
  	$('.linkshell_name').parents('tr').each(function() {
  		var a = $(this).find('a');
		var linkshell = {
			id: a.attr('href').match(/\d+/)[0],
			name: a.text().trim(),
			qty: $(this).find('.right_txt').html().match(/\d+/)[0]
		};
		linkshells.push(linkshell);
  	});
  	return linkshells;
}, null, function(result) {
  	var spawn = require("child_process").spawn;
	for (i in result) {
		var linkshell = result[i];
		spawn('redis-cli', [
			'SET',
			'linkshells:' + linkshell.id,
			'"' + linkshell.name + ':' + linkshell.qty + '"'
		]);
	}
});