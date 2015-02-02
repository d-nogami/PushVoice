# Copyright (C) 2014 Daiki Nogami.
# All rights reserved.

#!/bin/sh

#mongod --fork --dbpath=/home/ec2-user/Workspace/PushVoice/db --logpath=/home/ec2-user/Workspace/PushVoice/db/db.log

sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 9000
NODE_ENV=production forever start bin/www