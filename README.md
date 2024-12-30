<img src="./logo.png" alt="Logo" width="100" height="100">

# Quick CV Bot  

Quick CV Bot is a Telegram bot that helps create CVs in just a few steps. Users can fill in their details, choose a template, and receive a PDF resume.  

### Features  
- Interactive CV creation process via Telegram chat.  
- Multiple minimalist CV templates to choose from.  
- Generates CVs as PDF files for download.  
- Does not store user data, ensuring privacy.

### Tech 
- **Node.js**: Used for the bot's backend, handling asynchronous requests and integrating with the Telegram API
- **TypeScript**: Typed superset of JavaScript for better code quality and maintainability
- **Telegraf**: Framework for building Telegram bots
- **Puppeteer**: Headless browser for generating PDFs
- **HTML/CSS**: Used for styling CV templates

### How It Works  
1. **Start the bot**: Use the `/start` command.  
2. **Choose a template**: Use the `/template` command to pick a design.  
3. **Fill in details**: The bot will guide you step-by-step with the `/fill` command.  
4. **Generate your CV**: Use the `/generate` command to receive your CV as a PDF.  
