import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { InstructionsProvider } from "./context/InstructionsContext.jsx";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <InstructionsProvider>
      <motion.div
        className="App"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          To-Do List
        </motion.h1>
        <TaskForm addTask={addTask} />
        <div className="filter">
          {["all", "pending", "completed"].map((filterType) => (
            <motion.button
              key={filterType}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterType)}
              style={{
                backgroundColor:
                  filter === filterType ? "var(--accent-color)" : undefined,
                color: filter === filterType ? "white" : undefined,
              }}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </motion.button>
          ))}
        </div>
        <TaskList
          tasks={filteredTasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      </motion.div>
    </InstructionsProvider>
  );
}

export default App;
