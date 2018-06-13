var login = function(username, password, callback) {
	auth = 'Basic ' + btoa(username + ':' + password);

	XHR('/api/user/' + username, 'POST', auth, {}, false, function(request) {
		if (request.status === 200) {
			user = JSON.parse(request.responseText);
			setCookie(username, user['token']);

			typeof callback === 'function' && callback(request);
		}
		else
		    typeof failure === 'function' && callback(request);
	});
};
