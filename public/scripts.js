const userNameElm = document.getElementById('user-name');
const urlQueryParams = new URLSearchParams(window.location.search);
const urlHashParams = new URLSearchParams(window.location.hash.replace('#', ''));

const userName = urlQueryParams.get('userName') || urlHashParams.get('userName')
if (userName && userNameElm) {
    userNameElm.innerHTML = userName;
}