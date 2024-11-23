import React, { useState } from "react";
import {
  ChevronDownIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const sportsList = [
  "Football",
  "Basketball",
  "Tennis",
  "Volleyball",
  "Swimming",
  "Athletics",
  "Badminton",
  "Table Tennis",
  "Cricket",
  "Hockey",
];

export default function AddTournament() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    organizer: "",
    participants: "",
    teamSize: "",
    sport: "", // Store as a single string
    prizePool: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSportToggle = (sport) => {
    setFormData((prevData) => ({
      ...prevData,
      sport: prevData.sport === sport ? "" : sport, // Set to single sport or empty
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tournaments"), formData);
      alert("Tournament registered successfully!");
      setFormData({
        name: "",
        date: "",
        location: "",
        organizer: "",
        participants: "",
        teamSize: "",
        sport: "",
        prizePool: "",
      });
    } catch (error) {
      console.error("Error adding tournament:", error);
      alert("Failed to register tournament.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-5xl p-16 bg-white rounded-lg shadow-2xl lg:p-24">
        <div className="text-center mb-10">
          <TrophyIcon className="mx-auto h-14 w-auto text-indigo-600" />
          <h2 className="mt-4 text-5xl font-extrabold text-indigo-900">
            Register Your Tournament
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Provide the details below to set up your tournament.
          </p>
        </div>
        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-800"
              >
                Tournament Name
              </label>
              <div className="flex items-center mt-2 border border-gray-300 rounded-lg shadow-sm">
                <TrophyIcon className="ml-4 h-6 w-6 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full px-4 py-4 text-xl text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none rounded-r-lg"
                  placeholder="Enter tournament name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="date"
                className="block text-lg font-medium text-gray-800"
              >
                Date
              </label>
              <div className="flex items-center mt-2 border border-gray-300 rounded-lg shadow-sm">
                <CalendarIcon className="ml-4 h-6 w-6 text-gray-400" />
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="block w-full px-4 py-4 text-xl text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none rounded-r-lg"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="location"
                className="block text-lg font-medium text-gray-800"
              >
                Location
              </label>
              <div className="flex items-center mt-2 border border-gray-300 rounded-lg shadow-sm">
                <MapPinIcon className="ml-4 h-6 w-6 text-gray-400" />
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  className="block w-full px-4 py-4 text-xl text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none rounded-r-lg"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="organizer"
                className="block text-lg font-medium text-gray-800"
              >
                Organizer
              </label>
              <div className="flex items-center mt-2 border border-gray-300 rounded-lg shadow-sm">
                <UserGroupIcon className="ml-4 h-6 w-6 text-gray-400" />
                <input
                  id="organizer"
                  name="organizer"
                  type="text"
                  required
                  className="block w-full px-4 py-4 text-xl text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none rounded-r-lg"
                  placeholder="Organizer name"
                  value={formData.organizer}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="participants"
                className="block text-lg font-medium text-gray-800"
              >
                Number of Participants
              </label>
              <input
                id="participants"
                name="participants"
                type="number"
                required
                className="mt-2 block w-full px-4 py-4 border border-gray-300 rounded-lg text-xl text-gray-900 placeholder-gray-500 focus:outline-none shadow-sm"
                placeholder="Enter number of participants"
                value={formData.participants}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="teamSize"
                className="block text-lg font-medium text-gray-800"
              >
                Team Size
              </label>
              <input
                id="teamSize"
                name="teamSize"
                type="number"
                required
                className="mt-2 block w-full px-4 py-4 border border-gray-300 rounded-lg text-xl text-gray-900 placeholder-gray-500 focus:outline-none shadow-sm"
                placeholder="Enter team size"
                value={formData.teamSize}
                onChange={handleChange}
              />
            </div>

            <div className="relative col-span-2">
              <label className="block text-lg font-medium text-gray-800">
                Select Sport
              </label>
              <button
                type="button"
                className="w-full px-4 py-4 mt-2 border border-gray-300 rounded-lg text-left bg-white shadow-sm text-xl text-gray-900 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="flex items-center justify-between">
                  <span>
                    {formData.sport || "Choose sport"}
                  </span>
                  <ChevronDownIcon
                    className="w-6 h-6 text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-20 mt-2 w-full rounded-lg bg-white shadow-xl max-h-60 overflow-auto">
                  {sportsList.map((sport) => (
                    <div
                      key={sport}
                      className={`${
                        formData.sport === sport
                          ? "bg-indigo-100 text-indigo-900"
                          : "text-gray-900"
                      } px-6 py-4 cursor-pointer hover:bg-indigo-50`}
                      onClick={() => handleSportToggle(sport)}
                    >
                      {sport}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative col-span-2">
              <label
                htmlFor="prizePool"
                className="block text-lg font-medium text-gray-800"
              >
                Prize Pool
              </label>
              <input
                id="prizePool"
                name="prizePool"
                type="text"
                required
                className="mt-2 block w-full px-4 py-4 border border-gray-300 rounded-lg text-xl text-gray-900 placeholder-gray-500 focus:outline-none shadow-sm"
                placeholder="Enter prize pool"
                value={formData.prizePool}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-4 bg-indigo-600 text-white text-xl font-medium rounded-lg shadow-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Register Tournament
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
