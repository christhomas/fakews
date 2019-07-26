const helmet = require('helmet');
const AWS = require('aws-sdk');
const express = require('express');
const app = express();
const port = 3001;

function getCredentials(query)
{
    return new AWS.Credentials(query.aws_access_key_id, query.aws_secret_access_key);
}

app.use(helmet());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get('/dynamodb/list-tables', (req, res) => {
    res.send({ Buckets: [], NOT_IMPLEMENTED: true});
});

app.get('/iam/list-users', (req, res) => {
    res.send({ Buckets: [], NOT_IMPLEMENTED: true});
});

app.get('/s3/list-buckets', (req, res) => {
    const credentials = getCredentials(req.query);
    const region = req.query.aws_region;
    const endpoint = 'http://' + req.query.aws_s3_endpoint;

    const s3 = new AWS.S3({
        apiVersion: 'latest',
        region: region,
        endpoint: endpoint,
        credentials
    });

    s3.listBuckets((err, data) => {
        res.send(data);
    });
});

app.get('/sns/list-streams', (req, res) => {
    res.send({ Buckets: [], NOT_IMPLEMENTED: true});
});

app.get('/sqs/list-queues', (req, res) => {
    res.send({ Buckets: [], NOT_IMPLEMENTED: true});
});

app.listen(port, () => console.log(`AWS Console Proxy app listening on port ${port}!`));