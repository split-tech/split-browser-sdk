import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const plugins = [
  json(),
  nodeResolve({ extensions }),
  commonjs(),
  typescript(),
  // TODO: 개발 완료 후 주석 제거
  terser(),
];

export default [
  {
    input: "src/index.ts",
    external: [Object.keys(pkg.dependencies || {}), Object.keys(pkg.peerDependencies || {})].flat(),
    output: [
      {
        file: pkg.module,
        format: "esm",
      },
      {
        file: pkg.main,
        format: "cjs",
      },
    ],
    plugins,
  },
  {
    input: "src/index.ts",
    output: [
      {
        name: pkg.name,
        file: pkg.browser,
        format: "umd",
      },
    ],
    plugins,
  },
];
