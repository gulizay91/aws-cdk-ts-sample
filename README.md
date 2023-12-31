# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Before Start
Install python
```sh
brew install python
```
Install nodejs
```sh
brew install node
```
check node and npm version
```sh
node -v
npm -v
```
Install aws cli
```sh
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```
check node and npm version
```sh
aws --version
```
Install aws cdk
```sh
npm install -g aws-cdk
brew link aws-cdk
```
check aws cdk  version
```sh
cdk --version
```


## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
* `cdk init app --language typescript`  create cdk init project template app for typescript



# Get Start
```sh
npm install
```

## S3 Bucket

Create an aws s3 bucket with aws cdk, firstS3StackName: tmsS3Stack
```sh
npm run build && cdk synth
cdk deploy <firstS3StackName/> --profile <profileName/>
```
check your s3 buckets
```sh
aws s3 ls
```

Create an aws s3 bucket with lifecycle rule, secondS3StackName: tmsS3DownloadStack
dont forget change your accountId with AWS_ACCOUNT_ID
```sh
npm run build && cdk synth <secondS3StackName/>
cdk deploy <secondS3StackName/> --profile <profileName/>
```
check your s3 buckets
```sh
aws s3 ls
```

remove stacks
```sh
cdk destroy <firstS3StackName/>
cdk destroy <secondS3StackName/>
```

## Lambda Functions

Create basic python lambda function with aws cdk, lambdaStackName: basicLambdaStack
```sh
npm run build && cdk synth
cdk deploy <lambdaStackName/> --profile <profileName/>
```
check your lambda functions
```sh
aws lambda list-functions
```

remove lambda stack
```sh
cdk destroy <lambdaStackName/> --profile <profileName/>
```