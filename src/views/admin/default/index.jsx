import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, where, Timestamp } from "firebase/firestore";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";
import Widget from "components/widget/Widget";
import AthletesTable from "./components/CheckTable";
import TrainersTable from "./components/ComplexTable";
import SponsorsTable from "./components/DailyTraffic";

const Dashboard = () => {
  const [athleteCount, setAthleteCount] = useState(0);
  const [trainerCount, setTrainerCount] = useState(0);
  const [activeTournamentCount, setActiveTournamentCount] = useState(0);
  const [pastTournamentCount, setPastTournamentCount] = useState(0);
  const [sponsorCount, setSponsorCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const athletesSnapshot = await getDocs(collection(db, "athletes"));
        setAthleteCount(athletesSnapshot.size);

        const trainersSnapshot = await getDocs(collection(db, "trainers"));
        setTrainerCount(trainersSnapshot.size);

        const currentDate = new Date();

        const activeTournamentsSnapshot = await getDocs(
          collection(db, "tournaments"),
          where("date", ">=", Timestamp.fromDate(currentDate))
        );
        setActiveTournamentCount(activeTournamentsSnapshot.size);

        const pastTournamentsSnapshot = await getDocs(
          collection(db, "tournaments"),
          where("date", "<", Timestamp.fromDate(currentDate))
        );
        setPastTournamentCount(pastTournamentsSnapshot.size);

        const sponsorsSnapshot = await getDocs(collection(db, "sponsors"));
        setSponsorCount(sponsorsSnapshot.size);
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Athletes"}
          subtitle={athleteCount}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Trainers"}
          subtitle={trainerCount}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Active Tournaments"}
          subtitle={activeTournamentCount}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Past Tournaments"}
          subtitle={pastTournamentCount}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sponsors"}
          subtitle={sponsorCount}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Registrations"}
          subtitle={athleteCount + trainerCount}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-1">
        <div className="grid grid-cols-1 gap-10 rounded-[20px] md:grid-cols-2">
          <PieChartCard />
          <AthletesTable />
          <TrainersTable />
          <SponsorsTable/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
