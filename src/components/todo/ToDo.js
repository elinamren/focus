import { useEffect, useState } from "react";

const ToDo = () => {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  function handleNewItem(event) {
    setInputText(event.target.value);
  }
  useEffect(() => {
    getLocalItems();
  }, []);

  function handleAddItem(event) {
    event.preventDefault();
    setTodos((prevValue) => {
      return [...prevValue, inputText];
    });
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

  function handleDoneItem() {
    console.log("Done");
  }

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
              <button className="todo-item-button" onClick={handleDoneItem}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkO7k537XoHmEs0bFxPfElNxpMcOWOLFJo15I9xkhYP0bMw87wHi2ye4pDJilxd1zwyTo&usqp=CAU"
                  alt="complete item"
                  width="20"
                />
              </button>
              <button className="todo-item-button" onClick={handleDeleteItem}>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAAD8/PxEREQMDAyrq6tVVVXc3NyRkZHFxcXm5uYqKiqnp6dubm65ubm/v7/V1dVhYWHx8fGampo3NzeLi4tJSUmysrJ9fX08PDwuLi6hoaEfHx/39/fOzs5oaGh3d3dWVlYVFRUcHBxzc3OOGi1qAAAEPUlEQVR4nO3dWXeiQBAFYBZXXFAEJRjikvz/3zgkTh7GEqzGi9049z7l5BBOfQfspjognt9NBu9FGm5P68Uiz/Msyyabv9kPq1x+nFS/z/Ovxfo0Ct+K944q8brY6XaySkrPMGW0W3Sh7ECYjwNT3W+SXQovBy7Mkra8S6YzcEFgYbh6zFelzLAlYYX5w77vfAyQNUGFGQToeeNPYFFI4QQE9LwISAQKDzBgdaLiysIJiwcH0X+zh9WFE06RQM8LUXXBhGss0FuhCoMJx2ChdwAVhhKO0EBvCqoMJVzChQHokwgSzoxbifuZY0oDCRd4oDfGlAYS4k/SKgWkNJAwulHgND+Fb2mazmTSS8Iw3I7W68Mx29/qSXJIaRhhKnveaGu2i40UDiG1YYQ3pvu16T7kUcRM+hihbJsiwD4SSG0Y4V5UtzTex0zso4R0whjhTlTXojeQZzpk6Q0jlJNFi3FQdl+QRamujqHhSPodOdScEbXdFRaj9eKYZ9lmspl/Z/iT3U+WP4njWE6H06VpdvIYxoo/Oz4o3H50cMGJTXTH2CzMWq9ePzPN82ajELP82X2ipkG3SZg6f4b+pmn2bRLGtgvXp6FbbhB20dV2lYYLjAbh0XbZBmnolhuEchp3N0F9tyyFefST8bhHJ2k1nI4vZcuZQwpx/1+xkfLlhbKnpLBvoZBC90Mhhe6HQgrdD4X/izDob1TC2TbscxTCVwuF/Q+F/Q+F/Y9GOHA3ICH85lhcFhRSSKH1UEghhfZDIYUU2g+FFFJoPxRSSKH9UEghhfbzNGG5uor4k+B6i5V4Viq5u4VFofj+g/P1FvKZUvHMqHiiYOuyUDwQKoXing/xDQOKb6KgkEIKKaSQQgoppJBCCimkkEIKKaSQQgoppJBCCimkkEIKKaSQQgoppJBCCimkkEIKKaSQQgoppJBCCimkkEIKKaSQQgoppJBCCt0THl5eqHivMoUUUkghhRRSSOElHy8vlK91p5BCCimkkEIKHRKOKOz9VRuFFFJIIYWPC08Y4dRdIegYxs4Kgy2FFLYWPum7oJ8nTOKriMGpvN4iFquw0fUW98fw5wltBSVc2obUJnijkML/RbizDalNkL66sCwo1AmHtiG1Kd8xwrltSG1Qwr1tSG3KM0YougBnkiiq1whFF+BMZMfSTniwDanNCiQ8l7YldREtZUuhYrHNUhTNk074ZVtSE83HUCf0HT1NM5zQzRmx/MQJi8S25lY044xW6G9sa24kUVyy6YUDBw/iRFe6UujgrK+Z7U2EzrVQge4cNRAq7sh4ahRPPJkKZ4pXSj4vqqnQUOgXDhE3+rINhP7AmVeu5gZVmwj9gRsrp4nimbyWwuoa3IEr1Fg7irYS+mfbs0akuB3xIaHvpzuL1zcrk09gW2E1b+RTK8jxXHHrBURY5Tw6Zpv58GnZTPKDYn37Vv4AXYOt+uex56UAAAAASUVORK5CYII="
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
