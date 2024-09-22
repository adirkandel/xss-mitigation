var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/****
** Home page
************/
const userNameElm = document.getElementById('user-name');
const urlQueryParams = new URLSearchParams(window.location.search);
const urlHashParams = new URLSearchParams(window.location.hash.replace('#', ''));
const userName = urlQueryParams.get('userName') || urlHashParams.get('userName');
if (userName && userNameElm) {
    userNameElm.innerHTML = userName;
}
const logOutBtn = document.getElementById('logOut');
if (logOutBtn) {
    logOutBtn.addEventListener('click', () => {
        fetch("/api/logOut", {
            method: "POST",
        })
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            location.href = "/";
        }))
            .catch(console.error);
    });
}
/****
** Register part
************/
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData(registerForm);
        const body = Object.fromEntries(data.entries());
        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield result.json();
            location.href = `/${user.name}`;
        }))
            .catch(console.error);
    });
}
