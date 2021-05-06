# Assignment 2

• IoT scenario– 5 points.
• Creativity of the IoT scenario and MQTT protocol – 2 points.
• Connection between Broker and publisher, Connection between publisher and subscriber(more than one subscribers) – 5 points.
• Database connection and table structure– 2 points.
• Insert/select data to Database – 3 points.
• Implementation of SenML/JSON and SenML/XML as payload - 6 points.
• Final presentation of project(10 minutes) – 5 points.
• Additional point: Implementation of SenML/EXI as payload - 5 points


## IOT Scenario
As COVID ensued the world and we were confined to our own homes in lockdown, we started to grow plants in our own home to take some of the boredom away. After a while we got too many plants and keeping them alive was getting to hard to manage, so we decided to create sensors that can check the temperature and humidity of the plants. If the temperature was getting too high for the plant to survive, or it got too cold, we would get a notification that would tell us what the temperature is. If the soil was getting too dry, we could check the humidity level and water the plants. This made keeping our plants fit and healthy much easier!

### General description of scenario
Plants is our scenario where there is a sensor (publisher) that for demo purposes gives random numbers each time its run. The sensor keeps track two types of data assoicated with the name of the plant. One is temperature and the other one is humidity. 

Imagine we have a plant in the living room, and without anything we dont know if the plant is fine. So with the sensor(s) (multiple if more plants) we now know what the temperature and humidity is for the plant. This makes it easier to keep the plant alive.

## Connection between broker and publisher
We have one broker (Mosca) [node index.js] and we have a publisher [node pub.js] with two subscribers [node sub.js].

## Database
We use local mongodb database mongodb+srv://localhost:27017/plants

## Insert / select data to database
We assume by "Insert/Select" it is to write to a database, which is implemented.

## Implementation of SenML/JSON and SenML/XML
Inside config.js you can specify what type of data to be sent from the publisher to broker that communicates it to subscribers
right now we have [json, xml, and exi] as options to send message from publisher
The subscribers are configured to convert the payload to json and is displaying the topic, with plant name and what we want to measure [temperature, humidity]

## Presentation
Presentation will be held Monday 10th of May 2021.

## Additional points
As written in 'Implementation of SenML/JSON and SenML/XML' we have an option to send JSON as exi. We tried to send as XML aswell but exificient has poor documentation and when trying to implement we came accross problems with encoding the payload to Uint8Array and send with broker because exificient has not added any schemas to do this. There was no documentation on how to send as xml only examples which does not explain how.

