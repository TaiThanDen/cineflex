import React from "react";
import Overview from "../../components/admin/DasboardComponent/Overview";
import type { OverviewItem } from "../../components/admin/DasboardComponent/Overview";
import ChartBox from "../../components/admin/DasboardComponent/ChartBox";
import PodcastTable, {
  type Podcast,
} from "../../components/admin/DasboardComponent/PodcastTable";
import Header from "../../components/admin/LayoutAdmin/Header";

const overviewStats: OverviewItem[] = [
  {
    title: "Total Users",
    value: (
      <>
        155,000
        <span
          className="percent text-green-500 ml-2"
          title="+2.5% from last month"
        >
          +2.5%
        </span>
      </>
    ),
    details: [
      { label: "Active users", value: "37,898" },
      { label: "New Signups", value: "83,832" },
      { label: "Subscribed", value: "35%" },
    ],
  },
  {
    title: "Total Movie",
    value: 322,
    className: "",
    details: [
      { label: "Anime", value: 110, className: "free" },
      { label: "Movie", value: 212, className: "premium" },
    ],
  },
  {
    title: "Total Profit",
    value: "32730$",
    className: "bg-indigo-100",
    button: {
      className:
        "bg-black text-white px-5 py-2 rounded-lg mt-2 font-semibold flex items-center gap-2 hover:bg-gray-800 transition",
      title: "Add New Quiz",
      label: "+ Add New",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width={16}
          height={16}
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      ),
      onClick: () => alert("Add new quiz!"),
    },
  },
];

// Dữ liệu chart User Growth
const userGrowthOptions = {
  chart: { type: "bar", height: 280, toolbar: { show: false } },
  xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
  yaxis: { title: { text: "Users" }, min: 0 },
  legend: { position: "top" },
  dataLabels: { enabled: false },
  stroke: { show: true, width: 2, colors: ["transparent"] },
  colors: ["#1E90FF", "#20C997"],
  plotOptions: { bar: { horizontal: false, columnWidth: "50%" } },
  tooltip: { shared: true, intersect: false },
};
const userGrowthSeries = [
  { name: "New Sign-In", data: [31000, 37000, 29000, 33000, 39000, 40000] },
  { name: "Subscribers", data: [18000, 31000, 22000, 19000, 26000, 18000] },
];

// Dữ liệu chart Revenue
const revenueOptions = {
  chart: { type: "area", height: 280, toolbar: { show: false } },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 3 },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
  yaxis: { title: { text: "Revenue ($)" }, min: 0 },
  tooltip: {
    enabled: true,
    theme: "dark",
    y: { formatter: (val: number) => "$" + val.toLocaleString() },
  },
};
const revenueSeries = [
  {
    name: "Revenue",
    data: [0, 5000, 15000, 12000, 20000, 23000, 18000, 27000, 30000],
  },
];

// Dữ liệu podcast table
const podcasts: Podcast[] = [
  { name: "Nursing Today", author: "Dr. Smith", type: "Free", listens: 12000 },
  { name: "Care & Cure", author: "Nurse Amy", type: "Premium", listens: 9500 },
  { name: "Health Talk", author: "Dr. John", type: "Free", listens: 8700 },
  {
    name: "Wellness Weekly",
    author: "Nurse Lee",
    type: "Premium",
    listens: 7600,
  },
];

// Dữ liệu cho chart Thể loại phim được xem nhiều nhất
const topMovieGenresOptions = {
  chart: { type: "pie" },
  labels: ["Anime", "Action", "Drama", "Comedy", "Horror"],
  legend: { position: "bottom" },
};
const topMovieGenresSeries = [12000, 9500, 8700, 7600, 5400];

// Dữ liệu cho chart Thể loại blog được đọc nhiều nhất
const topBlogGenresOptions = {
  chart: { type: "pie" },
  labels: ["Review", "News", "Tutorial", "Interview"],
  legend: { position: "bottom" },
};
const topBlogGenresSeries = [8000, 6500, 4300, 2100];

const AdminDashboard: React.FC = () => (
  <div className="px-2 sm:px-4 md:px-8 py-4 md:py-8 max-w-full overflow-x-auto">
    <Header />
    <main className=" px-2 sm:px-4 md:px-8 py-4 md:py-8">
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Dashboard Overview
        </h2>
        <Overview stats={overviewStats} />
        <section className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
          <ChartBox
            title="User Growth"
            options={userGrowthOptions}
            series={userGrowthSeries}
            type="bar"
          />
          <ChartBox
            title="Revenue Summary From Subscribers"
            options={revenueOptions}
            series={revenueSeries}
            type="area"
          />
        </section>
        <section className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
          <ChartBox
            title="Top Movie Genres"
            options={topMovieGenresOptions}
            series={topMovieGenresSeries}
            type="pie"
          />
          <ChartBox
            title="Top Blog Genres"
            options={topBlogGenresOptions}
            series={topBlogGenresSeries}
            type="pie"
          />
        </section>
        <PodcastTable podcasts={podcasts} />
      </div>
    </main>
  </div>
);

export default AdminDashboard;
