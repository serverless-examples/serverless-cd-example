export REGION=us-east-1
export TRAVIS_PULL_REQUEST=false
export TRAVIS_BRANCH=$(git symbolic-ref --short -q HEAD)

echo "Region: $REGION"
echo "Branch: $TRAVIS_BRANCH"
echo "Is Pull Request: $TRAVIS_PULL_REQUEST"
