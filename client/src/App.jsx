import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import Home from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import AddNewPost from "./Pages/AddNewPost"
import ErrorPage from "./Pages/ErrorPage"
import ProfilePage from "./Pages/ProfilePage"
import NotificationsPage from "./Pages/NotificationsPage"
import PostPage from "./Pages/PostPage"
import BidPage from "./Pages/BidPage"
import SearchPage from "./Pages/SearchPage"
import ReviewPage from "./Pages/ReviewPage"
import FollowedPage from "./Pages/FollowedPage"
import EditProfilePage from "./Pages/EditProfilePage"
import AdminPage from "./Pages/AdminPage"
import AdminCalendar from "./Pages/AdminCalendar"
import PaymentSuccess from "./Components/Posts/PaymentSuccess"
import { useMemo, React } from "react"
import { useSelector } from "react-redux"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { themeSettings } from "./Styles/Theme"
import './ScrollBar.css'

export default function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isAuth = Boolean(useSelector((state) => state.token));
  const admin_user = "6391dcf85370b46a9c87847f"
  const user_id = useSelector((state) => state.user?._id);
  let isAdmin;
  if (isAuth){
    isAdmin = user_id == admin_user
  }

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:_id"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/newpost"
              element={isAuth ? <AddNewPost /> : <Navigate to="/" />}
            />
            <Route
              path="/post/:_id"
              element={isAuth ? <PostPage /> : <Navigate to="/" />}
            />
            <Route
              path="/search/:_id"
              element={isAuth ? <SearchPage /> : <Navigate to="/" />}
            />
            <Route
              path="/post/:_id/bid"
              element={isAuth ? <BidPage /> : <Navigate to="/" />}
            />
            <Route
              path="/user/:_id/review"
              element={isAuth ? <ReviewPage /> : <Navigate to="/" />}
            />
            <Route
              path="/notifications"
              element={isAuth ? <NotificationsPage /> : <Navigate to="/" />}
            />
            <Route
              path="/followed/:id/:follwId"
              element={isAuth ? <FollowedPage /> : <Navigate to="/" />}
            />
            <Route
              path="/editProfile/:id"
              element={isAuth ? <EditProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/admin"
              element={isAuth && isAdmin ? <AdminPage /> :  <ErrorPage />}
            />
            {/* <Route path="/admin" element={<AdminPage/>}/> */}
            <Route
              path="/admin/calendar"
              element={isAuth && isAdmin ? <AdminCalendar /> :  <ErrorPage />}
            />
            <Route
              path="*"
              element={<ErrorPage />}
            />
             <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}
