# SMART - Application Electron avec Intégration Gemini et GPT
## Description
Cette application Electron intègre Gemini pour gérer les données en back-end et GPT (GPT-4 ou GPT-3) pour gérer l'affichage en front-end, avec un script JavaScript commun qui orchestre les interactions entre les différentes parties de l'application. L'objectif principal de cette application est de démontrer une intégration réussie de ces technologies pour créer une application de bureau efficace.

## Configuration requise
- Node.js v16 ou version ultérieure
- NPM ou Yarn pour gérer les dépendances
- [Groq SDK](https://groq.readthedocs.io/en/latest/sdk.html) pour la programmation de systèmes quantiques

## Installation
1. Cloner le référentiel : `git clone <url_du_repository>`
2. Installer les dépendances : `npm install` ou `yarn install`
3. Lancer l'application : `npm start` ou `yarn start`
## Options d'exécution
- Pour définir le modèle GPT à utiliser, mettez à jour le champ "model" dans la section "gpt" du fichier package.json.
- Pour définir le modèle Gemini à utiliser, mettez à jour le champ "model" dans la section "gemma" du fichier package.json.

## Architecture de l'application
L'application est basée sur Electron, avec des composants supplémentaires pour gérer les communications avec Gemini et GPT. Le script JavaScript commun coordonne les interactions entre les différentes parties de l'application.

### Composants principaux
1. Electron : Framework de création d'applications de bureau multi-plateformes.
2. Gemini : Utilisé pour la gestion des données en back-end.
3. GPT (GPT-4 ou GPT-3) : Utilisé pour gérer l'affichage en front-end.
4. Script JavaScript commun : Sert de pont entre les différents composants de l'application.

## Contributeurs
<Ajouter les contributeurs ici>

## Licence
Ce projet est disponible sous la licence MIT. Consultez le fichier LICENSE pour plus d'informations.
