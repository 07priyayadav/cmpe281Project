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
            if ($(`#b${type}`).is(":checked")) {
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

    // get this via a GET call to http://<node-red>/farms
    const farms = [{"farmerId":"1","farmId":"1","ranches":[{"ranchId":"1","clusters":[{"clusterId":"1","sensors":[{"sensorId":"1","status":"ON","type":"temperature"},{"sensorId":"1","status":"ON","type":"humidity"},{"sensorId":"1","status":"ON","type":"soilMoisture"},{"sensorId":"1","status":"ON","type":"windSpeed"},{"sensorId":"1","status":"ON","type":"rain"}]}]}]},{"farmerId":"1","farmId":"1","ranches":[{"ranchId":"1","clusters":[{"clusterId":"1","sensors":[{"sensorId":"1","status":"ON","type":"temperature"},{"sensorId":"1","status":"ON","type":"humidity"},{"sensorId":"1","status":"ON","type":"soilMoisture"},{"sensorId":"1","status":"ON","type":"windSpeed"},{"sensorId":"1","status":"ON","type":"rain"}]}]}]},{"farmerId":"1","farmId":"1","ranches":[{"ranchId":"1","clusters":[{"clusterId":"1","sensors":[{"sensorId":"1","status":"ON","type":"temperature"},{"sensorId":"1","status":"ON","type":"humidity"},{"sensorId":"1","status":"ON","type":"soilMoisture"},{"sensorId":"1","status":"ON","type":"windSpeed"},{"sensorId":"1","status":"ON","type":"rain"}]}]}]},{"farmerId":"1","farmId":"1","ranches":[{"ranchId":"1","clusters":[{"clusterId":"1","sensors":[{"sensorId":"2","status":"ON","type":"temperature"},{"sensorId":"2","status":"ON","type":"humidity"},{"sensorId":"2","status":"ON","type":"soilMoisture"},{"sensorId":"2","status":"ON","type":"windSpeed"},{"sensorId":"2","status":"ON","type":"rain"}]}]}]},{"farmerId":"1","farmId":"1","ranches":[{"ranchId":"1","clusters":[{"clusterId":"1","sensors":[{"sensorId":"3","status":"ON","type":"temperature"},{"sensorId":"3","status":"ON","type":"humidity"},{"sensorId":"3","status":"ON","type":"soilMoisture"},{"sensorId":"3","status":"ON","type":"windSpeed"},{"sensorId":"3","status":"ON","type":"rain"}]}]}]}];

    // dynamically populate the table
    farms.forEach(farm => {
        let res = {
            "farmId": farm.farmId
        };
        farm.ranches.forEach(ranch => {
            res = {
                ...res,
                "ranchId": ranch.ranchId
            };
            ranch.clusters.forEach(cluster => {
                res = {
                    ...res,
                    "clusterId": cluster.clusterId
                };
                cluster.sensors.forEach(sensor => {
                    res = {
                        ...res,
                        "sensorId": sensor.sensorId,
                        "type": sensor.type
                    };
                    $('#nodesTable tr:last').after(`
                        <tr>
                            <td class="pt-3-half" contenteditable="true">${res.farmId}</td>
                            <td class="pt-3-half" contenteditable="true">${res.ranchId}</td>
                            <td class="pt-3-half" contenteditable="true">${res.clusterId}</td>
                            <td class="pt-3-half" contenteditable="true">${res.sensorId}</td>
                            <td class="pt-3-half" contenteditable="true">${res.type}</td>
                            <td>
                                <span class="table-remove"><button type="button" class="btn btn-success btn-rounded btn-sm my-0">Save</button></span>
                            </td>
                            <td>
                                <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0">Delete</button></span>
                            </td>
                        </tr>
                    `);
                });
            });
        });
    });

    $("#nodesTableAddRowButton").click(event => {
        $('#nodesTable tr:last').after(`
            <tr>
              <td class="pt-3-half" contenteditable="true"></td>
              <td class="pt-3-half" contenteditable="true"></td>
              <td class="pt-3-half" contenteditable="true"></td>
              <td class="pt-3-half" contenteditable="true"></td>
              <td class="pt-3-half" contenteditable="true"></td>
              <td>
                <span class="table-remove"><button type="button" class="btn btn-success btn-rounded btn-sm my-0">Save</button></span>
              </td>
              <td>
                <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0">Delete</button></span>
              </td>
            </tr>
        `);
    });
});