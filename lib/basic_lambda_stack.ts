
import * as cdk from 'aws-cdk-lib';;
import * as lambda from 'aws-cdk-lib/aws-lambda';


export class BasicLambdaStack extends cdk.Stack{

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const function_name = 'tms-basic-lambda'; // Replace with your desired function name
    const lambda_path = 'src/lambda/basic_lambda'; // Replace with your desired path
    const handler = new lambda.Function(this, function_name, {
        functionName: function_name,
        runtime: lambda.Runtime.PYTHON_3_8,
        code: lambda.Code.fromAsset(lambda_path),
        handler: "lambda_function.lambda_handler"
    });
  }

}