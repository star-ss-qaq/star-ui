const path = require('path');

module.exports = {
	css: { extract: false },
	configureWebpack: config => {
		if(!config.resolve.alias) config.resolve.alias = {};
		config.resolve.alias['@ui-root'] = path.resolve('./src');
	}
}