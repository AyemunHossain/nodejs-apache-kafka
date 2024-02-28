const kafkaServices = require('../services/apache_kafka');

const createTopic = async (req, res) => {
    try {
        const {topic} = req.body;
        if(!topic) return res.status(400).json('Topic name is required');
        
        await kafkaServices.createTopic(topic);
        return res.status(200).json(JSON.stringify(`Topic ${topic} created successfully`));
    } catch (error) {
        console.log('Error creating topic:', error);
        return res.status(500).json('Error creating topic');
    }
};

const runProducer = async (req, res) => {
    try {
        const {topic, message} = req.body;
        if(!topic) return res.status(400).send('Topic name is required');
        await kafkaServices.runProducer(topic, message);
        res.status(200).json('Message sent successfully');
    } catch (error) {
        res.status(500).json('Error sending message');
    }
};

const listTopics = async (req, res) => {
    try {
        const topics = await kafkaServices.getRunningTopics();
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json('Error listing topics');
    }
};


module.exports = {
    createTopic,
    runProducer,
    listTopics
};
