import { createServer } from 'http';
import { parse } from 'url';

class Todo {
  constructor(id, title, description, isCompleted) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
  }
}

const todo_titles = [
  "Buy groceries", "Water the plants", "Take a walk", "Prepare dinner",
  "Read a book", "Organize desk", "Workout", "Clean the kitchen",
  "Call a friend", "Plan weekend outing", "Feed the pets", "Meditate",
  "Write in journal", "Laundry", "Respond to emails",
  "Pay bills", "Tidy up living room", "Cook breakfast", "Check on garden",
  "Schedule doctor appointment", "Order supplies", "Do a quick workout",
  "Sort mail", "Plan meals for the week", "Vacuum the house",
  "Review budget", "Take out the trash", "Prepare lunch", "Walk the dog",
];

const todo_descriptions = [
  "Make sure to get everything on the list and check for discounts.",
  "Water all indoor plants and check if they need repotting.",
  "Go for a 30-minute walk in the neighborhood or nearby park.",
  "Prepare a healthy dinner using the ingredients in the fridge.",
  "Read at least one chapter of the book currently in progress.",
  "Organize and declutter the desk to make it work-friendly.",
  "Complete a quick 15-minute workout to stay active and refreshed.",
  "Clean the kitchen countertops and put away dishes.",
  "Catch up with a friend on the phone; it's been a while.",
  "Look up places for a weekend trip and draft a rough itinerary.",
  "Ensure the pets have enough food and water for the day.",
  "Set aside 10 minutes for quiet meditation and relaxation.",
  "Write down reflections and goals for the day in the journal.",
  "Sort and start a load of laundry, focusing on whites first.",
  "Check and respond to any urgent emails in the inbox.",
  "Review monthly expenses and pay any due bills on time.",
  "Straighten up the living room, fold blankets, and dust surfaces.",
  "Cook a balanced breakfast to kickstart the day with energy.",
  "Check the garden for weeds and look for any new blooms.",
  "Schedule the annual check-up and confirm the appointment date.",
  "Order household items needed for the week, like detergent.",
  "Do a quick home workout; focus on stretching and flexibility.",
  "Sort through the mail and discard any junk or old notices.",
  "Plan the meals for the week, focusing on healthy options.",
  "Vacuum the entire house to keep it clean and dust-free.",
  "Review last month's expenses to stay on budget.",
  "Take out the trash and recycling before collection day.",
  "Prepare a quick lunch, using leftovers if possible.",
  "Take the dog out for a walk around the block.",
];

const NUM_TODOS = todo_titles.length;
let todos = [];

const seedTodos = () => {
  for (let i = 0; i < NUM_TODOS; i++) {
    todos.push(new Todo(i + 1, todo_titles[i], todo_descriptions[i], Math.random() < 0.5));
  }
};

const delay = async (ms) => new Promise(resolve => setTimeout(resolve, ms))
const slowDown = 2000

const handleHomeRoute = (_req, res) => {
  const todoLinks = todos.map(todo => `<li><a href="/todo?id=${todo.id}">${todo.title}</a></li>`).join('');
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`
    <h1>Todo List</h1>
    <h2>Endpoints</h2>
    <ul>
      <li><a href="/">/</a> - Home page</li>
      <br/>
      <li><a href="/todos">/todos</a> - Get all todos</li>
      <br/>
      <li><a href="/todo?id=1">/todo?id=NUMBER</a> - Get a specific todo</li>
      <br/>
      <li><a href="/todos_info">/todos_info</a> - Get all todos ids and titles</li>
    </ul>
    <h2>Click on a todo to see details</h2>
    <ol>${todoLinks}</ol>
  `);
};

async function handleTodosRoute(_req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ todos }));
}

async function handleTodoIdRoute(_req, res, query) {
  await delay(slowDown);
  const id = parseInt(query.id);
  if (isNaN(id) || id < 1 || id > todos.length) {
    res.writeHead(400);
    res.end("Invalid 'id' parameter");
    return;
  }
  const todo = todos[id - 1];
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    title: todo.title, description: todo.description, isCompleted
      : todo.isCompleted
  }));
}

async function handleTodosInfoRoute(_req, res) {
  await delay(slowDown);
  const todoDetails = todos.map(({ id, title }) => ({ id, title }));
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(todoDetails));
}

const handleOptionsRequest = (res) => {
  res.writeHead(204);
  res.end();
};

async function handleNotFound(res) {
  await delay(slowDown)
  res.writeHead(404);
  res.end("Not Found");
};

seedTodos();

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    handleOptionsRequest(res);
    return;
  }

  const parsedUrl = parse(req.url, true);

  if (parsedUrl.pathname === "/") {
    handleHomeRoute(req, res);
  } else if (parsedUrl.pathname === "/todos") {
    handleTodosRoute(req, res);
  }
  else if (parsedUrl.pathname === "/todo") {
    handleTodoIdRoute(req, res, parsedUrl.query);
  } else if (parsedUrl.pathname === "/todos_info") {
    handleTodosInfoRoute(req, res);
  } else {
    handleNotFound(res);
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
