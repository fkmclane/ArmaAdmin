import os
import os.path
import pwd
import re
import shutil
import subprocess

def copy_contents(src, dst):
    os.makedirs(dst, exist_ok=True)

    for entry in os.listdir(src):
        full = os.path.join(src, entry)
        if os.path.isdir(full):
            copy_contents(full, os.path.join(dst, entry))
        else:
            shutil.copy2(full, os.path.join(dst, entry))

def chown_contents(path, uid, gid):
    for entry in os.listdir(path):
        full = os.path.join(path, entry)
        if os.path.isdir(full):
            chown_contents(full, uid, gid)
        else:
            os.chown(full, uid, gid)


def demote(username):
    user = pwd.getpwnam(username)

    os.setgroups([])

    os.setregid(user.pw_gid, user.pw_gid)
    os.setreuid(user.pw_uid, user.pw_uid)
