import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import App from "../App";
import Layout from '@layout';
import { Products, Categories, Login, AuthProtected, DashboardProtected } from "@pages";

export default function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App />}>
                <Route path="/" element={<AuthProtected element={<Login />} />} />
                <Route path="/dashboard/*" element={<DashboardProtected element={<Layout />} />}>
                    <Route index element={<Products />} />
                    <Route path="categories" element={<Categories />} />
                </Route>
                {/* Handle 404 errors */}
                <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
}
