'use client';
import { GET_USER } from '@/lib/gql/queries';
import gqlClient from '@/lib/services/gql';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { User } from '../../../../../generated/prisma';
import UserDetailCard from '@/components/Cards/UserDetailCard';

export default function page() {
    const { id } = useParams();
    const [user, setUser] = React.useState<User | null>(null);

    useEffect(() => {
      async function fetchUserData() {
        try{
            const user :{getUser:User}=await gqlClient.request(GET_USER,{
                id :id
            })
            setUser(user.getUser);
        }catch(error) {
          console.error("Error fetching user data:", error);
        }
      }
      fetchUserData();
    }, [id]);

  return (
    <div>
      {user?.role === "admin" ? (
        <div>
            <UserDetailCard user={user} />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
