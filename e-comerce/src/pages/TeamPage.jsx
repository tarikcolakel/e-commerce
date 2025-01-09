import React from 'react';
import { motion } from 'framer-motion';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Gökhan',
      role: 'IBM',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in//',
        twitter: 'https://twitter.com/'
      }
    },
    {
      name: 'Tarık',
      role: 'eBay',
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/ahmet-%C3%A7olakel-3b99211b7/',
        twitter: 'https://twitter.com/tarik'
      }
    }
  ];

  return (
    <div className="py-8 md:py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <motion.div 
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Meet Our Team
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Problems trying to resolve the conflict between 
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </motion.div>

        {/* Ekip Üyeleri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto px-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative pb-[100%] sm:pb-[80%] md:pb-[100%]">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base text-blue-600 font-medium">
                  {member.role}
                </p>
                {/* Sosyal Medya İkonları */}
                <div className="flex justify-center space-x-4 mt-4">
                  <a 
                    href={member.social.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 5.16c-.94.42-1.95.7-3 .82 1.08-.65 1.91-1.68 2.3-2.9-1.01.6-2.13 1.03-3.32 1.27-1.95-2.08-5.23-2.18-7.3-.23-1.34 1.26-1.92 3.13-1.52 4.93-4.32-.22-8.33-2.28-11.03-5.77-.47.81-.72 1.74-.72 2.69 0 1.86.95 3.5 2.39 4.45-.88-.03-1.72-.27-2.46-.67v.07c0 2.59 1.84 4.81 4.38 5.32-.46.13-.94.19-1.43.19-.34 0-.68-.03-1.01-.09.7 2.11 2.67 3.59 4.97 3.63-1.86 1.46-4.17 2.27-6.56 2.27-.43 0-.85-.03-1.27-.08 2.4 1.54 5.23 2.37 8.14 2.37 9.77 0 15.11-8.09 15.11-15.11 0-.23 0-.46-.01-.7.99-.72 1.85-1.62 2.56-2.65z"/>
                    </svg>
                  </a>
                  <a 
                    href={member.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
