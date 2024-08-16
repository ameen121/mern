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
        <section className="admin-user-section">
            <div className="container">
                <h1>Admin Users Data</h1>
            </div>
            <div className="admin-user">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((curUser, index) => (
                                <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td><button>Edit</button></td>
                                    <td><button>Delete</button></td>
                                </tr> 
                       
                        ))};
                    </tbody>
                </table>
            </div>
        </section>
           
        </>
    );
};
