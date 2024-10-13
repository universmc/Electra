const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

const subject = process.argv[2] || 'blog'; // Obtenir le sujet via l'argument de ligne de commande

function generateMarkdown(subject) {
  return `## Comment [${subject}] - Un guide étape par étape

**Introduction**:

Ce guide vous aidera à comprendre et à réaliser [${subject}]. Il est conçu pour les débutants et les utilisateurs intermédiaires qui souhaitent apprendre les bases de [${subject}].

**Prérequis**:

* [Liste des prérequis nécessaires pour suivre ce guide, par exemple: une connexion internet, un compte sur une plateforme spécifique, etc.]

**Étapes**:

1. **[Étape 1]:**
   * Décrivez en détail l'étape 1, incluant les instructions claires et concises.
   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.
   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.

2. **[Étape 2]:**
   * Décrivez en détail l'étape 2, incluant les instructions claires et concises.
   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.
   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.

3. **[Étape 3]:**
   * Décrivez en détail l'étape 3, incluant les instructions claires et concises.
   * Utilisez des listes à puces ou des paragraphes pour améliorer la lisibilité.
   * Ajoutez des images ou des captures d'écran pour illustrer les étapes si nécessaire.

**Conseils:**

* [Ajoutez des conseils utiles pour réaliser [${subject}] avec succès.]

**Ressources supplémentaires:**

* [Listez des liens vers des ressources supplémentaires, telles que des tutoriels, des articles de blog ou des forums, qui peuvent être utiles aux utilisateurs.]`;
}

const subjects = [
  "News",
  "intélligence_artificielle",
  "Machine_learning",
  "Nouvelles_Technologie",
  "Video_game",
  "Democratie_participative",
  "Cinéma_box_office",
  "Agriculture",
  "Justice",
  "meta_Avatar",
  "Industrie",
  "univers_Crypto",
  "Google_for_Gemini",
  // Ajoutez autant de sujets que vous le souhaitez
];

async function main() {
  for (const subject of subjects) {
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "user", content: subject },
          { role: "system", content: `Un guide étape par étape pour ${subject}` },
          {
            role: "assistant",
            content: generateMarkdown(subject), // Utilise la fonction pour générer le Markdown
          },
        ],
        model: "gemma2-9b-it",
        temperature: 0.5,
        max_tokens: 4096,
      }).then((chatCompletion) => {
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = `Sessions/Blog_${subject}_` + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log(`Le How-To sur ${subject} a été enregistré sur github dans ${outputFilePath}`);
      });
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  }
}

main();
