import "./App.css";
import { FaTrainTram } from "react-icons/fa6";
import Footer from "./components/Footer";
import SeatLayout from "./components/SeatLayout";
import { ToastContainer } from "react-toastify";  // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";   // Import react-toastify CSS

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="bg-primary w-full p-6 gap-4 flex items-baseline justify-center">
        <FaTrainTram className="text-red-400 text-3xl "/>
        <p className="text-3xl font-serif font-bold text-red-400">Unstop Assignment</p>
      </div>
      <div>
        <SeatLayout />
      </div>
      <div className="w-full">
        <Footer />
      </div>

      {/* Add ToastContainer here */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}

export default App;
