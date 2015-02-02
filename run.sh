# Copyright (C) 2014 Daiki Nogami.
# All rights reserved.

#!/bin/sh

#mongod --fork --dbpath=/home/ec2-user/Workspace/PushVoice/db --logpath=/home/ec2-user/Workspace/PushVoice/db/db.log

sudo NODE_ENV=production forever start bin/www