import { Route, Routes, BrowserRouter } from "react-router-dom";

// LOCALE IMPORTS
import { Detail, Category, Search } from "./views/core/CoreIndex";
import Index from "./views/core/Index";
import { About, Contact } from "./views/pages/index";
import {
  CreatePassword,
  ForgotPassword,
  Login,
  Logout,
  Register,
} from "./views/auth/index";
import {
  Dashboard,
  Posts,
  AddPost,
  EditPost,
  Comments,
  Notifications,
  Profile,
} from "./views/dashboard/index";
import MainWrapper from "../src/layouts/MainWrapper";

import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";
import { useAuthStore } from "./store/auth";

const App = () => {
  const loggedIn = useAuthStore((state) => state.isLoggedIn);
  return (
    <>
      <BrowserRouter>
        <MainWrapper>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:slug/" element={<PrivateRoute><Detail/></PrivateRoute> } />
            <Route path="/category/" element={<Category />} />
            <Route path="/search/" element={<Search />} />

            {/* Authentication */}
            <Route
              path="/register/"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/login/"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password/"
              element={
                <PrivateRoute>
                  <ForgotPassword />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-password/"
              element={
                <PrivateRoute>
                  <CreatePassword />
                </PrivateRoute>
              }
            />

            {/* Dashboard */}
            <Route
              path="/dashboard/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/posts/"
              element={
                <PrivateRoute>
                  <Posts />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-post/"
              element={
                <PrivateRoute>
                  <AddPost />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-post/:id/"
              element={
                <PrivateRoute>
                  <EditPost />
                </PrivateRoute>
              }
            />
            <Route
              path="/comments/"
              element={
                <PrivateRoute>
                  <Comments />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications/"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* Pages */}
            <Route path="/about/" element={<About />} />
            <Route path="/contact/" element={<Contact />} />
          </Routes>
        </MainWrapper>
      </BrowserRouter>
    </>
  );
};

export default App;
