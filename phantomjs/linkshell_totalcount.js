var args = require('system').args;
var constants = require('./lib/constants');
var page = require('./lib/page');

var world = args[1];
var character_count = args[2];
var url = constants.baseURL + constants.generateQuery(world, '', '', character_count, '');

page.crawl(url, function() {
	return $('.current_list .total:first').text();
}, null, function(count) {
	var pages = Math.ceil(count / 50);
	if (pages > 20) {
		var extraPages = pages - 20;
		extraPages = extraPages > 20 ? 20 : extraPages;

		for (var pageNo = 1; pageNo <= extraPages; pageNo++ ) {
			page.publishJob('linkshell.js', [world, 'asc', character_count, pageNo]);
		}

		pages = 20;
	}

	for (var pageNo = 1; pageNo <= pages; pageNo++ ) {
		page.publishJob('linkshell.js', [world, 'desc', character_count, pageNo]);
	}
});