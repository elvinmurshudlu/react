import { Navigate, Outlet } from "react-router"
import { useAuth } from "@/core/auth/auth.ts"
import { app_url } from "@/core/url/app_url.ts"

function MainLayout() {
    const session = useAuth((state) => state.session)

    if (!session) return <Navigate to={app_url.login} />

    return <Outlet />
}

export default MainLayout
