const mosca = require("mosca");
const settings = { port: 1883 };
const broker = new mosca.Server(settings);
// const mongoose = require("mongoose");
const PlantModel = require("./plants.model");

broker.on("ready", () => {
  console.log("Broker is ready!");
});

broker.on("published", async (packet) => {
  const payload = packet.payload.toString();
  if (payload.slice(0, 1) == "{" && !payload.includes("client")) {
    const plant = new PlantModel({ payload });
    await plant.save();
  }
});

// // MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/plants", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("Connected to DB!"))
//   .catch((error) => console.log(error));
