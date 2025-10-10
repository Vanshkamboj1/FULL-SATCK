
import React, { useState, useEffect } from 'react';
import { availableCars } from '../assets/MockCarData';
import Background from '../assets/images/Background.png';
import CarCard from '../Components/CarCard';




function LandingPage() {
    const [cars, setCars] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const carsPerPage = 4;
  
    useEffect(() => {
      setCars(availableCars);
    }, []);
  
    const next = () => {
      if (currentIndex + carsPerPage < cars.length) {
        setCurrentIndex(currentIndex + carsPerPage);
      }
    };
  
    const prev = () => {
      if (currentIndex - carsPerPage >= 0) {
        setCurrentIndex(currentIndex - carsPerPage);
      }
    };
  
    const componentStyle = {
      backgroundImage: `url(${Background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      minHeight: '100vh',
    };
  
    const visibleCars = cars.slice(currentIndex, currentIndex + carsPerPage);

  return (
    <div style={componentStyle} className="py-8 mt-10">
      <div className="p-6">
        {/* Slogan Section */}
        <div className="p-3   rounded-xl  mx-auto mb-4">
          <h1 className="text-4xl  font-semibold text-black/60 text-center drop-shadow-md leading-snug">
            Experience the Road Like Never Before – Premium Cars, Seamless Booking, and Unmatched Comfort at Your Fingertips.
          </h1>
        </div>

        {/* Title */}
        <h4 className="text-3xl font-bold text-center mb-1 text-black/60 mt-20">Available Cars</h4>
        <p className="text-sm text-center text-black mb-4 drop-shadow-md">
          All displayed cars are available across India if booked at least 1 week in advance.
        </p>

        {/* Slider Buttons */}
        <div className="flex justify-end mb-4 gap-2">
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className={`p-2 rounded ${currentIndex === 0 ? 'bg-[#FFF8DC] cursor-not-allowed' : 'bg-[#FFF8DC] hover:bg-gray-200'}`}
          >
            &#8592;
          </button>
          <button
            onClick={next}
            disabled={currentIndex + carsPerPage >= cars.length}
            className={`p-2 rounded ${currentIndex + carsPerPage >= cars.length ? 'bg-[#FFF8DC] cursor-not-allowed' : 'bg-[#FFF8DC] hover:bg-gray-200'}`}
          >
            &#8594;
          </button>
        </div>

        {/* Car Cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {visibleCars.map((car) => (
            <CarCard key={car.id} car={car} className="w-48" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;