import type { Document } from "../types.js";

export const fetchSpec = async (pathToSpec: string) => {
  const response = await fetch(pathToSpec);
  return (await response.json()) as Document;
};
