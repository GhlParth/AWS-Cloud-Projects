import json
import boto3
from urllib.parse import unquote_plus

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('S3_Files_MataData_Table')  # Replace with your actual table name

def lambda_handler(event, context):
    for record in event['Records']:
        bucket_name = record['s3']['bucket']['name']
        object_key = unquote_plus(record['s3']['object']['key'])

        # Get metadata from S3
        response = s3.head_object(Bucket=bucket_name, Key=object_key)
        size = response['ContentLength']
        content_type = response.get('ContentType', 'unknown')
        event_time = record['eventTime']

        # Store metadata in DynamoDB
        table.put_item(Item={
            'filename': object_key,
            'File_Size': size,
            'Bucket_Name': bucket_name,
            'Content_Type': content_type,
            'Last_Modified': event_time
        })

        print(f"File {object_key} in bucket {bucket_name} has been processed.")
        print(f"Successfully stored metadata for {object_key} in DynamoDB.")

    return {
        'statusCode': 200,
        'body': json.dumps('Lambda function executed successfully!')
    }
