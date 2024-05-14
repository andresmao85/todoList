import { useEffect, useState, useReducer, createContext } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import { TodoFilterForm } from "./TodoFilterForm"
import ChatBot from "react-chatbotify"

const LOCAL_STORAGE_KEY = "TODO"
const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
}

const MyChatBot = () => {
  const [form, setForm] = useState({})
  const formStyle = {
    marginTop: 10,
    marginLeft: 20,
    border: "1px solid #491d8d",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
  }

  const flow = {
    start: {
      message: "Hello there! What is your name?",
      function: (params) => setForm({ ...form, name: params.userInput }),
      path: "ask_age",
    },
    ask_age: {
      message: (params) =>
        `Nice to meet you ${params.userInput}, what is your age?`,
      function: (params) => setForm({ ...form, age: params.userInput }),
      path: async (params) => {
        if (isNaN(Number(params.userInput))) {
          await params.injectMessage("Age needs to be a number!")
          return
        }
        return "ask_pet"
      },
    },
    ask_pet: {
      message: "Do you own any pets?",
      options: ["Yes", "No"],
      chatDisabled: true,
      function: (params) =>
        setForm({ ...form, pet_ownership: params.userInput }),
      path: "ask_choice",
    },
    ask_choice: {
      message:
        "Select at least 2 and at most 4 pets that you are comfortable to work with:",
      checkboxes: {
        items: ["Dog", "Cat", "Rabbit", "Hamster", "Bird"],
        min: 2,
        max: 4,
      },
      chatDisabled: true,
      function: (params) => setForm({ ...form, pet_choices: params.userInput }),
      path: "ask_work_days",
    },
    ask_work_days: {
      message: "How many days can you work per week?",
      function: (params) =>
        setForm({ ...form, num_work_days: params.userInput }),
      path: async (params) => {
        if (isNaN(Number(params.userInput))) {
          await params.injectMessage(
            "Number of work day(s) need to be a number!"
          )
          return
        }
        return "end"
      },
    },
    end: {
      message: "Thank you for your interest, we will get back to you shortly!",
      render: (
        <div style={formStyle}>
          <p>Name: {form.name}</p>
          <p>Age: {form.age}</p>
          <p>Pet Ownership: {form.pet_ownership}</p>
          <p>Pet Choices: {form.pet_choices}</p>
          <p>Num Work Days: {form.num_work_days}</p>
        </div>
      ),
      options: ["New Application"],
      chatDisabled: true,
      path: "start",
    },
  }

  return (
    <ChatBot
      options={{
        theme: {
          embedded: false,
          primaryColor: "#F4B41A",
          secondaryColor: "#333",
        },
        chatHistory: { storageKey: "example_advanced_form" },
        tooltip: { mode: "START", text: "Click to chat!" },
      }}
      flow={flow}
    />
  )
}

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ]
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, completed: payload.completed }
        }

        return todo
      })
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.id)
    case ACTIONS.UPDATE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, name: payload.name }
        }
        return todo
      })

    default:
      throw new Error(`No action found for ${type}`)
  }
}

export const TodoContext = createContext()

function App() {
  const [filterName, setFilterName] = useState("")
  const [hideCompletedFilter, setHideCompletedFilter] = useState(false)

  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value === null) return initialValue

    return JSON.parse(value)
  })

  const filteredTodos = todos.filter((todo) => {
    if (hideCompletedFilter && todo.completed) return false
    return todo.name.includes(filterName)
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } })
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } })
  }

  function updateTodoName(id, name) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id, name } })
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } })
  }

  return (
    <>
      <header>To-Do List</header>
      <TodoContext.Provider
        value={{
          todos: filteredTodos,
          addNewTodo,
          toggleTodo,
          updateTodoName,
          deleteTodo,
        }}
      >
        <NewTodoForm />
        <TodoFilterForm
          name={filterName}
          setName={setFilterName}
          hideCompleted={hideCompletedFilter}
          setHideCompleted={setHideCompletedFilter}
        />
        <TodoList />
      </TodoContext.Provider>
      <MyChatBot />
    </>
  )
}

export default App
