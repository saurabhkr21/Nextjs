import prismaClient from "@/services/prisma";

export default async function page() {
  const companies = await prismaClient.company.findMany({
    include: {
      owner: true,
    },
  });
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Company List
      </h1>

      {companies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((comp) => (
            <div
              key={comp.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {comp.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {comp.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Owner: {comp.owner.email}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No companies found.</p>
      )}
    </div>
  );
}
