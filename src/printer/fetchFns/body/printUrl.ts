import type { ExtractedOperation } from "../../../parser/buildOperations.js";

export const printUrl = ({ path, parameterTypes }: ExtractedOperation) => {
  const replacedPath = replacePathParams(path);

  return !parameterTypes.query
    ? `const url = new URL(\`${replacedPath}\`, baseUrl);`
    : `const url = new URL(\`${replacedPath}\`, baseUrl);
    ${searchParams}
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

const searchParams = `const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params.query)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, item);
      }
    } else if (typeof value === "object") {
      searchParams.set(key, JSON.stringify(value));
    } else {
      searchParams.set(key, String(value));
    }
  }`;
