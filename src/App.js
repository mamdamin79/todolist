import React from 'react';

const getLocalStorageData = () =>{
  if (localStorage.getItem("todos")) {
    return JSON.parse(localStorage.getItem("todos"))
  }
  else{
    return [];
  }
}

export default function App() {
  const [todos, updateTodos] = React.useState(getLocalStorageData());
  const [count, setCount] = React.useState(todos.length);
  const [value, setValue] = React.useState("")
  

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos])

  /** Problem 1: why page gets refreshed? */
  /** Problem 2: why count gets wrong updates? */
  function addTodo() {
    updateTodos([...todos,{title : value , id: Math.random() * 100}]);
    setCount((prev)=> prev + 1);
    setValue("")
  }

  /** Problem 3: why todos don't get deleted? */
  const removeTodo = (id) => {
    const newTodos = todos.filter(todo=> todo.id !== id);
    updateTodos(newTodos);
    setCount((prev)=> prev - 1);

  }

  /** Bonus Problem: Items clear on page reload. */

  return (
    <main>
      <form  onSubmit={(e)=>e.preventDefault()}>
        <input value={value} onChange={(e)=>setValue(e.target.value)} type="text" name="todo" />
        <button type="submit" onClick={addTodo}>
          add
        </button>
        <span style={{ marginInline: '1em' }}>({count})</span>
      </form>

      <section>
        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              style={{ cursor: 'pointer' }}
              onClick={() => removeTodo(todo.id)}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}