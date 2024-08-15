import {NavLink,Outlet} from "react-router-dom";
import {FaHome, FaRegListAlt, FaUsers,} from "react-icons/fa";
import {FaMessage} from "react-icons/fa6";

export const AdminLayout = () => {
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
                               <NavLink to="/admin/users"><FaMessage />Contact</NavLink>
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