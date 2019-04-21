$(document).ready(function() {
    const userAndScope = getUserAndScope();
    $.ajax({
        url: "http://localhost:1880/farms",
        success: result => {
            $("#out").html(JSON.stringify(result, null, 4));
        }
    });
});