#!/usr/bin/env node
var choices = require('choices'),
	search = require('search-kat.ph'),
	open = require('open'),
	query = process.argv[2],
	path = require('path');

var showUsage = function showUsage() {
	var pathToBin = path.join(
		path.relative(
			process.cwd(),
			path.dirname(process.argv[1])
		),
		path.basename(process.argv[1])
	);

	console.log('Usage:');
	console.log(process.argv[0] + ' ' + pathToBin + ' "query"');
};

if (!query) {
	showUsage();
	process.exit();
}

search(query).then(function(results) {
		choices('Select a torrent', results.slice(0, 9).map(function(r) { return r.name + ' [' + r.size + ' / ' + r.files + ' files]'; }), function(idx) {
			if (idx === null) {
				return;
			}
			open(results[idx].magnet);
		});
});
