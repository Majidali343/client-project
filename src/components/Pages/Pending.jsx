import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Pages/images/logo.jpeg";
import Notification from "../Pages/images/Notification.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Employeetask() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [dates, setDates] = useState([new Date()]); // Default date for the first row
  const [advances, setAdvances] = useState([null]); // Default value for advances
  const [paymentStatuses, setPaymentStatuses] = useState([null]); // Default value for payment statuses
  const [locations, setLocations] = useState([""]); // State for locations
  const [totals, setTotals] = useState([null]); // State for totals
  const [pendings, setPendings] = useState([null]); // State for pending
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [names, setNames] = useState([""]); // State for names
  const [taskData, setTaskData] = useState([]);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleDropdownChange = (value, index, type) => {
    switch (type) {
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

  const handleAdvanceChange = (value, index) => {
    const newAdvances = [...advances];
    newAdvances[index] = value;
    setAdvances(newAdvances);
  };

  const handleLocationChange = (value, index) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  const handleTotalChange = (value, index) => {
    const newTotals = [...totals];
    newTotals[index] = value;
    setTotals(newTotals);
  };

  const handlePendingChange = (value, index) => {
    const newPendings = [...pendings];
    newPendings[index] = value;
    setPendings(newPendings);
  };

  const handleSubmit = async () => {
    const formData = {
      names,
      dates,
      advances,
      paymentStatuses,
      locations,
      totals,
      pendings,
    };

    try {
      const result = await fetch("http://localhost:5000/pending/post/E-pending", {
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
      const response = await fetch("http://localhost:5000/pending/get/E-pending");
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
          <h2 className="text-xl font-bold text-[#3d3d3d] flex-1">Pending</h2>
          <div className="flex-1 flex justify-center ml-60">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-44 px-3 py-1 border rounded shadow-sm text-xs"
            />
          </div>
          <div className="w-8 h-8 cursor-pointer hover:red-300">
            <img src={Notification} alt="icon" />
          </div>
          <button className="text-[#FFFF] bg-[#ea8732] ml-9 mr-9 border-0 py-1 px-2 w-28 focus:outline-none hover:bg-gray-200 rounded font-semibold text-sm" onClick={handleSubmit}>
            + Add New
          </button>
        </header>
        <div className="flex-1 p-6 flex justify-center overflow-y-auto">
          <div className="overflow-x-auto w-full max-w-4xl">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="py-3 px-12 bg-gray-200 text-[#3d3d3d] text-left">Name</th>
                  <th className="py-3 px-12 bg-gray-200 text-[#3d3d3d] text-left">Location</th>
                  <th className="py-3 px-10 bg-gray-200 text-[#3d3d3d] text-center">Date</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Advance</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Pending</th>
                  <th className="py-3 px-7 bg-gray-200 text-[#3d3d3d] text-center">Total</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {names.map((name, index) => (
                  <tr key={index} className="text-[#3d3d3d] border-t">
                    <td className="py-3 px-4 text-left text-xs">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          const newNames = [...names];
                          newNames[index] = e.target.value;
                          setNames(newNames);
                        }}
                        className="w-full py-1 px-2 border rounded"
                        placeholder="Enter Name"
                      />
                    </td>
                    <td className="py-3 px-4 text-left text-xs">
                      <input
                        type="text"
                        value={locations[index]}
                        onChange={(e) => handleLocationChange(e.target.value, index)}
                        className="w-full py-1 px-2 border rounded"
                        placeholder="Enter Location"
                      />
                    </td>
                    <td className="py-3 px-10 text-center text-xs">
                      <DatePicker
                        selected={dates[index]}
                        onChange={(date) => handleDateChange(date, index)}
                        className="w-full py-1 px-2 border rounded"
                      />
                    </td>
                    <td className="py-3 px-4 text-center text-xs">
                      <input
                        type="number"
                        value={advances[index] || ""}
                        onChange={(e) => handleAdvanceChange(e.target.value, index)}
                        className="w-full py-1 px-2 border rounded"
                        placeholder="0"
                      />
                    </td>
                    <td className="py-3 px-4 text-center text-xs">
                      <input
                        type="number"
                        value={pendings[index] || ""}
                        onChange={(e) => handlePendingChange(e.target.value, index)}
                        className="w-full py-1 px-2 border rounded"
                        placeholder="0"
                      />
                    </td>
                    <td className="py-3 px-4 text-center text-xs">
                      <input
                        type="number"
                        value={totals[index] || ""}
                        onChange={(e) => handleTotalChange(e.target.value, index)}
                        className="w-full py-1 px-2 border rounded"
                        placeholder="0"
                      />
                    </td>
                    <td className="py-3 px-4 text-center text-xs">
                      <div className="relative inline-block">
                        <button
                          className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
                          type="button"
                          onClick={() => toggleDropdown(index)}
                        >
                          {paymentStatuses[index] || "Choose Status"}
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
                        {dropdownOpen === index && (
                          <div className="absolute mt-2 bg-white border border-gray-300 rounded shadow-lg">
                            <ul className="list-none m-0 p-0">
                              {["Pending", "Successful"].map((status, i) => (
                                <li
                                  key={i}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={() => handleDropdownChange(status, index, "paymentStatus")}
                                >
                                  {status}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {/* Empty rows */}
                {taskData.map((pending, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-6 text-left text-xs">{pending.name}</td>
                    <td className="py-3 px-6 text-left text-xs">{pending.location}</td>
                    <td className="py-3 px-6 text-center text-xs">{pending.date}</td>
                    <td className="py-3 px-6 text-center text-xs">{pending.advance}</td>
                    <td className="py-3 px-6 text-center text-xs">{pending.pending}</td>
                    <td className="py-3 px-6 text-center text-xs">{pending.total}</td>
                    <td className="py-3 px-6 text-center text-xs">{pending.payment_status}</td>
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
