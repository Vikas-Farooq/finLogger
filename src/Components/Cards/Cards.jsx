import { FaRupeeSign } from "react-icons/fa";
import CountUp from "react-countup";

const Card = ({ text, total, textColor = "text-green-500" }) => {
  return (
    <div className={`bg-gray-800 ${textColor} rounded p-6 text-center shadow`}>
      <div className="text-3xl font-bold flex justify-center items-center mb-2">
        <FaRupeeSign />
      </div>
      <div className="text-gray-300 text-lg mb-1">{text}</div>
      <div className="text-2xl font-bold flex justify-center items-center gap-1">
        <FaRupeeSign className="text-base mt-1" />
        <CountUp
          start={0}
          end={total}
          duration={2}
          separator=","
          decimals={0}
        />
      </div>
    </div>
  );
};

export default Card;
