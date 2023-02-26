#!/usr/bin/env node
import parser from "yargs-parser";
import { main } from "../dist/main.js";

const cli = () => {
  const [, , ...args] = process.argv;

  const flags = parser(args, {
    string: ["types"],
    alias: {
      types: ["t"],
    },
  });

  const pathToSpec = flags._[0];
  const pathToTypes = flags.types;

  main(pathToSpec, pathToTypes);
};

cli();
