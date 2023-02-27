#!/usr/bin/env node
import parser from "yargs-parser";
import { main } from "../dist/main.js";

const cli = () => {
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

  main({ pathToSpec, pathToTypes, pathToOutput });

  // then use writeToDisk, pass the string returned by main and create the output file
};

cli();
