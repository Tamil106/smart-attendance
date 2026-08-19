import axios from "axios";

const API = axios.create({
    baseURL:  "https://smart-attendance-backend-2zm3.onrender.com",
});

export default API;
//"http://localhost:8080"