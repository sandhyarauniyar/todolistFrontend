import edit from "../edit.png";
import delete1 from "../delete1.png";
import "./List.css";
import { useState } from "react";

const List = (props) => {
    const list = props.list;
    const [editId, setEditId] = useState(null);
    const [editContent, setEditContent] = useState("");

    const handleDelete = (id) => {
        console.log("deleting", id);
        props.handleDelete(id);
    }

    const handleEdit = (id) => {
        console.log("editing", id);
        setEditId(id);
    }

    const handleContentEditing = (e) => {
        setEditContent(e.target.value);
    }

    const handleUpdate = (id, newContent) => {
        props.handleUpdate(id, newContent);
        setEditId(null);
        setEditContent("");
    }
    return (
        <ul className="todoList">
            {
                list !== [] && list.map((item) => {
                    return (
                        <li className="list-1">
                            <div className="item" id={item.id}>
                                {editId !== item.id && <div className="content">{item.task}</div>}
                                {editId === item.id && <div className="update-inpt"><input className="edit-inpt" type="text" value={editContent || item.task} onChange={handleContentEditing} /></div>}
                                <div className="icons">
                                    <div className="editIcon" onClick={() => handleEdit(item.id)}><img src={edit} /></div>
                                    <div className="deleteIcon" onClick={() => handleDelete(item.id)}><img src={delete1} /></div>
                                </div>
                                {editId === item.id && <div className="update-btn"><button className="edit-btn" onClick={() => handleUpdate(item.id, editContent)}>UPDATE</button></div>}
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default List;