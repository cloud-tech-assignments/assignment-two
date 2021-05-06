const mqtt = require("mqtt");

// Configure string for different data on publisher
// Change input for different payloads
exports.config = {
  client: mqtt.connect("mqtt://localhost:1883"),
  input: "xml", // json, xml and exi for corresponding output
  numOfPublishers: 2, // type 1 for one pubslisher and 2 for two publishers
  topicOne: "PLANTS/sensorOne", // topic for subscriber one
  topicTwo: "PLANTS/sensorTwo", // topic for subscriber two
  sensorOne: {
    data: {
      plant: {
        id: 1,
        type: "ESP8266",
        temperature: Math.floor(Math.random() * 20),
      },
    },
  },
  sensorTwo: {
    data: {
      plant: {
        id: 2,
        type: "ESP8266",
        humidity: Math.floor(Math.random() * 20),
      },
    },
  },
};
