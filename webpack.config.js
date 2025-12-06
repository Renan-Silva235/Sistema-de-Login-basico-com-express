//npm install webpack webpack-cli @babel/core @babel/preset-env babel-loader style-loader css-loader --save-dev
//npm install core-js regenerator-runtime

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//exporta um objeto de configuração
export default {
    // 1) arquivo inicial do projeto
    entry: "./frontend/main.js",

    // 2) arquivo de saída
    output: {
        filename: "bundle.js", // nome do arquivo final
        path: path.resolve(__dirname, ".", "public", "assets", "js"), //onde o arquivo final está guardado
    },

    // 3) regras para transformar arquivos
    module: {
        rules: [
            // Regras para arquivos JS
            {
                test: /\.js$/, //quais arquivos pegar
                exclude: /node_modules/, //oq ele deve ignorar, no caso as libs
                use: {
                    loader: "babel-loader", //usa babel para transformar JS
                    options: {
                        presets: [
                            [
                                "@babel/preset-env", //converte o js moderno para o js antigo
                                {
                                    useBuiltIns: "usage", //adiciona polyfills só quando necessário
                                    corejs: 3, //versão da core-js
                                }
                            ]
                        ]
                    }

                }
            },

            // Regras para arquivos CSS
            {
                test: /\.css$/, // pega arquivos css
                use: [
                    "style-loader", // colocar css na página
                    "css-loader", //permite importar css no js
                ]
            }
        ]
    },

    // 4) Modo de build
    mode: "development"  // sem minificar e com debugging

};


