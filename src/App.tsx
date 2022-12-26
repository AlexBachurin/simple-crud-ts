import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { IAlert, IListItem } from "./models";

//local storage functionality
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list") || "");
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<IListItem[]>(getLocalStorage());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // find editing item
  const [editId, setEditId] = useState<string | null>(null);
  // displaying alert
  const [alert, setAlert] = useState<IAlert>({
    show: false,
    msg: "",
    type: "",
  });
  // ADD ITEM
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      console.log("add some value");
      setAlert({
        show: true,
        msg: "Type something in input",
        type: "alert alert-danger",
      });
    }
    // edit functionality here
    else if (isEditing && name) {
      const newList = list.map((item) => {
        // find editing item by id
        if (item.id === editId) {
          return { ...item, title: name };
        }
        return item;
      });
      setList(newList);
      setIsEditing(false);
      setEditId(null);
      setName("");
      setAlert({
        show: true,
        msg: "Edited successfully",
        type: "alert alert-success",
      });
    }
    // add to list
    else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setAlert({
        show: true,
        msg: "Added to list",
        type: "alert alert-success",
      });
      setName("");
    }
  };

  //Change handler
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setName(value);
  };

  // clear All Items
  const clearAll = () => {
    setList([]);
    setAlert({
      show: true,
      msg: "Removed all items from list",
      type: "alert alert-danger",
    });
  };
  // REMOVE ITEM
  const removeItem = (id: string) => {
    const filteredList = list.filter((item) => item.id !== id);
    setList(filteredList);
    setAlert({
      show: true,
      msg: "removed from list",
      type: "alert alert-danger",
    });
  };
  // REMOVE ALERT
  useEffect(() => {
    const timerId = setTimeout(() => {
      setAlert({ show: false, msg: "", type: "" });
    }, 3000);
    return () => clearTimeout(timerId);
  }, [alert]);

  // save list to localstorage every time lsit changes
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {/* display alert here */}
        {alert.show ? <Alert {...alert} /> : null}
        <h3>Simple Crud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. milk"
            value={name}
            onChange={handleChange}
          />
          <button type="submit" className="submit-btn">
            {/* if editing display edit else display submit */}
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 ? (
        <div className="grocery-container">
          <List
            items={list}
            removeItem={removeItem}
            setIsEditing={setIsEditing}
            setEditId={setEditId}
            setName={setName}
            isEditing={isEditing}
          />
          <button disabled={isEditing} onClick={clearAll} className="clear-btn">
            Clear All
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default App;
