import React, { memo, useContext, useState } from "react"
import { TodoContext } from "./App"
import { TodoModal } from "./TodoModal"

const TodoItem = memo(({ id, name, completed }) => {
  const { toggleTodo, deleteTodo } = useContext(TodoContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleCheckboxChange = () => {
    toggleTodo(id, !completed)
  }

  return (
    <>
      <li className="list-item">
        <label className="list-item-label">
          <input
            checked={completed}
            type="checkbox"
            data-list-item-checkbox
            name="list-item-checkbox"
            onChange={handleCheckboxChange}
          />
          <span
            data-list-item-text
            style={{ textDecoration: completed ? "line-through" : "none" }}
          >
            {name}
          </span>
        </label>
        <div className="inline-container">
          <button className="btn" onClick={openModal} data-button-edit>
            Edit
          </button>
          <button
            className="btn"
            onClick={() => deleteTodo(id)}
            data-button-delete
          >
            Delete
          </button>
        </div>
      </li>
      <TodoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        todo={{ id, name }}
      />
    </>
  )
})

export { TodoItem }
