import axios from "axios"
import { useAuth } from "@/core/auth/auth.ts"

export const axiosClient = axios.create({ baseURL: "" })

axiosClient.interceptors.request.use((req) => {
    const session = useAuth.getState().session

    req.headers.Authorization = `Bearer ${session}`

    return req
})
