import React, { useState } from "react";
import axios from 'axios'; 
import { AiOutlineClose } from "react-icons/ai";
import { toast } from 'react-toastify'; // Import toast

const SeatBooking = ({ setShowBookingForm, seatId, refetchSeats }) => {
  const [count, setCount] = useState(0);
  const [booked, setBooked] = useState([]);
  const [error, setError] = useState(null);

  // Handle booking seats
  const handleBook = async () => {
    if (count > 0) {
      try {
        // Send the booking request to the backend
        const response = await axios.post("http://localhost:4000/api/v1/seats/reserve", {
          seatId,
          seatCount: count,
        });

        console.log(response);

        // If booking is successful, update booked seats
        setBooked([...booked, count]);

        // Refetch seats to reflect the updated seat statuses
        refetchSeats();

        // Show success toast with the seat numbers
        toast.success(`Successfully booked seat number(s): ${response.data}`);

        // Close the booking form after successful booking
        setShowBookingForm(false);
      } catch (error) {
        setError("Failed to book seats. Please try again.");
        toast.error("Failed to book seats. Please try again."); // Show error toast
        console.error("Booking error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white p-6 rounded-3xl shadow-lg space-y-4">
      <button
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-8"
        onClick={() => setShowBookingForm(false)}
      >
        <AiOutlineClose className="text-2xl text-black" />
      </button>

      <h1 className="text-3xl font-bold">Welcome</h1>
      <p className="text-lg">Book Your Seat</p>

      <div className="flex items-center justify-center space-x-2">
        <label className="w-1/3 text-right text-lg">Seats:</label>
        <input
          type="number"
          className="border-2 border-gray-300 p-2 rounded-lg w-1/2"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={handleBook}
      >
        Book
      </button>
    </div>
  );
};

export default SeatBooking;
