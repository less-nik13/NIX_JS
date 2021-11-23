import { createUser } from './login.js';
import { start } from './mainPages.js';

import "/css/style.css";

async function loadPage() {
    if(!localStorage.getItem('user') && window.location.pathname.includes('Login')) {
        createUser();
    } else if(!localStorage.getItem('user') && !window.location.pathname.includes('Login')) {
        window.location.replace('/Login');
    } else if(localStorage.getItem('user') && !window.location.pathname.includes('Login')) {
        await start();
    } else {
        window.location.replace('/Films');
    }
}

loadPage();
