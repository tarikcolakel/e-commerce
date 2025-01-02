import React from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const locations = [
    {
      city: 'Paris',
      address: '1901 Thorn ridge Cir',
      postalCode: '75800 Paris',
      phone: '+431 215 215',
      fax: '+431 215 215'
    },
    {
      city: 'New York',
      address: '2715 Ash Dr. San Jose,',
      postalCode: '75800 Paris',
      phone: '+431 215 215',
      fax: '+431 215 215'
    },
    {
      city: 'Berlin',
      address: '4140 Parker Rd.',
      postalCode: '75800 Paris',
      phone: '+431 215 215',
      fax: '+431 215 215'
    },
    {
      city: 'London',
      address: '3517 W. Gray St. Utica,',
      postalCode: '75800 Paris',
      phone: '+431 215 215',
      fax: '+431 215 215'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sol Taraf - İletişim Bilgileri */}
      <motion.div 
        className="w-full lg:w-1/2 bg-gradient-to-br from-teal-900 to-cyan-500 p-8 lg:p-16 text-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-lg mx-auto lg:mx-0">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">CONTACT US</h1>
          <p className="text-base lg:text-lg mb-6 lg:mb-8 opacity-90">
            Problems trying to resolve the conflict between 
            the two major realms of Classical physics: 
            Newtonian mechanics
          </p>
          <button className="w-full lg:w-auto bg-blue-500 text-white px-6 lg:px-8 py-3 rounded-md hover:bg-blue-600 transition-colors">
            CONTACT US
          </button>
        </div>
      </motion.div>

      {/* Sağ Taraf - Lokasyonlar ve Görsel */}
      <div className="w-full lg:w-1/2 relative">
        {/* Lokasyonlar Grid */}
        <motion.div 
          className="relative lg:absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 p-8 lg:p-16 bg-white lg:bg-opacity-90 z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {locations.map((location, index) => (
            <motion.div 
              key={index}
              className="space-y-2 bg-white lg:bg-transparent p-4 rounded-lg shadow-md lg:shadow-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">{location.city}</h3>
              <p className="text-sm lg:text-base text-gray-600">{location.address}</p>
              <p className="text-sm lg:text-base text-gray-600">{location.postalCode}</p>
              <p className="text-sm lg:text-base text-gray-600">Phone: {location.phone}</p>
              <p className="text-sm lg:text-base text-gray-600">Fax: {location.fax}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Arka Plan Görseli - Sadece desktop'ta görünür */}
        <div className="hidden lg:block absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Fashion"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
