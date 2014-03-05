'use strict';

var appName = 'baseApp';

module.exports = {
	appName: appName,
	mongo: {
		options: {
			db: {
				safe: true
			}
		},
		uri: 'mongodb://localhost/' + appName
	}
};