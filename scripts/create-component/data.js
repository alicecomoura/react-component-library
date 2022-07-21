const fs = require("fs");

const component = (fileName, type) => {
  switch (type) {
    case "file":
      return `${fileName}.tsx`;
    case "data":
      return data();
    default:
      break;
  }

  function data() {
    const fileNameCamelCase = fileName
      .split("-")
      .map((name) => {
        const camelCase = name[0].toUpperCase();

        return name.replace(name[0], camelCase);
      })
      .join("");

    const content = [
      "import React from 'react';",
      `import { ${fileNameCamelCase}Props } from './${fileName}.types';`,
      `import './${fileName}.scss';`,
      `export const ${fileNameCamelCase} = ({ theme, children }: ${fileNameCamelCase}Props) => {`,
      "  return (",
      "  )",
      "}",
    ];

    result = `${content.map((line) => {
      if (line.includes(", ")) return line.split(", ").join("//");

      return line + "\n";
    })}`;

    result = result.split(",").join("");
    result = result.split("//").join(", ");

    return result;
  }
};

const types = (fileName, type) => {
  switch (type) {
    case "file":
      return `${fileName}.types.ts`;
    case "data":
      return data();
    default:
      break;
  }

  function data() {
    const fileNameCamelCase = fileName
      .split("-")
      .map((name) => {
        const camelCase = name[0].toUpperCase();

        return name.replace(name[0], camelCase);
      })
      .join("");

    const content = [
      "import { ReactNode } from 'react';",
      "",
      `export interface ${fileNameCamelCase}Props {`,
      `    theme: "default" | "warning" | "danger" | "disabled" | "success"`,
      "}",
    ];

    result = `${content.map((line) => {
      if (line.includes(", ")) return line.split(", ").join("//");

      return line + "\n";
    })}`;

    result = result.split(",").join("");
    result = result.split("//").join(", ");

    return result;
  }
};

// const stories = (fileName) => {
//   switch (type) {
//     case "file":
//       return `${fileName}.stories.tsx`;
//     case "data":
//       return data();
//     default:
//       break;
//   }

//   function data() {
//     const fileNameCamelCase = fileName
//       .split("-")
//       .map((name) => {
//         const camelCase = name[0].toUpperCase();

//         return name.replace(name[0], camelCase);
//       })
//       .join("");

//     const content = [
//       "import { ReactNode } from 'react';",
//       "",
//       `export interface ${fileNameCamelCase}Props {`,
//       `    theme: "default" | "warning" | "danger" | "disabled" | "success"`,
//       "}",
//     ];

//     result = `${content.map((line) => {
//       if (line.includes(", ")) return line.split(", ").join("//");

//       return line + "\n";
//     })}`;

//     result = result.split(",").join("");
//     result = result.split("//").join(", ");

//     return result;
//   }
// };

// const styles = (fileName) => {
//   return `${fileName}.scss`;
// };

module.exports = [component, types /*, stories, styles*/];
