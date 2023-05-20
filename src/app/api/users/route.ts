import { userDataTable, db, typeofUserDataTable, typeofNewUserDataTable } from "@/lib/drizzle";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await db.select().from(userDataTable);
        return NextResponse.json(res);
    } catch (error) {
        console.log((error as { message: string }).message)
        return NextResponse.json({ message: "It seems error" })
    };

};

export async function POST(request: NextRequest) {
    const req = await request.json();
    try {
        await sql`CREATE TABLE IF NOT EXISTS chats (uniqueid serial primary Key,fullname varchar(255),email varchar(255),password varchar(255) );`;
        const data = await db.insert(userDataTable).values(req).returning();
        return NextResponse.json({ message: "message sended", data });
    } catch (error) {
        console.log("Error : ", (error as { message: string }).message);
        return NextResponse.json({ message: "something went wrong" })
    }
}