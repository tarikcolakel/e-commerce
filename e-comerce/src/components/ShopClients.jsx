import React from "react";

const ShopClients = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center p-6 bg-white">
      {/* Masaüstü görünümünde 6 logo yan yana sıralanacak, mobilde ise tek sıra halinde */}
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-4">
        <img src="/path-to-logo1.png" alt="Client 1" className="w-32 h-auto object-contain" />
        <img src="/path-to-logo2.png" alt="Client 2" className="w-32 h-auto object-contain" />
        <img src="/path-to-logo3.png" alt="Client 3" className="w-32 h-auto object-contain" />
        <img src="/path-to-logo4.png" alt="Client 4" className="w-32 h-auto object-contain" />
        <img src="/path-to-logo5.png" alt="Client 5" className="w-32 h-auto object-contain" />
        <img src="/path-to-logo6.png" alt="Client 6" className="w-32 h-auto object-contain" />
      </div>
    </section>
  );
};

export default ShopClients;
