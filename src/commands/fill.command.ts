import { Command } from "./command.class";
import { Telegraf } from "telegraf";
import { IBotContext } from "../context/context.interface";
import { fillCommand, handleUserInput } from "../utils/fill-helpers.util";

export class FillCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("fill", fillCommand);

        this.bot.on("message", async (ctx) => {
            await handleUserInput(ctx);
        });
    }
}