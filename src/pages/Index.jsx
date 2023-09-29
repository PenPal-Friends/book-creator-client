import React, { useState } from "react";
import Books from "./Books";


function Index() {
  // State variable to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Conditional rendering based on login status
  if (!isLoggedIn) {
    // Display content for not logged in
    return (
      <div className="flex flex-col h-screen px-36"> {/* Added padding on the x-axis */}

        {/* Main Content Area */}
        <div className="flex-grow p-4 mt-16 flex flex-col md:flex-row bg-blue-500">

          {/* Text Box (Left) */}
          <div className="w-full md:w-1/2 p-4 bg-red-200">
            <h2 className="text-xl font-semibold">Text Box</h2>
            <p>Add your text content here.</p>
          </div>
          {/* Image Box (Right) */}
          <div className="relative w-full h-full">
            {/* Background div for the PNG image */}
            <div className="absolute inset-0 bg-gray-200">
              {/* Circle div that acts as a mask for the video */}
              <div className="w-full aspect-w-1 aspect-h-1 rounded-full overflow-hidden">
                <video
                  className="object-cover w-full h-full"
                  autoPlay
                  loop
                  muted
                  src="https://player.pexels.com/videos/15168410/file.mp4"
                ></video>
              </div>
            </div>

            {/* Your PNG image */}
            <img
              src="path_to_your_image.png"
              alt="Your Image Description"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Logo Section */}
        <div className="flex justify-between items-center flex-wrap p-4 bg-blue-100">
          <p className="text-gray-700">Lorem ipsum dolor sit amet.</p>
          <div className="h-6 w-12 bg-gray-300"></div>
          <div className="h-6 w-8 bg-gray-300"></div>
          <div className="h-6 w-16 bg-gray-300"></div>
          <div className="h-6 w-8 bg-gray-300"></div>
          <div className="h-6 w-14 bg-gray-300"></div>
          <div className="h-6 w-16 bg-gray-300"></div>
        </div>
      </div>
    );
  } else {
    // Display content for logged in
    return (
      <div>
        <Books />
      </div>
    );
  }
}

export default Index;