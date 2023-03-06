import type { ExtractedOperation } from "../../../parser/getOperations.js";

export const printUrl = ({ path }: ExtractedOperation) => {
  const replacedPath = replacePathParams(path);

  return `const searchParams = new URLSearchParams(params.query);
  const url = new URL(\`${replacedPath}\`, baseUrl);
  url.search = searchParams.toString();`;
};

const replacePathParams = (path: string) => {
  // matches any substring in a string that is surrounded by curly braces
  const paramRegex = /\{([^}]+)\}/g;
  return path.replaceAll(
    paramRegex,
    (_, paramName: string) => `\${params.path.${paramName}}`
  );
};
