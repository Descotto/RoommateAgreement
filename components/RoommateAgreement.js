"use client";

import { useState } from "react";
import FullForm from "./FullForm"; // Import FullForm component

export default function RoommateAgreement() {
  const [formData, setFormData] = useState({
    roommateName: "",
    landlordName: "",
    address: "",
    startDate: "",
    endDate: "",
    rent: "",
    deposit: "",
  });

  const [prorated, setProrated] = useState(false);
  const [proratedData, setProratedData] = useState({
    month: "",
    amount: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProratedChange = (e) => {
    setProrated(e.target.checked);
  };

  const handleProratedDataChange = (e) => {
    setProratedData({
      ...proratedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Set the form as submitted
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* <h1 className="text-2xl font-bold">Roommate Agreement Form</h1> */}

      {submitted ? (
        // Display the FullForm component with the form data passed as props
        <FullForm formData={formData} prorated={prorated} proratedData={proratedData} />
      ) : (
        // Display the form if not yet submitted
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input
            name="roommateName"
            placeholder="Roommate Name"
            onChange={handleChange}
            className="border p-2 w-full"
            value={formData.roommateName}
          />
          <input
            name="landlordName"
            placeholder="Landlord Name"
            onChange={handleChange}
            className="border p-2 w-full"
            value={formData.landlordName}
          />
          <input
            name="address"
            placeholder="Property Address"
            onChange={handleChange}
            className="border p-2 w-full"
            value={formData.address}
          />
          <label className="block">
            <span className="text-sm font-medium">Start Date</span>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              value={formData.startDate}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">End Date</span>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              className="border p-2 w-full mt-1"
              value={formData.endDate}
            />
          </label>

          <input
            name="rent"
            type="number"
            placeholder="Monthly Rent ($)"
            onChange={handleChange}
            className="border p-2 w-full"
            value={formData.rent}
          />
          <input
            name="deposit"
            type="number"
            placeholder="Security Deposit ($)"
            onChange={handleChange}
            className="border p-2 w-full"
            value={formData.deposit}
          />

          {/* Prorated Rent Section */}
          <div>
            <label>
              <input
                type="checkbox"
                checked={prorated}
                onChange={handleProratedChange}
              />
              Add prorated rent for certain months
            </label>
          </div>

          {prorated && (
            <div className="mt-3 space-y-2">
              <input
                name="month"
                placeholder="Month (e.g., June)"
                onChange={handleProratedDataChange}
                className="border p-2 w-full"
                value={proratedData.month}
              />
              <input
                name="amount"
                type="number"
                placeholder="Prorated Amount ($)"
                onChange={handleProratedDataChange}
                className="border p-2 w-full"
                value={proratedData.amount}
              />
            </div>
          )}

          <button type="submit" className="mt-4 bg-blue-500 text-white p-2 w-full">Submit</button>
        </form>
      )}
    </div>
  );
}
