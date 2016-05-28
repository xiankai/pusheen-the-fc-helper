let { createClient } = require('then-redis');

const dbs = [
	'linkshells',
	'airships',
];

const initStore = path => {
	const store = createClient();

	store.select(dbs.indexOf(path));

	const hashSet = (key, val) => {
		if (typeof val === 'object' && val !== null) {
			store.hmset(key, val);
		} else {
			store.set(key, val);
		}
	};

	return {
		push: (key, val) => store.lpush(key, val),
		set: hashSet,
		update: hashSet,
		get: key => store.hget(key),
		has: key => store.exists(key)
	}
}

module.exports = {
	asyncStore: initStore
}