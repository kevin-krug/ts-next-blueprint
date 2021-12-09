
import axios from 'axios';
const figmaApiKey = process.argv[2];

async function getFigmaObjTree(apiKey=figmaApiKey, figmaId ="Mi7wdQqRHavaPODG1EJ8pQ") {
    let res = await axios("https://api.figma.com/v1/files/" + figmaId, {
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

const coverArtboard = getPageStyles(await getFigmaObjTree(), "Cover")[0];

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

<<<<<<< HEAD
if (!figmaApiKey) {
	console.log('* Please add add your figma API key: yarn run getfigma <YOURFIGMAAPIKEY>');
} else {
    console.log(getPageStyles(await getFigmaObjTree(), "Cover"))
}

=======
const colors = getColors(coverArtboard)

console.log(colors);
>>>>>>> 0233db9 (:wrench: adds getColors fct to get-figma task)
