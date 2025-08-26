"use client";
import { company, user } from "../../../generated/prisma";
import DeleteCompanyBtn from "../DeleteCompanyBtn";
import Link from "next/link";

type CompanyWithOwner = company & { owner: user };

export default function CompanyDetail({
  companies,
}: {
  companies: CompanyWithOwner[];
}) {
  return (
    <>
      {companies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 md:gap-2 lg:gap-4">
          {companies.map((comp) => (
            <Link
              href={`/company/${encodeURIComponent(comp.id)}`}
              key={comp.id}
              className=" flex border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <img
                src={comp.image_url || "/placeholder.png"}
                alt={comp.name ?? ""}
                className="w-10 h-10 md:w-16 sm:h-16 rounded-md object-cover mr-4"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold mb-2">{comp.name}</h2>
                  <DeleteCompanyBtn company={comp} id={comp.id} />
                </div>
                <p className="mb-4 line-clamp-3">{comp.description}</p>
                <p className="text-sm overflow-hidden">Owner: {comp.owner.email}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No companies found.</p>
      )}
    </>
  );
}
