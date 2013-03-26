/**
 * 工具类
 */
(function() {
	window.util = {
		recursiveExtend: function(obj, config, exceptions) {
			exceptions = exceptions || [];
			for (var prop in config) {
				if (config.hasOwnProperty(prop)) {
					if (exceptions.indexOf(prop) > -1) {
						obj[prop] = config[prop];
					} else {
						if (typeof config[prop] === 'object') {
							this.recursiveExtend(obj[prop], config[prop], exceptions);
						} else {
							obj[prop] = config[prop];
						}
					}
				}
			}
		}
	};
})();