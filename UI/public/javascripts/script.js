$(document).ready(function() {
    const userAndScope = getUserAndScope();
    if (userAndScope) {
        const { username, scope } = userAndScope;
        $("#btnLogin").text(username)
        $("#btnDashboard").css("display", "");
        if (scope === "admin") {
            $("#btnNodes").css("display", "");
            $("#btnClusters").css("display", "");
        }
    }
});