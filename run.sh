#!/bin/sh

#mongod --fork --dbpath=/home/ec2-user/Workspace/PushVoice/db --logpath=/home/ec2-user/Workspace/PushVoice/db/db.log

NODE_ENV=production forever start bin/www