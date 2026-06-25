'use client'
import LandingPage from '@/components/home/LandingPage';
import DefaultPage from '@/components/home/DefaultPage';
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data:session, status } = useSession();

    if (status === "loading") {
        // Return a completely blank void (or a spinner) that matches your background.
        // This prevents the LandingPage from flashing while the browser thinks.
        return <div className="flex-1 w-full h-full bg-potify-void"></div>; 
    }

    if (status === "unauthenticated" || !session) {
        return <LandingPage/>;
    }
    
    return <DefaultPage session={session} />;
}