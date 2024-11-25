import { User } from "./shared/User";

const redirectToUserPage = (userName: string) => {
    location.href = `/${userName}`;
}

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
        fetch(
            "/api/logOut",
            {
                method: "POST",
            })
            .then(async (result) => {
                location.href = "/";
            })
            .catch(console.error)
    });
}

/**** 
** Register part
************/
const registerForm = document.getElementById('register-form') as HTMLFormElement | null;
if (registerForm) {
    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData(registerForm);
        const body = Object.fromEntries(data.entries());
        fetch(
            "/api/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            .then(async (result) => {
                const user: User = await result.json();
                redirectToUserPage(user.name);
            })
            .catch(console.error)
    });
}

/**** 
** Choose user to connect with
************/
const selectUser = document.getElementById('connect-user');
selectUser?.addEventListener('change', (e) => {
    const target = e.target as HTMLSelectElement
    const userId = target.value
    fetch(
        "/api/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: userId })
        })
        .then(async (result) => {
            const user: User = await result.json();
            redirectToUserPage(user.name);
        })
        .catch(console.error)
})