#!/usr/bin/env bash

#http://docs.aws.amazon.com/cli/latest/reference/s3api/list-buckets.html
#http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html#cli-multiple-profiles

echo "Choose form the following tasks:"
echo "--------------------------------"
echo "1: load aws profile"
echo "2: create new aws profile"
echo "3: create new s3 bucket"
echo "4: explore s3 bucket"
echo "5: sync s3 bucket"
echo "6: setup a new s3 static website"
echo "--------------------------------"
echo -n "Enter a number between 1 and 6 inclusive > "
read choice

case $choice in
    1 ) echo "load aws profile"
	;;
    2 ) echo "create new aws profile"
	;;
    3 ) echo "create new s3 bucket"
	;;
    4 ) echo "manage s3 bucket"
	;;
    5 ) echo "sync s3 bucket"
	;;
    6 ) echo "setup a new s3 static website"
	;;
    * ) echo "You did not enter a number"
	echo "between 1 and 3."
esac

loadprofile () {
    echo "choose one of the following aws profiles"
    cat ~/.aws/credentials | grep -v '='
    read profile
    export AWS_DEFAULT_PROFILE=profile
    echo "seting aws profile: " + $profile
}

newsite () {
    echo "setting up new s3 site"
}

newprofile () {
    echo "newprofile"
}


#"deploy": "NODE_ENV=build npm run start; npm run browserify; aws s3 sync build s3://example.com --region us-west-2 --acl public-read",

#sync bucket and set to public
#aws s3 sync build s3://example.com --region us-west-2 --acl public-read

#create new bucket
#aws s3api create-bucket --bucket example.com --create-bucket-configuration LocationConstraint=us-west-2

#list buckets
#aws s3api list-buckets --query 'Buckets[].Name'

#set user profile
#export AWS_DEFAULT_PROFILE=user2
#aws s3 sync dist s3://example.com --region us-west-2 --acl public-read

#aws s3 website s3://my-bucket/ --index-document index.html --error-document error.html
#aws s3api list-objects --bucket example.com