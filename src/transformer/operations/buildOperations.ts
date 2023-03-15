import { HTTP_VERBS } from "../../utils/constants.js";
import type {
  OpenAPIObj,
  OperationObj,
  ParameterObj,
  RequestBodyObj,
} from "../../utils/types.js";
import { getParameterTypes } from "./getParameterTypes.js";
import { getReqSortedContentType } from "./getReqSortedContentType.js";
import { getResWithSortedContentType } from "./getResWithSortedContentType.js";

export const buildOperations = (spec: OpenAPIObj) => {
  const operations = [];
  const paths = spec.paths || {};

  for (const path in paths) {
    const methods = paths[path] as Record<string, OperationObj>;

    for (const method in methods) {
      if (HTTP_VERBS[method.toLowerCase() as keyof typeof HTTP_VERBS]) {
        const methodSchema = methods[method];

        const operation = {
          path,
          method: method.toUpperCase(),
          operationId: methodSchema.operationId,
          hasParameters: Boolean(methodSchema.parameters?.length),
          parameterTypes: getParameterTypes(
            methodSchema.parameters as ParameterObj[] | undefined
          ),
          reqContentType: getReqSortedContentType(
            methodSchema.requestBody as RequestBodyObj | undefined
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

export type TransformedOperations = ReturnType<typeof buildOperations>;
export type TransformedOperation = TransformedOperations[number];
