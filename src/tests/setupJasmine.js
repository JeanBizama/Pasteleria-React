/* eslint-env jasmine */
// Minimal Jasmine custom matchers to cover common DOM Testing Library expectations
// This avoids relying on an external jasmine-dom package that may not exist in npm

(function registerMatchersNow() {
	var matchers = {
		toBeInTheDocument: function() {
			return {
				compare: function(actual) {
					var pass = !!(actual && actual.ownerDocument && actual.ownerDocument.contains(actual));
					return {
						pass: pass,
						message: pass ? 'Expected element not to be in the document' : 'Expected element to be in the document'
					};
				}
			};
		},
		toBeDisabled: function() {
			return {
				compare: function(actual) {
					var hasGetAttr = actual && typeof actual.getAttribute === 'function';
					var isDisabled = !!(actual && (actual.disabled === true || (hasGetAttr && actual.getAttribute('disabled') !== null)));
					return {
						pass: isDisabled,
						message: isDisabled ? 'Expected element not to be disabled' : 'Expected element to be disabled'
					};
				}
			};
		}
	};

		if (typeof jasmine !== 'undefined' && jasmine.getEnv) {
			var env = jasmine.getEnv();
			if (env && typeof env.beforeEach === 'function' && typeof jasmine.addMatchers === 'function') {
				env.beforeEach(function() { jasmine.addMatchers(matchers); });
			}
		}
})();
