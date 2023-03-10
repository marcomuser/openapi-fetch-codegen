import type { ExtractedOperation } from "../../../parser/getOperations.js";

export const printUrl = ({ path, hasQueryParams }: ExtractedOperation) => {
  const replacedPath = replacePathParams(path);

  return !hasQueryParams
    ? `const url = new URL(\`${replacedPath}\`, baseUrl);`
    : `const url = new URL(\`${replacedPath}\`, baseUrl);
    const searchParams = new URLSearchParams(params.query);
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
