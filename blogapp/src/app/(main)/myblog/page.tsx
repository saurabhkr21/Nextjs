
// 'use client'
// import gqlClient from "@/services/gql";
// import { gql } from "graphql-request";
// import { useEffect, useState } from "react";

// const CURRENT_USER_BLOG = gql`
//   query CurrentUserBlogs {
//   currentUserBlogs {
//     id
//     title
//     content
//     image_url
//     createdAt
//   }
// }
// `;

// export async function Page(){
//     const [userBlog,setUserBlog] = useState<any[]>([]);
//     useEffect(()=>{
//         async function getCurrentUserBlogs(){
//             try{
//                 const data=await gqlClient.request(CURRENT_USER_BLOG);
//                 if(data.){
//                     setUserBlog(data?.currentUserBlogs)
//                 }
//             }
//         }
        
//     },[])
// }