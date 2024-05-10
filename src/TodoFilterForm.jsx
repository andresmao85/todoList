import React, { useState } from "react"

export function TodoFilterForm({
  name,
  setName,
  hideCompleted,
  setHideCompleted,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleAccordion = () => {
    setIsExpanded((prevState) => !prevState)
  }

  return (
    <div className="accordion">
      <div
        className={`accordion-header ${isExpanded ? "active" : ""}`}
        onClick={toggleAccordion}
      >
        <div className="accordion-title">Filter To-Do</div>
        <div className="arrow-icon">{isExpanded ? "▲" : "▼"}</div>
      </div>
      <div className={`accordion-content ${isExpanded ? "open" : ""}`}>
        <div className="filter-form">
          <div className="filter-form-group">
            <label htmlFor="filter-name">Filter by:</label>
            <input
              type="text"
              id="filter-name"
              name="filter-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label className="hide-completed">
            <input
              type="checkbox"
              checked={hideCompleted}
              onChange={(e) => setHideCompleted(e.target.checked)}
              id="hide-completed-checkbox"
            />
            Hide Completed
          </label>
        </div>
      </div>
    </div>
  )
}
