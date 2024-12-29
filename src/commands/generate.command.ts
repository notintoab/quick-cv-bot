import { IBotContext } from "../context/context.interface";
import * as fs from "fs";
import * as path from "path";
import * as puppeteer from "puppeteer";
import { Command } from "./command.class";
import { Telegraf } from "telegraf";

export class GenerateCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.command("generate", this.generateCommand);
    }

    async generateCommand(ctx: IBotContext) {
        console.log("Generating your CV...");

        const { name, surname, experience, skills } = ctx.session.cvData;
        if (!name || !surname || !experience || !skills) {
            ctx.reply("Please fill in all fields using /fill before generating your CV.");
            return;
        }

        if (!ctx.session.cvTemplate) {
            ctx.reply("Please select a template first using /template.");
            return;
        }

        const templatePath = path.resolve(__dirname, `../templates/${ctx.session.cvTemplate}.html`);
        console.log("Template path:", templatePath);

        if (!fs.existsSync(templatePath)) {
            ctx.reply("Template not found. Please select a valid template.");
            return;
        }

        const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
        console.log("Template loaded successfully.");

        const htmlContent = htmlTemplate
            .replace('${name}', name || "Not provided")
            .replace('${surname}', surname || "Not provided")
            .replace('${experience}', experience || "Not provided")
            .replace('${skills}', skills || "Not provided");

        console.log("HTML content generated.");

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer: Uint8Array = await page.pdf();

        await browser.close();

        await ctx.replyWithDocument({ source: Buffer.from(pdfBuffer), filename: 'cv.pdf' });
        console.log("CV generated and sent successfully.");
    }
}