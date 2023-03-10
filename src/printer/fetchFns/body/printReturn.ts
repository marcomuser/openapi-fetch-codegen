import type { ExtractedOperation } from "../../../parser/getOperations.js";
import { RES_CONTENT_TYPE_DICT } from "../../../utils/constants.js";

export const printReturn = (operation: ExtractedOperation) => {
  return `const response = await fetch(url, options);
  
  ${printSwitchStatement(operation)}`;
};

const printSwitchStatement = ({
  operationId,
  resWithPreferredContentType,
}: ExtractedOperation) => {
  if (!resWithPreferredContentType.size) {
    return `return {
      response,
      data: undefined,
    };`;
  }

  let switchStatement = `switch (response.status) {
    `;

  for (const status of resWithPreferredContentType.keys()) {
    if (resWithPreferredContentType.has(status) && status !== "default") {
      switchStatement += `case ${status}: 
        return {
          response,
          data: ${getDataValue(
            resWithPreferredContentType.get(status) as string
          )} as operations["${operationId}"]["responses"]["${status}"]["content"]["${resWithPreferredContentType.get(
        status
      )}"],
        };
        `;
    } else if (status !== "default") {
      switchStatement += `case ${status}:
        return {
          response,
          data: undefined,
        };
      `;
    }
  }

  if (resWithPreferredContentType.has("default")) {
    switchStatement += `default:
    return {
      response,
      data: ${getDataValue(
        resWithPreferredContentType.get("default") as string
      )} as operations["${operationId}"]["responses"]["default"]["content"]["${resWithPreferredContentType.get(
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

  return "response.body";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof RES_CONTENT_TYPE_DICT =>
  Object.hasOwn(RES_CONTENT_TYPE_DICT, contentType);
