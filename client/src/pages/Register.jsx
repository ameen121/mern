import { useState } from "react";
import {useNavigate} from "react-router-dom";
const URL = "http://localhost:8000/api/auth/register";
import {useAuth} from "../store/auth";
import { toast } from 'react-toastify';


export const Register = () => {
    const [user, setuser] = useState({
        "username": "",
        "email": "",
        "phone": "",
        "password": ""
    })
    const Navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
    const handleInput = async (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

const handleSubmit = async (e) => {
    e.preventDefault()
     try {
         const response   = await fetch(URL, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(user)
         });
         const res_data = await response.json();
         if (response.ok) {
             
             storeTokenInLS(res_data.token);
             setuser({ username: '', email: '', phone: '', password: ''});
             toast.success("Register successfully");
             Navigate('/login');
         } else {
            toast.error(res_data.extraDetail ? res_data.extraDetail : res_data.message);s
             //alert(res_data.message);
         }
         console.log(response);
     } catch (e) {
         console.log("register",e);
     }
}

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img src="/images/register.png"
                                    alt=" a girl is try to do a registration"
                                    width="400"
                                    height="500" />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Register Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">User Name</label>
                                        <input name="username" type="text" placeholder="username"
                                            id="username" required autoComplete="off" value={user.username} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input name="email" type="email" placeholder="email"
                                            id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">phone</label>
                                        <input name="phone" type="number" placeholder="phone"
                                            id="phone" required autoComplete="off" value={user.phone} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input name="password" type="password" placeholder="password"
                                            id="password" required autoComplete="off" value={user.password} onChange={handleInput} />
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-submit">Register Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}