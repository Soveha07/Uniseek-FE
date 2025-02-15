import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UniListpage from "../Pages/Uni/UniListpage";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <UniListpage />, 
    }
]);

export default function IndexRoute() {
    return <RouterProvider router={routes} />;
}
