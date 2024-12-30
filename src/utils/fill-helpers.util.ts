import { IBotContext } from "../context/context.interface";
import { isTextMessage } from "./text-message-guard.util";

export async function fillCommand(ctx: IBotContext) {
    if (!ctx.session.cvTemplate) {
        ctx.reply("Please select a template first using /template.");
        return;
    }

    ctx.session.step = "fullname"; // Start with gathering the name
    ctx.reply("Let's start filling out your CV. Please enter your Full Name:");
}

export async function handleUserInput(ctx: IBotContext) {
    const step = ctx.session.step;

    if (!isTextMessage(ctx.message)) {
        ctx.reply("Please provide a valid text input.");
        return;
    }

    const userInput = ctx.message.text;

    switch (step) {
        case "fullname":
            ctx.session.cvData.fullname = userInput;
            ctx.session.step = "email"; // Next step
            ctx.reply("Great! Now, please enter your Email:");
            break;

        case "email":
            ctx.session.cvData.email = userInput;
            ctx.session.step = "phone"; // Next step
            ctx.reply("Got it! Please enter your Phone:");
            break;

        case "phone":
            ctx.session.cvData.phone = userInput;
            ctx.session.step = "skills"; // Next step
            ctx.reply("Okay. Now, tell about your Skills:");
            break;

        case "skills":
            ctx.session.cvData.skills = userInput;
            ctx.session.step = "experience"; // Next step
            ctx.reply("Impressive! Write your Experience:");
            break;

        case "experience":
            ctx.session.cvData.experience = userInput;
            ctx.session.step = "education"; // Next step
            ctx.reply("Good! Also list your Education:");
            break;

        case "education":
            ctx.session.cvData.education = userInput;
            ctx.session.step = "summary"; // Next step
            ctx.reply("Thanks! Finally, enter your Summary:");
            break;

        case "summary":
            ctx.session.cvData.summary = userInput;
            ctx.session.step = null; // End of gathering data

            // Show the summary of the filled data
            const { fullname, email, phone, skills, experience, education, summary} = ctx.session.cvData;
            const totalMessage = 
              `Here is the information you provided:\n` +
              `- Name: ${fullname || "Not provided"}\n` +
              `- Email: ${email || "Not provided"}\n` +
              `- Phone: ${phone || "Not provided"}\n` +
              `- Skills: ${skills || "Not provided"}\n` +
              `- Experience: ${experience || "Not provided"}\n` +
              `- Education: ${education || "Not provided"}\n` +
              `- Summary: ${summary || "Not provided"}\n\n`;

            await ctx.reply(totalMessage); 
            await ctx.reply( "Template: " + String(ctx.session.cvTemplate));
            await ctx.reply(
                `If everything is correct, use /generate to create your CV.\n` +
                `If you want to edit anything, restart the process with /fill.`);
            console.log(ctx.session);

            break;

        default:
            ctx.reply("Something went wrong. Please try again.");
            break;
    }
}