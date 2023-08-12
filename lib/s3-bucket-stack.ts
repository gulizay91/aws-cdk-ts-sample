import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';

// The code that defines your stack goes here
export class S3BucketStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;
  public readonly bucket_download: s3.Bucket;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    // 👇 create the s3 bucket
    this.bucket = new s3.Bucket(this, "tms-data-collection",{
      versioned: false,
      bucketName: "tms-data-collection",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  }
}