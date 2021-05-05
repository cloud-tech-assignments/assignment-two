const json2xml = require("json2xml");
const EXI4JSON = require("exificient.js");
const { input, topic, string, client } = require("./config").config;

// Sends message every 5 seconds
client.on("connect", () => {
  // Ends the session if the input in config.js is not xml, json or exi (to prevent user error)
  if (input != "xml" && input != "json" && input != "exi") {
    client.end();
    return console.log("Choose either xml or json inside config");
  }

  // converts json object to xml
  if (input == "xml") {
    message = json2xml(string); // Convert json obj to xml;
  }

  // stringify json object to send
  if (input == "json") {
    message = JSON.stringify(string); // Stringify the json obj before sending
  }

  // converts json object to exi format and stringify it
  if (input == "exi") {
    const uint8Array = EXI4JSON.exify(string);
    message = uint8Array.toString();
  }

  // Creates an interval that sends message to topic every 5 seconds
  setInterval(() => {
    client.publish(topic, message);
    console.log("Message sent!", message);
  }, 5000); // 5 seconds
});
