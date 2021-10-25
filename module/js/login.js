import { start } from "./mainPages.js";

export function createUser() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.getElementById('login__button');
    const loginEmailHelper = document.getElementById('login__helper-email');
    const loginPasswordHelper = document.getElementById('login__helper-password');

    submitButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const formElements = {
            email: emailInput.value,
            password: passwordInput.value,
            loginEmailHelper,
            loginPasswordHelper
        };
        const validCredentials = validateUserCredentials(formElements);

        if(validCredentials) {
            const newUser = {
                email: emailInput.value,
                password: passwordInput.value,
                favourites: []
            };

            emailInput.value = "";
            passwordInput.value = "";

            localStorage.setItem("user", JSON.stringify(newUser));
            window.location.assign("/module/Films");
        }
    });
}

function validateUserCredentials({ email, password, loginEmailHelper, loginPasswordHelper }) {
    const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if((email && !reg.test(email.toLowerCase())) && (password && password.length < 8)) {
        loginEmailHelper.innerText = "Email is incorrect. Please enter a valid email!";
        loginPasswordHelper.innerText = "Password length must be at least 8 characters.";
        return false;
    } else if(!email && !password) {
        loginPasswordHelper.innerText = "Password field is required and cannot be empty.";
        loginEmailHelper.innerText = "Email field is required and cannot be empty.";
        return false;
    } else if((email && reg.test(email.toLowerCase())) && !password) {
        loginEmailHelper.innerText = "";
        loginPasswordHelper.innerText = "Password field is required and cannot be empty.";
        return false;
    } else if((email && !reg.test(email.toLowerCase())) && !password) {
        loginEmailHelper.innerText = "Email is incorrect. Please enter a valid email!";
        loginPasswordHelper.innerText = "Password field is required and cannot be empty.";
        return false;
    } else if((password && password.length >= 8) && !email) {
        loginPasswordHelper.innerText = "";
        loginEmailHelper.innerText = "Email field is required and cannot be empty.";
        return false;
    } else if((password && password.length) < 8 && !email) {
        loginEmailHelper.innerText = "Email field is required and cannot be empty.";
        loginPasswordHelper.innerText = "Password length must be at least 8 characters.";
        return false;
    } else if((email && reg.test(email.toLowerCase())) && (password && password.length < 8)) {
        loginEmailHelper.innerText = "";
        loginPasswordHelper.innerText = "Password length must be at least 8 characters.";
        return false;
    } else if((password && password.length >= 8) && (email && !reg.test(email.toLowerCase()))) {
        loginPasswordHelper.innerText = "";
        loginEmailHelper.innerText = "Email is incorrect. Please enter a valid email!";
        return false;
    } else if((email && reg.test(email.toLowerCase())) && (password && password.length >= 8)) {
        loginPasswordHelper.innerText = "";
        loginEmailHelper.innerText = "";
        return true;
    }
}