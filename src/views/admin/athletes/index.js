import React, { useState, useEffect } from "react";
import { ChevronRight, MapPin, Calendar, Users, Plus } from "lucide-react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, updateDoc, doc,getDoc } from "firebase/firestore";

export default function Athletes() {
  const [athletes, setAthletes] = useState([]);

  useEffect(() => {
    const fetchAthletes = async () => {
      const querySnapshot = await getDocs(collection(db, "athletes"));
      const athletesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAthletes(athletesData);
    };
    fetchAthletes();
  }, []);

  const handleValidToggle = async (athleteUid, currentStatus) => {
    // Use the athlete's UID to reference the document
    const athleteRef = doc(db, "athletes", athleteUid); 
    const athleteSnapshot = await getDoc(athleteRef);
  
    if (athleteSnapshot.exists()) {
      await updateDoc(athleteRef, {
        valid: !currentStatus,
      });
      setAthletes((prev) =>
        prev.map((athlete) =>
          athlete.uid === athleteUid ? { ...athlete, valid: !currentStatus } : athlete
        )
      );
    } else {
      console.error("No athlete document found with UID:", athleteUid);
    }
  };
  
  // Function to toggle 'canParticipate' status
  const handleParticipationToggle = async (athleteUid, currentStatus) => {
    // Use the athlete's UID to reference the document
    const athleteRef = doc(db, "athletes", athleteUid);
    const athleteSnapshot = await getDoc(athleteRef);
  
    if (athleteSnapshot.exists()) {
      await updateDoc(athleteRef, {
        canParticipate: !currentStatus,
      });
      setAthletes((prev) =>
        prev.map((athlete) =>
          athlete.uid === athleteUid ? { ...athlete, canParticipate: !currentStatus } : athlete
        )
      );
    } else {
      console.error("No athlete document found with UID:", athleteUid);
    }
  };
  return (
    <div className="bg-[rgba(255,255,255,0.1)] min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-blue-600 mt-6">
          Athletes
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {athletes.map((athlete) => (
            <div key={athlete.id} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{athlete.name}</h2>
              <p className="text-gray-600 mb-2">{athlete.sport}</p>
              <p className="text-gray-600 mb-2">Age: {athlete.age}</p>
              <p className="text-gray-600 flex items-center mb-2">
                <MapPin className="mr-1" /> {athlete.state}
              </p>
              <p className="text-gray-600 flex items-center mb-2">
                <Calendar className="mr-1" /> DOB: {athlete.dob}
              </p>
              <p className="text-gray-600 flex items-center mb-2">
                <Users className="mr-1" /> Experience: {athlete.experience} years
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleValidToggle(athlete.id, athlete.valid)}
                  className={`px-4 py-2 rounded-lg text-white ${
                    athlete.valid ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {athlete.valid ? "Verified" : "Not Verified"}
                </button>
                <button
                  onClick={() =>
                    handleParticipationToggle(athlete.id, athlete.canParticipate)
                  }
                  className={`px-4 py-2 rounded-lg text-white ${
                    athlete.canParticipate ? "bg-blue-500" : "bg-gray-500"
                  }`}
                >
                  {athlete.canParticipate ? "Can Participate" : "Cannot Participate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
