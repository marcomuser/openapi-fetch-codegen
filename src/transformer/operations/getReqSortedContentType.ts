import { PREFERRED_REQ_CONTENT_TYPES } from "../../utils/constants.js";
import type { MediaTypeObj, RequestBodyObj } from "../../utils/types.js";

export const getReqSortedContentType = (requestBody?: RequestBodyObj) => {
  if (!requestBody?.content) {
    return null;
  }

  const contentTypes = Object.keys(requestBody.content);

  const availableTypes = PREFERRED_REQ_CONTENT_TYPES.filter((type) =>
    contentTypes.includes(type)
  );

  const remainingTypes = contentTypes.filter(
    (type) => !PREFERRED_REQ_CONTENT_TYPES.includes(type)
  );

  const contentType = availableTypes
    .sort(
      (a, z) =>
        PREFERRED_REQ_CONTENT_TYPES.indexOf(a) -
        PREFERRED_REQ_CONTENT_TYPES.indexOf(z)
    )
    .concat(remainingTypes)
    .at(0) as string;

  const encoding = (requestBody.content[contentType] as MediaTypeObj).encoding;

  return {
    contentType,
    encoding,
  } as const;
};
