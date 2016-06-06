# Serverless Continuous Deployment Example (WIP)
[![Build Status](https://travis-ci.org/johncmckim/serverless-cd-example.svg?branch=master)](https://travis-ci.org/johncmckim/serverless-cd-example)

Continuous Deployment example for the Serverless Framework


### Create project
1. `sls project create` - create project with inital dev stage
2. `sls stage create` - create prod stage
3. `sls function create books/get` - create books get function

**Result**
Creates 2 cloud formation stacks, dev and prod.

### Deploy project process
1. `sls resources deploy` - deploy cloud formation
2. `sls function deploy -a` - deploy functions
3. `sls event deploy -a` - deploy events
4. `sls endpoint deploy -a` - deploy api gateway endpoints


### Testing Deploy locally
1. `source setup-deploy-envvars.sh`
2. `.\deploy.sh`
