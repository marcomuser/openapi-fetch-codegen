export const nl = (n = 1) => "\n".repeat(n);

export const indt = (template: string, level = 1) =>
  template
    .split("\n")
    .map((line) => indtLine(line, level))
    .join("\n");

const indtLine = (input: string, level = 1) => "  ".repeat(level).concat(input);
