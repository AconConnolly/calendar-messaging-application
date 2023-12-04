import React, { useEffect } from "react";
import SignIn from "./Components/SignIn";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Calendar from "./Components/Pages/CalendarComponents/Calendar";
import Register from "./Components/Register";
import Profile from "./Components/Pages/UserProfile/Profile";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import ChatPage from "./Components/Pages/ChatPage/ChatPage";
import ForgotPassword from "./Components/Pages/ForgotPassword";
// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>

function App(props) {
  const navigate = useNavigate();
  const location = useLocation();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    const auth = getAuth();

    // Check if a user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, allow navigation
        // You can customize this logic based on your requirements
      } else {
        // User is not authenticated, navigate to the welcome page or sign-in
        if (location.pathname !== "/" && location.pathname !== "/signin" && location.pathname !== "/reg" && location.pathname !== "/reset") {
          navigate("/");
        }
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  if (isLoading) {
    return <div>...loading</div>;
  } else {
    return (
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/calender" element={<Calendar />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset" element={<ForgotPassword />} />
      </Routes>
    );
  }
}

export default App;
