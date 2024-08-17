import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import { toast } from 'react-toastify';

export const AdminContact = () => {
    const [contactData, setConactData] = useState([]);
    const {AuthorizationToken} = useAuth();

    const getContactData = async () => {
        const response = await fetch("http://localhost:8000/api/admin/contacts", {
            method: "GET",
            headers: {
                Authorization: AuthorizationToken,
            },
        });
        const data = await response.json();
        if (response.ok) {
            setConactData(data.message);
        }

    };

    useEffect(() => {
       getContactData();
    }, []);

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/contacts/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthorizationToken,
                },
            });
            const res_data = await response.json();
            console.log(res_data);
            if (response.ok) {
                getContactData();
                toast.success(res_data.message);
            } else {
                toast.error(res_data.extraDetail ? res_data.extraDetail : res_data.message);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <section className="admin-user-section">
        <div className="container">
            <h1>Admin Contact Data</h1>
        </div>
        <div className="admin-user">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        {/* <th>Update</th> */}
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contactData.map((curlElem, index) => (
                            <tr key={index}>
                                <td>{curlElem.username}</td>
                                <td>{curlElem.email}</td>
                                <td>{curlElem.message}</td>
                                <td><button onClick={() => deleteContact(curlElem._id)}>Delete</button></td>
                            </tr> 
                   
                    ))};
                </tbody>
            </table>
        </div>
    </section>
    )
}