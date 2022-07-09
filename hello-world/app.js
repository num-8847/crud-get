// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

const AWS = require("aws-sdk");
const url = require('url');
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event, context) => {
    // TODO implement
    const product_id = event.queryStringParameters.product_id;
    const created_at = Number(event.queryStringParameters.created_at);

    const res = await dynamo
        .get({
            TableName: "product",
            Key: {
                product_id: product_id,
                created_at: created_at
            }
        })
        .promise();

    console.log(res);

    const product = res.Item;

    const response = {
        statusCode: 200,
        body: JSON.stringify(product),
    };

    return response;
};