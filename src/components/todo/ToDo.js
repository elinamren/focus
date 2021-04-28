import { useEffect, useState } from "react";

const ToDo = () => {
  const [item, setItem] = useState("");
  const [itemArray, setItemArray] = useState([]);
  function handleNewItem(event) {
    setItem(event.target.value);
  }
  useEffect(() => {
    getLocalItems();
  }, []);

  function handleAddItem(event) {
    event.preventDefault();
    setItemArray((prevValue) => {
      return [...prevValue, item];
    });
    setItem("");
  }

  const saveLocalItems = () => {
    localStorage.setItem("FocusItemsLocalStorage", JSON.stringify(itemArray));
  };

  const getLocalItems = () => {
    if (localStorage.getItem("FocusItemsLocalStorage") === null) {
      localStorage.setItem("FocusItemsLocalStorage", JSON.stringify([]));
    } else {
      let itemsFromLocal = JSON.parse(
        localStorage.getItem("FocusItemsLocalStorage")
      );
      setItemArray(itemsFromLocal);
    }
  };

  useEffect(() => {
    saveLocalItems();
  }, [itemArray]);

  function handleDoneItem() {
    console.log("Done");
  }

  function handleDeleteItem(event) {
    const itemTarget = event.target.parentNode.id;
    setItemArray((prevValue) => {
      return prevValue.filter((e) => e !== itemTarget);
    });
  }
  return (
    <div className="todo-container">
      <h2>Todays Focus</h2>
      <form className="todo-form">
        <input
          id="todo-input"
          value={item}
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
        {itemArray.map((item) => (
          <li key={item} id={item}>
            {item}
            <button onClick={handleDoneItem}>Done</button>
            <button onClick={handleDeleteItem}>Trash</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
