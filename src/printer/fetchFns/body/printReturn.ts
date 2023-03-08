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
  let switchStatement = `switch (response.status) {
    `;

  for (const status in resWithPreferredContentType) {
    if (resWithPreferredContentType[status] && status !== "default") {
      switchStatement += `case ${status}: 
        return {
          response,
          data: ${getDataValue(
            resWithPreferredContentType[status] as string
          )} as operations["${operationId}"]["responses"]["${status}"]["content"]["${
        resWithPreferredContentType[status]
      }"],
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

  if (resWithPreferredContentType["default"]) {
    switchStatement += `default:
    return {
      response,
      data: ${getDataValue(
        resWithPreferredContentType["default"] as string
      )} as operations["${operationId}"]["responses"]["default"]["content"]["${
      resWithPreferredContentType["default"]
    }"],
    };
  };`;
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
