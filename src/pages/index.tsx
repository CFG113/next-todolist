import TodoList from '../components/TodoList'; 

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Todo App</h1>
      {/* Render the TodoList component */}
      <TodoList />
    </div>
  );
}
