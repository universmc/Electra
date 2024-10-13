const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main(
) {
    const sujet = "l'existence";
    const verbe = "est défini";
    const complement = "par la pensée";
    const contexte = "dans le cadre de la métaphysique";

    const resultat = await phraseDescartes(sujet, verbe, complement, contexte);

    groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `"${resultat}"`
},
            {
                role: "user",
                content: "Rédige-moi une dissertation ou un court exposé sur ta compréhension ou interprétation de cette citation de M. Descartes."
}
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.8,
        max_tokens: 2048,
        top_p: 1,
        stop: null,
        stream: false
}).then((chatCompletion) => {
        const mdContent = chatCompletion.choices[0]?.message?.content;
        const outputFilePath = "output/Descartes_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".md";
        fs.writeFileSync(outputFilePath, mdContent);
        console.log("Documentation générée et enregistrée dans " + outputFilePath);
    });
}

async function phraseDescartes(sujet, verbe, complement, contexte) {
    const phrases = [
        `"${sujet} ${verbe} ${complement}, ${contexte}"`,
        `"La ${sujet} est ${verbe} parce que ${complement}, dans le cadre de ${contexte}"`,
        `"Pour ${contexte}, ${sujet} doit être ${verbe} avec ${complement}"`,
        `"${contexte} nécessite que ${sujet} soit ${verbe} en tant que ${complement}"`
];

    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

main();
