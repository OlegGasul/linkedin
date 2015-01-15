var linkedin = require("./linkedin");

linkedin.changePassword("oleg.gasul@gmail.com", "anacondaOLEg1982", "anacondaOLEg1982")
.then(function onSuccess(message) {
	console.log(message);
}, function onError(errors) {
	for (var i in errors) {
		console.log(errors[i]);
	}
});
