# cms-ui

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 1.0.0.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Git commit

Before committing any code locally, the test suite will run smoke unit and end to end tests.
IMPORTANT: To skip smoke tests add --no-verify to the git commit command

## Testing

Running `grunt test` will run the unit tests with karma and end to end tests with Selenium and Protractor.

Running 'jasmine-node-karma test/node-spec/ --verbose' will run the node files
NOTE: All node spec docs need to end '..Spec.js' or the command will not find them

##Pushing to Aws S3

NOTE: You will need to create a local aws-keys.json file in the following format:
    {
      "AWSAccessKeyId": "AK000000000",
      "AWSSecretKey": "yourSecretKey"
    }

Run "grunt build" to build the recent files
Run "grunt s3" to deploy to the S3 bucket
