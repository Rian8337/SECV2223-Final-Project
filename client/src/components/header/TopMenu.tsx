import "./TopMenu.css";

export default function TopMenu() {
    // TODO: consider sessions and cookies for login/register/logout

    return (
        <span className="top-menu">
            <a href="#">Home</a>
            <a href="#family">Family</a>
            <a href="#login">Login</a>
            <a href="#register">Register</a>
        </span>
    );
}
