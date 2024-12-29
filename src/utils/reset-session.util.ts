import { IBotContext } from "../context/context.interface";

export function resetSessionData(ctx: IBotContext) {
    ctx.session = {
        botStart: true,
        cvTemplate: undefined,
        cvData: {
            name: undefined,
            surname: undefined,
            experience: undefined,
            skills: undefined,
        },
        step: null,
    };
}