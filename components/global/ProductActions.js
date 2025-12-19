"use client";

import React, { useState, useEffect } from "react";
import BespokeModal from "./BespokeModal";

export default function ProductActions({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // Safely get the URL on the client side
    setCurrentUrl(window.location.href);
  }, []);

  const whatsappNumber = "2348089123538";
  
  // Luxury phrasing: Includes the specific product link for the Concierge
  const message = `Hello GodFirst Concierge,\n\nI am captivated by the "${product.name}" and would like to begin a personal commission for this piece.\n\nLink to piece: ${currentUrl}`;
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-primary text-black py-5 text-center text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-all duration-500 shadow-xl"
        >
          Concierge Enquiry
        </a>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex-1 border border-white/10 text-white py-5 text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-black transition-all duration-500 cursor-pointer"
        >
          Commission This Piece
        </button>
      </div>

      <BespokeModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}