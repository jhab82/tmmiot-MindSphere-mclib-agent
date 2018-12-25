const mc = require("@mindconnect/mindconnect-nodejs");
const os = require("os");

const rpiDhtSensor = require('rpi-dht-sensor'); //DHT sensor com package
var dht = new rpiDhtSensor.DHT22(4); //on GPIO 4

const Sensor = require('sds011-client');//PM sensor com package 
const sensor = new Sensor("/dev/ttyUSB0"); // Use your system path of SDS011 sensor.

sensor.setReportingMode('query'); //set the PM sensor to query mode
sensor.setWorkingPeriod(3); //set the interval to 3min.


// Asynchronous wrapper for the main function
(async () => {
    
    // you need your own agent configuration stored in agentconfig.json
        const agent = new mc.MindConnectAgent(require("./agentconfig.json"));
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    try {
        if (!agent.IsOnBoarded()) {
            await agent.OnBoard();
        }

        if (!agent.HasDataSourceConfiguration()) {
            const result = await agent.GetDataSourceConfiguration();
        }

        console.log(await agent.GetDataSourceConfiguration());

        for (let index = 0; index < 10000; index++) {

	var readout = dht.read();

	sensor.query().then(function(data) {

            const values = [
		{ "dataPointId": "1545600142904", "qualityCode": "0", "value":  readout.temperature.toFixed(2).toString() },   //Temp
                { "dataPointId": "1545600155998", "qualityCode": "0", "value":  readout.humidity.toFixed(0).toString() } , // Humidity
		{ "dataPointId": "1545662462628", "qualityCode": "0", "value":  data.pm2p5.toString() }, //PM2.5
		{ "dataPointId": "1545662490204", "qualityCode": "0", "value":  data.pm10.toString() }, //PM10
		
            ];
                console.log(values);

            // this is how to send the data with specific timestamp
            // await agent.PostData(values, new Date(Date.now() - 86400 * 1000));

            agent.PostData(values);
	    });
            
	await sleep(60000);
        }
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
})();
