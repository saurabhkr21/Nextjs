//@ts-nocheck

import JobCard from "../../components/JobCard";
import data from "../../constraints/data"
export default async function page({ searchParams }) {
  const query = searchParams.query || "software engineer";
  
  // const url = `https://jsearch.p.rapidapi.com/search?query=${query}%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all`;
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
  // const jobsData = result.data;
  // console.log(result);

  // Use local data instead of API data to match with detail page

  const jobsData = data;

  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 p-3">
      {jobsData.map((item) => (
        <JobCard key={item.job_id} item={item} />
      ))}
    </div>
  );
}
