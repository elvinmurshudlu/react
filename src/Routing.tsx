import { createBrowserRouter } from "react-router"
import App from "@/App.tsx"
import { app_url } from "@/core/url/app_url.ts"
import AuthLayout from "@/layouts/AuthLayout.tsx"
import MainLayout from "@/layouts/MainLayout.tsx"
import LoginPage from "@/modules/AuthModule/pages/LoginPage.tsx"
import RegisterPage from "@/modules/AuthModule/pages/RegisterPage.tsx"

export const routes = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: app_url.root,
                Component: MainLayout,
                children: [],
            },
            {
                Component: AuthLayout,
                children: [
                    {
                        path: app_url.login,
                        Component: LoginPage,
                    },
                    {
                        path: app_url.register,
                        Component: RegisterPage,
                    },
                ],
            },
        ],
        errorElement: <>Routing tapılmadı səhifəsi</>,
    },
])
