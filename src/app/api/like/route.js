import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/authOptions";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
       return new Response(JSON.stringify({ error: "Unauthorized (/api/like)" }), { status: 401 });
    }

    const client = await clientPromise;
    
    const db = client.db("potify");
    const userId = session.user.id;

    const body = await req.json();
    const { vidId, title, artist, duration, coverArt } = body;

    const likedSong = await db.collection("liked_songs").findOne({
        userId: userId,
        "songs.vidId": vidId,
    });

    if (likedSong) {
        await db.collection("liked_songs").updateOne(
            { userId: userId },
            { $pull: { songs: { vidId: vidId } } },
        );
        return new Response(JSON.stringify({ action: "removed" }), { status: 200 });
    }

    await db.collection("liked_songs").updateOne(
        { userId: userId },
        {
            $addToSet: {
                songs: {
                    vidId: vidId,
                    title: title,
                    artist: artist,
                    coverArt: coverArt,
                    duration: duration,
                }
            }
        }, 
        { upsert: true },
    );

    return new Response(JSON.stringify({ action: "added" }), { status: 200 });
}


export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session) {
       return new Response(JSON.stringify({ error: "Unauthorized (/api/like)" }), { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("potify");
    const userId = session.user.id;

    const likedSongs = await db.collection("liked_songs").findOne({ userId: userId });

    if(!likedSongs) return new Response(JSON.stringify([]), { status: 200 });

    return new Response(JSON.stringify(likedSongs.songs), { status: 200 })
}