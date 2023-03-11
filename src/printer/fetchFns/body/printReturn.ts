import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { RES_CONTENT_TYPE_DICT } from "../../../utils/constants.js";

export const printReturn = (operation: ExtractedOperation) => {
  return `const response = await fetch(url, options);
  
  ${printSwitchStatement(operation)}`;
};

const printSwitchStatement = ({
  operationId,
  responsesWithContentType,
}: ExtractedOperation) => {
  if (!responsesWithContentType.size) {
    return `return {
      response,
      data: undefined,
    };`;
  }

  let switchStatement = `switch (response.status) {
    `;

  for (const status of responsesWithContentType.keys()) {
    if (status !== "default") {
      switchStatement += `case ${status}: 
        return {
          response,
          data: ${getDataValue(
            responsesWithContentType.get(status) as string
          )} as operations["${operationId}"]["responses"]["${status}"]["content"]["${responsesWithContentType.get(
        status
      )}"],
        };
        `;
    }
  }

  if (responsesWithContentType.has("default")) {
    switchStatement += `default:
    return {
      response,
      data: ${getDataValue(
        responsesWithContentType.get("default") as string
      )} as operations["${operationId}"]["responses"]["default"]["content"]["${responsesWithContentType.get(
      "default"
    )}"],
    };
    };
    `;
  } else {
    switchStatement += `default:
    return {
      response,
      data: undefined,
    };
  };`;
  }

  return switchStatement;
};

const getDataValue = (preferredContentType: string) => {
  if (isHandledContentType(preferredContentType)) {
    return `(await response${RES_CONTENT_TYPE_DICT[preferredContentType]})`;
  }

  return "undefined";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof RES_CONTENT_TYPE_DICT =>
  Object.hasOwn(RES_CONTENT_TYPE_DICT, contentType);
