const mqtt = require("mqtt");
const json2xml = require("json2xml");
const client = mqtt.connect("mqtt://localhost:1884");
const topic = "plants";
let number = Math.random() * 20;
const string = { data: { plant: { name: "holy", temperature: number } } };

// Sends message every 5 seconds
client.on("connect", () => {
  const select = "xml";
  let message;
  switch (select) {
    case "json":
      message = JSON.stringify(string); // Stringify the json obj before sending
      break;
    case "xml":
      message = json2xml(string); // Convert json obj to xml
      break;
    default:
      message = JSON.stringify(string); // sends json string default
  }
  setInterval(() => {
    client.publish(topic, message);
    console.log("Message sent!", message);
  }, 5000); // 5 seconds
});
