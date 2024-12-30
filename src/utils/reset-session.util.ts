import { IBotContext } from "../context/context.interface";

export function resetSessionData(ctx: IBotContext) {
    ctx.session = {
        botStart: true,
        cvTemplate: undefined,
        cvData: {
            fullname: undefined,
            email: undefined,
            phone: undefined,
            skills: undefined,
            experience: undefined,
            education: undefined,
            summary: undefined,
        },
        step: null,
    };
}