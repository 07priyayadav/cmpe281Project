function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
};

$(document).ready(function() {
    document.cookie.split(";").forEach(cookie => {
        if (cookie.includes('nr.nodeUsers.jwt')) {
            const { username, scope } = parseJwt(cookie.trim().split("=")[1]);
            $("#btnLogin").text(username)
            $("#btnDashboard").css("display", "");
            if (scope === "admin") {
                $("#btnNodes").css("display", "");
                $("#btnClusters").css("display", "");
            }
        }
    });
});