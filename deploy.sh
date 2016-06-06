#!/bin/bash

if [[ $TRAVIS_TEST_RESULT == 1 ]]; then
  echo 'Skipping deploy due to broken build';
  exit 1;
fi

echo 'Starting deploy'

if [[ $TRAVIS_PULL_REQUEST == "false" ]]; then
  if [[ $TRAVIS_BRANCH == 'master' ]]; then
    STAGE="prod"
  elif [[ $TRAVIS_BRANCH == 'develop' ]]; then
    STAGE="dev"
  fi
fi

echo "Deploying stage $STAGE"

if [ -z ${STAGE+x} ]; then
  echo "Not deploying changes";
  exit 0;
fi

# There's probably better ways to do this but it works
function execSls {
  cmd="sls $@ -s $STAGE -r $REGION --debug"
  echo "Running '$cmd'"
  $cmd
  local status=$?
  if [ $status -ne 0 ]; then
      echo "Error with $1" >&2
      exit 1;
  fi
  return $status
}

function deployServerless {
  execSls "project init -c"
  execSls "resources deploy"
  execSls "function deploy -a"
  execSls "event deploy -a"
  execSls "endpoint deploy -a"
}

deployServerless
