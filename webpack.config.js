import webpack from "webpack";
import dotenv from "dotenv";

const env = dotenv.config().parsed || {};

export default {
    plugins: [
        new webpack.DefinePlugin(
            Object.fromEntries(
                Object.entries(env).map(([key, value]) => [
                    `process.env.${key}`,
                    JSON.stringify(value),
                ])
            )
        ),
    ],
};
