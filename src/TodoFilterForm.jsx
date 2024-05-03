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
        <span>Filter To-Do</span>
        <div className="arrow-icon">{isExpanded ? "-" : "+"}</div>
      </div>
      <div className={`accordion-content ${isExpanded ? "open" : ""}`}>
        <div className="filter-form">
          <div className="filter-form-group">
            <label htmlFor="name">Filter by:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label>
            <input
              type="checkbox"
              checked={hideCompleted}
              onChange={(e) => setHideCompleted(e.target.checked)}
            />
            Hide Completed
          </label>
        </div>
      </div>
    </div>
  )
}
