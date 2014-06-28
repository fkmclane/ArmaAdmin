#Prefix where servers are kept
prefix = '/home/armagetron/servers'

#Whether or not to allow server creation
creation = True

#Directory where the sources are kept; None if creation is disabled
sources = '/home/armagetron/sources'

#Directory where default configuration is kept; None if creation is disabled
config = '/home/armagetron/config'

#Directory where the scripting library is kept; None to disable the scripting library
scripting = '/home/armagetron/scripting'

#User to run each server under; None to disable running the servers as a different user
user = 'armagetron'

#Path to manager log; None to disable logging
log = '/var/log/armaadmin/manager.log'

#Path to command output log; None to disable logging
cmdlog = '/var/log/armaadmin/command.log'

#Host of the web interface (leave blank unless you know what you are doing)
host = ''

#Port to listen on for the web interface
port = 80

#Path to HTTP log; None to disable logging
httpdlog = '/var/log/armaadmin/httpd.log'

#Path to HTTP access log; None to disable logging
accesslog = '/var/log/armaadmin/access.log'
