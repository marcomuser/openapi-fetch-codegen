import { PREFERRED_RESPONSE_CONTENT_TYPES } from "../utils/constants.js";
import type { Response, Responses } from "../utils/types.js";

export const getResponsesWithSortedContentTypes = (responses: Responses) => {
  const responsesWithSortedContentTypes: Record<string, string[]> = {};

  for (const statusCode in responses) {
    const response = responses[statusCode] as Response;

    if (response.content) {
      const contentTypes = Object.keys(response.content);

      const availableTypes = PREFERRED_RESPONSE_CONTENT_TYPES.filter((type) =>
        contentTypes.includes(type)
      );

      const remainingTypes = contentTypes.filter(
        (type) => !PREFERRED_RESPONSE_CONTENT_TYPES.includes(type)
      );

      responsesWithSortedContentTypes[statusCode] = availableTypes
        .sort(
          (a, z) =>
            PREFERRED_RESPONSE_CONTENT_TYPES.indexOf(a) -
            PREFERRED_RESPONSE_CONTENT_TYPES.indexOf(z)
        )
        .concat(remainingTypes);
    }
  }

  return responsesWithSortedContentTypes;
};
