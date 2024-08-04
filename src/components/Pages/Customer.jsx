import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Pages/images/logo.jpeg";
import Notification from "../Pages/images/Notification.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Employeetask() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [vehicles, setVehicles] = useState([null]); // Default value for vehicles
  const [descriptions, setDescriptions] = useState([null]); // Default value for descriptions
  const [dates, setDates] = useState([new Date()]); // Default date for the first row
  const [contacts, setContacts] = useState([null]); // Default value for contacts
  const [deals, setDeals] = useState([null]); // Default value for deals
  const [customers, setCustomers] = useState([null]); // Default value for customers
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

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
      case "deal":
        const newDeals = [...deals];
        newDeals[index] = value;
        setDeals(newDeals);
        break;
      case "customer":
        const newCustomers = [...customers];
        newCustomers[index] = value;
        setCustomers(newCustomers);
        break;
      case "contact":
        const newContacts = [...contacts];
        newContacts[index] = value;
        setContacts(newContacts);
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

  return (
    <div className="bg-gray-100 h-screen flex">
      <aside className="w-64 bg-white text-white flex-shrink-0 fixed h-full">
        <div className="p-6">
          <img className="w-24 h-24 text-white p-2" src={Logo} alt="Logo" />
          <nav>
            {/* Navigation Links */}
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
          <h2 className="text-xl font-bold text-[#3d3d3d] flex-1">Customers</h2>
          <div className="flex-1 flex justify-center ml-">
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
          <button className="text-[#FFFF] bg-[#ea8732] ml-9 mr-9 border-0 py-1 px-2 w-28 focus:outline-none hover:bg-gray-200 rounded font-semibold text-sm">
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
                  <th className="py-3 px-12 bg-gray-200 text-[#3d3d3d] text-center">Date</th>
                  <th className="py-3 px-5 bg-gray-200 text-[#3d3d3d] text-center">Contact</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Deals</th>
                  <th className="py-3 px-4 bg-gray-200 text-[#3d3d3d] text-center">Customer</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[#3d3d3d] border-t">
                  <td className="py-3 px-4 text-left text-xs">
                    <input
                      type="text"
                      className="w-full py-1 px-2 border rounded"
                      placeholder="Enter Name"
                    />
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    <div className="relative inline-block">
                      <button
                        className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
                        type="button"
                        onClick={() => toggleDropdown(0)}
                      >
                        {vehicles[0] || "Select Vehicle"}
                      </button>
                      {dropdownOpen === 0 && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                          <ul className="py-1">
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
                            ].map((vehicle, index) => (
                              <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleDropdownChange(vehicle, 0, "vehicle")}
                              >
                                {vehicle}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-left text-xs">
                    <input
                      type="text"
                      className="w-full py-1 px-2 border rounded"
                      placeholder="Enter Description"
                    />
                  </td>
                  <td className="py-3 px-10 text-center text-xs">
                    <DatePicker
                      selected={dates[0]}
                      onChange={(date) => handleDateChange(date, 0)}
                      dateFormat="MM/dd/yyyy"
                      className="w-full py-1 px-2 border rounded"
                    />
                  </td>
                  <td className="py-3 px-4 text-left text-xs">
                    <input
                      type="text"
                      className="w-full py-1 px-2 border rounded"
                      placeholder="Enter Contact"
                      value={contacts[0] || ""}
                      onChange={(e) => handleDropdownChange(e.target.value, 0, "contact")}
                    />
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    <div className="relative inline-block">
                      <button
                        className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
                        type="button"
                        onClick={() => toggleDropdown(1)}
                      >
                        {deals[0] || "Select Deal"}
                      </button>
                      {dropdownOpen === 1 && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                          <ul className="py-1">
                            {["Pending", "Done"].map((deal, index) => (
                              <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleDropdownChange(deal, 0, "deal")}
                              >
                                {deal}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-xs">
                    <div className="relative inline-block">
                      <button
                        className="text-[#ea8732] bg-[#fef4eb] hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#ffd7b5] font-medium rounded-full text-xs px-4 py-1.5 inline-flex items-center"
                        type="button"
                        onClick={() => toggleDropdown(2)}
                      >
                        {customers[0] || "Select Customer"}
                      </button>
                      {dropdownOpen === 2 && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                          <ul className="py-1">
                            {["Old", "New"].map((customer, index) => (
                              <li
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleDropdownChange(customer, 0, "customer")}
                              >
                                {customer}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                                {/* Empty rows */}
                                {[...Array(20)].map((_, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-3 px-6 text-left text-xs"></td>
                    <td className="py-3 px-6 text-center text-xs"></td>
                    <td className="py-3 px-6 text-center text-xs"></td>
                    <td className="py-3 px-6 text-center text-xs"></td>
                    <td className="py-3 px-6 text-center text-xs"></td>
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
