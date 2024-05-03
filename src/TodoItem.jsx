import React, { useContext, useState } from "react"
import { TodoContext } from "./App"
import { TodoModal } from "./TodoModal"

export function TodoItem({ id, name, completed }) {
  const { toggleTodo, deleteTodo } = useContext(TodoContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleCheckboxChange = () => {
    toggleTodo(id, !completed)
  }

  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          checked={completed}
          type="checkbox"
          data-list-item-checkbox
          onChange={handleCheckboxChange}
        />
        <span
          data-list-item-text
          style={{ textDecoration: completed ? "line-through" : "none" }}
        >
          {name}
        </span>
      </label>
      <button data-button-edit onClick={openModal}>
        Edit
      </button>
      <button onClick={() => deleteTodo(id)} data-button-delete>
        Delete
      </button>
      <TodoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        todo={{ id, name }}
      />
    </li>
  )
}
