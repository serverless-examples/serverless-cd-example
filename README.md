# Serverless Continuous Deployment Example
[![Build Status](https://travis-ci.org/johncmckim/serverless-cd-example.svg?branch=master)](https://travis-ci.org/johncmckim/serverless-cd-example)

Continuous Deployment example for the Serverless Framework

## Serverless 0.5
### Create project
1. `sls project create` - create project with inital dev stage
2. `sls stage create` - create prod stage
3. `sls function create books/get` - create books get function

**Result**
Creates 2 cloud formation stacks, dev and prod.

### Pull Metadata
1. `sls project init -c`
2. `sls meta sync`

### Deploy project process
1. `sls resources deploy` - deploy cloud formation
2. `aws s3 cp $LOCAL_META_VAR_FILE $S3_META_VAR_FILE` - sync metadata
3. `sls function deploy -a` - deploy functions
4. `sls event deploy -a` - deploy events
5. `sls endpoint deploy -a` - deploy api gateway endpoints


### Testing Deploy locally
1. `source setup-deploy-envvars.sh`
2. `.\deploy.sh`

## Serverless 1.0@alpha (WIP)
1. `sls deploy`
