const StudentCard = ({ name, roll, course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 transform transition duration-300 hover:scale-105">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">Roll Number: {roll}</p>
      <p className="text-gray-600">Course: {course}</p>
    </div>
  );
};

export default StudentCard;