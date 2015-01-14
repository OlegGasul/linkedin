var linkedin = require("./linkedin");

exports.testChangePassword = function(test) {
	test.expect(1);
	linkedin.changePassword("oleg.gasul@gmail.com", "anacondaOLEg1982", "anacondaOLEg1982")
	.then(function onSuccess(message) {
		test.ok(true, message);
		test.done();
	}, function onError(errors) { });
};

exports.testBadLogin = function(test) {
	test.expect(1);
	linkedin.changePassword("oleg.gasul@gmail.com", "anacondaOLEg1982 111", "anacondaOLEg1982")
	.then(function onSuccess(message) {
		console.log(message);
	}, function onError(errors) {
		test.ok(true, errors);
		test.done();
	});
};

exports.testIncorrectNewPassword = function(test) {
	test.expect(1);
	linkedin.changePassword("oleg.gasul@gmail.com", "anacondaOLEg1982", "123")
	.then(function onSuccess(message) { }, function onError(errors) {
		test.ok(true, errors);
		test.done();
	});
};