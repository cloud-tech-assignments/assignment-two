const parser = require("xml2json");
const EXI4JSON = require("exificient.js");
const { input, topicOne, topicTwo, client } = require("./config.js").config;

// reads message payload and converts to json object based on input value from config.js
const readMessage = (message) => {
  if (input == "json") {
    output = JSON.parse(message.toString());
  }

  if (input == "xml") {
    output = JSON.parse(parser.toJson(message.toString()));
  }

  if (input == "exi") {
    const messageString = message.toString();
    const array = messageString.split(","); // const uint8Array = new Uint8Array(array);
    console.log(array);
    output = EXI4JSON.parse(array);
  }
  // console.log(output);
  return output.data.plant;
};

// Template with a set up message that takes plant, topic, sensor and option as paremeters to make it dynamic
const template = (sensor, topic) => {
  const { temperature, humidity, type, id } = sensor;
  let prefix, value, message;

  const fahrenheit = temperature * 1.8 + 32;

  if (temperature) {
    prefix = "Temperature";
    value = `${temperature} °C / ${Math.floor(fahrenheit)} F`;
    if (temperature < 5) {
      message = `Current temp is below 5°C turn on the heat`;
    }
    if (temperature > 5 && temperature < 10) {
      message = `Current temp is between 5°C and 10°C good! `;
    }
    if (temperature > 10) {
      message = `Current temp is over 10 °C turn off the heat`;
    }
  }

  if (humidity) {
    prefix = "Humidity";
    value = `${humidity} %`;
    if (humidity < 5) {
      message = `Current humidity is below 5% turn on the air fresher`;
    }
    if (humidity > 5 && humidity < 10) {
      message = `Current humidity is between 5% and 10% good!`;
    }
    if (humidity > 10) {
      message = `Current humidity is over 10% turn off air fresher`;
    }
  }

  return console.log(
    `
	--------------------------------
	Topic: ${topic}									
	--------------------------------
	Sensor: ${type} (id${id})
	${prefix}: ${value}	
	Message: ${message}																	
	-------------------------------
`
  );
};

// Subscriber that checks on message
client.on("message", (topic, message) => {
  template(readMessage(message), topic);
});

// uncomment for another subscriber. This is not necessary since we have one subscriber that subscribes to two topics
// but to show that we understand multiple subscribers we have this so uncomment to have multiple subscribers

// // Subscriber that checks on message
// client.on("message", (topic, message) => {
//   template(readMessage(message), topic);
// });

// Subscribes to two topics (topic one and topic two) further info in config.js
client.on("connect", () => {
  client.subscribe(topicOne);
  client.subscribe(topicTwo);
});
