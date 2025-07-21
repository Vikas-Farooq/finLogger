import  HomeButtons  from "../Buttons/HomeButtons";
import { FaHome, FaList,  } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

   return (
    <aside className="w-1/6 min-h-screen bg-gray-800 text-white flex flex-col py-6 shadow-lg">
      <h3 className="text-center text-2xl font-bold mb-8 tracking-wide">
        Menu
      </h3>
      <HomeButtons
        text="Home"
        onClick={() => navigate("/home")}
        Icon={FaHome}
      />
      <HomeButtons
        text="Transaction List"
        onClick={() => navigate("/transactions")}
        Icon={FaList}
      />
      <HomeButtons
        text="Categories"
        onClick={() => navigate("/category")}
        Icon={MdCategory }
      />
      
    </aside>
  );
};

export default Sidebar;
