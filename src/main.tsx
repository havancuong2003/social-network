import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Home, Login, PostDetail, SignUp, UserProfile } from "./pages";
import { Layout } from "./layout";
import TextSubmitComponent from "./pages/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        {" "}
        <Home />
      </Layout>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <Layout>
        <UserProfile />
      </Layout>
    ),
  },
  {
    path: "/test",
    element: (
      <Layout>
        <TextSubmitComponent />
      </Layout>
    ),
  },
  {
    path: "/post/:id",
    element: <PostDetail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
