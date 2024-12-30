import { Context } from "telegraf";

export interface SessionData {
    botStart: boolean;

    cvTemplate?: string;

    cvData: {
        fullname?: string;
        email?: string;
        phone?: string;
        skills?: string;
        experience?: string;
        education?: string;
        summary?: string;
    };
    step?: "fullname" | "email" | "phone" | "skills" | "experience" | "education" | "summary" | null;
}

export interface IBotContext extends Context {
    session: SessionData;
}