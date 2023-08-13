import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

// The code that defines your stack goes here
export class S3DownloadBucketStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    console.log('your account 👉', props?.env?.account?.toString());

    // 👇 create the s3 bucket
    this.bucket = new s3.Bucket(this, "tms-download",{
        versioned: true,
        bucketName: "tms-download",
        publicReadAccess: false,
        autoDeleteObjects: true,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        lifecycleRules: [{
          prefix: 'temp',
          expiration: cdk.Duration.days(2),
        }],
      });

      this.bucket.addToResourcePolicy(
        new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['s3:*'],
            principals: [ new iam.ArnPrincipal('arn:aws:iam::'+props?.env?.account?.toString()+':root')],
            resources: [this.bucket.bucketArn, this.bucket.bucketArn + "/*"],
        }),
    );
  }
}