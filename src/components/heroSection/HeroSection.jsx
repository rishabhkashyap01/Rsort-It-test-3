import React from "react";
import { GiWheat } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const storedUser = localStorage.getItem('users');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();

  return (
    <div className="relative h-[55vh] bg-[#0a2540] text-white flex">
      {/* For user */}
      {(user?.role==='user')&&(
        <div>
        {/* Huge Text */}
        <div className="absolute top-10 left-10">
          <h1 className="text-4xl font-bold text-[#00a99d]">
            WANT TO SELL YOUR RECYCLABLE PRODUCTS?
          </h1>
          <p className="mt-4 text-3xl text-gray-300">
            Earn Effortlessly by selling your products to <br />
            recycling companies or scrap-dealers.
          </p>
          <p className="mt-2 text-xl text-gray-400 max-w-md">
            This is a platform being made with the intention of reusing and
            recycling the products, reducing waste from the environment and
            making it profitable for the users by selling the products at a high
            bid.
          </p>
        </div>

        {/* Car Icon */}
        <div className="absolute h-1/2 w-1/4 top-8 right-10 text-[23rem] text-[#00a99d]">
          <GiWheat />
        </div>

        {/* ADD VEHICLE Button */}
        <div className="absolute bottom-7 left-10 ">
          <button
            onClick={() => navigate("/owner-dashboard")}
            className="px-8 py-3 text-lg bg-[#00a99d] text-white rounded-lg hover:bg-[#008f87] transition duration-300"
          >
            ADD PRODUCT
          </button>
        </div>
      </div>
      )}

      {/* For scrap dealers */}
      {(user?.role==='scrapdealer')&&(
        <div>
        {/* Huge Text */}
        <div className="absolute top-10 left-10">
          <h1 className="text-4xl font-bold text-[#00a99d]">
            WANT TO GET YOUR RECYCLABLE PRODUCTS?
          </h1>
          <p className="mt-4 text-3xl text-gray-300">
            Browse and Bid various recyclabe products to <br />
            for the best user can get.
          </p>
          <p className="mt-2 text-xl text-gray-400 max-w-md">
            This is a platform being made with the intention of reusing and
            recycling the products, reducing waste from the environment and
            making it profitable for the users by selling the products at a high
            bid.
          </p>
        </div>

        {/* Car Icon */}
        <div className="absolute h-1/2 w-1/4 top-8 right-10 text-[23rem] text-[#00a99d]">
          <GiWheat />
        </div>

        
      </div>
      )}

      {(user?.role==='ngo')&&(
        <div>
        {/* Huge Text */}
        <div className="absolute top-10 left-10">
          <h1 className="text-4xl font-bold text-[#00a99d]">
            WANT TO KNOW YOUR WHERE THE WASTE IS DUMPED?
          </h1>
          <p className="mt-4 text-3xl text-gray-300">
            Go to our community page and know where and <br />
            at which place waste is dumped.
          </p>
          <p className="mt-2 text-xl text-gray-400 max-w-md">
            This is a platform being made with the intention of reusing and
            recycling the products, reducing waste from the environment and
            making it profitable for the users by selling the products at a high
            bid.
          </p>
        </div>

        {/* Car Icon */}
        <div className="absolute h-1/2 w-1/4 top-8 right-10 text-[23rem] text-[#00a99d]">
          <GiWheat />
        </div>

        
      </div>
      )}
      
    </div>
  );
};

export default HeroSection;
