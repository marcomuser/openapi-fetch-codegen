#!/usr/bin/env node
import fs from "node:fs/promises";
import parser from "yargs-parser";
import main from "../dist/main.js";

const cli = async () => {
  console.time("Generated files in");
  const [, , ...args] = process.argv;

  const flags = parser(args, {
    string: ["output"],
    alias: {
      output: ["o"],
    },
  });

  const pathToSpec = flags._[0];
  const pathToOutputDir = new URL(
    flags.output,
    new URL(`file://${process.cwd()}/`)
  );

  const { operationsDoc, typesDoc } = await main(pathToSpec);

  try {
    await fs.access(pathToOutputDir);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(pathToOutputDir);
    }
  }

  const promises = [
    fs.writeFile(
      new URL("operations.ts", pathToOutputDir),
      operationsDoc,
      "utf8"
    ),
    fs.writeFile(new URL("types.ts", pathToOutputDir), typesDoc, "utf8"),
  ];

  await Promise.all(promises);

  console.timeEnd("Generated files in");
};

cli();
