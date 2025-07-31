"use server";
import prismaClient from "@/services/prisma";
export async function addProductToDb(productData: any) {
  try {
    console.log("Attempting to create product with data:", productData);
    const product = await prismaClient.products.create({
      data: productData,
    });
    console.log("Product created successfully:", product);
    return {
      success: true,
      data: product,
    };
  } catch (err) {
    console.error("Database error:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Database operation failed",
      error: err,
    };
  }
}
export async function deleteProdFromDb(id: string) {
  try {
    await prismaClient.products.delete({
      where: {
        id: id,
      },
    });
    return {
      success: true,
    };
  } catch (err) {
    success: false;
  }
}

export async function UpdateProdInDb(productData: any,id:any) {
  try {
    const updatedProduct = await prismaClient.products.update({
      where: {
        id: id
      },
      data: productData
    });
    return {
      success: true,
      data: updatedProduct
    };
  } catch (err) {
    return {
      success: false,
      error: err
    };
  }
}


// export async functioin EditProdInDb(id){
//   try{
//     await prismaClient.products.update({
//       where:{
//         id:id
//       }
//     })
//   }catch(err){

//   }
// }
