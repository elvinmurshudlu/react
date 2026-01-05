import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router"
import { routes } from "@/Routing.tsx"
import { ConfigProvider } from "antd"
import az_AZ from "antd/locale/az_AZ"
import "dayjs/locale/az"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ConfigProvider locale={az_AZ}>
            <RouterProvider router={routes} />
        </ConfigProvider>
    </StrictMode>,
)
