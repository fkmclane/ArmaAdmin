import hashlib
import os
import random
import re
import string

from mcp import db, errors

# TODO: copy all of these changes to servers and sources

users_allowed = '[0-9a-zA-Z-_+]+'

key_length = 24
key_chars = string.ascii_letters + string.digits
key_rnd = random.SystemRandom()

def hash(password):
    return hashlib.sha256(password.encode()).hexdigest()

def check_user(username, password):
    user = user_db.get(username)

    if user and user.hash == hash(password):
        return user

    raise errors.NoUserError()

def check_key(key):
    if key == '':
        return None

    for user in user_db:
        if user.key == key:
            return user

    raise errors.NoUserError()

def gen_key(user):
    user.hash = ''.join(key_rnd.choice(key_chars) for _ in range(key_length))

def get(username):
    return user_db.get(username)

def add(username, password, key='', admin=False, active=True, servers=[]):
    if not re.match('^' + users_allowed + '$', username):
        raise errors.InvalidUserError()

    if username in user_db:
        raise errors.UserExistsError()

    user = user_db.Entry(username, hash(password), key, admin, active, servers)

    user_db[username] = user

    return user

def modify(username, password=None, key=None, admin=None, active=None, servers=None):
    try:
        user = user_db.get(username)
    except KeyError as error:
        raise errors.NoUserError() from error

    if password:
        user.hash = hash(password)

    if key:
        user.key = key

    if admin:
        user.admin = admin

    if active:
        user.active = active

    if servers:
        import mcp.servers

        for server_name in servers:
            server = mcp.servers.get(server_name)
            if username not in server.users:
                server.users.append(username)

        user.servers = servers

def remove(username):
    # TODO: turn into an except thingy
    if not user_db.get(username):
        raise errors.NoUserError()

    user_db.remove(username)

user_db = db.Database(config.database + '/db/users.db', ['username', 'hash', 'key', 'admin', 'active', 'servers'])