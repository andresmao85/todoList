import React, { useContext, useRef } from "react"
import { TodoContext } from "./App"

export function TodoModal({ isOpen, onClose, todo }) {
  const nameRef = useRef()
  const { updateTodoName } = useContext(TodoContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (nameRef.current.value === "") return

    updateTodoName(todo.id, nameRef.current.value)
    onClose()
  }

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit} className="edit-form">
          <input
            type="text"
            autoFocus
            defaultValue={todo.name}
            ref={nameRef}
            maxLength="45"
          />
          <button className="btn">Save</button>
        </form>
      </div>
    </div>
  )
}
