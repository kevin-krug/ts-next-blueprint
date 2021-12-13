
import axios from 'axios';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/* Node type	Properties
DOCUMENT	
childrenNode[]
An array of canvases attached to the document
CANVAS	
childrenNode[]
An array of top level layers on the canvas */


type ParentNode = DocumentNode | PageNode;

const __dirname = dirname(fileURLToPath(import.meta.url));
const figmaApiKey = process.argv[2];
const figmaId = process.argv[3]

// todo: make configurable
const STYLE_TOKEN_PAGE_NAME = 'Cover';
const COLOR_TOKEN_LAYER_NAME = 'Palette';

if (!figmaApiKey) {
	console.log('* Please add add your figma API key: yarn run getfigma <YOURFIGMAAPIKEY>');
    process.exit()
}

const getFigmaFile = async(apiKey: string, fileId ="Mi7wdQqRHavaPODG1EJ8pQ") => {
    let res = await axios("https://api.figma.com/v1/files/" + fileId, {
        method: "GET",
        headers: {
            "X-Figma-Token": apiKey
        }
    });
    
    return res.data;
}

const getChildNodeChildren = (parentNode: any, nodeName: string) => parentNode.children.filter((node: BaseNode) => {
    return node.name === nodeName;
})[0].children;

const getColors = (pageNode: PageNode) => {
    const paletteLayer = getChildNodeChildren(pageNode, COLOR_TOKEN_LAYER_NAME);

    const colors = paletteLayer.reduce((acc: any, item: any) => {
        const getRGBValue = (colorKey: string) => item.children[1].fills[0].color[colorKey] * 255;

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

const figmaFile = await getFigmaFile(figmaApiKey, figmaId);
const figmaDocument = figmaFile.document;
const styleTokenPage = getChildNodeChildren( figmaDocument, STYLE_TOKEN_PAGE_NAME)[0];
const colors = getColors(styleTokenPage)

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
