import { pgTable, serial, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core"
import { drizzle } from "drizzle-orm/vercel-postgres"
import { InferModel } from "drizzle-orm"
import { sql } from "@vercel/postgres"

// user messages
export const chatsTable = pgTable("chats", {
    id: serial("id").primaryKey(),
    message: varchar("message", { length: 255 }).notNull(),
    status: boolean("status").default(false).notNull(),
    senderid: integer("senderid"),
    receiverid: integer("receiverid"),
});
export type typeofChatTable = InferModel<typeof chatsTable>;
export type typeofNewChatTable = InferModel<typeof chatsTable, "insert">;

// user signup and login
export const userDataTable = pgTable("userdata", {
    uniqueid: serial("uniqueid").primaryKey(),
    fullname: varchar("fullname", { length: 255 }),
    email: varchar("email", { length: 255 }),
    password: varchar("password", { length: 255 })
});
export type typeofUserDataTable = InferModel<typeof userDataTable>;
export type typeofNewUserDataTable = InferModel<typeof userDataTable, "insert">;


// connection for all(both)
export const db = drizzle(sql);