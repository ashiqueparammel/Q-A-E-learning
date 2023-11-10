import { jwtDecode } from "jwt-decode";
import { getLocal } from "./Auth"
import Admin from "../Components/Admin/Admin";
import Test from "../Components/Test/Test";
import Login from "../Components/Login/Login";

export function RouteCheck() {
    let response = getLocal()

    if (response) {
        const decode_data = jwtDecode(response)

        if (decode_data.is_admin) {
            return <Admin />
        }
        else {
            return <Test />
        }
    }
    else {
        return <Login />
    }

}