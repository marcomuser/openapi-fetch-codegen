#!/usr/bin/env node
import parser from "yargs-parser";
import main from "../dist/main.js";
import { writeToDisk } from "../dist/writer/writeToDisk.js";

const cli = async () => {
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

  const outputString = await main({
    pathToSpec,
    pathToTypes,
    pathToOutput,
  });

  writeToDisk(outputString);
};

cli();
