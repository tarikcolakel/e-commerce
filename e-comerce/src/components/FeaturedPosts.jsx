import React from "react";
import { AlarmClock } from "lucide-react";
import { ChartArea } from "lucide-react";
import { ChevronRight } from 'lucide-react';

const FeaturedPosts = () => {
  return (
    <div className="container mx-auto p-6">
      
      <div className="text-center mb-8">
        <h2 className="text-lg font-medium text-gray-600">Practice Advice</h2>
        <h1 className="text-3xl font-bold text-gray-900">Featured Posts</h1>
        <p className="text-gray-500 mt-2">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
     
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/100"
            alt=""
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <p className="flex gap-2 text-sm text-gray-400">
              <a href="google.com" className="hover:text-gray-900">
                Google
              </a>
              <a href="#" className="hover:text-gray-900">
                Trending
              </a>
              <a href="#" className="hover:text-gray-900">
                New
              </a>
            </p>
            <h1 className="text-xl font-bold text-gray-800 mt-2">
              Loudest à la Madison #1 (L'integral)
            </h1>
            <p className="text-gray-600 mt-2">
              We focus on ergonomics and meeting you where you work. It's only a
              keystroke away.
            </p>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <p className="flex items-center gap-1">
                <AlarmClock /> 23 April 2021
              </p>
              <p className="flex items-center gap-1">
                <ChartArea /> 10 comments
              </p>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="text-black-600 flex items-center gap-1 hover:underline"
              >
                Learn More <ChevronRight />
              </a>
            </div>
          </div>
        </div>

        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/100"
            alt=""
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <p className="flex gap-2 text-sm text-gray-400">
              <a href="google.com" className="hover:text-gray-900">
                Google
              </a>
              <a href="#" className="hover:text-gray-900">
                Trending
              </a>
              <a href="#" className="hover:text-gray-900">
                New
              </a>
            </p>
            <h1 className="text-xl font-bold text-gray-800 mt-2">
              Loudest à la Madison #1 (L'integral)
            </h1>
            <p className="text-gray-600 mt-2">
              We focus on ergonomics and meeting you where you work. It's only a
              keystroke away.
            </p>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <p className="flex items-center gap-1">
                <AlarmClock /> 23 April 2021
              </p>
              <p className="flex items-center gap-1">
                <ChartArea /> 10 comments
              </p>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="text-black-600 flex items-center gap-1 hover:underline"
              >
                Learn More <ChevronRight />
              </a>
            </div>
          </div>
        </div>

        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="https://via.placeholder.com/100"
            alt=""
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <p className="flex gap-2 text-sm text-gray-400">
              <a href="google.com" className="hover:text-blue-900">
                Google
              </a>
              <a href="#" className="hover:text-gray-900">
                Trending
              </a>
              <a href="#" className="hover:text-gray-900">
                New
              </a>
            </p>
            <h1 className="text-xl font-bold text-gray-800 mt-2">
              Loudest à la Madison #1 (L'integral)
            </h1>
            <p className="text-gray-600 mt-2">
              We focus on ergonomics and meeting you where you work. It's only a
              keystroke away.
            </p>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
              <p className="flex items-center gap-1">
                <AlarmClock /> 23 April 2021
              </p>
              <p className="flex items-center gap-1">
                <ChartArea /> 10 comments
              </p>
            </div>
            <div className="mt-4">
              <a
                href="#"
                className="text-black-600 flex items-center gap-1 hover:underline"
              >
                Learn More <ChevronRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
