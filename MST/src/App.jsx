import React, { useState } from "react";
import StudentCard from "./components/StudentCard";

function App() {
  // Todo List State
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks(tasks.concat({ text: newTask, completed: false }));
    setNewTask("");
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return Object.assign({}, task, { completed: !task.completed });
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Student Cards Data
  const students = [
    { name: "Alice Johnson", roll: "101", course: "Computer Science" },
    { name: "Bob Smith", roll: "102", course: "Mechanical Engineering" },
    { name: "Charlie Brown", roll: "103", course: "Electrical Engineering" },
    { name: "Diana Prince", roll: "104", course: "Civil Engineering" },
  ];

  return (
    <div className="min-h-screen bg-gray-400 flex flex-col items-center justify-start p-4 space-y-8 ">
      
      {/* Todo List */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 mt-20">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 border border-gray-300 rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 p-2 mb-2 rounded"
            >
              <span
                onClick={() => toggleComplete(index)}
                className={`flex-1 cursor-pointer ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mt-60">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            roll={student.roll}
            course={student.course}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
