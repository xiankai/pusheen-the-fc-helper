var crawl = require('./lib/page');
crawl(function() {
	return $('.current_list .total:first').text();
}, null, function(result) {
  	var spawn = require("child_process").spawn;
  	spawn('redis-cli', [
  		'PUBLISH',
  		'pagecount',
		result
	]);
});