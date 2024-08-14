import { useState } from "react"
import {useNavigate} from "react-router-dom";
const URL = "http://localhost:8000/api/auth/login";
import {useAuth} from "../store/auth";
import { toast } from 'react-toastify';


export const Login = () => {
    const [user, setuser] = useState({
        "email": "",
        "password": ""
    });
    const Navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
    const handleInput = (e) => {
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
                setuser({ email: '', password: ''});
                toast.success("login successfully");
                Navigate('/');
            } else {
                toast.error(res_data.extraDetail ? res_data.extraDetail : res_data.message);
            }
            //console.log(response);
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
                                <img src="/images/login.png"
                                    alt=" lets fill the registration form"
                                    width="400"
                                    height="500" />
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input name="email" type="email" placeholder="email"
                                            id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">password</label>
                                        <input name="password" type="password" placeholder="password"
                                            id="password" required autoComplete="off" value={user.password} onChange={handleInput} />
                                    </div>
                                    <br/>
                                    <button type="submit" className="btn btn-submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}