import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";

import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: `dist/index.es.js`,
        format: "es",
        sourcemap: true
      }
    ],
    external: [...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      typescript(),
      nodeResolve({ mainFields: ["module"], modulesOnly: true }),
      commonjs(),
      builtins()
    ]
  }
];
