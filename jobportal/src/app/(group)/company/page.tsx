import CompanyDetail from "@/components/CompanyDetail";
import prismaClient from "@/services/prisma";

export default async function page() {
  const companies = await prismaClient.company.findMany({
    include: {
      owner: true
    },
  });
  
  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Company List
      </h1>
      <CompanyDetail companies={companies} />
    </div>
  );
}