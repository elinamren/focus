const ToDo = () => {
  const items = ["Make to-do list", "add checkmark", "add delete button"];

  return (
    <div className="todo-container">
      <h2>Todays Focus</h2>
      <input type="text" />
      <button>Add</button>
      <ul>
        {items.map((item) => (
          <li>
            <input type="checkbox" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
