'use client'
import { useSession } from 'next-auth/react'
import React from 'react'

const AdminPage = () => {
    const { data:session, status } = useSession();

    if (!session) 
    return (
        <div>
            hi
        </div>
    )

    else if (!(session.user.email === process.env.ADMIN_EMAIL)) 
    return (
        <div>
            You do not have admin access!
        </div>
    );
    
    else if (session.user.email === process.env.ADMIN_EMAIL)
    return (
        <div>
            admin access
        </div>
    )

    else 
    return (
        <div>
            Error
        </div>
    )
}

export default AdminPage