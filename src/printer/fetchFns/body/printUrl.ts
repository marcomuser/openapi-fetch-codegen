import type { ExtractedOperation } from "../../../parser/getOperations.js";

export const printUrl = ({ path }: ExtractedOperation) => {
  const pathWithPathParameters = replacePathParams(path);

  return `const searchParams = new URLSearchParams(params.query);
  const url = new URL(\`${pathWithPathParameters}\`, baseUrl);
  url.search = searchParams.toString();`;
};

const replacePathParams = (path: string) => {
  const paramRegex = /\{([^}]+)\}/g;
  return path.replace(
    paramRegex,
    (_, paramName) => `\${params.path.${paramName}}`
  );
};
