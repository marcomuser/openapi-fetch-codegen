import type { Document, Operation, RequestBody } from "../types.js";
import { extractRequestBody } from "./extractRequestBody.js";

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
        parameters: methodSchema.parameters?.length ? true : false,
        requestBody: methodSchema.requestBody
          ? extractRequestBody(methodSchema.requestBody as RequestBody)
          : null,
        responses: methodSchema.responses,
      };

      operations.push(operation);
    }
  }

  return operations;
};

export type ExtractedOperations = ReturnType<typeof extractOperations>;
