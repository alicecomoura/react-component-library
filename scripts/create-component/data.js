const errorMessage = require("./error");

const component = (fileName, type, props = null) => {
  switch (type) {
    case "file":
      return `${fileName}.tsx`;
    case "data":
      return data(props);
    default:
      break;
  }

  function data(props) {
    const fileNameCamelCase = fileName
      .split("-")
      .map((name) => {
        const camelCase = name[0].toUpperCase();

        return name.replace(name[0], camelCase);
      })
      .join("");

    let content;
    switch (true) {
      case props === (undefined || null):
        content = createWithoutProps();
        break;
      case props !== (undefined || null):
        content = createWithProps(props);
        break;
      default:
        content = createWithoutProps();
        break;
    }

    function createWithoutProps() {
      const content = [
        "import React from 'react';",
        `import { ${fileNameCamelCase}Props } from './${fileName}.types';`,
        `import './${fileName}.scss';`,
        `export const ${fileNameCamelCase} = () => {`,
        "  return (",
        "   <div>",
        "   </div>",
        "  )",
        "}",
      ];

      return content;
    }

    function createWithProps(props) {
      const values = props.map((prop) => {
        const newProp = prop.prop.endsWith("?")
          ? prop.prop.slice(0, -1)
          : prop.prop.includes("?")
          ? errorMessage("propsSpecialChar", prop.prop)
          : prop.prop;

        return newProp;
      });
      const tag = [];
      values.map((value) => {
        if (value === "theme") {
          const tagWithClass = [
            "<div className={`",
            `${fileName} `,
            fileName,
            "-${",
            value,
            "}`}>",
          ].join("");
          tag.push(`   ${tagWithClass}\n`, "   </div>");
        }
      });

      tag.length === 0 &&
        tag.push(`   <div className="${fileName}">\n`, "   </div>");

      const content = [
        "import React from 'react';",
        `import { ${fileNameCamelCase}Props } from './${fileName}.types';`,
        `import './${fileName}.scss';`,
        `export const ${fileNameCamelCase} = ({${values.join(
          ", "
        )}}: ${fileNameCamelCase}Props) => {\n`,
        "  return (",
        tag,
        "  )",
        "}",
      ];

      return content;
    }

    result = `${content.map((line) => {
      if (line.includes(", ")) return line.split(", ").join("//");

      return line + "\n";
    })}`;

    result = result.split(",").join("");
    result = result.split("//").join(", ");

    return result;
  }
};

const types = (fileName, type, props = null) => {
  switch (type) {
    case "file":
      return `${fileName}.types.ts`;
    case "data":
      return data(props);
    default:
      break;
  }

  function data(props) {
    const fileNameCamelCase = fileName
      .split("-")
      .map((name) => {
        const camelCase = name[0].toUpperCase();

        return name.replace(name[0], camelCase);
      })
      .join("");

    let content;

    switch (true) {
      case props === (undefined || null):
        content = createWithoutProps();
        break;
      case props !== (undefined || null):
        content = createWithProps(props);
        break;
      default:
        content = createWithoutProps();
        break;
    }

    function createWithoutProps() {
      const content = [`export interface ${fileNameCamelCase}Props {`, "}"];

      return content;
    }

    function createWithProps(props) {
      const values = props.map((prop) => `    ${prop.prop}: ${prop.value}`);
      const content = [
        `export interface ${fileNameCamelCase}Props {`,
        ...values,
        "}",
      ];
      return content;
    }

    result = `${content.map((line) => {
      if (line.includes(", ")) return line.split(", ").join("//");

      return line + "\n";
    })}`;

    result = result.split(",").join("");
    result = result.split("//").join(", ");

    return result;
  }
};

