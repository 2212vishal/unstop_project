import React, { useEffect, useState } from 'react';
import { PiArmchairFill } from "react-icons/pi"; 
import axios from 'axios'; 
import SeatBooking from "./SeatBooking";
import { toast } from 'react-toastify'; // Import toast
import Loader from './Loader'; // Import the Loader component

const SeatLayout = () => {
  const [seats, setSeats] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedSeatId, setSelectedSeatId] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for the loader

  // Fetch seats from the API
  const fetchSeats = async () => {
    setLoading(true); // Show loader when fetching seats
    try {
      const response = await axios.get("https://unstop-project.onrender.com/api/v1/seats");
      setSeats(response.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    } finally {
      setLoading(false); // Hide loader after fetching seats
    }
  };

  useEffect(() => {
    fetchSeats();
  }, []);

  // Reset all seats
  const handleResetSeats = async () => {
    setLoading(true); // Show loader when resetting seats
    try {
      await axios.patch("https://unstop-project.onrender.com/api/v1/seats/reset");
      toast.success("All seats have been reset!"); // Show success toast
      fetchSeats(); // Refetch seats after reset
    } catch (error) {
      toast.error("Failed to reset seats!"); // Show error toast
      console.error("Error resetting seats:", error);
    } finally {
      setLoading(false); // Hide loader after resetting seats
    }
  };

  // Handle seat booking
  const handleBookSeat = (seatId) => {
    setSelectedSeatId(seatId);
    setShowBookingForm(true);
  };

  return (
    <div className="p-5 relative">
      <div className="mb-4 flex justify-between">
        <button
          onClick={handleResetSeats}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset All Seats
        </button>
        <button
          onClick={() => setShowBookingForm(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Book Seat
        </button>
      </div>

      {/* Loader overlay for when seats are resetting */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center mt-20 bg-white bg-opacity-75 z-10">
          <Loader /> {/* Show loader at the center of the seats grid */}
        </div>
      )}
      

      {/* Seats grid, hidden when loading */}
      {!loading && (
        <div className="grid grid-cols-7 gap-4">
          {seats.map((seat) => (
            <div key={seat._id} className="flex flex-col items-center p-2">
              <PiArmchairFill
                className={`text-4xl ${seat.isReserved ? 'text-red-500' : 'text-green-500'}`}
                onClick={() => !seat.isReserved && handleBookSeat(seat._id)}
              />
              <span className="mt-2 text-sm font-semibold">{seat.seatNum}</span>
            </div>
          ))}
        </div>
      )}

      {/* Popup Modal for Booking Form */}
      {showBookingForm && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* Booking form */}
            <SeatBooking
              seatId={selectedSeatId}
              setShowBookingForm={setShowBookingForm}
              refetchSeats={fetchSeats} // Pass refetch function to SeatBooking
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;
