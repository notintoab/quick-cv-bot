import { Context } from "telegraf";

export interface SessionData {
    botStart: boolean;
}

export interface IBotContext extends Context {
    session: SessionData;
}