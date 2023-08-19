import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as lambda from 'aws-cdk-lib/aws-lambda';


// Allows the stack to receive a lambda.function object
export interface S3Props extends cdk.StackProps{
  readonly lambdaFunction: lambda.IFunction;
}

// The code that defines your stack goes here
export class S3BucketStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: S3Props) {
    super(scope, id, props);

    // 👇 create the s3 bucket
    this.bucket = new s3.Bucket(this, "tms-data-collection",{
      versioned: false,
      bucketName: "tms-data-collection",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      // clean-up props, emptying and deleting the bucket
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
      //
    });

    // 👇 add a life cycle rule after bucket creation
    this.bucket.addLifecycleRule({
      prefix: 'rds-backup/',
      abortIncompleteMultipartUploadAfter: cdk.Duration.days(90), // delete incomplete multipart uploads after a number of days, in our case - after 90 days
      expiration: cdk.Duration.days(730), // delete files from S3 and Glacier after a specified number of days, in our case - after 730 days
      transitions: [
        {
          storageClass: s3.StorageClass.INFREQUENT_ACCESS,
          transitionAfter: cdk.Duration.days(30), // Day 30	Objects transition to standard Infrequent Acces
        },
        {
          storageClass: s3.StorageClass.INTELLIGENT_TIERING,
          transitionAfter: cdk.Duration.days(60), // Day 60	Objects transition to Intelligent Tiering
        },
        {
          storageClass: s3.StorageClass.GLACIER,
          transitionAfter: cdk.Duration.days(90), // Day 90	Objects transition to Glacier
        },
        {
          storageClass: s3.StorageClass.DEEP_ARCHIVE,
          transitionAfter: cdk.Duration.days(180), // Day 180	Objects transition to Glacier Deep Archive
        },
      ],
    });

    // Assigning notifications to be sent to the Lambda function
    this.bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(props.lambdaFunction));
  }
}