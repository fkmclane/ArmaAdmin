class Error(Exception):
	def __init__(self, msg=None):
		self.msg = msg

class NoServerError(Error):
	pass

class InvalidServerError(Error):
	pass

class ServerExistsError(Error):
	pass

class ServerRunningError(Error):
	pass

class ServerStoppedError(Error):
	pass

class NoServerCreationError(Error):
	pass

class NoSourceError(Error):
	pass

class InvalidSourceError(Error):
	pass

class InvalidSourceRevisionError(Error):
	pass

class SourceExistsError(Error):
	pass

class BuildError(Error):
	pass

class ConfigError(Error):
	pass

class BzrError(Error):
	pass

class NoUserError(Error):
	pass

class InvalidUserError(Error):
	pass

class UserExistsError(Error):
	pass