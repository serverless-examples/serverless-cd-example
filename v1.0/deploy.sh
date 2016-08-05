#!/bin/bash
set -e

WORING_DIR=$(pwd)
BOOKS_DIR="$WORING_DIR/books"
NOTIFICATIONS_DIR="$WORING_DIR/notifications"

if [[ $TRAVIS_TEST_RESULT == 1 ]]; then
  echo 'Skipping deploy due to broken build';
  exit 1;
fi

function installAndTest {
  cd "$@"
  npm i
  npm test
}

echo 'Running tests'
installAndTest $BOOKS_DIR
installAndTest $NOTIFICATIONS_DIR

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

echo 'Deploying books'
cd $BOOKS_DIR
sls deploy -s $STAGE

echo 'Deploying notifications'
cd $NOTIFICATIONS_DIR
sls deploy -s $STAGE
