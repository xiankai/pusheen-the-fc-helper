"use strict";

let CB = require('cloudboost');
let { cloudboost_app, cloudboost_token } = require('./credentials.json');
CB.CloudApp.init(cloudboost_app, cloudboost_token);

const getNestedStore = (key, store) => key.split('.').reduce((store, child) => store.child(child), store)

const initStore = path => {
	const store = new CB.CloudObject(path);
	const query = new CB.CloudQuery(path);

	return {
		push: (key, value) => {
			store.set('identifier', key);
			for (let i in value) {
				store.set(i, value[i]);
			}
			store.save({
				success: obj => console.log('success', obj),
				error: err => console.error('error', err)
			});
		},
		set: (key, value) => {
			store.set('identifier', key);
			for (let i in value) {
				store.set(i, value[i]);
			}
			store.save({
				success: obj => console.log('success', obj),
				error: err => console.error('error', err)
			});
		},
		update: (key, value) => {
			
		}
		has: key => new Promise((resolve) => {
			query.equalTo('identifier', key);
			query.find({
				success: list => resolve(list.length > 0),
				error: () => {
					console.log(`failed to query ${path}.${key}`);
				}
			});
		}),
		get: key => new Promise((resolve) => {
			query.equalTo('identifier', key);
			query.find({
				success: list => {
					resolve(list);
				},
				error: () => {
					console.log(`failed to query ${path}.${key}`);
				}
			});
		})
	}
}

module.exports = {
	asyncStore: initStore
}