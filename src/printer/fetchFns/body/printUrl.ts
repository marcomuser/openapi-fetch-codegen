import type { TransformedOperation } from "../../../transformer/operations/buildOperations.js";

export const printUrl = ({ path, parameterTypes }: TransformedOperation) => {
  const replacedPath = replacePathParams(path);

  return !parameterTypes.query
    ? `const url = new URL(\`${replacedPath}\`, baseUrl);`
    : `const url = new URL(\`${replacedPath}\`, baseUrl);
const searchParams = serializeQuery(params.query, { encoder: new URLSearchParams() });
url.search = searchParams.toString();`;
};

const replacePathParams = (path: string) => {
  // matches any substring in a string that is surrounded by curly braces
  const paramRegex = /\{([^}]+)\}/g;
  return path.replaceAll(
    paramRegex,
    (_, paramName: string) => `\${params.path["${paramName}"]}`
  );
};
