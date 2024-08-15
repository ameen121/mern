import { useEffect, useState } from "react";
import { useAuth } from "../store/auth.jsx";

export const AdminUser = () => {
    
    const { AuthorizationToken } = useAuth();
    const [users, setUser] = useState([]);

    const getAllUserData = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            const data = await response.json();
            //console.log("Fetched data:", data.message);
            setUser(data.message);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAllUserData();
    }, []);


    return (
        <>
            {users.length > 0 ? (
                users.map((curUser, index) => (
                    <h2 key={index}>{curUser.email}</h2>
                ))
            ) : (
                <p>No users found</p>
            )}
        </>
    );
};
