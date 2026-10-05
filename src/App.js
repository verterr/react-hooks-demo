import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Массив всех задач
  // const [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Текст в поле ввода
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем: не пустая ли строка
    if (inputValue.trim() === '') return;

    // Создаём объект новой задачи
    const newTodo = {
      id: Date.now(),          // уникальный id
      text: inputValue.trim(),
      completed: false
    };

    // Добавляем в массив (создаём НОВЫЙ массив)
    setTodos([...todos, newTodo]);

    // Очищаем поле ввода
    setInputValue('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // меняем только нужный
          : todo                                     // остальные без изменений
      )
    );
  };

  const deleteTodo = (id) => { setTodos(todos.filter((todo) => todo.id !== id)); };

  return (
    <div className="App">
      <h1>TodoList</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Добавить задачу..."
        />
        <button type="submit">Добавить</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}
          >
            <span onClick={() => toggleTodo(todo.id)} style={{ cursor: 'pointer' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
          </li>

        ))}
      </ul>

    </div>
  );

}

export default App;
