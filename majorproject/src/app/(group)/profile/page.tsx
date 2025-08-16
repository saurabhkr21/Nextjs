//@ts-nocheck
import CurrentUserDetail from '@/components/Cards/CurrentUserDetail';
import { getUserFromCookies } from '@/helper'
import React from 'react'

export default async function page() {
  const user = await getUserFromCookies();
  console.log("User Profile Page - User:", user);
  return (
    <div>
      <CurrentUserDetail user={user} />
    </div>
  )
}
