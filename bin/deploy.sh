#!/bin/bash

uinterface_path="/var/uinterface/"
echo "Jump to app "$uinterface_path
cd $uinterface_path

echo "Update interface from the Git"

envv='production'
# TODO: fix the condition, not working as expected
if [[ $* == *--staging* ]]
then
  envv='staging'
  git pull origin dev
else
  git pull origin main
fi

echo environment: $envv

echo "Installing dependencies ..."
# sudo rm -rf node_modules package-lock.json
yarn install

echo "build is running ..."
yarn build:staging
