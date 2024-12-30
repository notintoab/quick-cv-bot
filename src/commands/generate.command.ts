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
        this.bot.command("generate", (ctx) => this.generateCommand(ctx));
    }

    private async generateCommand(ctx: IBotContext) {
        ctx.reply("Generating your CV...");

        const { fullname, email, phone, skills, experience, education, summary } = ctx.session.cvData;

        // Check if all fields are filled before generating CV
        if (!fullname || !email || !phone || !skills || !experience || !education || !summary) {
            ctx.reply("Please fill in all fields using /fill before generating your CV.");
            return;
        }

        // Check if a template has been selected
        if (!ctx.session.cvTemplate) {
            ctx.reply("Please select a template first using /template.");
            return;
        }

        // Load the template
        const templatePath = path.resolve(__dirname, `../templates/${ctx.session.cvTemplate}.html`);
        console.log("Template path:", templatePath);

        if (!fs.existsSync(templatePath)) {
            ctx.reply("Template not found. Please select a valid template.");
            return;
        }

        const htmlTemplate = fs.readFileSync(templatePath, 'utf-8');
        console.log("Template loaded successfully.");

        // Generate HTML content with the data
        const htmlContent = htmlTemplate
            .replace('{{fullname}}', fullname || "Not provided")
            .replace('{{email}}', email || "Not provided")
            .replace('{{phone}}', phone || "Not provided")
            .replace('{{skills}}', skills || "Not provided")
            .replace('{{experience}}', experience || "Not provided")
            .replace('{{education}}', education || "Not provided")
            .replace('{{summary}}', summary || "Not provided")

        console.log("HTML content generated.");

        // Generate PDF using Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer: Uint8Array = await page.pdf();

        await browser.close();

        // Send the generated PDF to the user
        await ctx.replyWithDocument({ source: Buffer.from(pdfBuffer), filename: 'cv.pdf' });
        console.log("CV generated and sent successfully.");
        await ctx.reply("Your CV is ready! Good luck with your job search! Feel free to come back anytime.")
    }
}