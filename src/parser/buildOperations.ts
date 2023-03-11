import { HTTP_VERBS } from "../utils/constants.js";
import type {
  Document,
  Operation,
  Parameter,
  RequestBody,
} from "../utils/types.js";
import { getParameterTypes } from "./getParameterTypes.js";
import { getReqSortedContentType } from "./getReqSortedContentType.js";
import { getResWithSortedContentType } from "./getResWithSortedContentType.js";

export const buildOperations = (spec: Document) => {
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
          parameterTypes: getParameterTypes(
            methodSchema.parameters as Parameter[] | undefined
          ),
          reqContentType: getReqSortedContentType(
            methodSchema.requestBody as RequestBody | undefined
          ),
          responsesWithContentType: getResWithSortedContentType(
            methodSchema.responses
          ),
        };

        operations.push(operation);
      }
    }
  }

  return operations;
};

export type ExtractedOperations = ReturnType<typeof buildOperations>;
export type ExtractedOperation = ExtractedOperations[number];
