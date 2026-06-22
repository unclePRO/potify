import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LandingPage from '@/components/home/LandingPage';
import DefaultPage from '@/components/home/DefaultPage';

export default async function HomePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <LandingPage/>;
    }
    
    return <DefaultPage session={session} />;
}