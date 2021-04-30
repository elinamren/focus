import { useEffect, useState } from "react";

const ToDo = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getLocalItems();
  }, []);

  function handleNewItem(event) {
    setInputText(event.target.value);
  }

  function handleAddItem(event) {
    event.preventDefault();
    setTodos([...todos, inputText]);
    setInputText("");
  }

  const saveLocalItems = () => {
    localStorage.setItem("FocusItemsLocalStorage", JSON.stringify(todos));
  };

  const getLocalItems = () => {
    if (localStorage.getItem("FocusItemsLocalStorage") === null) {
      localStorage.setItem("FocusItemsLocalStorage", JSON.stringify([]));
    } else {
      let itemsFromLocal = JSON.parse(
        localStorage.getItem("FocusItemsLocalStorage")
      );
      setTodos(itemsFromLocal);
    }
  };

  useEffect(() => {
    saveLocalItems();
  }, [todos]);

  function handleDeleteItem(event) {
    const itemTarget = event.target.parentNode.parentNode.id;
    setTodos((prevValue) => {
      return prevValue.filter((e) => e !== itemTarget);
    });
  }
  return (
    <div className="todo-container">
      <h2>Todays Focus</h2>
      <form className="todo-form">
        <input
          id="todo-input"
          value={inputText}
          type="text"
          onChange={handleNewItem}
        />
        <button className="todo-add-button" onClick={handleAddItem}>
          <img
            src="https://www.nicepng.com/png/full/251-2519428_0-add-icon-white-png.png"
            alt="add item"
            width="20"
          />
        </button>
      </form>

      <ul className="todo-list">
        {todos.map((item) => (
          <li key={item} id={item} className="todo-item">
            {item}
            <div className="todo-button-container">
              <button className="todo-item-button" onClick={handleDeleteItem}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkO7k537XoHmEs0bFxPfElNxpMcOWOLFJo15I9xkhYP0bMw87wHi2ye4pDJilxd1zwyTo&usqp=CAU"
                  alt="delete item"
                  width="20"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
