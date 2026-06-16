import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
    const session = await getServerSession();

    if (!session) {
       return new Response(JSON.stringify({ error: "Unauthorized (/api/like)" }), { status: 401 });
    }
    const client = await clientPromise;
    
    const db = client.db("potify");
    const userId = session.user.id;

    const body = await req.json();
    const { vidId, title, artist, duration } = body;


}