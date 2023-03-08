import { HTTP_VERBS } from "../utils/constants.js";
import type {
  Document,
  Operation,
  Parameter,
  RequestBody,
} from "../utils/types.js";
import { getReqPreferredContentType } from "./getReqPreferredContentType.js";
import { getResWithPreferredContentType } from "./getResWithPreferredContentType.js";

export const getOperations = (spec: Document) => {
  const operations = [];
  const paths = spec.paths || {};

  for (const path in paths) {
    const methods = paths[path] as Record<string, Operation>;

    for (const method in methods) {
      if (HTTP_VERBS[method.toLowerCase() as keyof typeof HTTP_VERBS]) {
        const methodSchema = methods[method];

        const operation = {
          path,
          method: method.toUpperCase(),
          operationId: methodSchema.operationId,
          hasParameters: Boolean(methodSchema.parameters?.length),
          hasQueryParams: (methodSchema.parameters as Parameter[])?.some(
            (p) => p.in === "query"
          ),
          reqPreferredContentType: getReqPreferredContentType(
            methodSchema.requestBody as RequestBody | undefined
          ),
          resWithPreferredContentType: getResWithPreferredContentType(
            methodSchema.responses
          ),
        };

        operations.push(operation);
      }
    }
  }

  return operations;
};

export type ExtractedOperations = ReturnType<typeof getOperations>;
export type ExtractedOperation = ExtractedOperations[number];
