const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Fonction générique de génération de fichier
async function generateFile(fileType, extension) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", name: "[🌌_system]", content: "clean /mode" },
        { role: "assistant", name: "[📔_codex]", content: "[📔.codex]_Phase[01]:[RUN]:[brainstorming[.Generator.]]" },
        { role: "user", name: "[🌴_Groq]", content: `[🌴_Groq]+[promptmodel]+[🤖_emojis.sh]+[[💬emojispicker]!` },
      ],
      model: "gemma2-9b-it",
      temperature: 0.6,
      max_tokens: 2048,
    });

    const fileContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = `output/${fileType}_${new Date().toISOString().replace(/[-:TZ]/g, "")}.${extension}`;
    
    fs.writeFileSync(outputFilePath, fileContent);
    console.log(`${fileType.toUpperCase()} file generated and saved to ${outputFilePath}`);
  } catch (error) {
    console.error(`Failed to generate ${fileType.toUpperCase()} file:`, error);
  }
}

// Fonction principale pour exécuter toutes les générations asynchrones
async function main() {
  try {
    // Générer les fichiers HTML, CSS, JS et JSON de manière asynchrone
    await Promise.all([
      generateFile("html", "html"),
      generateFile("css", "css"),
      generateFile("js", "js"),
      generateFile("json", "json")
    ]);

    console.log("All files generated successfully.");
  } catch (error) {
    console.error("Error during file generation:", error);
  }
}

main();
