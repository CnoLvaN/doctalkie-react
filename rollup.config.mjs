import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      exports: "named",
    },
    {
      file: "dist/index.esm.js",
      format: "es",
    },
  ],
  plugins: [
    peerDepsExternal(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
        include: ["."],
      },
    }),
  ],
};
