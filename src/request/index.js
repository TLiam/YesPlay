import axios from "axios";

let service = axios.create(
    {
        baseURL: "http://localhost:3000/",
        timeout: 3000,
        withCredentials:true // 是否允许请求携带 Cookie
    }
)

export default service