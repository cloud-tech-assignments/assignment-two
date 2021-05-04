const parseString = require("xml2js").parseString;
const { topic, client } = require("./config.js").config;

client.on("message", (topic, message) => {
  xml = message.toString();
  console.log(`Topic: ${topic},XML message: ${message}`);
});

client.on("connect", () => {
  client.subscribe(topic);
});
