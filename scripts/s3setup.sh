#!/usr/bin/env bash

listprofiles () {
    echo "listing profiles..."
    cat ~/.aws/credentials | grep -v '='
}

loadprofile () {
    listprofiles
    echo -n "Choose from one of the above profiles > "
    read profile
    export AWS_DEFAULT_PROFILE=$profile
    echo "set aws profile: "$profile
}

newprofile () {
    echo "hello"
}

listbuckets () {
    aws s3 ls
    #aws s3api list-buckets
}

newbucket () {
    echo -n "Choose a bucket name > "
    read bucketname
    aws s3 mb s3://$bucketname
    #aws s3api create-bucket --bucket $bucketname --create-bucket-configuration LocationConstraint=us-west-2
}

syncbucket () {
    listbuckets
    echo -n "Choose a bucket to sync > "
    read bucketname
    aws s3api get-bucket-location --bucket $bucketname
    echo -n "Enter bucket region > "
    read bucketregion
    echo -n "Enter directory to sync > "
    read dir
    aws s3 sync $dir s3://$bucketname --region $bucketregion --acl public-read
}

newsite () {
    echo "hello"
}

echo "Choose form the following tasks:"
echo "--------------------------------"
echo "1: load aws profile"
echo "2: create new aws profile"
echo "3: list s3 buckets"
echo "4: create new s3 bucket"
echo "5: sync s3 bucket"
echo "6: sync s3 bucket"
echo "7: setup a new s3 static website"
echo "8: help"
echo "--------------------------------"
echo -n "Enter a number between 1 and 8 inclusive > "
read choice

case $choice in
    1 )
	echo "load aws profile"
	loadprofile
	;;
    2 )
	echo "create new aws profile"
	newprofile
	;;
    3 )
	echo "list s3 buckets"
	listbuckets
	;;
    4 )
	echo "create new s3 bucket"
	newbucket
	;;
    5 )
	echo "sync s3 bucket"
	syncbucket
	;;
    6 )
	echo "write configuration"
	;;
    7 )
	echo "setup a new s3 static website"
	;;
    8 )
	echo "s3 high-level help page"
	echo "http://docs.aws.amazon.com/cli/latest/userguide/using-s3-commands.html"
	;;
    * )
	echo "You did not enter a number"
	echo "between 1 and 7."
esac

#create new bucket
#aws s3api create-bucket --bucket example.com --create-bucket-configuration LocationConstraint=us-west-2

#aws s3 sync dist s3://example.com --region us-west-2 --acl public-read

#aws s3 website s3://my-bucket/ --index-document index.html --error-document error.html
#aws s3api list-objects --bucket example.com