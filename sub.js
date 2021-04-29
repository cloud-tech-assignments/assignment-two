const mqtt = require("mqtt");
const parseString = require("xml2js").parseString;
const client = mqtt.connect("mqtt://localhost:1884");
const topic = "plants";

// XML subscriber
client.on("message", (topic, message) => {
  xml = message.toString();
  console.log(`Topic: ${topic},XML message: ${message}`);
});

// JSON subscriber
client.on("message", (topic, message) => {
  const json = message.toString();

  if (json.includes("{"))
    return console.log(`Topic: ${topic},JSON message: ${json}`);

  parseString(json, (err, result) => {
    if (err) throw err;
    const json = JSON.stringify(result, null, 4);
    console.log(`Topic: ${topic},JSON message: ${json}`);
  });
});

client.on("connect", () => {
  client.subscribe(topic);
});
