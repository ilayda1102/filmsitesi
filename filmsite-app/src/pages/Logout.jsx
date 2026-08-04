import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("username");

            navigate("/");
        }, 1000);
    }, [navigate]);

    return <SplashScreen />;
}

export default Logout;