import { Link } from "react-router-dom";
import image from "../images/Woman_no-bg.png";

function Index() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
  

      {/* Main Content Area */}
      <div className="flex-grow p-4">
        <div className="flex">
        
          <table className="w-full h-90vh">
            <tbody>
             
              <tr>
              {/* Text Box (Left) */}
              <td style={{ padding: '300px', border: '1px solid #000' }}> 
                  <div className="w-full p-4"> {/* Added w-full for uniform width */}
                    <h2 className="text-xl font-bold">Write Your nonfiction Book, lighting fast</h2>
                    <p style={{ paddingTop: '20px' }}>Add your text content here.</p>
                    {/* Button */}
                    <Link to="/books">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                      get started
                    </button>
                    </Link>
               
             
                  </div>
               </td>

                {/* Center table space */}
                <td style={{ padding: '5px', border: '1px solid #000' }}></td>
                
                {/* Image Box (Right) */}
                <td style={{ padding: '100px', border: '1px solid #000', backgroundColor: 'lightgrey'}}> 
                  <div className="w-full p-4"> {/* Added w-full for uniform width */}
                    <h2 className="text-xl font-semibold"></h2>
                    <img
                      src="image"
                      alt="image"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </td>
                
              </tr>
               
                {/* Footer */}
                <tr style={{ padding: '50px', border: '1px solid #000',textJustify:'center'}}>
                <td>
                <h3 className="text-small">
  @ Copyrights 2023 - <a href="https://www.linkedin.com/in/divya-rajendra-8356225b/">Divya</a> and <a href="https://www.linkedin.com/in/julia-mp/">Julia</a>
              </h3>
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
