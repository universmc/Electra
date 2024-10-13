import fs from "fs";
import { Groq } from "groq-sdk";

const groq = new Groq();

// Charger les rôles depuis tasks.json
function loadRoles() {
  const data = fs.readFileSync('./tasks.json', 'utf8');
  return JSON.parse(data);
}

// Fonction principale
async function principe(project, modelIa, context, role, skills, task, process, characteristics, ImmediateActions, feedbackPrediction, date = new Date().toLocaleDateString('fr-FR')) {
  const roles = loadRoles();

  // Affichage de l'information du projet
  const message = `
  ╔════════════════════════════════════╗
  ║✨            ${date}:            ✨║ 
  ║.   ${project} Template.response   .║
  ║.       Bienvenue ${modelIa}      .║
  ╠════════════════════════════════════╣
  ║✨                                ✨║
  ║. ${context}                       .║
  ║.  ${skills} ${role}               .║
  ║.  ${process}                      .║
  ║.  ${task}                         .║
  ║.  ${characteristics}              .║
  ║.  ${ImmediateActions}             .║
  ║.  ${feedbackPrediction}           .║
  ║✨                                ✨║
  ╚════════════════════════════════════╝
  `;

  console.log(message);
  return { message };
}

// Exemple d'appel de la fonction principale avec une tâche
const principeResponse = principe('Projet', 'Model_ia', 'Context', 'Role', 'Skills', 'Fonction', 'Tasks', 'BoucleModel', 'Process', 'Routine', 'CharacteristicsEnvisageable', 'ImmediateActions', 'feedbackPrediction');

// Complétion GROQ avec les rôles
const completion = await groq.chat.completions.create({
  messages: [
    { role: "assistant", content: "Phase 1: Initialisation de l'instance neoFS_(FullStack)_Frontend" },
    { role: "system", content: "Vous êtes programmeur, partenaire de développement Frontend et responsable de l'optimisation IA." }
  ],
  model: "mixtral-8x7b-32768",
  temperature: 0.6,
  max_tokens: 4096,
}).then((chatCompletion) => {
  const mdContent = chatCompletion.choices[0]?.message?.content;
  const outputFilePath = "neofs_Frontend_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
  fs.writeFileSync(outputFilePath, mdContent);
  console.log("Documentation générée et enregistrée dans " + outputFilePath);
});
