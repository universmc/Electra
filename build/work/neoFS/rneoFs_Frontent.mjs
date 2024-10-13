import fs from "fs";
// Importez "groq-sdk" comme un module CommonJS
const { Groq } = await import("groq-sdk");

const groq = new Groq();

// Fonction pour ajouter une tâche à la liste de tâches
function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  fs.writeFileSync('./tasks.json', JSON.stringify(tasks));
}

// Fonction principale
function principle(project,Model_ia,context,role,skills,task,process,characteristics,ImmediateActions,feedbackPrediction,date = new Date().toLocaleDateString('fr-FR')) {
  function getTasks() {
    const data = fs.readFileSync('./tasks.json');
    const tasks = JSON.parse(data);
    return tasks || [];
    }
    const tasks = getTasks();

    const Project =`"${project}+devops"`

  const message = `
  ╔════════════════════════════════════╗\n
  ║✨            ${date}:            ✨║ 
  ║.   ${project} Template.response   .║\n
  ║.       Bienvenue ${Model_ia}      .║\n
  ╠════════════════════════════════════╣\n
  ║✨                                ✨║\n   
  ║. ${context}                       .║\n
  ║.  ${skills} ${role}               .║\n
  ║.  ${process}                      .║\n
  ║.  ${task}                         .║\n
  ║.  ${characteristics}              .║\n
  ║.  ${ImmediateActions}             .║\n
  ║.  ${feedbackPrediction}           .║\n
  ║✨                                ✨║\n
  ╚════════════════════════════════════╝
  `;

  console.log(message);
  const response = {
    message,
  };

  return response;
}

// Appel de la fonction principale avec une tâche
const principleResponse = principle('Projet','Model_ia','Context','Role','Skills','fonction','Tasks','BoucleModel','Process','routine','CharacteristicsEnvisageable','ImmediateActions','feedbackPrediction,emojisAssocie' );




// Création de la completion avec groq-sdk
const completion = await groq.chat.completions.create({
  messages: [
    {role: "assistant", content:"Phase 1: Initialisation de l'instance neoFS_(FullStack)_Frontend"},
    {role: "system", content:": vous êtes programmeur, partenaire de développement Frontend ('index.html','style.css','layout.json','srcipt.js') partenaire de développement SMART.JS qui comprend mes besoins en tant que développeur full stack, en s'intégrant à votre stack technologique, prét à optimisé les prompts, l'intelligence artificielle centrale au coeur de la plateforme -ia dédier à la présentation des Projets D'apprentissage automatique pour les intelligences artificielles -ia \" Model Match_in_Learnin \". Voici votre contexte, vos rôles, vos compétences, vos fonctions, vos tâches, votre boucle model, votre processus, , votre routine, les caractéristiques Envisageable et les actions imédiates recherchées et le feedback attendu et les emoji's associé:"},
  //  {role: "user", content: `"${principleResponse.message}"`},
  ],
  model: "mixtral-8x7b-32768",
  temperature: 0.6,
  max_tokens: 4096,
}).then((chatCompletion) => {
  const mdContent = chatCompletion.choices[0]?.message?.content;
  const outputFilePath = "neofs_Frontend" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
  fs.writeFileSync(outputFilePath, mdContent);
  console.log("Documentation du constructeur générée et enregistrée dans " + outputFilePath);
});