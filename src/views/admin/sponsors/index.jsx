import React, { useState, useEffect } from "react";
import { MapPin, Phone, Globe } from "lucide-react";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    const fetchSponsors = async () => {
      const querySnapshot = await getDocs(collection(db, "sponsors"));
      const sponsorsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSponsors(sponsorsData);
    };
    fetchSponsors();
  }, []);

  // Function to toggle 'valid' status for sponsors
  const handleValidToggle = async (sponsorId, currentStatus) => {
    const sponsorRef = doc(db, "sponsors", sponsorId);

    // Check if the document exists before updating
    const sponsorDoc = await getDoc(sponsorRef);
    if (!sponsorDoc.exists()) {
      console.error("No document found with ID:", sponsorId);
      return;
    }

    await updateDoc(sponsorRef, {
      valid: !currentStatus,
    });
    setSponsors((prev) =>
      prev.map((sponsor) =>
        sponsor.id === sponsorId ? { ...sponsor, valid: !currentStatus } : sponsor
      )
    );
  };

  return (
    <div className="bg-[rgba(255,255,255,0.1)] min-h-screen bg-gradient-to-br">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-center text-4xl font-bold text-blue-600 mt-6">
          Sponsors
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <div key={sponsor.id} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-2">{sponsor.companyName}</h2>
              <p className="text-gray-600 mb-2">Contact Person: {sponsor.contactPerson}</p>
              <p className="text-gray-600 mb-2">Email: {sponsor.email}</p>
              <p className="text-gray-600 flex items-center mb-2">
                <Phone className="mr-1" /> {sponsor.phone}
              </p>
              <p className="text-gray-600 flex items-center mb-2">
                <Globe className="mr-1" /> <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">{sponsor.website}</a>
              </p>
              <p className="text-gray-600 mb-2">Bio: {sponsor.bio}</p>

              {/* Valid/Invalid Button */}
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleValidToggle(sponsor.id, sponsor.valid)}
                  className={`px-4 py-2 rounded-lg text-white ${
                    sponsor.valid ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {sponsor.valid ? "Valid" : "Invalid"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
