//@ts-nocheck
import data from "@/constraints/data";
import JobCard from "../components/JobCard";

import SideBar from "../components/SideBar";

export default async function Home() {
  // const fetch = require("node-fetch");
  // const url = `https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all`;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "3af7ccc427msh69b1244c7ffd6f6p14d7d0jsnb2e915cfc4d6",
  //     "x-rapidapi-host": "jsearch.p.rapidapi.com",
  //   },
  // };

  // const response = await fetch(url, options);
  // let result = await response.text();
  // result = JSON.parse(result);
  // const data = result.data;

  return (
    <div className="flex gap-2 p-3">
      <div className="w-[350px] gap-10 bg-blue-100 shadow-2xl p-4 rounded h-full hidden sm:flex  sticky top-20">
        <SideBar />
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3  gap-3">
        {data.map((item) => (
          <JobCard key={item.job_id} item={item} />
        ))}
      </div>
    </div>
  );
}
