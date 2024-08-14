import {createContext, useContext, useEffect, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState("");

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem('token', serverToken);
    setToken(serverToken);
  };
  const userAuthentication = async () => {
    try{
      const response = await fetch("http://localhost:8000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        //console.log(data.userData);
        setUser(data.userData);
      }
    } catch (e) {
      console.log("error while fetching user data");
    }
  };

  // get services from database
const getservices = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/data/service", {
      method: "GET",
    });
    if(response.ok) {
      const data = await response.json();
      //console.log("servicess",data.message);
      setServices(data.message);
    }
    
  } catch (error) {
    console.log(`error while fetching services ${error}`);
  }
}



  useEffect(() => {
    getservices();
    userAuthentication();
  }, [token]);

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem('token');
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser,user,services }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return authContextValue;
};
