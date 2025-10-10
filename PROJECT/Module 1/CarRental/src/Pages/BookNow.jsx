import React, { useState } from 'react';
import CarCard from '../Components/CarCard.jsx';
import AdminCarCard from '../Components/AdminCarCard.jsx';
import { availableCars } from '../assets/MockCarData.js';
import { availableCars1 as adminCars } from '../assets/AdminCarData.js';

const BookNow = () => {
  const [searchLocation, setSearchLocation] = useState('');

  const filteredAdminCars = adminCars.filter((car) =>
    car.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  return (
    <div className="mt-18 flex flex-col pl-14 bg-gray-500/50">
      {/* Admin Car List */}
      <div className="flex flex-col w-full mb-5">
        <h2 className="text-2xl font-bold text-center mt-5">Location Specific Cars</h2>
        
        {/* Search bar under title */}
        <div className="flex justify-end mt-4 mb-5">
          <input
            type="text"
            placeholder="Search by location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="p-2 rounded border border-gray-400 focus:outline-none w-64"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {filteredAdminCars.length > 0 ? (
            filteredAdminCars.map((car) => (
              <div key={car.id} className="w-[22%] min-w-[250px]">
                <AdminCarCard car={car} />
              </div>
            ))
          ) : (
            <p className="text-center w-full text-xl mt-5">No car available</p>
          )}
        </div>
      </div>

      {/* Available Cars */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-5 ">Exclusive All India Available Cars</h2>
        <h3 className="text-l  text-center mb-20 ">All displayed cars are available across India if booked at least 1 week in advance.</h3>
        <div className="flex flex-wrap justify-center gap-20 mb-10">
          {availableCars.map((car) => (
            <div key={car.id} className="w-[22%] min-w-[250px]">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookNow;
