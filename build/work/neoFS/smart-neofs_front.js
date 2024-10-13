const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

const WORK_TIME = 25 * 60 * 1000; // 25 minutes in milliseconds
const SHORT_BREAK_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
const LONG_BREAK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
let pomodoroCount = 0;

async function main(
) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'assistant',
        content: `
          Vous êtes une IA, une Machine à Optimiser les OBJECTIFS S.M.A.R.T

          INSTRUCTION : programmez les objectifs SMARTT adaptés à votre projet, vous devez tenir compte des critères suivants :

          Developpez le prompt Ultime,

          #S pour spécifique : Définissez clairement les objectifs à atteindre. Quels résultats souhaitez-vous obtenir ?
          M pour mesurable : Définissez des indicateurs de performance qui vous permettront de mesurer vos progrès et de déterminer si vous atteignez vos objectifs. Quels sont les indicateurs pertinents pour chaque objectif ?
          A pour atteignable : Vérifiez que vos objectifs sont réalistes et que vous disposez des ressources nécessaires pour les atteindre. Avez-vous les compétences, les outils et le temps nécessaires pour y parvenir ?
          R pour réaliste : Assurez-vous que vos objectifs sont en adéquation avec vos ressources et vos ambitions. Sont-ils ambitieux mais toujours réalisables dans votre contexte ?
          T pour temporel : Définissez des dates butoirs pour chaque objectif. Quand souhaitez-vous atteindre chacun d'eux ?
          T pour tracé : Suivez régulièrement vos progrès et ajustez vos plans si nécessaire. Comment allez-vous suivre votre avancement ?

          Pour votre objectif actuel qui consiste à terminer l'algorithme :

          Spécifique : Finaliser l'algorithme en cours.
          Mesurable : L'algorithme fonctionne correctement et répond aux besoins du projet.
          Atteignable : Vous disposez des connaissances et des ressources nécessaires pour finaliser l'algorithme.
          Réaliste : Terminer l'algorithme est une étape cruciale pour votre projet.
          Temporel : Vous souhaitez finir l'algorithme avant la fin de votre nuit blanche, soit 9h.
          Tracé : Vous établirez des checkpoints toutes les ${WORK_TIME / 60000} minutes pour vous assurer de progresser selon vos plans.
        `
      },
      {role: "system", content:":Bonjour partenaire je serais votre role:system neoFS.js pour aidé au développement sur FRONTEND SMART.JS ('index.html','style.css','layout.json','srcipt.js')  partenaire de développement SMART.JS qui comprend mes besoins en tant que développeur full stack, en s'intégrant à votre stack technologique, prét à optimisé les prompts, l'intelligence artificielle centrale au coeur de la plateforme -ia dédier à la présentation des Projets D'apprentissage automatique pour les intelligences artificielles -ia \" Model Match_in_Learnin \". Voici votre contexte, vos rôles, vos compétences, vos fonctions, vos tâches, votre boucle model, votre processus, , votre routine, les caractéristiques Envisageable et les actions imédiates recherchées et le feedback attendu et les emoji's associé:"},
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
}).then((chatCompletion)=>{
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "data/cloud_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation du contructor généré et enregistré dans " + outputFilePath);
});
}

main();