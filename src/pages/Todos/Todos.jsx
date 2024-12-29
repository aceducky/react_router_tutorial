import { useLoaderData, Outlet, NavLink } from "react-router";

export function Todos() {
  const todos_info = useLoaderData();

  return (
    <div className="grid grid-cols-[min(200px,25%)_1fr] min-h-screen">
      <nav className="border-r grid space-y-1">
        {todos_info.length === 0 ? (
          <div>No Todos Found</div>
        ) : (
          todos_info.map((todo) => (
            <NavLink
              key={todo.id}
              to={`/todos/${todo.id}`}
              className={({ isActive }) =>
                `w-full ${
                  isActive ? "text-cyan-500 font-bold" : "hover:font-semibold"
                }`
              }
            >
              {todo.title}
            </NavLink>
          ))
        )}
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}
