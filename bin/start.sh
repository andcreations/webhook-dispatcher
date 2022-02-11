#!/bin/bash

dispatcher_dir=$(cd $(dirname ${BASH_SOURCE[0]})/.. && pwd)
pid_file=$dispatcher_dir/.pid

env_file=$HOME/.webhook-dispatcher/env
if [ -f $env_file ]; then
  echo Reading environment from $env_file
  source $env_file
fi

if [ -f $pid_file ]; then
  server_pid=`cat $pid_file`

  # check if the process exists
  kill -0 $server_pid 1> /dev/null 2> /dev/null
  if [ $? -eq 0 ]; then
      echo The pid file $pid_file and corresponding process exist.
      echo Very likely the server is already running.
      exit 0
  fi

  # remove the pid file
  echo The pid file $pid_file exists, but no corresponding process found.
  echo Removing the pid file.
  rm $pid_file
fi

if [ -z $WEBHOOK_DISPATCHER_NODE ]; then
  WEBHOOK_DISPATCHER_NODE=node
fi

# run the server
nohup $WEBHOOK_DISPATCHER_NODE $dispatcher_dir/dist/main.js&

# store the pid in the file
echo $! > $pid_file