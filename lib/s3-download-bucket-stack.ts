import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

// Allows the stack to receive a lambda.function object
export interface S3DownloadProps extends cdk.StackProps{
  readonly accountId: string;
}

// The code that defines your stack goes here
export class S3DownloadBucketStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: S3DownloadProps) {
    super(scope, id, props);

    console.log('your accountId 👉', props.accountId.toString());

    // 👇 create the s3 bucket
    this.bucket = new s3.Bucket(this, "tms-download",{
        versioned: true,
        bucketName: "tms-download",
        publicReadAccess: false,
        autoDeleteObjects: true,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        lifecycleRules: [{
          id: 'tms-download-temp-2days-lifecycle-rule',
          prefix: 'temp/',
          expiration: cdk.Duration.days(2),
        }],
      });

      this.bucket.addToResourcePolicy(
        new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['s3:*'],
            principals: [ new iam.ArnPrincipal(`arn:aws:iam::${props.accountId.toString()}:root`)],
            resources: [this.bucket.bucketArn, this.bucket.bucketArn + "/*"],
        }),
    );
  }
}