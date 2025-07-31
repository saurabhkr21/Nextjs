//@ts-nocheck

// import data from "@/constraints/data";
import { useJobContext } from "@/context";
import JobCard from "../components/JobCard";
import SideBar from "../components/SideBar";
// import data from "@/components/jobfetcher"

export default async function Home() {
  // const {page,setPage,handleDecrement,handleIncrement }=useJobContext();
  
  const url = `https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all`;
  const options = {
    method: "GET",
    headers: {
      'x-rapidapi-key': '42e9e02d34msheeebd4a9eb7dc51p17f22cjsn216d24919359',
    'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    },
  };

  const response = await fetch(url, options);
  let result = await response.text();
  result = JSON.parse(result);
  const data = result.data;


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Main Container */}
      <div className="flex">
        {/* Sidebar - Fixed positioning for desktop */}
        <div className="hidden lg:block">
          <div className="fixed top-20 left-0 h-[calc(100vh-5rem)] z-40">
            <SideBar />
          </div>
        </div>

        {/* Mobile Sidebar Toggle (for future implementation) */}
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <button className="bg-white shadow-lg rounded-lg p-2 border border-blue-200 hover:bg-blue-50 transition-all duration-200">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-[280px]">
          <div className="p-4 lg:p-6">
            {/* Page Header */}
            <div className="mb-6">
              {/* <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  🎯 Discover Your Dream Job
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  Explore thousands of opportunities tailored for your career growth
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">{data.length} Jobs Available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>🕒 Updated recently</span>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Jobs Grid */}
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 rounded-2xl -z-10"></div>
              
              {/* Jobs Container */}
              <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/50">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
                  {data.map((item, index) => (
                    <div
                      key={item.job_id}
                      className="transform transition-all duration-300 hover:scale-[1.02] hover:z-10"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <JobCard item={item} />
                    </div>
                  ))}
                </div>

                {/* Empty State (if no jobs) */}
                {data.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Jobs Found</h3>
                    <p className="text-gray-500">Try adjusting your search criteria or check back later.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Load More Section */}
            {data.length > 0 && (
              <div className="mt-8 text-center">
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/50">
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    🔄 Load More Jobs
                  </button>
                  <p className="text-gray-500 text-sm mt-3">
                    Showing {data.length} of {data.length}+ available positions
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      
    </div>
  );
}