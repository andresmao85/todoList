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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="modal-form">
          <span className="close" onClick={onClose}>
            X
          </span>
          <textarea
            id="modal-input"
            autoFocus
            defaultValue={todo.name}
            ref={nameRef}
            maxLength="50"
            onKeyDown={handleKeyDown} // Add this line
          />
          <button className="btn" data-modal-save-button>
            Save
          </button>
        </form>
      </div>
    </div>
  )
}
