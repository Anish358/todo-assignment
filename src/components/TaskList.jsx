import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.ul variants={listVariants} initial="hidden" animate="visible">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            variants={itemVariants}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed
                ? "var(--text-secondary)"
                : "var(--text-primary)",
            }}
            whileHover={{ scale: 1.02 }}
            exit="exit"
          >
            {task.text}
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTaskCompletion(task.id)}
              >
                {task.completed ? "Undo" : "Complete"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </motion.button>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
};

export default TaskList;
