// Router.....................
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components ................
import HeaderContent from "../components/HeaderContent/HeaderContent"
import Footer from "../components/Footer/Footer"

// Pages....................
import LandingPage from '../pages/LandingPage/LandingPage'
import Homepage from '../pages/Homepage/Homepage'
import PostDetail from '../pages/PostDetail'
import Muser from '../pages/Muser/Muser'
import Post from '../pages/MuserPosts'
import CreatePost from '../pages/Create Post/CreatePost'
import DashBoard from '../pages/DashBoard'
import DeletePosts from '../pages/DeletePosts'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Profile from '../pages/Profile/Profile'
import Messages from '../pages/DirectMessaging/DirectMessaging'
import ChatList from '../pages/ChatList/ChatList'
import AdminPage from '../pages/AdminPage/AdminPage'
import AdminReports from '../pages/AdminReports/AdminReports'

export default function Router() {
  return (
    <>
    <BrowserRouter>
      <HeaderContent />
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/muser/:muserId" element={<Muser />} />
            <Route path="/posts/user/:id" element={<Post />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/myposts/:id" element={<DashBoard />} />
            <Route path="/posts/:id/delete" element={<DeletePosts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile/>} />
            <Route path="/chat/:userId" element={<Messages />} />
            <Route path="/chats" element={<ChatList />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/adminreports" element={<AdminReports />} />
            <Route path="*" element={<ErrorPage />} />
         </Routes>
        {/* <Footer /> */}
    </BrowserRouter>
    </>
  )
}
