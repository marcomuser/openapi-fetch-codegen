import type { RequestBody } from "../utils/types.js";

export const getSortedContentTypes = (requestBody?: RequestBody) => {
  if (!requestBody) {
    return [];
  }

  const preferredTypes = [
    "application/json",
    "multipart/form-data",
    "application/x-www-form-urlencoded",
  ];

  const contentTypes = Object.keys(requestBody.content);

  const availableTypes = preferredTypes.filter((type) =>
    contentTypes.includes(type)
  );

  const remainingTypes = contentTypes.filter(
    (type) => !preferredTypes.includes(type)
  );

  return availableTypes
    .sort((a, b) => {
      const aIndex = preferredTypes.indexOf(a);
      const bIndex = preferredTypes.indexOf(b);
      return aIndex - bIndex;
    })
    .concat(remainingTypes);
};
