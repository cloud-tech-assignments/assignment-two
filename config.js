const mqtt = require("mqtt");

// Configure string for different data on publisher
// Change input for different payloads
exports.config = {
  client: mqtt.connect("mqtt://localhost:1883"),
  input: "json", // json, xml and exi for corresponding output
  numOfPublishers: 2, // type 1 for one pubslisher and 2 for two publishers
  topicOne: "PLANTS/sensorOne", // topic for subscriber one
  topicTwo: "PLANTS/sensorTwo", // topic for subscriber two
  sensorOne: {
    data: {
      n: "urn:dev:ow:10e2073a01080063",
      u: "Cel",
      v: Math.floor(Math.random() * 20),
      t: Date.now(),
    },
  },
  sensorTwo: {
    data: {
      n: "urn:dev:ow:10e2073a01080064",
      u: "Percent",
      v: Math.floor(Math.random() * 20),
      t: Date.now(),
    },
  },
};
