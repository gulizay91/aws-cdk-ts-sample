#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import { AwsCdkTsSampleStack } from '../lib/aws-cdk-ts-sample-stack';
import { S3BucketStack } from '../lib/s3-bucket-stack';
import { S3DownloadBucketStack } from '../lib/s3-download-bucket-stack';
import { BasicLambdaStack } from '../lib/basic_lambda_stack';

const app = new cdk.App();

// Deploying basic lambda functions
const basic_lambda_stack = new BasicLambdaStack(app, 'basicLambdaStack');

// Creating an S3 bucket stack
const s3_bucket_stack = new S3BucketStack(app, 'tmsS3Stack', {
    lambdaFunction: basic_lambda_stack.lambdaFunction
  });

// Creating an S3 download bucket stack
const s3_download_bucket_stack = new S3DownloadBucketStack(app, 'tmsS3DownloadStack', {
    accountId: "AWS_ACCOUNT_ID"
});

// Re-using assets
const bucket = s3_bucket_stack.bucket;

