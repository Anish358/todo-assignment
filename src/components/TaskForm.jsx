import React, { useState } from "react";
import { motion } from "framer-motion";
import { getTaskInstructions } from "../API";
import { useInstructions } from "../context/InstructionsContext";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState("");
  const { isLoading, setIsLoading, addInstructions } = useInstructions();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  };

  const handleGetInstructions = async () => {
    if (!task.trim()) {
      alert("Please enter a task description first");
      return;
    }

    setIsLoading(true);
    try {
      const instructions = await getTaskInstructions(task);
      addInstructions(instructions);
    } catch (error) {
      console.error("Failed to get instructions:", error);
      alert("Failed to fetch instructions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Task
      </motion.button>
      <motion.button
        type="button"
        disabled={isLoading ? true : false}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGetInstructions}
      >
        {isLoading ? "Loading" : "Get Instructions"}
      </motion.button>
    </motion.form>
  );
};

export default TaskForm;
