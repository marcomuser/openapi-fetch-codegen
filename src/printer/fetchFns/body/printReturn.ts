import type { TransformedOperation } from "../../../transformer/operations/buildOperations.js";
import { RES_CONTENT_TYPE_DICT } from "../../../utils/constants.js";
import { indt, nl } from "../../../utils/format.js";

export const printReturn = (operation: TransformedOperation) => {
  return `const response = await fetch(url, options);
  
${printSwitchStatement(operation)}`;
};

const printSwitchStatement = ({
  operationId,
  responsesWithContentType,
}: TransformedOperation) => {
  if (!responsesWithContentType.size) {
    return `return {
  response,
  data: undefined,
  error: undefined,
};`;
  }

  let switchStatement = `switch (response.status) {${nl()}`;

  for (const status of responsesWithContentType.keys()) {
    if (status !== "default") {
      switchStatement += `${indt(`case ${status}: 
  return {
    response,
    data: ${getDataValue(
      status,
      responsesWithContentType.get(status) as string,
      operationId
    )},
    error: ${getErrorValue(
      status,
      responsesWithContentType.get(status) as string,
      operationId
    )},
  };`)}${nl()}`;
    }
  }

  if (responsesWithContentType.has("default")) {
    switchStatement += `${indt(`default:
  return {
    response,
    data: undefined,
    error: ${getErrorValue(
      "default",
      responsesWithContentType.get("default") as string,
      operationId
    )},
  };`)}
};`;
  } else {
    switchStatement += `${indt(`default:
  return {
    response,
    data: undefined,
    error: undefined,
  };`)}
};`;
  }

  return switchStatement;
};

const getDataValue = (
  status: string,
  preferredContentType: string,
  operationId?: string
) => {
  if (isHandledContentType(preferredContentType) && isStatusOk(status)) {
    return `(await response${RES_CONTENT_TYPE_DICT[preferredContentType]}) as operations["${operationId}"]["responses"]["${status}"]["content"]["${preferredContentType}"]`;
  }

  return "undefined";
};

const getErrorValue = (
  status: string,
  preferredContentType: string,
  operationId?: string
) => {
  if (isHandledContentType(preferredContentType) && !isStatusOk(status)) {
    return `(await response${RES_CONTENT_TYPE_DICT[preferredContentType]}) as operations["${operationId}"]["responses"]["${status}"]["content"]["${preferredContentType}"]`;
  }

  return "undefined";
};

const isHandledContentType = (
  contentType: string
): contentType is keyof typeof RES_CONTENT_TYPE_DICT =>
  Object.hasOwn(RES_CONTENT_TYPE_DICT, contentType);

const isStatusOk = (status: string) =>
  status !== "default" && Number(status) >= 200 && Number(status) < 300;
