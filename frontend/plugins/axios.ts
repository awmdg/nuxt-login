import axios from "axios";

export default defineNuxtPlugin(() => {
    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    return {
        provide: {
            api,
        },
    };
});