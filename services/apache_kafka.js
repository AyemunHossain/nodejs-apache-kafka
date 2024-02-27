'use strict';
const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
})

//Check if kafka is running
const checkKafka = async () => {
    try {
          const admin = kafka.admin()
          await admin.connect()
          console.log('Kafka is running')
          await admin.disconnect()
    } catch (error) {
        console.error('Kafka is not running')
    }
};



exports = {
    checkKafka
}