import React from 'react';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer';

const AboutPage = () => {
  const stats = [
    { number: '15K', label: 'Happy Customers' },
    { number: '150K', label: 'Monthly Visitors' },
    { number: '15', label: 'Countries Worldwide' },
    { number: '100+', label: 'Top Partners' }
  ];

  return (
    <div className="min-h-screen bg-white py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Sol Taraf - İçerik */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <p className="text-blue-600 font-semibold uppercase tracking-wider">
                ABOUT COMPANY
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                ABOUT US
              </h1>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-gray-700">
                We know how large objects will act, 
                but things on a small scale
              </p>
            </div>

           

            <button className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Get Quote Now
            </button>
          </motion.div>

          {/* Sağ Taraf - Görsel */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Arka plan daire */}
              <div className="absolute inset-0 bg-pink-100 rounded-full transform scale-125" />
              
              {/* Küçük süs daireleri */}
              <div className="absolute top-0 right-0 w-8 h-8 bg-purple-400 rounded-full transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute -top-4 left-1/2 w-4 h-4 bg-pink-300 rounded-full" />
              
              {/* Ana görsel */}
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Shopping Woman"
                className="relative z-10 w-full h-auto rounded-3xl"
              />
            </div>
          </motion.div>
        </div>

        {/* İstatistikler Bölümü */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 my-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Video Bölümü */}
        <motion.div 
          className="my-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <VideoPlayer />
        </motion.div>

        {/* Alt Kısım - Açıklama */}
        <motion.div 
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Met minim Mollie non desert
                Alamo est sit cliquey dolor do met sent.
              </h3>
            </div>
            <div>
              <p className="text-gray-600">
                Problems trying to resolve the conflict between 
                the two major realms of Classical physics: 
                Newtonian mechanics
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
