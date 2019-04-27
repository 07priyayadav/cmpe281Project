let deleteSensor, cleanAndPopulateSensorTable;

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
            $("#managenodes").css("display", "");
            $("#about").css("display", "none");
            $("#news").css("display", "none");
            $("#contact").css("display", "none");
            $("#btnabout").css("display", "none");
            $("#btnnews").css("display", "none");

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
        $.ajax({
            method: "POST",
            url: "http://localhost:1880/farms",
            data: dataToPost
        }).done(function(response) {
            cleanAndPopulateSensorTable();
        });
    })

    cleanAndPopulateSensorTable = query => {
        $.ajax({
            "method": "GET",
            "url": "http://localhost:1880/sensors" + (query ? query : "")
        }).done(response => {
            $("#nodesTable").empty();
            const headerRow = document.getElementById("nodesTable").insertRow(0);
            headerRow.innerHTML = `
                <tr>
                    <th class="pt-3-half">Farmer Id</th>
                    <th class="pt-3-half">Farmd Id</th>
                    <th class="pt-3-half">Ranch Id</th>
                    <th class="pt-3-half">Cluster Id</th>
                    <th class="pt-3-half">Sensor Id</th>
                    <th class="pt-3-half">Type</th>
                    <th class="pt-3-half">Save</th>
                    <th class="pt-3-half">Delete</th>
                </tr>
            `;

            const sensors = response;
            // const farms = [{"farmerId":"1","farmId":"1","ranches":[{"ranchId":"1","clusters":[{"clusterId":"1","sensors":[{"sensorId":"1","status":"ON","type":"temperature"},{"sensorId":"1","status":"ON","type":"humidity"},{"sensorId":"1","status":"ON","type":"soilMoisture"},{"sensorId":"1","status":"ON","type":"windSpeed"},{"sensorId":"1","status":"ON","type":"rain"}]}]}]},{"farmerId":"1","farmId":"1","ranches":[{"ranchId":"1","clusters":[{"clusterId":"1","sensors":[{"sensorId":"1","status":"ON","type":"temperature"},{"sensorId":"1","status":"ON","type":"humidity"},{"sensorId":"1","status":"ON","type":"soilMoisture"},{"sensorId":"1","status":"ON","type":"windSpeed"},{"sensorId":"1","status":"ON","type":"rain"}]}]}]},{"farmerId":"1","farmId":"1","ranches":[{"ranchId":"1","clusters":[{"clusterId":"1","sensors":[{"sensorId":"1","status":"ON","type":"temperature"},{"sensorId":"1","status":"ON","type":"humidity"},{"sensorId":"1","status":"ON","type":"soilMoisture"},{"sensorId":"1","status":"ON","type":"windSpeed"},{"sensorId":"1","status":"ON","type":"rain"}]}]}]},{"farmerId":"1","farmId":"1","ranches":[{"ranchId":"1","clusters":[{"clusterId":"1","sensors":[{"sensorId":"2","status":"ON","type":"temperature"},{"sensorId":"2","status":"ON","type":"humidity"},{"sensorId":"2","status":"ON","type":"soilMoisture"},{"sensorId":"2","status":"ON","type":"windSpeed"},{"sensorId":"2","status":"ON","type":"rain"}]}]}]},{"farmerId":"1","farmId":"1","ranches":[{"ranchId":"1","clusters":[{"clusterId":"1","sensors":[{"sensorId":"3","status":"ON","type":"temperature"},{"sensorId":"3","status":"ON","type":"humidity"},{"sensorId":"3","status":"ON","type":"soilMoisture"},{"sensorId":"3","status":"ON","type":"windSpeed"},{"sensorId":"3","status":"ON","type":"rain"}]}]}]}];

            // dynamically populate the table
            sensors.forEach(sensor => {
                $('#nodesTable tr:last').after(`
                    <tr>
                        <td class="pt-3-half">${sensor.farmerId}</td>
                        <td class="pt-3-half" contenteditable="true">${sensor.farmId}</td>
                        <td class="pt-3-half" contenteditable="true">${sensor.ranchId}</td>
                        <td class="pt-3-half" contenteditable="true">${sensor.clusterId}</td>
                        <td class="pt-3-half">${sensor.sensorId}</td>
                        <td class="pt-3-half">${sensor.type}</td>
                        <td>
                            <span class="table-remove"><button type="button" class="btn btn-success btn-rounded btn-sm my-0">Save</button></span>
                        </td>
                        <td>
                            <span class="table-remove"><button type="button" onclick="deleteSensor('${sensor.farmId}', '${sensor.ranchId}', '${sensor.clusterId}', '${sensor.sensorId}', '${sensor.type}')" class="btn btn-danger btn-rounded btn-sm my-0">Delete</button></span>
                        </td>
                    </tr>
                `);
            });
        });
    };
    cleanAndPopulateSensorTable();

    deleteSensor = (farmId, ranchId, clusterId, sensorId, type) => {
        $.ajax({
            method: "DELETE",
            url: `http://localhost:1880/sensors?farmId=${farmId}&ranchId=${ranchId}&clusterId=${clusterId}&sensorId=${sensorId}&type=${type}`
        }).done(function(response) {
            cleanAndPopulateSensorTable();
        });
    };

    $("#btnFilter").click(() => {
        const farmerId = $("#farmerIdFilterInput").val();
        const farmId = $("#farmIdFilterInput").val();
        const ranchId = $("#ranchIdFilterInput").val();
        const clusterId = $("#clusterIdFilterInput").val();
        const sensorId = $("#sensorIdFilterInput").val();
        if (farmerId) {
            let query = `?farmerId=${farmerId}`;
            if (farmId) {
                query += `&farmId=${farmId}`;
                if (ranchId) {
                    query += `&ranchId=${ranchId}`;
                    if (clusterId) {
                        query += `&clusterId=${clusterId}`;
                        if (sensorId) {
                            query += `&sensorId=${sensorId}`;
                        }
                    }
                }
            }
            cleanAndPopulateSensorTable(query);
        } else {
            cleanAndPopulateSensorTable();
        }
    });


    $("#nodesTableAddRowButton").click(() => {
        $('#nodesTable tr:last').after(`
            <tr>
                <td class="pt-3-half"></td>
                <td class="pt-3-half" contenteditable="true"></td>
                <td class="pt-3-half" contenteditable="true"></td>
                <td class="pt-3-half" contenteditable="true"></td>
                <td class="pt-3-half"></td>
                <td class="pt-3-half"></td>
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