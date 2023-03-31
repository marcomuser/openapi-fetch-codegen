import { PREFERRED_REQ_CONTENT_TYPES } from "../../utils/constants.js";
import type {
  EncodingObj,
  MediaTypeObj,
  RequestBodyObj,
} from "../../utils/types.js";

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

  const mediaTypeObj = requestBody.content[contentType] as MediaTypeObj;

  return {
    contentType,
    encoding: mediaTypeObj.encoding as EncodingObj,
  } as const;
};
