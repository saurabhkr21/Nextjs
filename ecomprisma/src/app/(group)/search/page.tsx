//@ts-nocheck

import Cards from "@/components/cards";
import ProductCard from "@/components/ProductCard";
import prismaClient from "@/services/prisma";
import { error } from "console";
import { title } from "process";
export function generateMetadata({ searchParams }) {
    const searchTerm = searchParams.q;
    return {
        title: "Search Page: " + searchTerm,
        description: "aw daopwd kaopd"
    }

}

export default async function Home({ searchParams }) {
    const query = searchParams.q;

    let data=[]

    // try{
    //     data=prismaClient.product.findMany({
    //         where :{
    //             title:{
    //                 contains:query,
    //                 mode:"insensitive"
    //             }
    //         }
    //     })
    // }catch(err){
    //     console(err)
    // }

    // let data;
    try {
        const url = "https://dummyjson.com/products/search?q=" + query;
        const response = await fetch(url);
        data = await response.json();
    }catch(err){
        throw new error ()
    }

    let result = data?.products || [];

    const min = searchParams.min;
    const max = searchParams.max;
    const rate = searchParams.rating;

    // let result = products.filter(function (item) {
    //     if (item.title.toLowerCase().includes(url)) {
    //         return true;
    //     }
    // })

    if (min)
        result = result.filter((item) => {
            if (item.price > min)
                return true;
        })
    if (max)
        result = result.filter((item) => {
            if (item.price < max)
                return true;
        })
    if (rate)
        result = result.filter((item) => {
            if (item.rating > rate)
                return true;
        })
    return (
        <>
            {/* <p className="text-xl font-medium">Searched Products for : {query}</p> */}
            <div className="flex flex-wrap gap-2 items-center justify-center">
                {/* {
                    result.length == 0 && <div>
                        <h1>The data which your are try to search is not Exist</h1>
                    </div>

                } */}
                {
                    result.length > 0 ? result.map((item,id) => (
                        <div className="flex w-[350px] shadow-2xl ">
                            <ProductCard
                            key={item.id}
                            item={item} />
                        </div>
                    )) :
                        <div className=" flex flex-wrap text-2xl font-bold">
                            <h1>No product found for :
                                <span className="text-blue-700">{query}</span></h1>
                        </div>
                }
            </div>
        </>
    )

}