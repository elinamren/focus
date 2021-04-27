import { useState } from "react";

const ToDo = () => {
  const [item, setItem] = useState("");
  const [itemLabel, setItemLabel] = useState([]);
  const [itemStatusDone, setItemStatusDone] = useState(false);

  function handleNewItem(event) {
    setItem(event.target.value);
  }

  function handleAddItem(event) {
    event.preventDefault();
    setItemLabel((prevValue) => {
      return [...prevValue, item];
    });
  }

  function handleDoneItem() {
    setItemStatusDone(true);
    console.log("Done", itemStatusDone);
  }

  function handleDeleteItem(event) {
    console.log(event.target.parentNode.id);
    const itemTarget = event.target.parentNode.id;
    setItemLabel((prevValue) => {
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
        {itemLabel.map((item) => (
          <li
            key={item}
            id={item}
            style={
              itemStatusDone
                ? { textDecoration: "line-through", color: "gray" }
                : { textDecoration: "none", color: "black" }
            }
          >
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
