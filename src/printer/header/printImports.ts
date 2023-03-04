export const printImports = (pathToTypes: string) => {
  return `import type { operations } from ${pathToTypes}
`;
};
