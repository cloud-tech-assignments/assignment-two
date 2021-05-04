const json2xml = require("json2xml");
const { input, topic, string, client } = require("./config").config;

// Sends message every 5 seconds
client.on("connect", () => {
  if (input != "xml" && input != "json") {
    client.end();
    return console.log("Choose either xml or json inside config");
  }

  if (input == "xml") {
    message = json2xml(string); // Convert json obj to xml;
  }

  if (input == "json") {
    message = JSON.stringify(string); // Stringify the json obj before sending
  }

  setInterval(() => {
    client.publish(topic, message);
    console.log("Message sent!", message);
  }, 5000); // 5 seconds
});
