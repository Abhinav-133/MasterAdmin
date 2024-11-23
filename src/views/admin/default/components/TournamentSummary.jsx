import React, { useEffect, useState } from "react";
import { db } from "../../../../firebaseConfig"; // Your Firebase configuration
import { collection, getDocs } from "firebase/firestore";
import BarChart from "components/charts/BarChart"; // Adjust this import based on your setup
import Card from "components/card";

const TournamentSummary = () => {
  const [tournamentData, setTournamentData] = useState([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      const snapshot = await getDocs(collection(db, "tournaments"));
      const data = snapshot.docs.map((doc) => ({
        name: doc.data().name,
        participants: doc.data().participants,
        location: doc.data().location,
      }));
      setTournamentData(data);
    };
    fetchTournaments();
  }, []);

  const chartData = {
    labels: tournamentData.map((t) => t.name), // Tournament names for x-axis
    datasets: [
      {
        label: "Number of Participants",
        data: tournamentData.map((t) => t.participants), // Participant counts for y-axis
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Tournament Summary",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card extra="rounded-[20px] p-3">
      <h4 className="text-lg font-bold text-navy-700 dark:text-white">
        Tournament Summary
      </h4>
      <div className="h-[300px] w-full">
        <BarChart data={chartData} options={chartOptions} />
      </div>
    </Card>
  );
};

export default TournamentSummary;
