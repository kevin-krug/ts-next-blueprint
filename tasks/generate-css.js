import StyleDictionary from "style-dictionary";

const styleDictionary = StyleDictionary.extend({
    source: ["tokens/*.json"],
    platforms: {
        css: {
            transformGroup: "css",
            buildPath: "build/",
            files: [
                {
                    destination: "_colors.css",
                    format: "css/variables",
                    filter: {
                        type: "color"
                    }
                },
                {
                    destination: "_typography.css",
                    format: "css/variables",
                    filter: {
                        type: "typography"
                    }
                },
                {
                    destination: "_grids.css",
                    format: "css/variables",
                    filter: {
                        type: "grids"
                    }
                },
                {
                    destination: "_spacers.css",
                    format: "css/variables",
                    filter: {
                        type: "spacers"
                    }
                }
            ]
        }
    }
});

styleDictionary.buildAllPlatforms();
