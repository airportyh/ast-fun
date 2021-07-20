const esprima = require("esprima");
const fs = require("fs").promises;

async function main() {
    const filepath = process.argv[2];
    if (!filepath) {
        console.log("Please provide a file path");
        return;
    }
    const code = (await fs.readFile(filepath)).toString();
    const outputPath = filepath.replace(/\.js$/, ".ast");
    const ast = esprima.parse(code);
    await fs.writeFile(outputPath, JSON.stringify(ast, null, "  "));
    console.log("Wrote", outputPath);
}

main().catch(console.log);

