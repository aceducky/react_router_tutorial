import { useLoaderData, Outlet, NavLink } from "react-router";

export function Todos() {
  const todos_info = useLoaderData();

  return (
    <div className="grid grid-cols-[min(200px,25%)_1fr] min-h-screen ">
      <nav className="border-r border-white/90 grid overflow-y-scroll overscroll-y-none max-h-screen pr-4 divide-y-2">
        {todos_info.length === 0 ? (
          <div>No Todos Found</div>
        ) : (
          todos_info.map((todo) => (
            <NavLink
              key={todo.id}
              to={`/todos/${todo.id}`}
              className={({ isActive }) =>
                `w-full py-5 ${
                  isActive ? "text-cyan-500 font-bold" : "hover:font-semibold"
                }`
              }
            >
              {todo.title}
            </NavLink>
          ))
        )}
      </nav>
      <main className="px-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
