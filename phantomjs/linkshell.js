var args = require('system').args;
var constants = require('./lib/constants');
var page = require('./lib/page');

var world = args[1];
var direction = args[2];
var character_count = args[3];
var pageNo = args[4];
var url = constants.baseURL + constants.generateQuery(world, 'number', direction, character_count, pageNo);

page.crawl(url, function() {
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
}, null, function(linkshells) {
	for (var i in linkshells) {
		var linkshell = linkshells[i];
		page.storeJobResults(
			'linkshells:' + linkshell.id,
			'"' + linkshell.name + ':' + linkshell.qty + '"'
		);

		// fill in args
		for (var pageNo = 1; pageNo <= Math.ceil(linkshell.qty / 50); pageNo++) {
			page.publishJob('linkshell_members.js', [linkshell.id, pageNo, world]);
		}
	}
});