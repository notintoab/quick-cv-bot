import { Command } from "./command.class";
import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { fillCommand, handleUserInput } from "../utils/fill-helpers.util";
import { isTextMessage } from "../utils/text-message-guard.util";

export class FillCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("fill", fillCommand);

        this.bot.on("message", async (ctx) => {
            // Check if the message is a text message
            if (!isTextMessage(ctx.message)) {
                return; // If it's not a text message, do not process it
            }

            // Check if the message contains the "/generate" command
            if (ctx.message.text.includes("/generate")) {
                return; // Do not process if it's the /generate command
            }

            // Handle user input for filling out the CV
            await handleUserInput(ctx);
        });
    }
}