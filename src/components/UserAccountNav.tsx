"use client"
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import UserAvatar from './UserAvatar'

type Props = {
    user:User
}

const UserAccountNav = ({user}:Props) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <UserAvatar user={user}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
            <div className="flex items-center justift-start gap-2 p-2">
                <div className='flex flex-col space-y-1 leading-none'>
                {user?.name &&(<p className="text-violet-500">{user.name}</p>)}
                {user?.email &&(<p className="text-violet-500 w-[200px] truncate text-sm">{user.email}</p>)}
                </div>
            </div>
        <DropdownMenuSeparator/>
            <DropdownMenuItem onSelect={()=>{
                signOut();
            }}>
                <p className='text-red-700'>Sign out</p>
                <LogOut className="w-4 h-4 ml-2"/>
            </DropdownMenuItem>
        
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav