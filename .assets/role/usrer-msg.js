const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
  //
  promptmodel = "systemContent";
  roleSystem = "gen -DevOps";
  roleAssistant = "generator";
  roleUser = "meta";

  const chatCompletion = await groq.chat.completions.create({
    "messages": [
        
      {role: "system",name:"[🌌_system", content:"hello_world role:assistant [📔.codex]"},
      {role: "assistant",name:"[📔_codex]", content:"_Phase[01]:[RUN]:[brainstorming[📔.codex]]]"},
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const gqlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "assistant_codex_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".gql";
    fs.writeFileSync(outputFilePath, gqlContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();