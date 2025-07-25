import { FaRupeeSign, FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import CountUp from "react-countup";
import { useCurrency } from "../../CurrencySelector/CurrencyContext";

const currencyIcons = {
  INR: <FaRupeeSign />,
  USD: <FaDollarSign />,
  EUR: <FaEuroSign />,
  GBP: <FaPoundSign />,
};

const Card = ({ text, total, textColor = "text-green-500" }) => {
  const { currency, convert } = useCurrency();
  const convertedAmount = convert(total);

  return (
    <div className={`bg-gray-800 ${textColor} rounded p-6 text-center shadow w-full`}>
      <div className="text-3xl font-bold flex justify-center items-center mb-2">
        {currencyIcons[currency]}
      </div>
      <div className="text-gray-300 text-lg mb-1">{text}</div>
      <div className="text-2xl font-bold flex justify-center items-center gap-1">
        {currencyIcons[currency]}
        <CountUp start={0} end={convertedAmount} duration={2} separator="," decimals={2} />
      </div>
    </div>
  );
};

export default Card;
