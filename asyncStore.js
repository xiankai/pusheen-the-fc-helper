"use strict";

let Firebase = require('Firebase');
let { firebase_app, firebase_token } = require('./credentials.json');

const asyncStore = new Firebase(`https://${firebase_app}.firebaseio.com`);

asyncStore.authWithCustomToken(firebase_token, function(error, result) {
  	if (error) {
		console.log("Authentication Failed!", error);
	} else {
		console.log("Authenticated successfully with payload:", result.auth);
		console.log("Auth expires at:", new Date(result.expires * 1000));
	}
});

const getNestedStore = (key, store) => key.split('.').reduce((store, child) => store.child(child), store)

const initStore = path => {
	const store = new Firebase(`https://${firebase_app}.firebaseio.com/${path}`);

	return {
		push: (key, value) => {
			getNestedStore(key, store).push(value);
		},
		set: (key, value) => {
			getNestedStore(key, store).set(value, error => {
				if (error) {
					console.log('Error ', error);
				} else {
					console.log('Success');
				}
			});
		},
		has: key => new Promise((resolve) => {
			getNestedStore(key, store).once('value', snapshot => {
				resolve(snapshot.val() !== null);
			});
		}),
		get: key => new Promise((resolve) => {
			getNestedStore(key, store).once('value', snapshot => {
				resolve(snapshot.val());
			});
		})
	}
}

module.exports = {
	asyncStore: initStore
}