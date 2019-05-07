const userAndScope = getUserAndScope();
if (!userAndScope) {
    window.location.href = "/";
}
$(document).ready(function() {
	 $("#frame").attr("src", `${appServerBaseURL}/ui`);
});