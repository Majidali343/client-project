import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Logo from "../Pages/images/logo.jpeg";
import Notification from "../Pages/images/Notification.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Employeetask() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [vehicles, setVehicles] = useState([null]); // Default value for vehicles
  const [descriptions, setDescriptions] = useState([null]); // Default value for descriptions
  const [name, setnames] = useState([null]); // Default value for descriptions
  const [dates, setDates] = useState([new Date()]); // Default date for the first row 
  const [amounts, setAmounts] = useState([null]); // Changed from advances to amounts
  const [paymentStatuses, setPaymentStatuses] = useState([null]); // Default value for payment statuses
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [taskData, setTaskData] = useState([]);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleDropdownChange = (value, index, type) => {
    switch (type) {
      case "vehicle":
        const newVehicles = [...vehicles];
        newVehicles[index] = value;
        setVehicles(newVehicles);
        break;
      case "description":
        const newDescriptions = [...descriptions];
        newDescriptions[index] = value;
        setDescriptions(newDescriptions);
        break;
      case "paymentStatus":
        const newStatuses = [...paymentStatuses];
        newStatuses[index] = value;
        setPaymentStatuses(newStatuses);
        break;
      default:
        break;
    }
    setDropdownOpen(null); // Close dropdown after selection
  };

  const handleDateChange = (date, index) => {
    const newDates = [...dates];
    newDates[index] = date;
    setDates(newDates);
  };


  const handleSubmit = async () => {
    const formData = {
      name,
      vehicles,
      descriptions,
      dates,
      amounts,
      paymentStatuses,
    };

    try {
      const result = await fetch("http://localhost:5000/expense/post/Eexpenses", {
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
      const response = await fetch("http://localhost:5000/expense/get/Eexpenses");
      const data = await response.json();
      setTaskData(data.rows);
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
                Report
              </button>
            </Link>
            <button className="block text-[#3d3d3d] text-sm py-2.5 px-4 rounded hover:bg-[#ea8732] hover:text-white font-bold w-full text-left">
              Sign Out
            </button>
          </nav>
        </div>
      </aside>
      <div className="flex-1 flex flex-col ml-64">
        <header className="bg-white shadow p-7 flex items-center">
          <h2 className="text-xl font-bold text-[#3d3d3d] flex-1">Expenses</h2>
          <div className="flex-1 flex justify-center ml-60">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-1/1 px-3 py-1 border rounded shadow-sm text-xs"
            />
          </div>
          <div className="w-8 h-8 cursor-pointer hover:red-300">
            <img src={Notification} alt="icon" />
          </div>
          <button className="text-[#FFFF] bg-[#ea8732] ml-9 mr-9 border-0 py-1 px-2 w-28 focus:outline-none hover:bg-gray-200 rounded font-semibold text-sm"  onClick={handleSubmit}>
            + Add New
          </button>
        </header>
        <div className="flex-1 p-6 flex justify-center overflow-y-auto">
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-3 px-16 bg-gray-200 text-[#3d3d3d] text-left">Name</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Vehicle</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Description</th>
                  <th className="py-3 px-10 bg-gray-200 text-[#3d3d3d] text-center">Date</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Amount</th> {/* Updated Header */}
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[#3d3d3d] border-t">
                  <td className="py-3 px-4 text-left text-xs">
                    <input
                      type="text"
                      className="w-full py-1 px-2 border rounded"
                      placeholder="Enter Name"
                      onChange={(e) => {
                        const newname = [...name];
                        newname[0] = e.target.value;
                        setnames(newname);
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    <div className="relative inline-block">
                      <button
                        className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
                        type="button"
                        onClick={() => toggleDropdown(0)}
                      >
                        {vehicles[0] || "Choose Vehicle"}
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
                        <div className="absolute mt-2 w-full py-1 bg-white border border-gray-300 rounded shadow-lg">
                          {[
                            "Crane: 25-Ton",
                            "Crane: 50-Ton",
                            "Crane: 70-Ton",
                            "Crane: 100-Ton",
                            "Forklift: 3-Ton",
                            "Forklift: 5-Ton",
                            "Forklift: 7-Ton",
                            "Forklift: 10-Ton",
                            "Boomloader: 523",
                            "Boomloader: 540",
                          ].map((item) => (
                            <button
                              key={item}
                              onClick={() => handleDropdownChange(item, 0, "vehicle")}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    <input
                      type="text"
                      className="w-full py-1 px-2 border rounded"
                      placeholder="Description"
                      value={descriptions[0] || ""}
                      onChange={(e) => {
                        const newDescriptions = [...descriptions];
                        newDescriptions[0] = e.target.value;
                        setDescriptions(newDescriptions);
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    <DatePicker
                      selected={dates[0]}
                      onChange={(date) => handleDateChange(date, 0)}
                      className="text-center bg-white border rounded w-full py-1 px-3"
                      dateFormat="dd/MM/yyyy"
                    />
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    <input
                      type="number"
                      className="w-full py-1 px-2 border rounded"
                      placeholder="0"
                      value={amounts[0] || ""} // Updated to amounts
                      onChange={(e) => {
                        const newAmounts = [...amounts];
                        newAmounts[0] = e.target.value;
                        setAmounts(newAmounts);
                      }}
                    />
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    <div className="relative inline-block">
                      <button
                        className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
                        type="button"
                        onClick={() => toggleDropdown(1)}
                      >
                        {paymentStatuses[0] || "Choose Status"}
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
                          {["Online", "Cash"].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleDropdownChange(status, 0, "paymentStatus")}
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
                {/* Empty rows */}
                {taskData.map((task, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-6 text-left text-xs">{task.name}</td>
                    <td className="py-3 px-6 text-center text-xs">{task.vehicle}</td>
                    <td className="py-3 px-6 text-center text-xs">{task.description}</td>
                    <td className="py-3 px-6 text-center text-xs">{task.date}</td>
                    <td className="py-3 px-6 text-center text-xs">{task.amount}</td>
                    <td className="py-3 px-6 text-center text-xs">{task.payment_status}</td>
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
