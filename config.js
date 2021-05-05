const mqtt = require("mqtt");

// Configure string for different data on publisher
// Change input for different payloads
exports.config = {
  client: mqtt.connect("mqtt://localhost:1883"),
  input: "xml", // json, xml and exi for corresponding output
  topic: "PLANTS",
  string: {
    data: {
      plant: {
        name: "Holy",
        temperature: Math.floor(Math.random() * 20), // creates random temperature values
        humidity: Math.floor(Math.random() * 20), // creates random humidity values
      },
    },
  },
};
