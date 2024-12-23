import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { createBrowserRouter } from "react-router";
import Todos from "./pages/Todos";
import { TODO_API } from "./API_STORE";

export const router = createBrowserRouter([
  // These routes are also used in Navbar.jsx for routing
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/movie",
        element: <Movie />,
      },
      {
        path: "/todos",
        loader: async () => {
          const response = await fetch(`${TODO_API}/todos`);
          if (!response.ok) {
            return [];
          }
          const data = await response.json();
          return data.todos;
        },
        element: <Todos />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
