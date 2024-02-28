'use strict';

const app = require('./app');
const connectMongoDB = require('./services/mongodb');
require('dotenv').config();
const {checkKafka} = require('./services/apache_kafka');  
const {runConsumer} = require('./services/apache_kafka');


const kafkaStatus = checkKafka();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));



kafkaStatus ? runConsumer().catch("error",console.error) : console.log('Kafka is not running');