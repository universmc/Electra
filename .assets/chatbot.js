const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');
const Groq = require('groq-sdk');
const tf = require('@tensorflow/tfjs-node'); // Import TensorFlow.js pour Node.js

// Charger les fichiers JSON de rôles
const rolesSystem = JSON.parse(fs.readFileSync(path.join(__dirname, 'role/role-system.json'), 'utf8'));
const rolesAssistant = JSON.parse(fs.readFileSync(path.join(__dirname, 'role/role-assistant.json'), 'utf8'));
const rolesUser = JSON.parse(fs.readFileSync(path.join(__dirname, 'role/role-user.json'), 'utf8'));

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Initialiser le client Groq SDK
const groq = new Groq();

// Fonction pour exécuter des commandes shell
function executeShellCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erreur d'exécution de la commande: ${error.message}`);
        reject(stderr);
      }
      resolve(stdout);
    });
  });
}

// Fonction pour obtenir l'entrée utilisateur
async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

// Fonction pour optimiser un modèle avec TensorFlow.js (ex : régression linéaire, GAN)
async function trainModelWithTensorFlow(data) {
  // Modèle GAN ou régression linéaire simple pour optimisation
  const model = tf.sequential();

  // Ajouter une couche dense (régression linéaire par exemple)
  model.add(tf.layers.dense({ units: 1, inputShape: [data.features.length] }));

  // Compilation du modèle (fonction de perte et optimiseur)
  model.compile({
    optimizer: 'sgd', // Descente de gradient stochastique
    loss: 'meanSquaredError'
  });

  // Conversion des données en tenseurs pour TensorFlow.js
  const xs = tf.tensor2d(data.features);
  const ys = tf.tensor2d(data.labels);

  // Entraînement du modèle (optimisation)
  await model.fit(xs, ys, {
    epochs: 100,
    verbose: 1 // Affiche les étapes de l'entraînement
  });

  // Retourner le modèle entraîné
  return model;
}

// Fonction pour gérer l'interaction entre les rôles via Groq-SDK
async function generateResponseFromGroq(userInput) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: rolesSystem.name || 'system',
          content: rolesSystem.content || 'System is ready for your input.'
        },
        {
          role: rolesUser.name || 'user',
          content: userInput
        }
      ],
      model: rolesSystem.modelName || 'mixtral-8x7b-32768',
      temperature: 0.7, // Ajuste la créativité du modèle
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    // Retourner la réponse générée
    return chatCompletion.choices[0]?.message?.content || 'Je n\'ai pas compris votre demande.';
  } catch (error) {
    console.error('Erreur lors de la génération de la réponse Groq :', error);
    return 'Erreur de communication avec l\'IA.';
  }
}

// Fonction principale pour gérer le flux de dialogue et les commandes shell
async function main() {
  console.log(`Assistant: ${rolesAssistant.intro || "Bonjour, je suis votre assistant IA."}`);

  let sessionActive = true;

  while (sessionActive) {
    const userInput = await getUserInput("Vous: ");

    if (userInput.toLowerCase() === "quitter") {
      sessionActive = false;
      console.log("Assistant: Au revoir !");
      continue;
    }

    // Exécuter une commande shell si l'utilisateur en demande une
    if (userInput.toLowerCase().includes("commande magique")) {
      try {
        const command = userInput.replace("commande magique", "").trim();
        const output = await executeShellCommand(command);
        console.log(`Résultat de la commande: ${output}`);
      } catch (error) {
        console.error("Erreur lors de l'exécution de la commande magique :", error);
      }
      continue;
    }

    // Si l'utilisateur demande une optimisation de modèle TensorFlow.js
    if (userInput.toLowerCase().includes("optimiser modèle")) {
      console.log("Assistant: Lancement de l'optimisation du modèle avec TensorFlow.js...");

      // Exemple de données d'entraînement (features et labels)
      const data = {
        features: [[0.1], [0.2], [0.3], [0.4], [0.5]], // Exemples simplifiés
        labels: [[0.2], [0.4], [0.6], [0.8], [1.0]]
      };

      const trainedModel = await trainModelWithTensorFlow(data);
      console.log("Assistant: Modèle entraîné avec succès !");

      continue;
    }

    // Générer une réponse à l'aide du modèle IA (Groq)
    const assistantResponse = await generateResponseFromGroq(userInput);
    console.log(`Assistant: ${assistantResponse}`);
  }

  rl.close();
}

// Exécution du programme principal
main().catch(console.error);
