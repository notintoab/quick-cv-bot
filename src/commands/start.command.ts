import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "../context/context.interface";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start((ctx) => {
            console.log(ctx.session);
            ctx.reply(
                "Hello there! Let’s create your CV quickly and easily. Are you ready?", 
                Markup.inlineKeyboard([
                    Markup.button.callback("✅ Yes!", "yes_reply"),
                    Markup.button.callback("❌ Not now.", "no_reply")
                ])
            );
        });

        this.bot.action("yes_reply", (ctx) => {
            ctx.session.botStart = true;
            ctx.editMessageText(`🚀 Great! Let’s go!`); 
            ctx.sendMessage("⚠️ Just a quick reminder:\nYour personal data will not be stored or shared. It will only be used for generating your CV and nothing more.");
        });

        this.bot.action("no_reply", (ctx) => {
            ctx.session.botStart = false;
            ctx.editMessageText("Alright, maybe next time!\nIf you change your mind, just type /start and we can get started on your CV!"); 
        });
    }
}