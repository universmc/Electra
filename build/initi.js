const fs = require("fs");
const Groq = require("groq-sdk/index.mjs");
const axios = require('axios');
const { Telegraf } = require('telegraf');
const groq = new Groq();

const borderChars = {
  topLeft: '╔',
  topRight: '╗',
  bottomLeft: '╚',
  bottomRight: '╝',
  horizontal: '═',
  vertical: '║',
  intersectionLeft: '╠',
  intersectionRight: '╣',
  intersectionTop: '╦',
  intersectionBottom: '╩',
  intersectionCross: '╬',
};

const racine = "./"
const Theme = "WorldTheme"

const code_source = `https://github.com/universmc/blog.gi`;
const blog = `https://wp.univers-mc.cloud`;

// Function to display the project plan in a structured format
function displayProjectPlan(plan) {
  console.log(`Project Name: ${plan.projectName}`);
  plan.phases.forEach(phase => {
    console.log(`\nPhase: ${phase.phaseName} - Duration: ${phase.duration}`);
    phase.tasks.forEach(task => {
      console.log(`- ${task}`);
    });
  });
}
async function main() {

  // Contenus pour les différents rôles dans le dialogue
  const roleProgrammeur = `
  ## Contexte : 
  En tant qu'assistant de développement web, je travaille sur le "blog de de developpeurs" utilisant le framework Bootstrap 5. Le projet gestion au dashboard du blog UX https://wp.univers-mc.cloud de technologie de pointe.
  
  ## Rôle :
  En tant que IA generative de code html,css,js,scss, mon rôle est de générer du code pour le projet Bootstrap en utilisant les meilleures pratiques de développement web et en respectant les normes du web sémantique W3C.
  
  ## Compétences :
  - Génération de code HTML, CSS, JS, et SCSS
  - Utilisation du framework Bootstrap 5
  - Compréhension des normes du web sémantique W3C
  - Expérience en développement web responsive
  ## Tâches :
  - Créer la structure HTML de la page web
  - Appliquer le framework Bootstrap 5 pour concevoir la mise en page
  - Écrire du CSS et du SCSS pour styliser la page web
  - Ajouter des fonctionnalités JavaScript pour améliorer l'interactivité de la page
  - Valider le code pour s'assurer qu'il respecte les normes du web sémantique W3C
  
  ## Fonctions :
  - Générer du code HTML pour structurer la page web
  - Intégrer le framework Bootstrap 5 pour créer une mise en page responsive
  - Écrire du CSS et du SCSS pour styliser les différentes sections de la page
  - Ajouter des fonctionnalités JavaScript pour améliorer l'expérience utilisateur
  - Valider le code pour assurer la conformité aux normes du web sémantique W3C
  
  ## Routine :
  - Analyser les exigences du projet
  - Planifier la structure et la mise en page de la page web
  - Générer le code HTML, CSS, JS, et SCSS en fonction des exigences
  - Tester le code pour assurer la fonctionnalité et la conformité aux normes
  - Effectuer des mises à jour et des corrections si nécessaire
  
  ## Processus :
  - Analyse des exigences du projet
  - Conception de la structure et de la mise en page de la page web
  - Génération de code HTML, CSS, JS, et SCSS
  - Test et validation du code
  - Mise à jour et correction du code si nécessaire
  
  ## Caractéristiques :
  - Connaissance approfondie du framework Bootstrap 5
  - Expérience en développement web responsive
  - Connaissance des normes du web sémantique W3C
  - Capacité à générer du code HTML, CSS, JS, et SCSS de haute qualité
  
  ## Actions Immédiates :
  - Analyser les exigences du projet
  - Planifier la structure et la mise en page de la page web
  - Générer le code HTML, CSS, JS, et SCSS en fonction des exigences
  
  ## Résultat/Feedback Attendu :
  - Gestion de programmation de la feuille de style pour le thème WordPress XorldTheme
  - Une page web d'accueil pour une entreprise de technologie de pointe, conçue avec les framework groq-sdk, nextJs, reactJs, threeJs, tensorflow Bootstrap 5, qui respecte les normes du web sémantique W3C.
  - Une expérience utilisateur fluide et interactive, avec des fonctionnalités JavaScript pour améliorer l'expérience utilisateur.
  - Un code propre et bien documenté, qui peut être facilement maintenu et mis à jour.`
  
  // Project plan object
  const ProjectPlan = {
    projectName: "Développement d'une application Électrons comme un pays, il reste de gestion pour le bloc des développeurs WorldPress à cette adresse (wp.univers-mc.cloud),",
    phases: [
      { 
        phaseId:"phase0",  
        description:"model gantt-chart",
        phaseName: "step_1: Initialisation",
        duration:"minimum",
        tasks: [
          titre="Initialisation",
          taskStep= [
            steps= [
              {
                "title": "Exploration de la plateforme",
                "description": "Naviguer sur l'interface utilisateur et découvrir toutes les fonctionnalités offertes par la plateforme. Consulter la documentation et les ressources en ligne pour obtenir une compréhension détaillée des capacités de la plateforme."
              },
            step1="'Initialisation:[rolesSystem(promptSystem)]",
            step2="'Initialisation:[roleAssistant(promptAssistant)]",
            step3="'Initialisation:[roleUser(promptUser)]",
          ]
        ]],
      }
    ],
  };

  // Create a chat completion using the Groq SDK
  await groq.chat.completions.create({
    // Required parameters
    messages: [
        {role: "system", content: `${role}` },
        {role: "user", content: "Initilisation du 'blog du des developpeurs'" },
        {role: "system", content: "nous sommes en phase de développement du thème WordPress en CSS wp.univers-mvc.cloud'" },
        {role: "assistant", content: `lorsque l'utilisateur saisit la commande, tu devient l'assistant générateur de code source. Tu as gérant en fonction de la demande de l'utilisateur et donc de l'algorithme attendu` },
        {role: "assistant", name:"Avatars", content: "t donc tu veux une intelligence artificielle au cœur de mon blog WPP, donc il appartient d'innover créer du contenu innovant de labo et des plans développement à court long moyen terme. Tu pourras faire appel à différents modèles notamment. dall-e-3, gemma2-2b-9b, nodeJs, blender, davinci resolve, groq-sdk, wzlcom sur le 'blog de developpeurs'je m'appel Mickael d'univers-mc" },
        {role: "assistant", name:"PiBot", content: "" },
        {role: "system", content: `l'intégralité de ton '${code_source}' se trouve à cette adresse et régulièrement mise à jour sur un sac d'évolution de progrèssion à long terme` },
    //  {role: "user", content: "ta réponse doit être rédigé au format HTML, respectant les normes du Web sémantique W3C" },
         // Utilisation de l'entrée de l'utilisateur
     // {role: "user", name:"systemDream",content:"phase0:initialisation de l'instance gantt-chart"},
     // {role: "assistant",name:"✨_pi", content: "Création d'un guide complet étate par étape avec des exemples de script sur la language de programmation groq"},
     // {role: "system",name:"Groq", content: "message(phase_).response"},
     // {role: "user", name:"systemDream",content:"le guide devrait être rédigé au format Markdown avec la fonction createAsciiFrame ASCII dev response"},
     // {role: "assistant",name:"✨_pi", content: "phase0-step1 elaboration du sommaire"},
     // {role: "assistant",name:"✨_pi", content: "phase0-step1, Phase de conceptualisation d'une interfaces graphiques avec $gantt-chart"},
     // {role: "system", name:"systemDream",content:"phase1:Conceptualisation"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase2:Configuration"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase3: entraînement modèle IA"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase4: Itération & Des scripts Frontend"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase5: Itération & Des scripts Backend"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase6: Test & Debugage"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase7: Validation & Documentation"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase8: Deployement system Version"},
     // {role: "assistant",name:"✨_pi", content: "init"},
     // {role: "user",name:"Groq", content: ""},
     // {role: "system", name:"systemDream",content:"phase8: Annonce affiliation contribution"},
     // {role: "assistant",name:"✨_pi", content: "init"},
      //  {role: "user",name:"Groq", content: "Elaboration du bilan bilan avec le model de Gant"},
      //  {role: "system", content: ProjectPlan },
      //  {role: "assistant",name:"✨_pi", content: "groq -L"},
      //  {role: "system", name:"systemDream",content:"création de la documentation du 'ProjectPlan' de la phase(0)"},
    ],
    
    // The language model which will generate the completion.
    model: "mixtral-8x7b-32768",
    // Optional parameters
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false,
  }).then((chatCompletion)=>{
    // Write the completion to a markdown file
    const htmlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "Boostrap_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("(✨_pi)_: Groq_job : Documentation généré et enregistré dans " + outputFilePath);
  });
}
main();