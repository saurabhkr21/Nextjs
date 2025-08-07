//@ts-nocheck
import prismaClient from "@/services/prisma";
import JobCard from "../../components/JobCard";

export default async function Home() {
  const data = await prismaClient.job.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* Main Container */}
      <div className="flex">
        {/* Main Content Area */}
        <div className="flex-1">
          <div className="p-4 lg:p-6">
            {/* Jobs Grid */}
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-indigo-50/30 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl -z-10"></div>

              {/* Jobs Container */}
              <div className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/50 dark:border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
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
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      No Jobs Found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
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
