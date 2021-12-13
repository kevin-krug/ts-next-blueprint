
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
const DESIGN_TOKEN_PAGE_NAME = 'Design Tokens';
const COLOR_TOKEN_FRAME_NAME = 'Colors';

if (!figmaApiKey) {
	console.log('* Please add add your figma API key: yarn run getfigma <YOURFIGMAAPIKEY>');
    process.exit()
}

const getFigmaFile = async(apiKey: string, fileId ="gh5MCGBOUZixklfZfLW4Fi") => {
    let res = await axios("https://api.figma.com/v1/files/" + fileId, {
        method: "GET",
        headers: {
            "X-Figma-Token": apiKey
        }
    });
    
    return res.data;
}

const getChildNode = (parentNode: any, nodeName: string) => parentNode.children.filter((node: BaseNode) => node.name === nodeName)[0];

const getColors = (pageNode: PageNode) => {
    const colorsLayer = getChildNode(pageNode, COLOR_TOKEN_FRAME_NAME);

    const colors = colorsLayer.children.reduce((acc: any, item: any) => {
        const getRGBValue = (colorKey: string) => item.fills[0].color[colorKey] * 255;

        return {
            ...acc,
            [item.name]: {
                value: `rgba(${getRGBValue("r")}, ${getRGBValue("g")}, ${getRGBValue(
                    "b"
                )}, ${item.fills[0].color.a})`,
                type: "color"
            }
        };
    }, {});

    return colors;
}

const figmaFile = await getFigmaFile(figmaApiKey, figmaId);
const figmaDocument = figmaFile.document;
const styleTokenPage = getChildNode(figmaDocument, DESIGN_TOKEN_PAGE_NAME);
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
