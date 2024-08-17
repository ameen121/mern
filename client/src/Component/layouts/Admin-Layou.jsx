import {Navigate, NavLink,Outlet} from "react-router-dom";
import {FaHome, FaRegListAlt, FaUsers,} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

export const AdminLayout = () => {
    const {user,isloading} = useAuth();
    //console.log(user.isAdmin);
    if(isloading){
     return <h1>Loading...</h1>   
    }

    if(!user.isAdmin){
        toast.info("You are not authorized to access this page");
        return <Navigate to="/" />
    }
    return (
       <>
           <header>
               <div className="container">
                   <nav>
                       <ul>
                           <li>
                               <NavLink to="/admin/users"><FaUsers />Users</NavLink>
                           </li>
                           <li>
                               <NavLink to="/admin/contacts"><FaMessage />Contact</NavLink>
                           </li>
                           <li>
                               <NavLink to="/services"><FaRegListAlt />Services</NavLink>
                           </li>
                           <li>
                               <NavLink to="/"><FaHome />Home</NavLink>
                           </li>

                       </ul>
                   </nav>

               </div>
           </header>
           <Outlet />
       </>
    )
}