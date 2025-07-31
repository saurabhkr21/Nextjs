//@ts-nocheck
"use client"
import Header from '@/components/Header'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { Children, useState } from 'react'

export default function layout({ children }) {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get("q") || "";
    const minAm = searchParams.get('min') || "";
    const maxAm = searchParams.get('max') || "";
    const rateStar = searchParams.get('rate') || "";

    const [min, setMin] = useState(minAm);
    const [max, setMax] = useState(maxAm);
    const [rating, setRating] = useState(rateStar);

    function handleMin(e) {
        setMin(e.target.value);
        console.log("min clicked");
    }
    function handleMax(e) {
        setMax(e.target.value);
    }
    function handleRat(e) {
        setRating(e.target.value);
    }

    const router = useRouter();

    function handleGo() {
        let url = "/search?";
        if (min) {
            url += "&min=" + min;
        }
        if (max) {
            url += "&max=" + max;
        }
        if (rating) {
            url += "&rating=" + rating;
        }
        if (searchTerm) {
            url += "&q=" + searchTerm;
        }
        router.push(url);
    }
    return (
        <div className=''>
            <div className=' flex  '>
                <div className='flex flex-col bg-amber-50 w-[200px] h-screen p-2 gap-4' >
                    <div className=' '>
                        <input type="number" name='min' onChange={handleMin} placeholder='Enter Min Value' />
                        <input type="number " name='max' onChange={handleMax} placeholder='Enter Max Value' />
                        <button className='border px-1 rounded-2xl' onClick={handleGo}>Go</button>
                    </div>
                    <div className='bg-slate-200 flex justify-between w-[100px] rounded-sm'>
                        <label>Rating:</label>
                        <select name="rate" id="rate" className='' onChange={handleRat} >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}
