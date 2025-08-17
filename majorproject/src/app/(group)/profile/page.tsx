import CurrentUserDetail from '@/components/Cards/CurrentUserDetail';
import { getUserFromCookies } from '@/helper'
import React from 'react'

export default async function page() {
  const user = await getUserFromCookies();
  return (
    <div>
      <CurrentUserDetail user={user} />
    </div>
  )
}
