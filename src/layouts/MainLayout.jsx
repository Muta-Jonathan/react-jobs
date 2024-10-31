import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ChatbotIcon from "../components/ChatbotIcon"

const MainLayout = () => {
  return (
   <>
   <Navbar />
   <Outlet />
   <ToastContainer />
   <ChatbotIcon />
   </>
  )
}

export default MainLayout