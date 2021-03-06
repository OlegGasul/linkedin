var Browser = require("zombie");
var q = require('q');

var browser = new Browser({ debug: true, runScripts: false });

var changePassword = function(email, password, newPassword) {
	var deferred = q.defer();
	
	var promise = browser.visit("https://www.linkedin.com/uas/login");
	promise.then(function() {
		return browser
			.fill("session_key", email)
			.fill("session_password", password)
			.pressButton("signin");
	}).then(function() {
		var error = browser.query(".error strong");
		if (!error)
			return browser.visit("https://www.linkedin.com/uas/change-password?goback=%2Enas_*1_*1_*1_*1_*1")
		deferred.reject([error.innerHTML]);
	}).then(function() {
		return browser
			.fill("oldPassword", password)
			.fill("new_password", newPassword)
			.fill("new_password_again", newPassword)
			.pressButton('submit');
	}).then(function() {
		var error = browser.query(".error strong");
		if (error) {
			var errorsResult = [];
			errorsResult.push(error.innerHTML);
			
			var errors = browser.queryAll("span.error");
			if (errors) {
				for (var i in errors) {
					errorsResult.push(errors[i].innerHTML);
				}
			}
										
			deferred.reject(errorsResult);
		} else {
			deferred.resolve("Password successfully changed!");
		}
	});
	
	return deferred.promise;
}

module.exports.changePassword = changePassword;
