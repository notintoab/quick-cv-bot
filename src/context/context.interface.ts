import { Context } from "telegraf";

export interface SessionData {
    botStart: boolean;

    cvTemplate?: string;

    cvData: {
        name?: string;
        surname?: string;
        experience?: string;
        skills?: string;
    };
    step?: "name" | "surname" | "experience" | "skills" | null;
}

export interface IBotContext extends Context {
    session: SessionData;
}