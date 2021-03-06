var load = function(ev) {
	document.getElementById('index_button').addEventListener('click', function(ev) {
		goto('/');

		ev.preventDefault();
	}, false);

	document.getElementById('login_form').addEventListener('submit', function(ev) {
		login(document.getElementById('login_form').elements['user'].value, document.getElementById('login_form').elements['password'].value, function(request) {
			if (request.status === 200)
				goto('/server');
			else if (request.status === 401)
				alert('Incorrect username/password');
			else
				alert('Error logging in');
		});

		ev.preventDefault();
	}, false);

	document.getElementById('loading').className = 'none';
	document.getElementById('login').className = '';
};

window.addEventListener('load', load, false);
