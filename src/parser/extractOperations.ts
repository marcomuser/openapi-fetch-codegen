import type { Document, OperationObject } from "../types.js";

export const extractOperations = (schema: Document) => {
  const operations = [];
  const paths = schema.paths || {};

  for (const path in paths) {
    const methods = paths[path] as Record<string, OperationObject>;

    for (const method in methods) {
      const methodSchema = methods[method];

      const operation = {
        path,
        method: method.toUpperCase(),
        operationId: methodSchema.operationId,
        parameters: methodSchema.parameters,
        requestBody: methodSchema.requestBody,
      };

      operations.push(operation);
    }
  }

  return operations;
};
