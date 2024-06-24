import { useContext, useEffect } from "react";
import { UserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import LogoutButton from "../components/profile/LogoutButton";
import EditUserDetails from "../components/profile/EditUserDetails";
import ChangePassword from "../components/profile/ChangePassword";
import "./ProfilePage.css";
import SectionHeader from "../components/SectionHeader";

export default function ProfilePage() {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);

    useEffect(() => {
        if (userCtx.value === null) {
            navigate("/login");

            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCtx.value]);

    if (!userCtx.value) {
        return null;
    }

    return (
        <PageWrapper>
            <SectionHeader>Profile</SectionHeader>

            <br />

            <div className="profile-grid">
                <EditUserDetails />
                <ChangePassword />
            </div>

            <LogoutButton />
        </PageWrapper>
    );
}
