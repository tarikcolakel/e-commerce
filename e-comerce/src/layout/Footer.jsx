import React from "react";
import {  Instagram } from "lucide-react";
import { Facebook } from 'lucide-react';
import { Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-6">
      <div className="container mx-auto">
        {/* Desktop Görünüm */}
        <div className="hidden lg:flex flex-col gap-6">
          {/* İlk Satır: Bandage ve İkonlar */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold">Bandage</h2>
              <div className="flex gap-2">
                <Facebook className="bg-[#23A6F0]" />
                <Twitter className="bg-[#23A6F0]" />
                <Instagram className="bg-[#23A6F0]" />
              </div>
            </div>
          </div>

          {/* İkinci Satır: Company Info ve Get in Touch */}
          <div className="flex justify-between items-start gap-8">
            {/* 1. Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Company Info</h3>
              <ul className="space-y-2 text-gray-600">
                <li>About Us</li>
                <li>Carrier</li>
                <li>We Are Hiring</li>
                <li>Blog</li>
              </ul>
            </div>

            {/* 2. Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <ul className="space-y-2 text-gray-600">
              <li>About Us</li>
                <li>Carrier</li>
                <li>We Are Hiring</li>
                <li>Blog</li>
              </ul>
            </div>

            {/* 3. Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Business Marketing</li>
                <li>User Analytic</li>
                <li>live Chat</li>
                <li>Unlimited Support</li>
              </ul>
            </div>

            {/* 4. Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>IOS & Android</li>
                <li>Watch a Demo</li>
                <li>Customers</li>
                <li>API</li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="p-2 border border-gray-300 rounded-md flex-1"
                />
                <button className="bg-[#23A6F0] text-white px-4 py-2 rounded-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Alt Satır: Made With Love */}
          <div className="text-center text-gray-600 mt-6">
            Made With Love By Finland | All Rights Reserved
          </div>
        </div>

        {/* Mobil Görünüm */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* İlk Kısım: Bandage ve İkonlar */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold">Bandage</h2>
            <div className="flex gap-2">
              <Facebook className="bg-[#23A6F0]" />
              <Twitter  className="bg-[#23A6F0]"/>
              <Instagram  className="bg-[#23A6F0]"/>
            </div>
          </div>

          {/* Company Info ve Mail */}
          <div className="flex flex-col gap-6">
            {/* 1. Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Company Info</h3>
              <ul className="space-y-2 text-gray-600">
              <li>About Us</li>
                <li>Carrier</li>
                <li>We Are Hiring</li>
                <li>Blog</li>
              </ul>
            </div>

            {/* 2. Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <ul className="space-y-2 text-gray-600">
              <li>About Us</li>
                <li>Carrier</li>
                <li>We Are Hiring</li>
                <li>Blog</li>
              </ul>
            </div>

            {/* 3. Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="space-y-2 text-gray-600">
              <li>Business Marketing</li>
                <li>User Analytic</li>
                <li>live Chat</li>
                <li>Unlimited Support</li>
              </ul>
            </div>

            {/* 4. Company Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Resources</h3>
              <ul className="space-y-2 text-gray-600">
              <li>IOS & Android</li>
                <li>Watch a Demo</li>
                <li>Customers</li>
                <li>API</li>
              </ul>
            </div>

            {/* Get in Touch */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 border border-gray-300 rounded-md flex-1"
                />
                <button className="bg-[#23A6F0] text-white px-4 py-2 rounded-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Made With Love */}
          <div className="text-center text-gray-600 mt-6">
            Made With Love By Finland | All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
