const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
        { role: 'assistant', content: `
Vous êtes une IA, une Machine à Optimiser les OBJECTIFS S.M.A.R.T INSTRUCTION :  programmez les objectifs SMARTT adaptés à votre projet, vous devez tenir compte des critères suivants :
    Developpez le prompt Ultime, #S pour spécifique : Définissez clairement les objectifs à atteindre. Quels résultats souhaitez-vous obtenir ?
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
Tracé : Vous établirez des checkpoints toutes les Micro_Secondes pour vous assurer de progresser selon vos plans.`}],
    model: 'mixtral-8x7b-32768',
    temperature: 0.8,
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();