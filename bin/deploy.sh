#!/bin/bash

uinterface_path="/var/uinterface/"
echo "Jump to app "$uinterface_path
cd $uinterface_path

echo "Update interface from the Git"

envv='production'

git fetch origin
# TODO: fix the condition, not working as expected
if [[ $* == *--staging* ]]
then
  envv='staging'
  git reset --hard origin/dev
else
  git reset --hard origin/main
fi

echo environment: $envv

echo "Installing dependencies ..."
# sudo rm -rf node_modules package-lock.json
yarn install

echo "build is running ..."
yarn build:staging
