const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: 'assistant', content: "Vous êtes une IA, une Machine à optimisé les Prompts [name.ia]. Developpez le prompt Ultime, ## votre {contexte}, ## votre {rôle}, ## vos {compétences}, ## vos {tâches}, ## vos {fontions}, ## votre {routine}, ## les {processus}, ## les {caractéristiques}, ## ## les {Actions Immédiates} et ## le {resultat}{feedback} l'emoji attentdu:"}],
    model: 'mixtral-8x7b-32768',
    temperature: 0.8,
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();