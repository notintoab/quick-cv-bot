import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";

export class TemplateCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("template", (ctx) => {
            console.log(ctx.session);
            ctx.reply("Please select a CV template:", {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Template 1", callback_data: "template_1" }],
                        [{ text: "Template 2", callback_data: "template_2" }],
                        [{ text: "Template 3", callback_data: "template_3" }],
                    ],
                },
            });
        });

        this.bot.action(/template_\d+/, async (ctx) => {
            console.log("Template selected:", ctx.match?.[0]);
            ctx.session.cvTemplate = (ctx.match?.[0]);
            console.log(ctx.session);
            await ctx.editMessageText("Nice pick!");
            await ctx.sendMessage("Let’s move on and gather your information for the CV.\nJust press /fill.");
        });

    }
}