import { PREFERRED_CONTENT_TYPES } from "../utils/consts.js";
import type { RequestBody } from "../utils/types.js";

export const getSortedContentTypes = (requestBody?: RequestBody) => {
  if (!requestBody) {
    return [];
  }

  const contentTypes = Object.keys(requestBody.content);

  const availableTypes = PREFERRED_CONTENT_TYPES.filter((type) =>
    contentTypes.includes(type)
  );

  const remainingTypes = contentTypes.filter(
    (type) => !PREFERRED_CONTENT_TYPES.includes(type)
  );

  return availableTypes
    .sort(
      (a, z) =>
        PREFERRED_CONTENT_TYPES.indexOf(a) - PREFERRED_CONTENT_TYPES.indexOf(z)
    )
    .concat(remainingTypes);
};
