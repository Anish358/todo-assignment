import React, { createContext, useState, useContext } from "react";
import { motion } from "framer-motion";

const InstructionsContext = createContext(null);

export const InstructionsProvider = ({ children }) => {
  const [instructions, setInstructions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addInstructions = (newInstructions) => {
    setInstructions(newInstructions);
  };

  const clearInstructions = () => {
    setInstructions(null);
  };

  return (
    <InstructionsContext.Provider
      value={{
        instructions,
        isLoading,
        setIsLoading,
        addInstructions,
        clearInstructions,
      }}
    >
      {children}
      {instructions && (
        <motion.div
          className="instructions-modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="instructions-content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Task Instructions</h2>
            <p>{instructions}</p>
            <motion.button
              onClick={clearInstructions}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </InstructionsContext.Provider>
  );
};

export const useInstructions = () => {
  const context = useContext(InstructionsContext);
  if (!context) {
    throw new Error(
      "useInstructions must be used within an InstructionsProvider"
    );
  }
  return context;
};
