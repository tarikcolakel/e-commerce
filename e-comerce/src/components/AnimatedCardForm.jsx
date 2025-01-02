import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCardForm = ({ formData }) => {
  return (
    <div className="relative h-56 w-96 mx-auto mb-8">
      <motion.div
        className="absolute w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 text-white shadow-xl overflow-hidden"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: formData.cvv ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Ön yüz */}
        <div className={`absolute inset-0 p-6 ${formData.cvv ? 'invisible' : ''}`}>
          {/* Kart çip ve logo alanı */}
          <div className="flex items-start justify-between mb-4">
            <div className="h-10 w-14 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-md" />
            <div className="text-xl font-bold italic text-right">VISA</div>
          </div>
          
          {/* Kart numarası */}
          <div className="mt-6">
            <p className="font-mono text-2xl tracking-widest">
              {formData.card_no 
                ? formData.card_no.match(/.{1,4}/g).join(' ')
                : '**** **** **** ****'}
            </p>
          </div>
          
          {/* Kart sahibi ve son kullanma tarihi */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex justify-between items-end">
              <div className="flex-1">
                <p className="text-xs text-gray-300 mb-1">Card Holder</p>
                <p className="font-medium tracking-wide truncate">
                  {formData.name_on_card || 'YOUR NAME'}
                </p>
              </div>
              
              <div className="ml-4">
                <p className="text-xs text-gray-300 mb-1">Expires</p>
                <p className="font-medium">
                  {formData.expire_month?.toString().padStart(2, '0') || 'MM'}/
                  {formData.expire_year?.toString().slice(-2) || 'YY'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Arka yüz */}
        <div 
          className={`absolute inset-0 ${!formData.cvv ? 'invisible' : ''}`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-12 bg-gray-700 mt-4" />
          <div className="mt-8 px-6">
            <div className="flex justify-end items-center">
              <div className="bg-white text-gray-900 px-3 py-2 rounded">
                <p className="text-sm font-mono">CVV</p>
                <p className="font-medium">{formData.cvv || '***'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedCardForm; 