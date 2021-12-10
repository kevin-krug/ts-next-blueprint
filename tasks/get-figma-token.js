
import axios from 'axios';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const figmaApiKey = process.argv[2];
const figmaId = process.argv[3]

if (!figmaApiKey) {
	console.log('* Please add add your figma API key: yarn run getfigma <YOURFIGMAAPIKEY>');
    process.exit()
}

async function getFigmaObjTree(apiKey, fileId ="Mi7wdQqRHavaPODG1EJ8pQ") {
    let res = await axios("https://api.figma.com/v1/files/" + fileId, {
        method: "GET",
        headers: {
            "X-Figma-Token": apiKey
        }
    });
    
    return res.data;
}

const getArtboardStyles = (parentArtboard, artboardName) => parentArtboard.children.filter(item => {
    return item.name === artboardName;
})[0].children;

const getPageStyles = (figmaObjTree, pageName) => getArtboardStyles(figmaObjTree.document, pageName);

const coverArtboard = getPageStyles(await getFigmaObjTree(figmaApiKey, figmaId), "Cover")[0];

const getColors = (artboard) => {
    const paletteArtboard = getArtboardStyles(artboard, 'Palette');

    const colors = paletteArtboard.reduce((acc, item) => {
        const getRGBValue = (colorKey) => item.children[1].fills[0].color[colorKey] * 255;

        return {
            ...acc,
            [item.name]: {
                value: `rgba(${getRGBValue("r")}, ${getRGBValue("g")}, ${getRGBValue(
                    "b"
                )}, ${item.children[1].fills[0].color.a})`,
                type: "color"
            }
        };
    }, {});

    return colors;
}

const colors = getColors(coverArtboard)

const designToken = {
    token: {
        grids: {},
        spacers: {},
        colors,
        fonts: {}
    }
};

const buildDir = __dirname + "/../tokens";

if (!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir);
}
fs.writeFile(buildDir + "/design-token.json", JSON.stringify(designToken), 'utf8', (err) => {
    if(err) {
        return console.log(err);
    }
    console.log(`design-token.json saved to /tokens`);
}); 
