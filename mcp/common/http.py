import os.path

import fooster.web.auth
import fooster.web.json
import fooster.web.page

import mcp.model.user


class PageHandler(fooster.web.page.PageHandler):
    directory = os.path.dirname(__file__) + '/html'

class AuthHandler(fooster.web.auth.BasicAuthMixIn, fooster.web.json.JSONHandler):
    def auth_key(self, key):
        try:
            return mcp.model.user.check_key(key)
        except errors.NoUserError:
            raise auth.AuthError('Key', 'MCP')

    def forbidden(self):
        return False

class AdminAuthHandler(fooster.web.auth.BasicAuthMixIn, fooster.web.json.JSONHandler):
    def auth_key(self, key):
        try:
            return mcp.model.user.check_key(key)
        except errors.NoUserError:
            raise auth.AuthError('Key', 'MCP')

    def forbidden(self):
        return not self.auth.admin
