const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

// Objet du plan de projet avec des emojis
const projectPlan = {
  projectName: "Développement du mise à jour objectif SMART 🚀",
  phases: [
    { 
      phaseId: "phase0",  
      description: "Modèle SMART",
      phaseName: "Step_1: Initialisation 🛠️",
      duration: "1 jour", // Durée définie pour cette phase
      startDate: "2024-10-13T02:00:00Z", // Date de début
      endDate: "2024-10-14T02:00:00Z",   // Date de fin estimée
      tasks: [
        {
          title: "Initialisation ✅",
          taskStep: [
            {
              "title": "Exploration de la plateforme 🔍",
              "description": "Naviguer sur l'interface utilisateur et découvrir toutes les fonctionnalités offertes par la plateforme. Consulter la documentation et les ressources en ligne pour obtenir une compréhension détaillée des capacités de la plateforme."
            },
            {
              "step1": "Initialisation: [rolesSystem(promptSystem)] 💡",
              "step2": "Initialisation: [roleAssistant(promptAssistant)] 🧑‍💻",
              "step3": "Initialisation: [roleUser(promptUser)] 📝",
            }
          ]
        }
      ]
    }
  ],
};

// Fonction pour afficher le plan du projet dans un format structuré avec emojis
function displayProjectPlan(plan) {
  console.log(`🚀 Nom du projet: ${plan.projectName}`);
  plan.phases.forEach(phase => {
    console.log(`\n🛠️ Phase: ${phase.phaseName} - Durée: ${phase.duration} - 📅 Date de début: ${phase.startDate}`);
    phase.tasks.forEach(task => {
      console.log(`- Tâche: ${task.title}`);
      task.taskStep.forEach(step => {
        console.log(`  - ${step.title || step}`);
      });
    });
  });
}

// Fonction principale pour gérer l'interaction avec Groq et générer la documentation avec emojis
async function main() {

  // Contenus pour les différents rôles dans le dialogue avec emojis
  const systemContent = "Vous êtes le système de gestion de projet 🛠️.";
  const assistantContent = "Vous êtes un assistant IA 🤖, chargé d'accompagner l'utilisateur dans les tâches de gestion.";
  const configContent = "";
  const projectPlanContent = JSON.stringify(projectPlan);

  // Création de la complétion de chat en utilisant Groq SDK avec emojis
  await groq.chat.completions.create({
    messages: [
        { role: "system", content: systemContent },
        { role: "assistant", content: assistantContent },
        { role: "system", content: configContent },
        { role: "system", content: projectPlanContent },
        { role: "user", name: "systemDream", content: "phase0:initialisation de l'instance Gantt-chart 📊" },
        { role: "assistant", name: "✨_pi", content: "Initialisation de la phase 0 🛠️" },
        { role: "system", name: "systemDream", content: "phase1:Conceptualisation 💡" },
        { role: "assistant", name: "✨_pi", content: "Conceptualisation en cours 🧠" },
        { role: "user", name: "Groq", content: "Élaboration du bilan avec le modèle de Gantt 📅" },
        { role: "system", content: projectPlanContent },
        { role: "assistant", name: "✨_pi", content: "Génération du rapport de la phase 0 📄" },
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false,
  }).then((chatCompletion) => {
    // Écrire le contenu généré dans un fichier markdown
    const mdContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "phase0_initialisation_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
    fs.writeFileSync(outputFilePath, mdContent);
    console.log("📄 Documentation générée et enregistrée dans " + outputFilePath);
  });
}

// Exécution du programme principal
main().catch(console.error);
