import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = '1lFQaxLeDTE'; // Sadece ID kısmını kullanıyoruz
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <AnimatePresence>
        {!isPlaying ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <img 
              src={thumbnailUrl}
              alt="Video Thumbnail"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <button 
                className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                onClick={handlePlayClick}
              >
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    d="M8 5v10l7-5-7-5z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-video"
          >
            <iframe
              className="w-full h-[500px]"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="About Us Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer; 