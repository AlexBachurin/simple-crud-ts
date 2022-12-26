import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IListItem } from "./models";

type ListProps = {
  items: IListItem[];
  removeItem: (id: string) => void;
  setIsEditing: (t: boolean) => void;
  setEditId: (id: string) => void;
  setName: (title: string) => void;
  isEditing: boolean;
};

const List: React.FC<ListProps> = ({
  items,
  removeItem,
  setIsEditing,
  setEditId,
  setName,
  isEditing,
}) => {
  const handleEdit = (id: string) => {
    setIsEditing(true);
    setEditId(id);
    // find item by id and set title of this item in input
    const item = items.find((item) => item.id === id);
    if (item) {
      setName(item.title);
    }
  };

  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                onClick={() => handleEdit(id)}
                type="button"
                className="edit-btn"
              >
                <FaEdit />
              </button>
              <button
                // disable on edit
                disabled={isEditing}
                onClick={() => removeItem(id)}
                className="delete-btn"
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
