
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


const getPageStyles = (figmaObjTree, pageName) => figmaObjTree.document.children.filter(item => {
    return item.name === pageName;
})[0].children;


if (!figmaApiKey) {
	console.log('* Please add add your figma API key: yarn run getfigma <YOURFIGMAAPIKEY>');
} else {
    console.log(getPageStyles(await getFigmaObjTree(), "Cover"))
}

