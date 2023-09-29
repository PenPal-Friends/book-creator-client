import { Link } from "react-router-dom";
import image from "../images/Woman_no-bg.png";


function Index() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
  

      {/* Main Content Area */}
      <div className="flex-grow p-4">
        <div className="flex">
        
          <table style={{ height: '90vh', width: '100%'}}>
            <tbody>
             
              <tr>
              {/* Text Box (Left) */}
              <td style={{ padding: '100px'}}> 

                    <h1 className="text-5xl align-left font-bold tracking-wider">Write Your nonfiction Book, lighting fast</h1>
                    {/* Button */}
                    <Link to="/books">
                    <button className="bg-[#24978F] text-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-12">
                      Get started
                    </button>
                    </Link>
               
             

               </td>

                {/* Center table space */}
                <td style={{ padding: '5px'}}></td>
                
                {/* Image Box (Right) */}
                <td style={{ width: "45vw" }}> 
                  <div className="w-full p-4"> {/* Added w-full for uniform width */}
                    <h2 className="text-xl font-semibold"></h2>
                    <img
                      src={image}
                      alt="Woman"
                      style={{ width: "45vw", height: "auto" }}
                    />
                  </div>
                </td>
                
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Index;