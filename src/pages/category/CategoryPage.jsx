import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { getAllProducts } = context;

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistance, setSelectedDistance] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const filterProduct = getAllProducts.filter((obj) => {
    const matchesCategory = obj.productType.includes(categoryname);
    const matchesState = selectedState ? obj.state === selectedState : true;
    const matchesCity = selectedCity ? obj.city === selectedCity : true;
    const matchesDistance = selectedDistance
      ? obj.distance <= selectedDistance
      : true;
    const matchesPrice = selectedPrice ? obj.totalPrice <= selectedPrice : true;

    return (
      matchesCategory &&
      matchesState &&
      matchesCity &&
      matchesDistance &&
      matchesPrice
    );
  });

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleDistanceChange = (e) => {
    setSelectedDistance(e.target.value);
  };

  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };

  return (
    <Layout>
      <div className="category-page min-h-screen flex">
        
        <div className="w-1/4 bg-[#0c2845] text-white p-6 shadow-lg">
  <h2 className="text-3xl font-bold mb-6 border-b-2 border-[#008f87] pb-2">Filters</h2>

  <div className="mb-6">
    <label htmlFor="state" className="text-[#008f87] block text-lg font-semibold mb-2">
      State
    </label>
    <select
      id="state"
      className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[#008f87]"
      onChange={handleStateChange}
    >
      <option value="">All States</option>
      <option value="Maharashtra">Maharashtra</option>
      <option value="Rajasthan">Rajasthan</option>
      <option value="Karnataka">Karnataka</option>
      <option value="Andhra Pradesh">Andhra Pradesh</option>
    </select>
  </div>

  <div className="mb-6">
    <label htmlFor="city" className="text-[#008f87] block text-lg font-semibold mb-2">
      City
    </label>
    <select
      id="city"
      className="w-full p-3 mt-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-[#008f87]"
      onChange={handleCityChange}
    >
      <option value="">All Cities</option>
      <option value="Mumbai">Mumbai</option>
      <option value="Jaipur">Jaipur</option>
      <option value="Bangalore">Bangalore</option>
      <option value="Visakhapatnam">Visakhapatnam</option>
    </select>
  </div>

  <div className="mb-6">
    <label htmlFor="distance" className="text-[#008f87] block text-lg font-semibold mb-2">
      Distance
    </label>
    <div className="mt-2 space-y-2 space-x-2">
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="distance"
          value="1"
          onChange={handleDistanceChange}
          className="form-radio accent-[#008f87] focus:ring-2 focus:ring-[#008f87]"
        />
        <span className="ml-2">Below 1 km</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="distance"
          value="5"
          onChange={handleDistanceChange}
          className="form-radio accent-[#008f87] focus:ring-2 focus:ring-[#008f87]"
        />
        <span className="ml-2">Below 5 km</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="distance"
          value="7"
          onChange={handleDistanceChange}
          className="form-radio accent-[#008f87] focus:ring-2 focus:ring-[#008f87]"
        />
        <span className="ml-2">Below 7 km</span>
      </label>
    </div>
  </div>

  <div className="mb-6">
    <label htmlFor="price" className="text-[#008f87] block text-lg font-semibold mb-2">
      Price
    </label>
    <div className="mt-2 space-y-2 space-x-2">
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="price"
          value="200"
          onChange={handlePriceChange}
          className="form-radio accent-[#008f87] focus:ring-2 focus:ring-[#008f87]"
        />
        <span className="ml-2">Below ₹200</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="price"
          value="300"
          onChange={handlePriceChange}
          className="form-radio accent-[#008f87] focus:ring-2 focus:ring-[#008f87]"
        />
        <span className="ml-2">Below ₹300</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          name="price"
          value="400"
          onChange={handlePriceChange}
          className="form-radio accent-[#008f87] focus:ring-2 focus:ring-[#008f87]"
        />
        <span className="ml-2">Below ₹400</span>
      </label>
      
    </div>
    <div className="mt-2 space-y-2 space-x-2">
    <label className="inline-flex items-center">
        <input
          type="radio"
          name="price"
          value="401"
          onChange={handlePriceChange}
          className="form-radio accent-[#008f87] focus:ring-2 focus:ring-[#008f87]"
        />
        <span className="ml-2">Above ₹400</span>
      </label>
    </div>
  </div>
</div>


        <div className="w-3/4 bg-gray-100 p-8">
          {filterProduct.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filterProduct.map((item, index) => {
                const {
                  name,
                  thumbnail,
                  totalPrice,
                  state,
                  city,
                  quantity,
                  distance,
                  id,
                } = item;
                return (
                  <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                  >
                    <img
                      src={thumbnail}
                      alt={name}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => navigate(`/productinfo/${id}`)}
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-bold mb-2">{name}</h2>
                      <div className="flex justify-between items-center text-gray-700">
                        <p className="text-lg font-semibold">
                          ₹{totalPrice},{" "}
                          <span className="text-sm font-normal">
                            {quantity}kg
                          </span>
                        </p>
                        <p className="text-sm">
                          {state}, <span className="text-xs">{city}</span>
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {distance}km away
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-600">No products found in this category.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
