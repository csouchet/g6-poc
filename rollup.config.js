import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import json from "@rollup/plugin-json";
import sizes from "rollup-plugin-sizes";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import sourceMaps from "rollup-plugin-sourcemaps";

import * as tscompile from "typescript";

import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: pkg.module,
        format: "es",
        sourcemap: true
      }
    ],
    external: [...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      typescript({ typescript: tscompile, clean: true }),
      nodeResolve({ mainFields: ["module"], modulesOnly: true }),
      commonjs(),
      builtins(),
      sizes(),
      json(),
      serve({
        contentBase: ["dist", "static"],
        port: 8080,
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }),
      livereload({ watch: "dist", verbose: true }),
      sourceMaps()
    ]
  }
];
