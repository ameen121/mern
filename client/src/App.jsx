import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import {Home} from './pages/Home'
import {About} from './pages/About'
import { Contact } from './pages/Contact'
import { Service } from './pages/Service'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Navbar } from './Component/Navbar'   
import { Error } from './pages/Error'
import { Footer } from './Component/Footer/Footer'
import {Logout} from "./pages/logout.jsx";
import {AdminLayout} from "./Component/layouts/Admin-Layou.jsx";
import {AdminUser} from "./pages/Admin-User.jsx";
import {AdminContact} from "./pages/Admin-Contact.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/services" element={<Service/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="*" element={<Error/>}/>

          <Route path="/admin" element={ <AdminLayout/> }>
            <Route path="users" element={<AdminUser/>} />
            <Route path="contacts" element={<AdminContact/>} />
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}
export default App