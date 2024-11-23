import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Users } from "lucide-react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      const querySnapshot = await getDocs(collection(db, "trainers"));
      const trainersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrainers(trainersData);
    };
    fetchTrainers();
  }, []);

  // Function to toggle 'valid' status
  const handleValidToggle = async (trainerId, currentStatus) => {
    const trainerRef = doc(db, "trainers", trainerId);

    // Check if the document exists before updating
    const trainerDoc = await getDoc(trainerRef);
    if (!trainerDoc.exists()) {
      console.error("No document found with ID:", trainerId);
      return;
    }

    await updateDoc(trainerRef, {
      valid: !currentStatus,
    });
    setTrainers((prev) =>
      prev.map((trainer) =>
        trainer.id === trainerId ? { ...trainer, valid: !currentStatus } : trainer
      )
    );
  };

  return (
    <div className="bg-[rgba(255,255,255,0.1)] min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-blue-600 mt-6">
          Trainers
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{trainer.name}</h2>
              <p className="text-gray-600 mb-2">{trainer.sport}</p>
              <p className="text-gray-600 mb-2">Age: {trainer.age}</p>
              <p className="text-gray-600 flex items-center mb-2">
                <MapPin className="mr-1" /> {trainer.state}
              </p>
              <p className="text-gray-600 flex items-center mb-2">
                <Calendar className="mr-1" /> DOB: {trainer.dob}
              </p>
              <p className="text-gray-600 flex items-center mb-2">
                <Users className="mr-1" /> Experience: {trainer.experience} years
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleValidToggle(trainer.id, trainer.valid)}
                  className={`px-4 py-2 rounded-lg text-white ${
                    trainer.valid ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {trainer.valid ? "Verified" : "Not Verified"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
