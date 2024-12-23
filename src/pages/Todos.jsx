import { useLoaderData, useNavigation } from "react-router";

function Todos() {
  
  const todos = useLoaderData();


  return (
    <div>
      <h2 className="text-3xl">Todos</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : todos.length === 0 ? (
        <div>Error: No Todos Found</div>
      ) : (
        todos.map((todo) => (
          <div key={todo.id}>
            <h3 className="text-2xl">{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Todos;
