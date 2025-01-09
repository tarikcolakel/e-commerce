import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSelectedCard = ({ card }) => {
  if (!card) return null;

  return (
    <div className="relative h-52 w-80 mx-auto mb-6">
      <motion.div
        className="absolute w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white shadow-xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Kart çip ve logo alanı */}
        <div className="flex items-start justify-between mb-6">
          <div className="h-12 w-16 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-md" />
          <div className="text-2xl font-bold italic text-right">VISA</div>
        </div>
        
        {/* Kart numarası */}
        <div className="mt-6 mb-8">
          <div className="flex items-center space-x-2">
            <p className="font-mono text-xl tracking-[0.1em]">****</p>
            <p className="font-mono text-xl tracking-[0.1em]">****</p>
            <p className="font-mono text-xl tracking-[0.1em]">****</p>
            <p className="font-mono text-xl tracking-[0.1em]">{card.card_no.slice(-4)}</p>
          </div>
        </div>
        
        {/* Kart sahibi ve son kullanma tarihi */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex justify-between items-end space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-300 mb-1">Card Holder</p>
              <p className="font-medium tracking-wide truncate text-base">
                {card.name_on_card}
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <p className="text-xs text-gray-300 mb-1">Expires</p>
              <p className="font-medium text-base">
                {card.expire_month.toString().padStart(2, '0')}/
                {card.expire_year.toString().slice(-2)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedSelectedCard; 