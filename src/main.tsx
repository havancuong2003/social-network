import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Home, Login, PostDetail, SignUp, UserProfile } from "./pages";
import { Layout } from "./layout";
import TextSubmitComponent from "./pages/test";
import FileUpload from "./test-upload";
import { PostProvider } from "./contexts/post-context";
import { UserMediaContextProvider, UserProvider } from "./contexts";
import { UserPostProvider } from "./contexts/user-post.context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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

  {
    path: "/upload",
    element: <FileUpload />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <UserPostProvider>
        <UserMediaContextProvider>
          <PostProvider>
            <RouterProvider router={router} />
          </PostProvider>
        </UserMediaContextProvider>
      </UserPostProvider>
    </UserProvider>
  </React.StrictMode>
);
