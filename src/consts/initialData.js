// src/consts/initialData.js

export const initialData = () => {
  let data;
  
  try {
    data = JSON.parse(localStorage.getItem("todos"));
  } catch (error) {
    console.error("Invalid JSON in localStorage:", error);
  }

  return (
    data || [
      {
        id: 1,
        task: "Learn React",
        status: true,
      },
      {
        id: 2,
        task: "Learn Node.js",
        status: false,
      },
      {
        id: 3,
        task: "Learn Express",
        status: false,
      },
      {
        id: 4,
        task: "Learn Mongo DB",
        status: false,
      },
    ]
  );
};
