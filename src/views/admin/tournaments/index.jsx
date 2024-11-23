import React, { useState } from "react";
import { ChevronRight, MapPin, Calendar, Users, Plus } from "lucide-react";
import { db } from "../../../firebaseConfig";
import { useEffect } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";

export default function Tournaments() {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [tournaments, setTournaments] = useState([]);
  const currentDate = new Date();

  useEffect(() => {
    const fetchTournaments = async () => {
      const querySnapshot = await getDocs(collection(db, "tournaments"));
      const tournamentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const formattedTournaments = tournamentsData.map((tournament) => ({
        ...tournament,
        date:
          tournament.date instanceof Timestamp
            ? tournament.date.toDate()
            : new Date(tournament.date),
      }));
      setTournaments(formattedTournaments);
    };
    fetchTournaments();
  }, []);

  const filteredTournaments = tournaments.filter((tournament) => {
    const tournamentDate = new Date(tournament.date);
    return showUpcoming
      ? tournamentDate > currentDate
      : tournamentDate <= currentDate;
  });

  return (
    <div className="bg-rgb(255 255 255 / 0.1) min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-blue-600">
          Tournaments
        </h1>

        <div className="mb-8 rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                className={`rounded-full px-6 py-2 text-lg font-semibold transition-all duration-300 ${
                  showUpcoming
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => setShowUpcoming(true)}
              >
                Upcoming
              </button>
              <button
                className={`rounded-full px-6 py-2 text-lg font-semibold transition-all duration-300 ${
                  !showUpcoming
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                }`}
                onClick={() => setShowUpcoming(false)}
              >
                Past
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="transform overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-blue-500 p-4">
                <h2 className="mb-2 text-xl font-semibold text-white">
                  {tournament.name}
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center text-gray-600">
                  <Calendar className="mr-3 h-5 w-5 text-blue-500" />
                  <span>{new Date(tournament.date).toLocaleDateString()}</span>
                </div>
                <div className="mb-3 flex items-center text-gray-600">
                  <MapPin className="mr-3 h-5 w-5 text-blue-500" />
                  <span>{tournament.location}</span>
                </div>
                <div className="mb-3 flex items-center text-gray-600">
                  <ChevronRight className="mr-3 h-5 w-5 text-blue-500" />
                  <span>{tournament.sport}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="mr-3 h-5 w-5 text-blue-500" />
                  <span>{tournament.organizer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
