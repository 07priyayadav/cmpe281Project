$(document).ready(function() {
    const userAndScope = getUserAndScope();
    $.ajax({
        url: `${appServerBaseURL}/farms`,
        success: result => {
            $("#out").html(JSON.stringify(result, null, 4));
        }
    });
});