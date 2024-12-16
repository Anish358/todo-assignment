import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getTaskInstructions = async (taskDescription, retries = 5) => {
  // Validate input
  if (!taskDescription || taskDescription.trim() === "") {
    alert("Please enter a task description");
    return;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Provide short guide of completing this task: ${taskDescription}. Not more than 100 words.`,
        },
      ],
    });

    // Extract and process the generated instructions
    const rawInstructions = response.choices[0].message.content;

    if (!rawInstructions) {
      alert("No instructions could be generated.");
      return;
    }

    return rawInstructions;
  } catch (error) {
    if (error.response?.status === 503 && retries > 0) {
      const estimatedTime = error.response.data?.estimated_time || 30;
      console.warn(
        `Model is loading. Retrying in ${Math.ceil(estimatedTime)} seconds...`
      );

      setTimeout(
        () => getTaskInstructions(taskDescription, retries - 1),
        estimatedTime * 1000
      );
    } else {
      console.error("Error fetching task instructions:", error);
      alert("Failed to generate instructions. Please try again later.");
    }
  }
};
