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

echo "Deploying stage from branch $TRAVIS_BRANCH to $STAGE"

if [ -z ${STAGE+x} ]; then
  echo "Not deploying changes";
  exit 0;
fi

# There's probably better ways to do this but it works
function run {
  local cmd="$@"
  echo "Running '$cmd'"
  $cmd
  local status=$?
  if [ $status -ne 0 ]; then
      echo "Error with $1" >&2
      exit 1;
  fi
  return $status
}

function runSls {
  local cmd="sls $@ -s $STAGE -r $REGION"
  exec $cmd
}

LOCAL_META_VAR_FILE="_meta/variables/s-variables-$STAGE-$REGION_VAR_NAME.json"
S3_META_VAR_FILE="s3://$META_SYNC_BUCKET/serverless/$PROJECT/variables/s-variables-$STAGE-$REGION_VAR_NAME.json"
echo "Will copy metadata from $LOCAL_META_VAR_FILE to $S3_META_VAR_FILE"

runSls "project init"
runSls "meta sync" # get new variables
runSls "resources deploy"
run "aws s3 cp $LOCAL_META_VAR_FILE $S3_META_VAR_FILE"  # store new variables
runSls "function deploy -a"
runSls "event deploy -a"
runSls "endpoint deploy -a"
