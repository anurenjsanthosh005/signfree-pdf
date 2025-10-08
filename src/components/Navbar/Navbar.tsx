import Logo from "/SignFreePDF.png";

function Navbar() {
  return (
    <div className="w-screen bg-[#134686] flex items-center h-[80px] px-4">
      <div className="flex justify-center w-full sm:justify-between">
        <div className="max-h-16 max-w-[300px] overflow-hidden sm:max-w-[200px] ">
          <img
            src={Logo}
            alt="SignFreePDF logo"
            className="h-full w-auto object-contain"
          />
        </div> 
      </div>
    </div>
  );
}

export default Navbar;
