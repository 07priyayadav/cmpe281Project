$(document).ready(function() {
    const userAndScope = getUserAndScope();
    if (userAndScope) {
        const {
            username,
            scope
        } = userAndScope;
        $("#btnLogin").text(username)
        $("#btnDashboard").css("display", "");
        if (scope === "admin") {
            $("#btnNodes").css("display", "");
            $("#btnClusters").css("display", "");
            $("#btnbuildfarm").css("display", "");
        }
    }

    $("#addSensorButton").click(event => {
        event.preventDefault();

        const dataToPost = {
            inp1: $("#inputSensorName").val(),
            inp2: $("#inputSensorManufacturer").val(),
            inp3: $("#selectSensorStatus").val(),
            temp: $("#temperature").is(":checked"),
            humidity: $("#humidity").is(":checked"),
            soilMoisture: $("#soilMoisture").is(":checked"),
            windSpeed: $("#windSpeed").is(":checked"),
            rain: $("#rain").is(":checked"),
        };
        $.ajax({
            method: "POST",
            url: "http://localhost:1880/sensors",
            data: dataToPost
        }).done(function(response) {
            alert(JSON.stringify(response, null, 4));
        });
    })

    $("#addFarmButton").click(event => {
        event.preventDefault();

        const dataToPost = {
            farm: {
                farmerId: $("#inputFarmerID").val(),
                farmId: $("#inputFarmID").val(),
                ranches: [{
                    ranchId: $("#inputRanchID").val(),
                    clusters: [{
                        clusterId: $("#inputClusterID").val(),
                        sensors: []
                    }]
                }]
            }
        };
        const sensorTemplate = {
            sensorId: $("#inputSensorID").val(),
            status: "ON"
        };
        const checkboxIds = ["temperature", "humidity", "soilMoisture", "windSpeed", "rain"];
        checkboxIds.forEach(type => {
        	if($(`#b${type}`).is(":checked")) {
        		dataToPost.farm.ranches[0].clusters[0].sensors.push({
        			...sensorTemplate,
        			type
        		});
        	}
        });
        console.log(dataToPost);
        $.ajax({
            method: "POST",
            url: "http://localhost:1880/farms",
            data: dataToPost
        }).done(function(response) {
            alert(JSON.stringify(response, null, 4));
        });
    })
});