const stories = (fileName, type, props = null) => {
  switch (type) {
    case "file":
      return `${fileName}.stories.tsx`;
    case "data":
      return data(props);
    default:
      break;
  }

  function data(props) {
    const fileNameCamelCase = fileName
      .split("-")
      .map((name) => {
        const camelCase = name[0].toUpperCase();

        return name.replace(name[0], camelCase);
      })
      .join("");

    let content;
    switch (true) {
      case props === (undefined || null):
        content = createWithoutProps();
        break;
      case props !== (undefined || null):
        content = createWithProps(props);
        break;
      default:
        content = createWithoutProps();
        break;
    }

    function createWithoutProps() {
      const content = [
        "import { ReactNode } from 'react';",
        "",
        `export interface ${fileNameCamelCase}Props {`,
        "}",
      ];

      return content;
    }

    function createWithProps(props) {
      const values = props.map((prop) => prop);
      let argTypes = values.map((prop) => {
        const newProp = prop.prop.endsWith("?")
          ? prop.prop.slice(0, -1)
          : prop.prop.includes("?")
          ? errorMessage("propsSpecialChar", prop.prop)
          : prop.prop;

        const options = prop.value.split(" | ").map((value) => {
          if (value[0] !== '"') return;
          return `         ${value}`;
        });
        const result = [
          `    ${newProp}: {`,
          "      options:[",
          ` ${options.join(", \n")}`,
          "      ],",
          "      control: {",
          "        type: 'select'",
          "      },",
          "    },",
        ];

        return result.join("\n");
      });

      argTypes = ["  argTypes: {", argTypes.join("\n"), "  }"];

      const templates = props.map((prop) => {
        if (prop.prop === "theme") {
          const template = `const Template: ComponentStory<typeof ${fileNameCamelCase}> = (args) => <${fileNameCamelCase} {...args}/>`;
          const values = prop.value.split(" | ");
          const constants = values.map((value) => {
            if (value !== undefined) {
              title = value.replaceAll(/["]/g, "");
              title = title.charAt(0).toUpperCase() + title.slice(1);

              const result = [
                `export const ${title} = Template.bind({})`,
                `${title}.args = {`,
                `  ${prop.prop}:${value},`,
                `}`,
                ``,
              ];

              return result.join("\n");
            }
          });

          const result = `${template}\n\n${constants.join("\n")}`;

          return result;
        }
      });

      const content = [
        "import React from 'react';",
        "import { ComponentMeta, ComponentStory } from '@storybook/react';\n",
        `import { ${fileNameCamelCase} } from './${fileName}';`,
        "",
        "export default {",
        `  title: '${fileNameCamelCase}',`,
        `  component: ${fileNameCamelCase},`,
        argTypes.join("\n"),
        `} as ComponentMeta<typeof ${fileNameCamelCase}>`,
        "",
        templates.join("\n"),
      ];

      return content;
    }

    result = [...content.map((line) => line)].join("\n");

    return result;
  }
};

const styles = (fileName, type, props = null) => {
  switch (type) {
    case "file":
      return `${fileName}.scss`;
    case "data":
      return data(props);
    default:
      break;
  }

  function data(props) {
    const fileNameCamelCase = fileName
      .split("-")
      .map((name) => {
        const camelCase = name[0].toUpperCase();

        return name.replace(name[0], camelCase);
      })
      .join("");

    let content;
    switch (true) {
      case props === (undefined || null):
        content = createWithoutProps();
        break;
      case props !== (undefined || null):
        content = createWithProps(props);
        break;
      default:
        content = createWithoutProps();
        break;
    }

    function createWithoutProps() {
      const content = [
        "@import '../../theme/app.scss';",
        "",
        `.${fileName} {`,
        `}`,
      ];

      return content;
    }

    function createWithProps(props) {
      const themeValues = [];
      props.map((prop) => {
        if (prop.prop === "theme") {
          const values = removeQuotingMark(removePipeline(prop.value));

          values.map((value) => {
            themeValues.push(`\n  &.${fileName}-${value}{\n` + ` }\n`);
          });
        }
      });

      const content = [
        "@import '../../theme/app.scss';",
        "",
        `.${fileName} {`,
        themeValues.join(""),
        "}",
      ];

      return content;
    }

    result = [...content.map((line) => line)].join("\n");

    return result;
  }
};

const removePipeline = (value) => value.split(" | ");

const removeQuotingMark = (values) => {
  switch (true) {
    case values.length > 0:
      const newValues = values.map((value) => {
        return value.replaceAll(/["]/g, "");
      });
      return newValues;
    case values.length === 0:
      return values[0].replaceAll(/["]/g, "");
    default:
      break;
  }
};

module.exports = [component, types, stories, styles];
