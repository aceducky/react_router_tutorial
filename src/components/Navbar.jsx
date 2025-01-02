import { NavLink } from "react-router";
import { router } from "../routes";
import { useMemo } from "react";

function Navbar() {
  // Only gets the first level of routes
  const routes = useMemo(() => router.routes[0].children, []);

  return (
    <nav className="grid grid-flow-col grid-rows-1 justify-around items-center border-b border-black">
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={({ isActive, isPending }) =>
            `p-4 grid align-middle justify-evenly h-full min-w-20 ${
              isActive ? "text-cyan-500 font-bold" : "hover:font-semibold"
            } ${isPending && "below-loading-bar"}`
          }
        >
          {route.path === "/" ? "HOME" : route.path.slice(1).toUpperCase()}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;
