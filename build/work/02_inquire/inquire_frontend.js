import inquirer from 'inquirer';
import fs from 'fs';
import axios from 'axios';
import OpenAI from 'openai';
import Groq from 'groq-sdk';

const openai = new OpenAI();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Charger le fichier intents.json et task.json
const intents = JSON.parse(fs.readFileSync('intent.json', 'utf8'));
const tasks = JSON.parse(fs.readFileSync('task.json', 'utf8'));

// Fonction principale pour démarrer l'interaction
async function main() {
  const subject = process.argv[2] || "Génération_site_web";

  // Demander le thème général et les aspects stylistiques
  const themeQuestions = [
    {
      type: 'input',
      name: 'subjectTitle',
      message: 'Quel est le titre du sujet du site web ?',
    },
    {
      type: 'list',
      name: 'theme',
      message: 'Quel est le thème principal pour ce site ?',
      choices: ['Technologie', 'Éducation', 'Entreprise', 'Art et Design', 'Mode', 'Santé', 'Blog Personnel'],
    },
    {
      type: 'list',
      name: 'primaryColor',
      message: 'Quelle est la couleur principale du site ?',
      choices: ['Bleu', 'Vert', 'Rouge', 'Jaune', 'Noir', 'Blanc', 'Personnalisé'],
    },
    {
      type: 'list',
      name: 'fontStyle',
      message: 'Quel style de police souhaitez-vous utiliser ?',
      choices: ['Sans-serif (moderne)', 'Serif (classique)', 'Monospace (code)', 'Cursive (fantaisie)', 'Handwritten (écriture à la main)'],
    }
  ];

  const answersTheme = await inquirer.prompt(themeQuestions);
  
  console.log(`Vous avez choisi :
    - Titre du sujet : ${answersTheme.subjectTitle}
    - Thème : ${answersTheme.theme}
    - Couleur principale : ${answersTheme.primaryColor}
    - Style de police : ${answersTheme.fontStyle}
  `);

  // Enchaîner sur les questions pour la génération du Frontend en fonction du thème
  const frontendQuestions = [
    {
      type: 'list',
      name: 'section',
      message: 'Quelle section souhaitez-vous générer ?',
      choices: ['Frontend', 'Backend', 'API REST'],
    },
    {
      type: 'list',
      name: 'technology',
      message: 'Choisissez une technologie pour le Frontend:',
      choices: ['HTML/CSS', 'HTML/SCSS/JSON', 'HTML/CSS/JS/JSON', 'HTML/CSS/SVG', 'React'],
      when: (answers) => answers.section === 'Frontend',
    },
  ];

  const answersFrontend = await inquirer.prompt(frontendQuestions);
  
  console.log(`Vous avez choisi :
    - Section : ${answersFrontend.section}
    - Technologie : ${answersFrontend.technology || 'N/A'}
  `);

  // Lancer la génération du site web avec charte graphique et Frontend
  await generateSite(answersTheme, answersFrontend, subject);
}

// Fonction pour générer le site web basé sur les réponses, incluant la charte graphique
async function generateSite(answersTheme, answersFrontend, subject) {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: intents.system[answersFrontend.section] },
        { role: 'assistant', content: intents.assistant[answersFrontend.section] },
        { role: 'user', content: `L'utilisateur a choisi le thème ${answersTheme.theme} avec ${answersFrontend.technology || 'N/A'} pour le Frontend.` }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 2048,
    });

    const generatedContent = completion.choices[0]?.message?.content || 'Aucune réponse générée';
    console.log("Complétion générée:", generatedContent);

    const filePath = `output/generation_${answersFrontend.section}_${subject}.md`;
    fs.writeFileSync(filePath, generatedContent);
    console.log(`Contenu généré sauvegardé dans ${filePath}`);

    if (answersFrontend.section === 'Frontend') {
      await generateFrontend(answersTheme, answersFrontend, subject);
    }
  } catch (error) {
    console.error("Erreur lors de la génération du site:", error.message);
  }
}

// Génération Frontend avec charte graphique
async function generateFrontend(answersTheme, answersFrontend, subject) {
  console.log("Génération du Frontend avec charte graphique...");

  const content = await generateContent(subject, answersTheme);
  await generateStructure(content, subject, answersTheme);

  console.log(`Frontend généré avec succès pour le sujet : ${subject}`);
}

// Générer le contenu avec le style graphique
async function generateContent(subject, answersTheme) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: 'user', content: `Génère un contenu pour une page Web sur ${subject} avec un thème ${answersTheme.theme} et une charte graphique de couleur ${answersTheme.primaryColor} et de police ${answersTheme.fontStyle}.` }
    ],
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    max_tokens: 2048
  });
  
  const contentText = chatCompletion.choices[0]?.message?.content || '';
  const imageUrl = await generateImage(subject);

  return { text: contentText, image: imageUrl };
}

// Générer la structure avec HTML/CSS/JS et les éléments graphiques
async function generateStructure(content, subject, answersTheme) {
  const html = generateHTML(content, subject, answersTheme);
  const htmlFile = `output/page_${subject}.html`;
  fs.writeFileSync(htmlFile, html);

  const css = generateCSS(answersTheme);
  const cssFile = `output/style_${subject}.css`;
  fs.writeFileSync(cssFile, css);

  const js = generateJavaScript(subject);
  const jsFile = `output/script_${subject}.js`;
  fs.writeFileSync(jsFile, js);

  console.log("Structure HTML/CSS/JS générée avec succès.");
}

// Générateur HTML avec charte graphique
function generateHTML(content, subject, answersTheme) {
  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <link href="style_${subject}.css" rel="stylesheet">
  </head>
  <body style="background-color: ${answersTheme.primaryColor}; font-family: ${answersTheme.fontStyle};">
    <div class="container">
      <h1>${subject}</h1>
      <img src="${content.image}" alt="Image descriptive de ${subject}">
      <div class="content">${content.text}</div>
    </div>
    <script src="script_${subject}.js"></script>
  </body>
  </html>
  `;
}

// Générateur CSS avec charte graphique
function generateCSS(answersTheme) {
  return `
  body {
    font-family: ${answersTheme.fontStyle}, sans-serif;
    background-color: ${answersTheme.primaryColor};
    padding: 20px;
  }
  .container {
    max-width: 900px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0,0,0,0.1);
  }
  `;
}

// Générateur JavaScript pour le Frontend
function generateJavaScript(subject) {
  return `
  document.addEventListener("DOMContentLoaded", function() {
    console.log('Page ${subject} chargée.');
  });
  `;
}

// Générer une image associée
async function generateImage(subject) {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Générer une image pour ${subject}`,
    n: 1,
    size: "1024x1024"
  });

  const imageUrl = response.data[0].url;
  const imageFile = `output/image_${subject}.webp`;
  const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  fs.writeFileSync(imageFile, imageResponse.data);
  
  return imageFile;
}

main();
