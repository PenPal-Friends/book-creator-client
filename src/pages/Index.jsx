// If NOT logged in, display:

function Index() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-300 text-white w-1/1.5 p-2">
        <h1 className="text-2xl font-bold">PenPal & Friends</h1>
        {/* Add links, navigation, or other sidebar content here */}
      </div>
      

       {/* Main Content Area */}
       <div className="flex-grow p-4">
        <div className="flex">
          {/* Text Box (Left) */}
          <div className="w-1/2 p-4">
            <h2 className="text-xl font-semibold">Write Your nonfiction Book, lighting fast</h2>
            <p>Add your text content here.</p>
          </div>
          {/* Image Box (Right) */}
          <div className="w-1/2 p-4">
            <h2 className="text-xl font-semibold">Image Box</h2>
            <img
              src="your-image-url.jpg"
              alt="Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    <div className="bg-gray-300 text-white p-4 text">
      &copy; {new Date().getFullYear()} PenPal & Friends
    </div>
    </div>
  );
}
export default Index;