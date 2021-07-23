const fs = require("fs").promises;

async function main() {
    try {
        const filepath = process.argv[2];
        if (!filepath) {
            console.log("Please provide a file path");
            return;
        }
        const json = (await fs.readFile(filepath)).toString();
        const ast = JSON.parse(json);
        traverse(ast, 0);
    } catch (err) {
        console.log(err.stack);
    }
}

main();

function traverse(node, level) {
    const indent = Array(level + 1).join("  ");
    console.log(indent, "type:", node.type);
    
    
    switch (node.type) {
        case "Program":
            for (let child of node.body) {
                traverse(child, level + 1);
            }
            break;
        case "VariableDeclaration":
            for (let child of node.declarations) {
                traverse(child, level + 1);
            }
            break;
        case "VariableDeclarator":
            traverse(node.id, level + 1);
            traverse(node.init, level + 1);
            break;
        case "Literal":
            console.log(indent, "  ", node.value);
            break;
        case "Identifier":
            console.log(indent, "  ", node.name);
            break;
        case "BinaryExpression":
            console.log(indent, "  ", node.operator);
            traverse(node.left, level + 1);
            traverse(node.right, level + 1);
            break;
        case "CallExpression":
            traverse(node.callee, level + 1);
            for (let child of node.arguments) {
                traverse(child, level + 1);
            }
            break;
        case "MemberExpression":
            traverse(node.object, level + 1);
            traverse(node.property, level + 1);
            break;
        case "ExpressionStatement":
            traverse(node.expression, level + 1);
            break;
        default:
            throw new Error("Node type not handled: " + node.type);
    }
}

