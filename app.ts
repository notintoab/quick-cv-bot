import { Telegraf } from "telegraf";
import { IConfigService } from "./src/config/config.interface";
import { ConfigService } from "./src/config/config.service";
import { IBotContext } from "./src/context/context.interface";
import { Command } from "./src/commands/command.class";
import { StartCommand } from "./src/commands/start.command";
import LocalSession from "telegraf-session-local";
import { FillCommand } from "./src/commands/fill.command";
import { TemplateCommand } from "./src/commands/template.command";

class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];

    constructor(private readonly configService: IConfigService) {

        this.bot = new Telegraf<IBotContext>(this.configService.get("TOKEN"));
        this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware());
    }

    init() {
        // Commands registration
        this.commands = [
            new StartCommand(this.bot),
            new TemplateCommand(this.bot),
            new FillCommand(this.bot),
        ];
        
        // Each command initialization
        for (const command of this.commands) {
            command.handle();
        }

        this.bot.launch();
    }
}

const bot = new Bot(new ConfigService());
bot.init();