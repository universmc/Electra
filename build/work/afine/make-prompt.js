const fs = require("fs");
const { Telegraf } = require('telegraf');
const Groq = require('groq-sdk');
const axios = require('axios');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Liste des thèmes avec leur charte graphique et palette de couleurs
const themes = {
  "Apprentissage_automatique": {
    "indexation": "Un guide complet sur l'apprentissage automatique avec une mise en page simple et accessible.",
    "charte_graphique": {
      "font": "Arial, sans-serif",
      "spacing": "15px",
      "images": "illustrations éducatives",
    },
    "palette_de_couleurs": {
      "background": "#f9f9f9",
      "primary": "#3b82f6",
      "secondary": "#10b981",
      "text": "#333",
    }
  },
  "Développement_Web": {
    "indexation": "Un guide moderne pour le développement Web avec une présentation claire et dynamique.",
    "charte_graphique": {
      "font": "Roboto, sans-serif",
      "spacing": "20px",
      "images": "captures d'écran et graphiques",
    },
    "palette_de_couleurs": {
      "background": "#ffffff",
      "primary": "#f59e0b",
      "secondary": "#ef4444",
      "text": "#111",
    }
  }
};

// Générer un prompt pour un thème donné
function generatePrompt(subject) {
  const theme = themes[subject];

  if (!theme) {
    throw new Error(`Le thème ${subject} n'est pas défini.`);
  }

  const prompt = `
Sujet : ${subject}
Indexation : ${theme.indexation}
Charte graphique :
  - Police : ${theme.charte_graphique.font}
  - Espacements : ${theme.charte_graphique.spacing}
  - Images : ${theme.charte_graphique.images}
Palette de couleurs :
  - Arrière-plan : ${theme.palette_de_couleurs.background}
  - Couleur principale : ${theme.palette_de_couleurs.primary}
  - Couleur secondaire : ${theme.palette_de_couleurs.secondary}
  - Texte : ${theme.palette_de_couleurs.text}
  `;

  return prompt;
}

async function generateWebPage(subject) {
  console.log("Génération de la page Web pour le sujet :", subject);

  const prompt = generatePrompt(subject);
  console.log("Prompt généré :\n", prompt);

  // Générer le texte de contenu via OpenAI
  const content = await generateContent(prompt);
  
  // Générer la structure HTML/CSS
  const structure = generateStructure(content);
  
  // Sauvegarde du fichier HTML généré
  const fileName = `generated_page_${subject}.html`;
  fs.writeFileSync(fileName, structure);
  console.log(`Page Web générée et sauvegardée dans ${fileName}`);
}

// Fonction de génération du contenu basé sur le prompt
async function generateContent(prompt) {
  console.log("Envoi du prompt à OpenAI pour générer le contenu...");
  
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "Vous êtes un assistant qui génère du contenu pour une page Web." },
      { role: "user", content: prompt }
    ],
    model: "gemma2-9b-it",
    temperature: 0.7,
    max_tokens: 2048,
  });

  return chatCompletion.choices[0].message.content;
}

// Fonction de génération de la structure HTML/CSS
function generateStructure(content) {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Web - ${content.subject}</title>
  <style>
    body {
      background-color: ${content.palette.background};
      color: ${content.palette.text};
      font-family: ${content.charte_graphique.font};
      margin: 0;
      padding: ${content.charte_graphique.spacing};
    }
    .header {
      background-color: ${content.palette.primary};
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      margin: 20px;
      text-align: left;
    }
    .footer {
      background-color: ${content.palette.secondary};
      color: white;
      padding: 10px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${content.subject}</h1>
  </div>
  <div class="content">
    ${content.text}
  </div>
  <div class="footer">
    © 2024 ${content.subject}. Tous droits réservés.
  </div>
</body>
</html>
  `;
}

// Appel de la fonction principale pour générer la page Web
generateWebPage("Apprentissage_automatique").catch(console.error);
