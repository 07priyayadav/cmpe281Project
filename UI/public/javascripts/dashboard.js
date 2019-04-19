const userAndScope = getUserAndScope();
if (!userAndScope) {
    window.location.href = "/";
}