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
		pull: key => store.lrange(key, 0, -1),
		set: hashSet,
		update: hashSet,
		list: () => store.keys('*'),
		get: key => store.hgetall(key),
		access: key => store.get(key),
		has: key => store.exists(key)
	}
}

module.exports = {
	asyncStore: initStore
}