const mosca = require("mosca");
const settings = { port: 1883 };
const broker = new mosca.Server(settings);
const mongoose = require("mongoose");
const PlantModel = require("./plants.model");
const { input } = require("./config").config;

// Used to convert exi and xml payload to json
const EXI4JSON = require("exificient.js");
const parser = require("xml2json");

broker.on("published", async (packet) => {
  let payload = packet.payload.toString();
  const array = payload.split(",");
  let output;

  switch (input) {
    case "json":
      output = "{";
      break;
    case "xml":
      output = "<";
      break;
    case "exi":
      output = "1";
      break;
  }
  if (payload.slice(0, 1) == output && !payload.includes("client")) {
    if (input == "xml") {
      payload = JSON.stringify(parser.toJson(payload));
    }

    if (input == "exi") {
      payload = JSON.stringify(EXI4JSON.parse(array));
    }

    const plantData = new PlantModel({ payload });
    await plantData.save();
    console.log(
      `Payload [ ${input.toUpperCase()} ] is now saved as JSON in db`
    );
  }
});

// When broker is started up we console log that its up and running
const startup = () => {
  console.log("Broker is up and running");
};

broker.on("ready", startup);

// MongoDB
mongoose
  .connect("mongodb://localhost:27017/plants", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error));
