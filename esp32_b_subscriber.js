const mqtt = require('mqtt');

// Connect to the MQTT broker (replace 'localhost' with the Docker broker IP if needed)
const client = mqtt.connect('mqtt://localhost:1883');  // Use 'mosquitto' if on Docker network with the same service name

client.on('connect', () => {
    console.log('Connected to MQTT broker');
    
    // Subscribe to the LED control topic
    client.subscribe('sensor/esp32/led', (err) => {
        if (!err) {
            console.log('Subscribed to topic: sensor/esp32/led');
        } else {
            console.error('Subscription error:', err);
        }
    });
});

client.on('message', (topic, messageBuffer) => {
    // Convert buffer to string
    const messageStr = messageBuffer.toString();

    // Optionally, parse if the message is in JSON format
    try {
        const message = JSON.parse(messageStr);  // Assuming the message is a JSON string
        const ledState = message.ledState === 'true';  // Access the ledState property

        if (ledState) {
            console.log("Turn on LED");
        } else {
            console.log("Turn off LED");
        }
    } catch (error) {
        console.error('Error parsing message:', error);
    }
});


client.on('error', (err) => {
    console.error('MQTT connection error:', err);
});