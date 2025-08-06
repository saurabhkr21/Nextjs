import prismaClient from "@/services/prisma"


export default async function page() {

    const companies=await prismaClient.company.findMany({
        include:{
            owner:true
        }
    })
  return (
    <div>
      
      <h1>Company List</h1>

      {
        companies.length>0 ? (
          companies.map((comp)=>{
            return(
                <div key={comp.id} className="border p-4 mb-4">
                    <h2 className="text-xl font-bold">{comp.name}</h2>
                    <p className="text-gray-600">{comp.description}</p>
                    <p className="text-sm text-gray-500">Owner: {comp.owner.email}</p>
                </div>)
        })
        ) : (
          <p>No companies found.</p>
        )
      }
    </div>
  )
}
