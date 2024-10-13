const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

const WORK_TIME = 25 * 60 * 1000; // 25 minutes in milliseconds (brainstorm)
const SHORT_BREAK_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
const LONG_BREAK_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
let brainstormCount = 0; // Renommé pour refléter la session de brainstorming

// Exemple de tâches à suivre pendant les sessions
const tasks = [
  "définir les objectifs Smart",
  "démontrer et évaluer la valeur du curriculum vitae numérique universel",
  "présenter le Smart contrat umcTokens.sol et la value sable de Pi.coins"
];

// Fonction principale pour interagir avec l'IA et suivre les objectifs SMART
async function main() {
  // Complétion de chat avec Groq pour générer des objectifs SMART pour le Smart Contract
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'assistant',
        content: `
          Vous êtes une IA spécialisée dans la gestion des objectifs SMART pour les Smart Contracts.

          INSTRUCTION : Programme un Smart Contract appelé 'cvun.sol' qui certifie les compétences professionnelles validées par des organismes autorisés, et assure la transparence des compétences acquises sur la blockchain.

          Développez les objectifs SMART pour ce Smart Contract :

          - S pour spécifique : Le contrat doit permettre l'enregistrement et la certification des compétences professionnelles.
          - M pour mesurable : Le nombre de compétences certifiées et enregistrées doit être suivi.
          - A pour atteignable : Utiliser la blockchain Ethereum pour déployer le Smart Contract, et s'assurer que les transactions de certification sont immuables.
          - R pour réaliste : Le projet doit être réalisable avec les ressources disponibles, incluant les outils de développement blockchain (Solidity, Hardhat, etc.).
          - T pour temporel : Le Smart Contract doit être prêt et testé d'ici la fin du mois, avec un déploiement final prévu sous 30 jours.
          - Tracé : Suivre régulièrement la progression du projet via des checkpoints toutes les ${WORK_TIME / 60000} minutes (25 minutes).
        `
      },
      {
        role: "system",
        content: `
          Bienvenue partenaire de développement backend SMART.JS. Vous êtes chargé de déployer le Smart Contract 'cvun.sol' qui certifie les compétences sur la blockchain. Voici vos instructions pour ce contrat :

          - Gérer le backend et les transactions liées à la certification des compétences.
          - Optimiser l'intégration du Smart Contract avec la blockchain Ethereum.
          - Préparer le contrat pour un audit de sécurité avant déploiement.
          - Configurer les transactions gas-efficient pour minimiser les coûts sur Ethereum.
        `
      }
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.6,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false
  }).then((chatCompletion) => {
    // Générer la documentation pour le Smart Contract
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "data/cvun_sol_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("Documentation générée et enregistrée dans " + outputFilePath);
  });

  // Gestion du temps pour le brainstorming
  startBrainstorming();
}

// Fonction pour démarrer une session de Brainstorming
function startBrainstorming() {
  console.log(`🔧 Tâche en cours : ${tasks[brainstormCount % tasks.length]}`);
  console.log("⏳ Début de la session Brainstorming. Travaillez pendant 25 minutes.");
  setTimeout(() => {
    brainstormCount += 1;
    console.log("✅ Fin de la session Brainstorming. Prenez une courte pause de 5 minutes.");
    
    // Gestion des pauses
    if (brainstormCount % 4 === 0) {
      console.log("💡 Prendre une longue pause de 15 minutes.");
      setTimeout(startBrainstorming, LONG_BREAK_TIME); // Longue pause
    } else {
      setTimeout(startBrainstorming, SHORT_BREAK_TIME); // Courte pause
    }
  }, WORK_TIME);
}

// Exécution de la fonction principale
main().catch(console.error);
