import BackButton from "@/components/Button/BackButton";
import CompanyDetail from "@/components/card/CompanyDetail";
import prismaClient from "@/services/prisma";

export default async function page() {
  
  const companies = await prismaClient.company.findMany({
    include: {
      owner: true,
    },
  });

  return (
    <div className="flex flex-col flex-1 p-8 min-h-screen">
      <div className="flex items-center mb-8 justify-between">
        <h1 className="text-3xl font-bold mb-8">Company List</h1>
        <BackButton />
      </div>
      <CompanyDetail companies={companies} />
    </div>
  );
}
