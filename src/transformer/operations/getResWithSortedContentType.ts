import { PREFERRED_RES_CONTENT_TYPES } from "../../utils/constants.js";
import type { Response, Responses } from "../../utils/types.js";

export const getResWithSortedContentType = (responses?: Responses) => {
  const resWithSortedContentTypes = new Map<string, string>();

  for (const statusCode in responses) {
    const response = responses[statusCode] as Response;

    if (response.content) {
      const contentTypes = Object.keys(response.content);

      const availableTypes = PREFERRED_RES_CONTENT_TYPES.filter((type) =>
        contentTypes.includes(type)
      );

      const remainingTypes = contentTypes.filter(
        (type) => !PREFERRED_RES_CONTENT_TYPES.includes(type)
      );

      const preferredType = availableTypes
        .sort(
          (a, z) =>
            PREFERRED_RES_CONTENT_TYPES.indexOf(a) -
            PREFERRED_RES_CONTENT_TYPES.indexOf(z)
        )
        .concat(remainingTypes)
        .at(0) as string;

      resWithSortedContentTypes.set(statusCode, preferredType);
    }
  }

  return resWithSortedContentTypes;
};
