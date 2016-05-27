var crawl = require('./lib/page');
crawl(function() {
	var members = [];
  	$('.name_box').parents('td').each(function() {
  		var a = $(this).find('a:first');
		var member = {
			id: a.attr('href').match(/\d+/)[0],
			name: a.text(),
			rank: 'member'
		};
		if ($(this).find('.ic_master')) {
			member.rank = 'master';
		} else if ($(this).find('.ic_leader')) {
			member.rank = 'leader';
		}
		members.push(member);
  	});

  	var world = $('.player_name_brown').text().match(/\((.*)\)/)[1];
  	return {
  		members: members,
  		world: world
  	};
}, null, function(result) {
	var url = require('system').args[1];
	var linkshell_id = url.match(/\d{17}/);

	var spawn = require("child_process").spawn;
	for (i in result.members) {
		var member = result.members[i];
		spawn('redis-cli', [
			'RPUSH',
			'members:' + result.world + ':' + member.name + '',
			linkshell_id + ':' + member.rank
		]);
	}
});