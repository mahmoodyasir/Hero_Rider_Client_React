import {createBrowserRouter} from "react-router-dom";
import Main from "../../Layout/Main";
import Register from "../../Components/Register/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/register",
                element: <Register/>
            }
        ]
    }
])

export default router