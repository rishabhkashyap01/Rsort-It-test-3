import React from 'react';
import Pic1 from '../../assets/testi1.jpg'
import Pic2 from '../../assets/testi2.jpg'
import Pic3 from '../../assets/testi3.jpg'
import Comas from '../../assets/comas.jpg'

const testimonials = [
  {
    name: 'Arvind, Bengaluru',
    image: Pic1, // Replace with the actual image path or URL
    quote: 'Flattered with availability of well maintained cars',
  },
  {
    name: 'Gaurav, Delhi',
    image: Pic2, // Replace with the actual image path or URL
    quote: "Booked a XUV with unlimited kms, very happy with RoyalRides's service",
  },
  {
    name: 'Himanshu, Hyderabad',
    image: Pic3, // Replace with the actual image path or URL
    quote: 'Booked a car for a family trip which was very comfortable and in great condition',
  },
];

const Testimonial = () => {
  return (
    <div className="bg-gray-50 py-12">
      <h2 className="text-center text-gray-500 text-lg font-bold mb-10">Hear From Our Guests</h2>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col justify-center items-center bg-green-50 rounded-lg shadow-2xl p-6 text-center transform transition duration-300">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-[#00a99d]"
              />
              <img src={Comas} alt="Coma" className='mb-4' />
              <h3 className="text-xl font-medium text-gray-800 mb-2">{testimonial.name}</h3>
              <blockquote className="text-gray-600 italic">"{testimonial.quote}"</blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
