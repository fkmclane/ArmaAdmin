var auth_token = 'Token ' + getCookie()['token'];

var getFeatures = function(handler) {
	get('/api/features', auth_token, function(request) {
		if (request.status === 200)
			handler(JSON.parse(request.responseText));
	});
};

var getUsers = function(handler) {
	get('/api/user/', auth_token, function(request) {
		if (request.status === 200)
			handler(JSON.parse(request.responseText));
	});
};

var createUser = function(username, password, key, servers, admin, active, callback) {
	post('/api/user/', auth_token, {'username': username, 'key': key, 'password': password, 'servers': servers, 'admin': admin, 'active': active}, 'application/json', function(request) {
		if (request.status === 201)
			typeof callback === 'function' && callback();
		else
			alert('Error creating user: ' + request.responseText);
	});
};

var modifyUser = function(username, password, key, servers, admin, active, callback) {
	put('/api/user/' + username, auth_token, {'password': password, 'key': key, 'servers': servers, 'admin': admin, 'active': active}, 'application/json', function(request) {
		if (request.status === 200)
			typeof callback === 'function' && callback();
		else
			alert('Error modifying user: ' + request.responseText);
	});
};

var destroyUser = function(username, callback) {
	del('/api/user/' + username, auth_token, function(request) {
		if (request.status === 204)
			typeof callback === 'function' && callback();
		else
			alert('Error destroying user: ' + request.responseText);
	});
};

var getServers = function(handler) {
	get('/api/server/', auth_token, function(request) {
		if (request.status === 200)
			handler(JSON.parse(request.responseText));
	});
};

var createServer = function(server, source, library, callback) {
	post('/api/server/', auth_token, {'server': server, 'source': source, 'library': library}, 'application/json', function(request) {
		if (request.status === 201)
			typeof callback === 'function' && callback();
		else
			alert('Error creating server: ' + request.responseText);
	});
};

var upgradeServer = function(server, callback) {
	put('/api/server/' + server, auth_token, {'revision': null}, 'application/json', function(request) {
		if (request.status === 200)
			typeof callback === 'function' && callback();
		else
			alert('Error upgrading server: ' + request.responseText);
	});
};

var destroyServer = function(server, callback) {
	del('/api/server/' + server, auth_token, function(request) {
		if (request.status === 204)
			typeof callback === 'function' && callback();
		else
			alert('Error destroying server: ' + request.responseText);
	});
};

var getSources = function(handler) {
	get('/api/source/', auth_token, function(request) {
		if (request.status === 200)
			handler(JSON.parse(request.responseText));
	});
};

var addSource = function(source, url, callback) {
	post('/api/source/', auth_token, {'source': source, 'url': url}, 'application/json', function(request) {
		if (request.status === 201)
			typeof callback === 'function' && callback();
		else
			alert('Error adding source: ' + request.responseText);
	});
};

var updateSource = function(source, callback) {
	put('/api/source/' + source, auth_token, {}, 'application/json', function(request) {
		if (request.status === 200)
			typeof callback === 'function' && callback();
		else
			alert('Error updating source: ' + request.responseText);
	});
};

var removeSource = function(source, callback) {
	del('/api/source/' + source, auth_token, function(request) {
		if (request.status === 204)
			typeof callback === 'function' && callback();
		else
			alert('Error removing source: ' + request.responseText);
	});
};

var getLibraries = function(handler) {
	get('/api/script/', auth_token, function(request) {
		if (request.status === 200)
			handler(JSON.parse(request.responseText));
	});
};

var addLibrary = function(library, url, callback) {
	post('/api/script/', auth_token, {'library': library, 'url': url}, 'application/json', function(request) {
		if (request.status === 201)
			typeof callback === 'function' && callback();
		else
			alert('Error adding library: ' + request.responseText);
	});
};

var updateLibrary = function(library, callback) {
	put('/api/script/' + library, auth_token, {}, 'application/json', function(request) {
		if (request.status === 200)
			typeof callback === 'function' && callback();
		else
			alert('Error updating library: ' + request.responseText);
	});
};

var removeLibrary = function(library, callback) {
	del('/api/script/' + library, auth_token, function(request) {
		if (request.status === 204)
			typeof callback === 'function' && callback();
		else
			alert('Error removing library: ' + request.responseText);
	});
};

var getConfig = function(handler) {
	get('/api/config', auth_token, function(request) {
		if (request.status === 200)
			handler(request.responseText);
	});
};

var updateConfig = function(config, callback) {
	put('/api/config', auth_token, config, 'text/plain', function(request) {
		if (request.status === 200)
			typeof callback === 'function' && callback();
		else
			alert('Error updating config: ' + request.responseText);
	});
};

var restart = function(callback) {
	post('/api/restart', auth_token, {}, 'application/json', function(request) {
		if (request.status === 204)
			typeof callback === 'function' && callback();
		else
			alert('Error restarting daemon: ' + request.responseText);
	});
};
