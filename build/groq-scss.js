const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
  //
  promptmodel = "systemContent";
  roleSystem = "gen -DevOps";
  roleAssistant = "Professor";
  roleUser = "Generator";

  const chatCompletion = await groq.chat.completions.create({
    "messages": [
        
      {role: "system",name:"[🌌_system", content:"clean /mode"},
      {role: "assistant",name:"[📔_codex]", content:"[📔.codex]_Phase[01]:[RUN]:[brainstorming[.Generator.]]"},
      {role: "user",name:"[🌴_Groq]", content: "[🌴_Groq]+[promptmodel]+[🤖_emojis.sh]+[[💬emojispicker]!" },
    ],
    model: "gemma2-9b-it",
    temperature: 0.6,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const scssContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "output/annime_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".scss";
    fs.writeFileSync(outputFilePath, scssContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();