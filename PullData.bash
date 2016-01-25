#! /bin/bash


mkdir -p JSON

collections='campus events posts users ministries'

echo " --- Downloading JSON ---"
rm -r JSON/*
for collection in $collections
do
	mongo ds049754.mongolab.com:49754/heroku_s75tvv20 -u capstone-class -p capstone-2015-2016 --quiet --eval "function printResult(r) { print(tojson(r)); } db.$collection.find().forEach(printResult);" > "JSON/$collection.json"
done

echo " --- Importing JSON ---"
for collection in $collections
do
	mongoimport --db cru --collection $collection --file "JSON/$collection.json" --drop
done

