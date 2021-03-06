// @format

const path = require("path");

const reactDocgenTypescript = require("react-docgen-typescript").withCustomConfig(
    "./tsconfig.json"
);

const typescriptPropsParser = reactDocgenTypescript.parse;

module.exports = {
    require: [path.resolve(path.join(__dirname, 'doc_data/viz_data.js'))],
    title: "Data Explorer",
    defaultExample: false,
    propsParser: typescriptPropsParser,
    resolver: require("react-docgen").resolver.findAllComponentDefinitions,
    skipComponentsWithoutExample: true,
    exampleMode: "expand",
    usageMode: "colapse",
    pagePerSection: true,
    sections: [
        { name: "Documentation", content: "src/Documentation.md" },
        {
            name: "Components",
            description: "DataExplorer component documentation",
            components: "src/components/*.tsx",

        }
    ],
    compilerConfig: {
        // Allow us to use {...props}
        objectAssign: "Object.assign",
        transforms: {
            modules: false,
            // whether template strings get transpiled (we don't want it to, so that we can use the native functionality)
            templateString: false
        }
    },
    template: {
        body: {
            raw: ``
        }
    },
    webpackConfig: {
        node: {
            fs: "empty",
            child_process: "empty",
            net: "empty",
            canvas: "empty"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        },
        externals: ["canvas"],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: {
                        compilerOptions: {
                            strict: true,
                            jsx: "react",
                            composite: true
                        },
                        projectReferences: true,
                        transpileOnly: true
                    }
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
            ]
        }
    },
    moduleAliases: {
        '@nteract/data-explorer': path.resolve(__dirname, 'src/index')
    }
};