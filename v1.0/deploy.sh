#!/bin/bash
set -e

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

echo "Deploying stage from branch $TRAVIS_BRANCH to $STAGE"

if [ -z ${STAGE+x} ]; then
  echo "Not deploying changes";
  exit 0;
fi
