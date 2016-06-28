export PROJECT=cd-example
export META_SYNC_BUCKET=cd-example-meta-sync

export REGION=us-east-1
export REGION_VAR_NAME=useast1

export TRAVIS_TEST_RESULT=0
export TRAVIS_PULL_REQUEST="false"
export TRAVIS_BRANCH=$(git symbolic-ref --short -q HEAD)

echo "Region: $REGION or $REGION_VAR_NAME"
echo "Branch: $TRAVIS_BRANCH"
echo "Is Pull Request: $TRAVIS_PULL_REQUEST"
