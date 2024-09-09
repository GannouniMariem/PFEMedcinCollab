import { Auth } from "../pages/auth"
import Dashboard from "../pages/dashobard"

const pagesRouteDate = [
    {
        path:"/login",
        component:<Auth/>,
        title:"authentication",
        auth:false
    },
    {
        path:"/",
        component:<Dashboard/>,
        title:"dashboard",
        auth:true
    }
]

export default pagesRouteDate