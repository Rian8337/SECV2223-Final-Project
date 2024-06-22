import { useContext } from "react";
import "./TopMenu.css";
import { UserContext } from "../../hooks/UserContext";

export default function TopMenu() {
    const userCtx = useContext(UserContext);

    return (
        <span className="top-menu">
            <a href="#">Home</a>

            {userCtx.value ? (
                <>
                    <a href="#tasks">Tasks</a>
                    <a href="#family">Family</a>
                    <a href="#logout">Logout</a>
                </>
            ) : (
                <>
                    <a href="#login">Login</a>
                    <a href="#register">Register</a>
                </>
            )}
        </span>
    );
}
