#!/bin/sh
# launcher.sh
# navigate to home directory, then to this directory, then execute python script, then back home
cd /var/www/html/nodejs-server && (npm run start&)
cd /var/www/html/frontend && (npm run start&)