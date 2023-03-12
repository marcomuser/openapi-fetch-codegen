#!/usr/bin/env node
import fs from "node:fs/promises";
import parser from "yargs-parser";
import main from "../dist/main.js";

const cli = async () => {
  console.time("Generated files in");
  const [, , ...args] = process.argv;

  const flags = parser(args, {
    string: ["types", "output"],
    alias: {
      types: ["t"],
      output: ["o"],
    },
  });

  const pathToSpec = flags._[0];
  const pathToTypes = flags.types;
  const pathToOutput = flags.output;

  const { document, types } = await main({
    pathToSpec,
    pathToTypes,
  });

  const promises = [
    fs.writeFile(pathToOutput, document, "utf8"),
    fs.writeFile(pathToTypes, types, "utf8"),
  ];

  await Promise.all(promises);

  console.timeEnd("Generated files in");
};

cli();
