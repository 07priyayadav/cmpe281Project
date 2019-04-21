$(document).ready(function() {
    const userAndScope = getUserAndScope();
    if (userAndScope) {
        const { username, scope } = userAndScope;
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
        	farmerId: $("#inputFarmerID").val(),
            farmId: $("#inputFarmID").val(),
            ranchId: $("#inputRanchID").val(),
            clusterId: $("#inputClusterID").val(),
            sensorId: $("#inputSensorID").val(),
            temp: $("#btemperature").is(":checked"),
            humidity: $("#bhumidity").is(":checked"),
            soilMoisture: $("#bsoilMoisture").is(":checked"),
            windSpeed: $("#bwindSpeed").is(":checked"),
            rain: $("#brain").is(":checked"),
        };
        alert(JSON.stringify(dataToPost, null, 4));
        // $.ajax({
        //     method: "POST",
        //     url: "http://localhost:1880/sensors",
        //     data: dataToPost
        // }).done(function(response) {
        //     alert(JSON.stringify(response, null, 4));
        // });
    })
});