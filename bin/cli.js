#!/usr/bin/env node
import fs from "node:fs/promises";
import parser from "yargs-parser";
import main from "../dist/main.js";

const HELP = `Usage
  $ openapi-fetch-codegen [input] [options]

Options
  --help                       Display this
  --output, -o                 Specify path to output directory
  --parse, -p                  (optional) Specify parse mode - simple, bundle or dereference
`;

const cli = async () => {
  console.time("Generated files in");
  const [, , ...args] = process.argv;

  const flags = parser(args, {
    string: ["output"],
    alias: {
      output: ["o"],
      parse: ["p"],
    },
    choices: {
      parse: ["simple, bundle, dereference"],
    },
    default: {
      parse: "simple",
    },
  });

  if ("help" in flags) {
    console.info(HELP);
    process.exit(0);
  } else if (!flags._[0] || !flags.output) {
    console.error(
      "Missing argument! Both the path to a schema and an output directory must be provided"
    );
    process.exit(1);
  }

  const pathToSpec = flags._[0];
  const pathToOutputDir = new URL(
    flags.output,
    new URL(`file://${process.cwd()}/`)
  );
  const parseMode = flags.parse;

  const { operationsDoc, typesDoc } = await main({ pathToSpec, parseMode });

  try {
    await fs.access(pathToOutputDir);
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(pathToOutputDir);
    } else {
      throw err;
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
