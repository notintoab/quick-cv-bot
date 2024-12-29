import { IBotContext } from "../context/context.interface";
import { isTextMessage } from "./text-message-guard.util";

// Function to start the process of filling out the CV
export async function fillCommand(ctx: IBotContext) {
    if (!ctx.session.cvTemplate) {
        ctx.reply("Please select a template first using /template.");
        return;
    }

    ctx.session.step = "name"; // Start with gathering the name
    ctx.reply("Let's start filling out your CV. Please enter your name:");
}

// Function to process the user input
export async function handleUserInput(ctx: IBotContext) {
    const step = ctx.session.step;

    if (!step) {
        ctx.reply("Use /fill to start filling out your CV.");
        return;
    }

    // Check if the message is a text message
    if (!isTextMessage(ctx.message)) {
        ctx.reply("Please provide a valid text input.");
        return;
    }

    const userInput = ctx.message.text;

    switch (step) {
        case "name":
            ctx.session.cvData.name = userInput;
            ctx.session.step = "surname"; // Next step
            ctx.reply("Great! Now, please enter your surname:");
            break;

        case "surname":
            ctx.session.cvData.surname = userInput;
            ctx.session.step = "experience"; // Next step
            ctx.reply("Got it! Now, tell us about your experience:");
            break;

        case "experience":
            ctx.session.cvData.experience = userInput;
            ctx.session.step = "skills"; // Next step
            ctx.reply("Thanks! Finally, list your skills:");
            break;

        case "skills":
            ctx.session.cvData.skills = userInput;
            ctx.session.step = null; // End of gathering data
            const { name, surname, experience, skills } = ctx.session.cvData;

            const summaryMessage = 
              `Here is the information you provided:\n` +
              `- Name: ${name || "Not provided"}\n` +
              `- Surname: ${surname || "Not provided"}\n` +
              `- Experience: ${experience || "Not provided"}\n` +
              `- Skills: ${skills || "Not provided"}\n\n`;
            await ctx.reply(summaryMessage);
            await ctx.reply(
                `If everything is correct, use /generate to create your CV.\n` +
                `If you want to edit anything, restart the process with /fill.`);
            break;

        default:
            ctx.reply("Something went wrong. Please try again.");
            break;
    }
}