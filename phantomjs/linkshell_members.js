var args = require('system').args;
var constants = require('./lib/constants');
var page = require('./lib/page');

var id = args[1];
var pageNo = args[2];
var world = args[3];
var url = constants.baseURL + id + '/?page=' + pageNo;

page.crawl(url, function() {
	var members = [];
  	$('.name_box').parents('td').each(function() {
  		var a = $(this).find('a:first');
		var member = {
			id: a.attr('href').match(/\d+/)[0],
			name: a.text(),
			rank: 'member'
		};
		if ($(this).find('.ic_master').length > 0) {
			member.rank = 'master';
		} else if ($(this).find('.ic_leader').length > 0) {
			member.rank = 'leader';
		}
		members.push(member);
  	});

  	// var world = $('.player_name_brown').text().match(/\((.*)\)/)[1];
  	return members;
}, null, function(members) {
	// var linkshell_id = url.match(/\d{17}/);

	for (var i in members) {
		var member = members[i];
		page.pushJobResults(
			'members:' + world + ':' + member.name + '',
			id + ':' + member.rank
		);
	}
});