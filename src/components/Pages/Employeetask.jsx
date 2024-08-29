import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Pages/images/logo.jpeg";
import Notification from "./images/Notification.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Employeetask() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [workHours, setWorkHours] = useState([null]); // Default value for work hours
  const [taskStatus, setTaskStatus] = useState([null]); // Default value for task status
  const [dates, setDates] = useState([new Date()]); // Default date for the first row
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [taskdata, settaskdata] = useState(['']);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    task: "",
    work_hours: workHours[0],
    date: dates[0],
    task_status: taskStatus[0]
  });

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleWorkHoursChange = (hours, index) => {
    const newWorkHours = [...workHours];
    newWorkHours[index] = hours;
    setWorkHours(newWorkHours);
    setFormData({ ...formData, work_hours: hours }); // Update formData
    setDropdownOpen(null); // Close dropdown after selection
  };

  const handleTaskStatusChange = (status, index) => {
    const newTaskStatus = [...taskStatus];
    newTaskStatus[index] = status;
    setTaskStatus(newTaskStatus);
    setFormData({ ...formData, task_status: status }); // Update formData
    setDropdownOpen(null); // Close dropdown after selection
  };

  const handleDateChange = (date, index) => {
    const newDates = [...dates];
    newDates[index] = date;
    setDates(newDates);
    setFormData({ ...formData, date: date }); // Update formData
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
    const reslt=  await fetch("http://localhost:5000/employeetask/post/Etask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      fetchData();
     
      // Optionally handle response or update state after successful POST
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/employeetask/get/Etask");
      const data = await response.json();
      settaskdata(data.rows)
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex">
      <aside className="w-64 bg-white text-white flex-shrink-0 fixed h-full">
        <div className="p-6">
          <img
            className="w-24 h-24 text-white p-2"
            src={Logo}
            alt="Logo"
          />
         <nav>
            <Link to="/">
              <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
                Dashboard
              </button>
            </Link>
            <Link to="/Employeesalary">
              <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
                Employee Salary
              </button>
            </Link>
            <Link to="/Employeetask">
              <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
                Employee Task
              </button>
            </Link>
            <Link to="/Income">
              <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
                Income
              </button>
            </Link>
            <Link to="/Expenses">
              <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
                Expenses
              </button>
            </Link>
            <Link to="/Customer">
              <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
                Customers
              </button>
            </Link>
            <Link to="/Vehicle">
              <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
                Vehicles
              </button>
            </Link>
            <Link to="/Pending">
              <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
                Pending
              </button>
            </Link>
            <Link to="/Invoice">
              <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
                Invoice
              </button>
            </Link>
            <Link to="/Report">
              <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
              Invoice Generate
              </button>
            </Link>
            <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
              Sign Out
            </button>
          </nav>
        </div>
      </aside>
      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-white shadow p-7">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#3d3d3d]">Employee Task</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-1 flex justify-center ml-60">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-1/1 px-3 py-1 border rounded shadow-sm text-xs"
                />
              </div>
              <div className="w-8 h-8 cursor-pointer hover:bg-gray-200 rounded-full">
                <img src={Notification} alt="Notification Icon" />
              </div>
              <button
                className="text-[#FFFF] bg-[#ea8732] border-0 py-1 px-2 w-28 focus:outline-none hover:bg-gray-200 rounded font-semibold text-sm"
                onClick={handleSubmit} // Attach submit handler
              >
                Submit
              </button>
            </div>
          </div>
        </header>
        <div className="flex-1 p-6 flex justify-center overflow-y-auto">
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-3 px-12 bg-gray-200 text-[#3d3d3d] text-left">Employee Name</th>
                  <th className="py-3 px-12 bg-gray-200 text-[#3d3d3d] text-left">Company</th>
                  <th className="py-3 px-10 bg-gray-200 text-[#3d3d3d] text-center">Location</th>
                  <th className="py-3 px-12 bg-gray-200 text-[#3d3d3d] text-center">Task</th>
                  <th className="py-3 px-8 bg-gray-200 text-[#3d3d3d] text-center">Work Hours</th>
                  <th className="py-3 px-16 bg-gray-200 text-[#3d3d3d] text-center">Date</th>
                  <th className="py-3 px-6 bg-gray-200 text-[#3d3d3d] text-center">Changes</th>
                </tr>
              </thead>
             <tbody>
  <tr className="text-[#3d3d3d] border-t">
    <td className="py-3 px-6 text-left text-xs">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full py-1 px-2 border rounded"
        placeholder="Enter Employee"
      />
    </td>
    <td className="py-3 px-6 text-left text-xs">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        className="w-full py-1 px-2 border rounded"
        placeholder="Enter Company"
      />
    </td>
    <td className="py-3 px-6 text-center text-xs">
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        className="w-full py-1 px-2 border rounded"
        placeholder="Enter Location"
      />
    </td>
    <td className="py-3 px-6 text-center text-xs">
      <input
        type="text"
        name="task"
        value={formData.task}
        onChange={handleInputChange}
        className="w-full py-1 px-2 border rounded"
        placeholder="Enter Task"
      />
    </td>
    <td className="py-3 px-6 text-center text-xs">
      <div className="relative inline-block">
        <button
          className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
          type="button"
          onClick={() => toggleDropdown(0)}
        >
          {workHours[0] || "Choose"}
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {dropdownOpen === 0 && (
          <div className="absolute mt-2 w-24 py-1 bg-white border border-gray-300 rounded shadow-lg">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((hours) => (
              <button
                key={hours}
                onClick={() => handleWorkHoursChange(hours, 0)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                {hours} Hour{hours > 1 ? 's' : ''}
              </button>
            ))}
          </div>
        )}
      </div>
    </td>
    <td className="py-3 px-6 text-center text-xs">
      <DatePicker
        selected={dates[0]}
        onChange={(date) => handleDateChange(date, 0)}
        className="text-center bg-white border rounded w-full py-1 px-3"
        dateFormat="dd/MM/yyyy"
      />
    </td>
    <td className="py-3 px-6 text-center text-xs">
      <div className="relative inline-block">
        <button
          className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
          type="button"
          onClick={() => toggleDropdown(1)}
        >
          {taskStatus[0] || "Choose"}
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        {dropdownOpen === 1 && (
          <div className="absolute mt-2 w-full py-1 bg-white border border-gray-300 rounded shadow-lg">
            {["Pending", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => handleTaskStatusChange(status, 0)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>
    </td>
  </tr>

  {/* Existing task data rows */}
  {taskdata.map((task, index) => (
    <tr key={index} className="border-t">
      <td className="py-3 px-6 text-center text-xs">{task.name}</td>
      <td className="py-3 px-6 text-center text-xs">{task.location}</td>
      <td className="py-3 px-6 text-center text-xs">{task.task}</td>
      <td className="py-3 px-6 text-center text-xs">{task.work_hours}</td>
      <td className="py-3 px-6 text-center text-xs">{task.date}</td>
      <td className="py-3 px-6 text-center text-xs">{task.task_status}</td>
    </tr>
  ))}

  {/* Adding 10 empty rows */}
  {Array.from({ length: 20 }).map((_, index) => (
    <tr key={index + taskdata.length} className="border-t">
      <td className="py-3 px-6 text-center text-xs">&nbsp;</td>
      <td className="py-3 px-6 text-center text-xs">&nbsp;</td>
      <td className="py-3 px-6 text-center text-xs">&nbsp;</td>
      <td className="py-3 px-6 text-center text-xs">&nbsp;</td>
      <td className="py-3 px-6 text-center text-xs">&nbsp;</td>
      <td className="py-3 px-6 text-center text-xs">&nbsp;</td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Employeetask;
