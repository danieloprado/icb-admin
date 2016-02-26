#!/bin/bash

cd /var/www/icb
git pull
npm install
bower install
gulp compile
