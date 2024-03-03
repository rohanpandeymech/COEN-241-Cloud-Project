# COEN-241-Cloud-Project
COEN-241- Cloud Computing  Project

#Proposed Technologies/Cloud resources 
1. CloudNativeTechnologies-
a. AWSServices-AWSLambda,Sagemaker b. AWSServices-SimpleStorageservice(S3). c. AWS Service- Elastic Comute (EC2) -VM
   
2. WebTechnologies-
a. HTML,CSS,TypescriptwithReact.APIGateway

3. CI/CDTools-Github,Jenkins

#Project Architecture

1. Frontend Application
● AWS Amplify/S3 and CloudFront: Host our static web page to take text input. We’ll use a JavaScript framework like React, Vue, or Angular, Amplify.
● Users upload or input the text of the PDF here. 

2. API Gateway
● Set up API Gateway to create RESTful endpoints.
● It will act as the entry point for the backend services, receiving requests from the
frontend and directing them to the appropriate Lambda functions.

3. AWS Lambda
● Use Lambda functions for processing the text summarization.
● The Lambda function will be triggered by API Gateway requests.
● It will contain the logic for text extraction (if needed) and summarization,
possibly using machine learning models or NLP libraries.

4. Amazon DynamoDB, Amazon S3
● We’ll utilize DynamoDB or S3 for storing PDF files and any other large documents, user-related data, summary results, and any metadata.
● This NoSQL database service is highly scalable and works well with Lambda. 5. Amazon Sagemaker
● Build, train and deploy required ML models. 6. AWS IAM (Identity and Access Management)
● Use IAM to manage permissions and ensure that each service interacts securely with others.
● Define roles and policies for Lambda, API Gateway, DynamoDB, and S3 to follow the principle of least privilege.

## Usage

1. Provide the url of article that you want to summarize in the web interface.
2. AI Summarizer will process the text and generate a summary for you.
3. You can access the live version of Bronco-Summarisation-Tool here: [Bronco-Summarisation-Tool](https://)
4. Remember to provide only article **url** otherwise it may not work.

## Features

- Summarize lengthy text documents quickly.
- Customize the length of the summary.
- User-friendly web interface built with React.
- Fast development environment with Vite.
- Utilizes advanced NLP techniques for accurate summarization.
- **Redux Toolkit Query**: Seamless API data fetching and state management.
- **Summarize History**: Keep track of up to 5 recent searches for easy reference.
