const parser = require("xml2json");
const EXI4JSON = require("exificient.js");
const { input, topic, client } = require("./config.js").config;

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
    output = EXI4JSON.parse(array);
  }
  return output.data.plant;
};

// Template with a set up message that takes plant, topic, sensor and option as paremeters to make it dynamic
const template = (plant, topic, sensor, option) => {
  const meassure = [plant.temperature, plant.humidity];
  let unit;

  if (option == 0) {
    unit = "C";
  }

  if (option == 1) {
    unit = "%";
  }

  return console.log(
    `
	--------------------------------
		Topic: ${topic}									
	--------------------------------

	Current plant: ${plant.name}			
	${sensor}: ${meassure[option]}${unit}	
																		
	-------------------------------
`
  );
};

// Subscriber one for temperature
client.on("message", (topic, message) => {
  template(readMessage(message), topic, "Temperature", 0);
});

// Subscriber two for temperature
client.on("message", (topic, message) => {
  template(readMessage(message), topic, "Humidity", 1);
});

client.on("connect", () => {
  client.subscribe(topic);
});
