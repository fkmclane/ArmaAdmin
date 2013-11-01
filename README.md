ArmaAdmin
=========
ArmaAdmin is a complete multi-server management framework for [Armagetron Advanced](http://armagetronad.org).  For more information see the forum post [here](http://forums3.armagetronad.net/viewtopic.php?f=2&t=23250).

What is this?
-------------
ArmaAdmin is a complete package that will manage multiple server daemons, provide an easy to use web interface, and provide a python based scripting API for Armagetron Advanced.  It was created out of a frustration with poorly created and unintuitive Armagetron server managers none of which provided a nice web interface.  Most seemed to be quickly hacked up projects just to get something working and used bad or insecure techniques.  This project solves these problems in a simple Python daemon that serves a set of web pages for control.  This project is designed for a unix-like system and should run well on Linux, Mac OS, or FreeBSD, but also should work on Windows in a unix-like environment (Cygwin) though it probably won't have server creation functionality.

Features
--------
###Daemon Manager###
- Restarts a server if it crashes
- Saving a log, error log, and script error log
- Kill unresponsive server/script
- Full support for scripting
- Clears error log on startup

###Web Interface###
- Start/Stop/Restart/Reload buttons
- Command box to send commands to the server
- Reversed log that updates every half second
- Full support for fancy characters
- Editing settings\_custom.cfg
- Editing script.py (with a documented scripting API)
- Script error log
- Full syntax highlighting for the settings and script
- Realtime updates of server status
- Multiple people can administer the same server at once
- Full user and server creation from an administration panel

###Scripting API###
- Support for adding multiple callbacks to a single ladderlog command
- Support for special characters
- Support for chat command handlers
- Keeps track of and provides a nice interface to:
	- Current round
	- The number of players
	- All of the players and their name, IP address, score, and status
	- All of the teams and their name, score, players, and player positions
	- All of the zones and their various features

Installing
----------
###Setup###
Edit `config.py` to match your directory structure and preferences.  Below is a list of the preferences and what they mean.
- `prefix` folder is mandatory and should be the folder set aside for Armagetron servers.
- `sources` folder is optional and contains the source code to the server software to allow server creation.
- `api` folder is also optional and contains the scripting API (in the `api` folder of the project).
- `user` is the user under which the servers (and scripts) will run.
- `address` is the address for which the server will accept requests but generally, you do not need to set this.
- `port` is the port on which the HTTP server will listen.  If there is another web server running on the computer, you can change this port to something other than `80` then have the web server proxy an address to that port.
- `log` is the path of the HTTP access log.

After the configuration is complete, run the setup script:
```
# ./setup.py install
```
The setup script will ask a few questions about your system then automatically install the files.  It additionally creates the folders specified in `config.py` if they don't exist.  The administrator user has access to all of the servers and to the administration interface.

Start the daemon using the init system specified in the setup script.  If no init system was specified, start the daemon by running `armaadmin` as root.

###Downloading sources###
Before you can create your first server, you must download a copy of the Armagetron Advanced source code.  To do this, first open a web browser to `http://localhost/` or the address specified in `config.py` and login as the administrator user.  Click `Admin` in the upper right and then click the `Sources` tab in the administration interface.  Click the `Add Source` button and fill out the form with the appropriate information.  The source name is the name by which this source will be referred.  For example, you can call one `sty+ct` if you download ct's patched version.  The bzr address is the location of the bzr repository for the source code.  For example, for `0.2.8-sty+ct`, the source is located at `lp:~armagetronad-ct/armagetronad/0.2.8-armagetronad-sty+ct`.  Use the table below for a list of common versions and their bzr addresses.

| Version         | Bzr Address                                                     |
| --------------- | --------------------------------------------------------------- |
| 0.2.8           | `bzr branch lp:armagetronad/0.2.8`                              |
| 0.4             | `bzr branch lp:armagetronad/0.4`                                |
| 0.2.8 sty+ct    | `lp:~armagetronad-ct/armagetronad/0.2.8-armagetronad-sty+ct`    |
| 0.2.9 sty+ct+ap | `lp:~armagetronad-ap/armagetronad/0.2.9-armagetronad-sty+ct+ap` |

After the information is filled in and submitted, the source can then be used in the server creation form in a drop-down list.  The source code will take some time to download, generally up to 30 seconds.

###Creating a server###
Once you have added a source, you can create your first server.  To do this, first open a web browser to `http://localhost/` or the address specified in `config.py` and login as the administrator user.  Click `Admin` in the upper right and then click the `Servers` tab in the administration interface.  Click the `Create Server` button and fill out the form with information about the server.  The name of the server is the name by which it will be referred when assigning it to users.  The source is the source version that should be used to create the server.  After the information is filled out and submitted, the manager will then begin server creation.  This process can take up to 10 minutes depending on the processing power and load of the server computer.

###Creating a user###
To create a user, first open a web browser to `http://localhost/` or the address specified in `config.py` and login as the administrator user.  Click `Admin` in the upper right and then make sure you are on the `Users` tab in the administration interface.  Click the `Create User` button and fill out the form with the user's information.  The admin checkbox enables administrative right to the user allowing them access to the administration interface.  From the drop-down menu, choose the user's first server then click on `Add`.  Many servers can be associated with the same user by selecting a those servers and clicking `Add` in between them.  After the information is filled out and submitted, the user will be able to log in be able to manage its servers.

###Server creation dependencies###
To create servers, you must be on a unix-like system with a modern compiler.  Each server is compiled when it is created with a special set of flags to keep them in their own prefixes and in a sane directory structure.  This allows multiple servers to be kept on one system at the same time and allows easy access and configuration of the servers over FTP or SSH.  Below are the necessary packages that must be installed to be able to download sources and create servers.

####Debian/Ubuntu####
- build-essential
- automake
- bison
- libxml2-dev
- libprotobuf-dev
- libboost-thread-dev (optional, 0.4 only)
- bzr
- libzthread-dev (optional, 0.2.8 only)

####Arch####
- base-devel
- libxml2
- protobuf
- boost (optional, 0.4 only)
- bzr
- zthread (optional, 0.2.8 only)

####Gentoo####
- dev-libs/libxml2
- dev-libs/protobuf
- dev-libs/boost\[threads\] (optional, 0.4 only)
- dev-vcs/bzr
- dev-libs/zthread (optional, 0.2.8 only)

Questions
---------
###Is there a demo?###
There is a live demo at http://arma.fkmclane.tk/.  It shows off the web interface and the simplicity of the scripting API by its script to reset the server settings when everyone leaves the server.  It does not show off the administration page (yet) for security reasons.  Simply login with user: `demo` and password: `demo`.

###What if I want to use my own scripting API?###
Well, you simply need to place it in the `api` folder of the project and reinstall.  You can also (optionally) create your own `api.html`.

###Can I run the daemon as a user other than root?###
Theoretically, the daemon could run as a non-root user but it is not recommended. Running the servers as a different user would not work, the HTTP port would need to be greater than 1024, and server creation and user management may not work.

###I want to use this on Windows but is isn't working!###
Well that isn't a question and I'm afraid I can't help you there.  I don't mess with Windows and don't have time to fiddle with an unsupported operating system for a single person.  This could work on Windows if you had custom compiled servers (a lot of work to get the right flags) but honestly, it would take less time to install Ubuntu then install this software.

###I found a bug! I found a bug!###
Again, that isn't a question, but could you please report it on [GitHub](https://github.com/fkmclane/ArmaAdmin/issues)?

Troubleshooting
---------------
###I can't create servers!###
Make sure you have the dependencies and try again.  Maybe your distribution does not come with `automake`?

###The web interface is very buggy!###
Quit using Internet Explorer.

###The scripting API crashes!###
Make sure it is running with Python 3.  If it is, please report the crash and error log on [GitHub](https://github.com/fkmclane/ArmaAdmin/issues).

###None of it works!###
Make sure you installed the package with Python 3 and started the daemon properly.
