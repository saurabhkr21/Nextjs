"use client";

import { company, user } from "../../generated/prisma";
import DeleteCompanyBtn from "./DeleteCompanyBtn";

type CompanyWithOwner = company & { owner: user };

export default function CompanyList({
  companies,
}: {
  companies: CompanyWithOwner[];
}) {
  return (
    <>
      {companies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {companies.map((comp) => (
            <div
              key={comp.id}
              className="bg-white flex  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <img
                src={comp.image_url || "/placeholder.png"}
                alt={comp.name ?? ""}
                className="w-16 h-16 rounded-md object-cover mr-4"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {comp.name}
                  </h2>
                  <DeleteCompanyBtn company={comp} id={comp.id} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {comp.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Owner: {comp.owner.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No companies found.</p>
      )}
    </>
  );
}
