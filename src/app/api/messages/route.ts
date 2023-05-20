import { chatsTable, db, typeofChatTable, typeofNewChatTable } from "@/lib/drizzle";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {

    try {
        const res = await db.select().from(chatsTable);
        return NextResponse.json(res);
    } catch (error) {
        console.log((error as { message: string }).message)
        return NextResponse.json({ message: "It seems error" })
    };

};

export async function POST(request: NextRequest) {
    const req = await request.json();
    try {
        await sql`CREATE TABLE IF NOT EXISTS chats (id serial primary Key,message varchar(255) not Null,status boolean default false not Null,senderid INT,receiverid INT);`;
        if (req.message && req.senderid && req.receiverid) {
            const data = await db.insert(chatsTable).values(req).returning();
            return NextResponse.json({ message: "message sended", data });
        }
        throw "Please put message senderid receiverid these properties atleast"
    } catch (error) {
        console.log("Error : ", (error as { message: string }).message);
        return NextResponse.json({ message: "something went wrong" })
    }
}