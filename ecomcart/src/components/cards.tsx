//@ts-nocheck
import Link from "next/link";
import AddToCart from "./AddToCart";
export default function Cards({ item}) {
    const href = "/product/" + item.id;
    return (
        <div className="flex flex-col   w-75 p-3 gap-1 shadow-xl">
            <div>
                {/* <button
                onClick={()=>handleRemove(index)}
                className="flex  z-50 opacity-20 ">
                <img width="20" height="20"  src="https://img.icons8.com/material-rounded/24/multiply--v1.png" alt="multiply--v1"/>
            </button> */}
                <Link href={href}>
                <div>
                    <figure className=" rounded-2xl">
                    <img
                        src={item.thumbnail}
                        alt="image" />
                </figure>
                <h2 className=" line-clamp-1 text-md font-bold">{item.title}</h2>
                <p className="line-clamp-2 text-sm">{item.description}</p>
                </div>
            </Link>
            <div className="">
                <p>{item.tags}</p>
                <p>$ {item.price}</p>
                <div className="flex  items-center justify-between  ">
                    <p className="">Rating {item.rating}</p>
                    <AddToCart
                        item={item} />
                </div>
            </div>
            </div>
        </div>


    )
}
