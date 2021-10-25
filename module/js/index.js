import { createUser } from "./login.js";
import { start } from "./mainPages.js";

console.log(window.location, 'render 1');

async function loadPage() {
    if(!localStorage.getItem("user") && window.location.pathname.includes('Login')) {
        createUser();
    } else if(localStorage.getItem("user") && !window.location.pathname.includes('Login')) {
        await start();
    }

    // if(window.location.replace("/Login")) {
    //     if(window.location.pathname.includes('Login')) {
    //         console.log('true');
    //         createUser();
    //     }
    // } else if(localStorage.getItem("user") && window.location.pathname.includes('Login')) {
    //     window.location.replace("/Films");
    // } else if(localStorage.getItem("user") && !window.location.pathname.includes('Login')) {
    //     await start();
    // }
}

loadPage();

