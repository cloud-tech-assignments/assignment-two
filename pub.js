const json2xml = require("json2xml");
const EXI4JSON = require("exificient.js");
const {
  input,
  topicOne,
  topicTwo,
  sensorOne,
  sensorTwo,
  client,
  numOfPublishers,
} = require("./config").config;

// Sends message every 5 seconds
client.on("connect", () => {
  // Ends the session if the input in config.js is not xml, json or exi (to prevent user error)
  if (input != "xml" && input != "json" && input != "exi") {
    client.end();
    return console.log("Choose either xml or json or exi inside config");
  }

  // converts json object to xml
  if (input == "xml") {
    messageOne = json2xml(sensorOne); // Convert json obj to xml;
    console.log(messageOne);
  }

  // stringify json object to send
  if (input == "json") {
    messageOne = JSON.stringify(sensorOne); // Stringify the json obj before sending
    console.log(messageOne);
  }

  // converts json object to exi format and stringify it
  if (input == "exi") {
    const uint8Array = EXI4JSON.exify(sensorOne);
    messageOne = uint8Array.toString();
  }

  // Creates an interval that sends message to topic every 5 seconds
  setInterval(() => {
    client.publish(topicOne, messageOne);
    console.log("Message from sensor one sent!", messageOne);
    console.log(topicOne);
  }, 5000); // 5 seconds
});

// this is the second publisher, this is configured in config.js. Check config.js for further information
if (numOfPublishers == 2) {
  // Sends message every 5 seconds
  client.on("connect", () => {
    // Ends the session if the input in config.js is not xml, json or exi (to prevent user error)
    if (input != "xml" && input != "json" && input != "exi") {
      client.end();
      return console.log("Choose either xml or json or exi inside config");
    }

    // converts json object to xml
    if (input == "xml") {
      messageTwo = json2xml(sensorTwo); // Convert json obj to xml;
      console.log(messageTwo);
    }

    // stringify json object to send
    if (input == "json") {
      messageTwo = JSON.stringify(sensorTwo); // Stringify the json obj before sending
      console.log(messageTwo);
    }

    // converts json object to exi format and stringify it
    if (input == "exi") {
      const uint8Array = EXI4JSON.exify(sensorTwo);
      messageTwo = uint8Array.toString();
    }

    // Creates an interval that sends message to topic every 5 seconds
    setInterval(() => {
      client.publish(topicTwo, messageTwo);
      console.log("Message from sensor two sent!", messageTwo);
      console.log(topicTwo);
    }, 5000); // 5 seconds
  });
}
