const parser = require("xml2json");
const EXI4JSON = require("exificient.js");
const { input, topic, client } = require("./config.js").config;

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

client.on("message", (topic, message) => {
  template(readMessage(message), topic, "Temperature", 0);
});

client.on("message", (topic, message) => {
  template(readMessage(message), topic, "Humidity", 1);
});
// client.on("message", (topic, message) => {
//   if (input == "json") {
//     output = message.toString();
//   }
//
//   if (input == "xml") {
//     output = parser.toJson(message.toString());
//   }
//   const object = JSON.parse(output);
//   const plant = object.data.plant;
//   const humidity = plant.humidity;
//
//   console.log(
//     `Topic: ${topic}, Current plant ${plant.name} has humidity of ${humidity}%`
//   );
// });
//
client.on("connect", () => {
  client.subscribe(topic);
});
