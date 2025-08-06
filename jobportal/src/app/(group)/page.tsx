//@ts-nocheck
import SideBarSort from "@/app/(group)/SideBarSort";
import prismaClient from "@/services/prisma";
import JobCard from "../../components/JobCard";
import AddJob from "./AddJob";


export default async function Home() {
   const data = await prismaClient.job.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Main Container */}
      <div className="flex">

        
        <div className="lg:hidden fixed top-20 left-4 z-50">
          <button className="bg-white shadow-lg rounded-lg p-2 border border-blue-200 hover:bg-blue-50 transition-all duration-200">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-[280px]">
          <div className="p-4 lg:p-6">

            {/* Jobs Grid */}
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 rounded-2xl -z-10"></div>

              {/* Jobs Container */}
              <div className="relative bg-white/40 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/50">
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 lg:gap-6">
                  {data.map((item, index) => (
                    <div
                      key={item.id}
                      className="transform transition-all duration-300 hover:scale-[1.02] hover:z-10"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: "fadeInUp 0.6s ease-out forwards",
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
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No Jobs Found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search criteria or check back later.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
