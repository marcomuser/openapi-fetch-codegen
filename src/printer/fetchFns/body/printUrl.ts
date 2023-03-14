import type { ExtractedOperation } from "../../../transformer/operations/buildOperations.js";

export const printUrl = ({ path, parameterTypes }: ExtractedOperation) => {
  const replacedPath = replacePathParams(path);

  return !parameterTypes.query
    ? `const url = new URL(\`${replacedPath}\`, baseUrl);`
    : `const url = new URL(\`${replacedPath}\`, baseUrl);
const searchParams = querySerializer(params.query);
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
