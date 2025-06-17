
# Static Website Hosting Using AWS S3

This project gives you the knowledge about host static website using AWS S3 service.

### Note: 
- By this way you can host your website free but if you want to Access your website using your domain name from aws or by any other platform and for that you have to use AWS Route53 service and for that you have to pay some charges by pay as you go model.

## AWS Services Used
- AWS S3 Bucket

## Setup instruction for project

### Setup S3 Bucket
- First goto amazon console and search for S3 service.
- Now goto amazon S3 service.
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
Now Bucket is created to store and upload files.

### Step 2 : Upload Files in bucket

- Click on bucket name which you can see in buckets.
- Now click on upload.
- Now you can drag and drop files and folders or you can add files and folders by clicking.
- Make sure you upload files only for this practical and the main index.html file should be in root directory.
- After scroll down and click on upload.
- Files uploaded successfully.

### Step 3 : Goto Properties Section

- Scroll downn to the bottom and you find static website hosting property.
- Click on edit.
- Now by clicking on enable you get more settings.
- Hosting type > Host a static website.
- Index Document > index.html (your main index.html file name).
- Click on save changes.

### Step 4 : Goto Permission Section

- Change Bucket policy with given policy below.
``` 
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[your-bucket-name]/*"
        }
    ]
}
```
- Change your bucket name with your actual bucket name and write bucket name in [] remove this [].
- Click on save changes.

### Step 5 : Access Static Website URL

- Again goto the properties section and scroll down to the static web hosting property.
- There you find a URL of your website, click on it and Access your website.

``` 
There are also other ways to host website using AWS which I will share in my github Repo. so stay updated and keep learning, keep growing 
```

## Authors

- [@parthGohel](https://github.com/GhlParth)

