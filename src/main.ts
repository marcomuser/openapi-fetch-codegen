type TInput = {
  pathToSpec: string;
  pathToTypes: string;
  pathToOutput: string;
};

export const main = ({ pathToSpec, pathToTypes, pathToOutput }: TInput) => {
  console.log(pathToSpec, pathToTypes, pathToOutput);
};
