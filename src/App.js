import './App.css';
import { useEffect, useState } from "react";
import List from "./components/List";

function App() {
  const [list, updateList] = useState([]);
  const [item, setItem] = useState("");

  const handleAddApi = async (id) => {
    const url = `http://localhost:8080/addTask`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'CONTENT-TYPE': 'application/json' },
      body: JSON.stringify({ id: id, task: item })
    });
  }

  const handleListingTasks = async () => {
    const response = await fetch(`http://localhost:8080/list`);
    const newList = await response.json();
    return newList;
  }

  const handleAdd = async () => {
    if (item != "") {
      const id = new Date().getTime().toString();
      handleAddApi(id);
      updateList((prevList) => {
        return [...prevList, { id: id, task: item }];
      })
    }
    setItem("");
  }

  const handleChange = (e) => {
    setItem(e.target.value);
  }

  const handleDelete = async (id) => {
    console.log(id);
    const url = `http://localhost:8080/deletelist/${id}`;
    const res = await fetch(url, {
      method: 'DELETE',
    });
    const newList = await handleListingTasks();
    updateList(newList);
  }

  const handleUpdate = async (id, newContent) => {
    const url = `http://localhost:8080/updatelist`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'CONTENT-TYPE': 'application/json' },
      body: JSON.stringify({ id: id, task: newContent })
    });

    const newList = await handleListingTasks();
    updateList(newList);
  }

  return (
    <div className="App">
      <h1 className="heading">My ToDo List</h1>
      <div className="inpt-form">
        <div className='todoText'>
          <input type="text" value={item} onChange={handleChange} className="inpt" />
          <button onClick={handleAdd} className="btn">Add</button>
        </div>
        <List list={list} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      </div>
    </div>
  );
}

export default App;
