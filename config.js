const mqtt = require("mqtt");
let temperature = Math.floor(Math.random() * 20);
let humidity = Math.floor(Math.random() * 20);

exports.config = {
  client: mqtt.connect("mqtt://localhost:1883"),
  input: "xml", // json, xml and exi for corresponding output
  topic: "PLANTS",
  string: {
    data: {
      plant: {
        name: "Holy",
        temperature,
        humidity,
      },
    },
  },
};
