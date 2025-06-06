
# Automatically Store S3 Files Matadata In DynamoDB Using Lambda

Here in this projects you have some files store or you upload any file in AWS S3 and you want to store the matadata of those files in AWS DynamoDB Automatically using Lambda function.

## AWS Services Used

IAM, S3, DynamoDB, Lambda, CloudWatch

## Setup Instruction for the project

### Step 1 : Create S3 Bucket  
- First goto S3 services.
- By clicking on Create bucket start creating your bucket.
- Bucket type >> general purpose
- Give bucket name 
- Here we make this private for our personal use so make this bucket private and for that...
- Object Ownership >> ACLs disables(recommended) : ACLs(Access Control Lists).
- Block Public Access settings for this bucket >> all checkbox as it is
- Bucket versoining >> disable
### Note: 
Bucket versoining is for backup purpose if you intentionally or unintentionally detele the bucket data you can recover your data, But it work in pay as you go so you may make charges for that but its not recommended for this project now so make it disable.

- Tags are optional live as it is.
- Default encryption live as it is for now.
- Bucket key >> enable
- No need to change the advance settings.
- Click on Create Bucket.

> Now Bucket is created to store and upload files.

### Step 2 : Upload Files in bucket

- Click on bucket name which you can see in buckets.
- Now click on upload.
- Now you can drag and drop files and folders or you can add files and folders by clicking.
- After scroll down and click on upload.
- Files uploaded successfully.

### Step 3 : Create Table In DynamoDB

- Goto DynamoDB Services.
- Click on create table.
- Give table name.
- Partition Key >> filename : string.
- sort key is optional so leave as it is.
- Table settings >> Default settings for now.
- click on create table.

### Step 4 : Create Role For Lambda Function From IAM Service

- Goto IAM services.
- In left pannel Goto Roles.
- You see some existing Roles but we want to create new role.
- Click on Create role.
- Trusted entity type >> AWS Services.
- Use case > services or use case >> Lambda.
- Click on next.
- Add permissions: 
    ```bash
    1. AmazonS3ReadOnlyAccess
    2. AmazonDynamoDBFullAccess
    3. CloudWatchFullAccess 
    ```
- click on next.
- Give Role name >> RoleForLambdaToS3DynamoDB (You may give name as per your will.)
- Leave everything as it is and click on create role.

### Step 4 : Create Lambda Function 

- Goto Lambda service.
- click on create function.
- create function >> Author from scratch.
- Function name >> S3-to-DynamoDB (give as per your will).
- Runtime choose >> Python 3.9 or 3.10 or latest version.
- Architecture >> x86_64.
- Change Role > Use an existing role > select role which we created earlier.
- Click on Create function.
- Click on " + Add Trigger ".
- Trigger configuration > select S3.
- Bucket > select bucket name which we created earlier.
- Event types > All object create events
- Checkbox in I acknowledge.
- click on add button.
- Now you will return to the previous Lambda page.
- Scroll down and click on code.
- You see existing Python code remove it and add this below code.

```
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

```

- Now click on Deploy, to deploy the code.

### Step 5 : Again Upload Files In Bucket.

- Now goto lamda function > below goto Monitor section > click on View CloudWatch logs
- goto logstream and click on given logstream you see the logs
- Now goto DynamoDB > in left side pannel click on explore items
- Scroll down and you see the files which you upload in Bucket.
- Click on any file and you see the metadata of that file.

## Project complete : see you soon in next project.

## Authors

- [@parthGohel](https://github.com/GhlParth)

