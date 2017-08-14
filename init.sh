#!/bin/bash

sudo apt-get update
sudo apt-get -y upgrade

applications=" 
  python
  build-essential
  postgresql
  postgresql-server
  postgresql-contrib
"
for app in $applications
do
    if ! type $app > /dev/null; then
        echo "Installing: "$app
        sudo apt-get install -fy $app
    else
        echo $app" has been installed"
    fi
done
