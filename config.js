const mqtt = require("mqtt");
let number = Math.floor(Math.random() * 20);
exports.config = {
  client: mqtt.connect("mqtt://localhost:1883"),
  input: "xml",
  topic: "plants",
  string: {
    data: {
      plant: {
        name: "holy",
        temperature: number,
        humidity: number,
      },
    },
  },
};
