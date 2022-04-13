import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useSWR from "swr";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const fetcherChart = async (url) => {
  const response = await fetch(url).then((response) => response.json());
  return response;
};

const inter = {
  0.0417: "minutely",
  1: "hourly",
  7: "hourly",
  31: "daily",
  365: "weekly",
};

const coinlistjson = require("../../data/symbols.json");
const colors = require("../../data/colors.json");

export default function Pricechart({
  name,
  vs,
  index,
  dayInter,
  setFirstPrice,
}) {
  const url_price =
    "https://api.coingecko.com/api/v3/coins/" +
    coinlistjson[name] +
    "/market_chart?vs_currency=" +
    vs +
    "&days=" +
    dayInter +
    "&interval=" +
    inter[dayInter];

  const { data, error } = useSWR(url_price, fetcherChart, {
    refreshInterval: 3600000,
  });

  if (error) {
    return <div>failed to load </div>;
  }

  if (!data) {
    return <div>loading...</div>;
  }
  const prices = data.prices;

  const time = [];
  const value = [];

  const dateShown = (date) => {
    if (dayInter === 1 || dayInter === 0.0417) {
      return date.getHours() + ":" + date.getMinutes();
    }
    if (dayInter === 7) {
      return (
        date.getDate() + "/" + date.getMonth() + " " + date.getHours() + "h"
      );
    }
    return date.getDate() + "/" + date.getMonth();
  };

  prices.forEach((e) => {
    var date = new Date(e[0]);
    time.push(dateShown(date));
    value.push(e[1]);
  });

  setFirstPrice(value[0]);

  const color = colors.colors[index % colors.colors.length];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  const chartdata = {
    labels: time,
    datasets: [
      {
        label: "Price",
        data: value,
        borderColor: color,
        backgroundColor: color,
      },
    ],
  };

  return <Line options={options} data={chartdata} />;
}
