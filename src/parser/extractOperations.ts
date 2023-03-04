import type { Document, Operation } from "../types.js";

export const extractOperations = (spec: Document) => {
  const operations = [];
  const paths = spec.paths || {};

  for (const path in paths) {
    const methods = paths[path] as Record<string, Operation>;

    for (const method in methods) {
      const methodSchema = methods[method];

      const operation = {
        path,
        method: method.toUpperCase(),
        operationId: methodSchema.operationId,
        parameters: methodSchema.parameters,
        requestBody: methodSchema.requestBody,
        responses: methodSchema.responses,
      };

      operations.push(operation);
    }
  }

  return operations;
};
