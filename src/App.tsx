import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PersistsLogin from "./lib/PersistLogin";
import AuthLayout from "./AuthLayout";
import SharedPost from "./pages/SharedPost";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route element={<PersistsLogin />}>
          <Route index element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="sharedpost/:id" element={<SharedPost />} />
        </Route>
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};
export default App;
