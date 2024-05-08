import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert { type: "json" };

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const plugins = [
  json(),
  nodeResolve({
    extensions,
    preferBuiltins: true, // Node.js의 내장 모듈을 선호, 경고 메시지 제거
  }),
  commonjs(),
  typescript({
    tsconfig: "./tsconfig.json", // tsconfig.json 파일 사용
  }),
  babel({
    extensions,
    include: ["src/**/*"],
    babelHelpers: "bundled",
  }),
  // TODO: 개발 완료 후 주석 제거
  terser(),
];

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  "react",
  "react-dom",
  "wagmi",
  "ethers",
];

export default [
  {
    input: "src/index.ts",
    external,
    output: [
      {
        dir: "dist",
        format: "esm",
      },
      {
        dir: "dist",
        format: "cjs",
      },
    ],
    plugins,
  },
];
