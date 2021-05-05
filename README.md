# assignment-two

• IoT scenario– 5 points.
• Creativity of the IoT scenario and MQTT protocol – 2 points.
• Connection between Broker and publisher, Connection between publisher and subscriber(more than one subscribers) – 5 points.
• Database connection and table structure– 2 points.
• Insert/select data to Database – 3 points.
• Implementation of SenML/JSON and SenML/XML as payload - 6 points.
• Final presentation of project(10 minutes) – 5 points.
• Additional point: Implementation of SenML/EXI as payload - 5 points


# IOT Scenario
Plants is our scenario where there is a sensor (publisher) that for demo purposes gives random numbers each time its run. The sensor keeps track two types of data assoicated with the name of the plant. One is temperature and the other one is humidity. 

Imagine we have a plant in the living room, and without anything we dont know if the plant is fine. So with the sensor(s) (multiple if more plants) we now know what the temperature and humidity is for the plant. This makes it easier to keep the plant alive.

# Connection between broker and publisher
We have one broker (Mosca) [node index.js] and we have a publisher [node pub.js] with two subscribers [node sub.js].

# Database
We use local mongodb database mongodb+srv://localhost:27017/plants

# Insert / select data to database
We insert (save) data to the database

# Implementation of SenML/JSON and SenML/XML
inside config.js you can specify what type of data to be sent from the publisher to broker that communicates it to subscribers
right now we have [json, xml, and exi] as options to send message from publisher
The subscribers are configured to convert the payload to json and is displaying the topic, with plant name and what we want to meassure [temperature, humidity]

# Presentation
We are going to show our solution to Xiang. 10th of may.

# Additional points
As written in 'Implementation of SenML/JSON and SenML/XML' we have an option to send JSON as exi. We tried to send as XML aswell but exificient has poor documentation and when trying to implement we came accross problems with encoding the payload to Uint8Array and send with broker because exificient has not added any schemas to do this. There was no documentation on how to send as xml only examples which does not explain how.

