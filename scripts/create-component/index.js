const fs = require("fs");
const types = require("./types");
const fileExtensions = require("./data");
const lodash = require("lodash");
const errorMessage = require("./error");
const command = process.argv;
const nameComponent = process.argv[2];

try {
  const props =
    process.argv[3] === "--props"
      ? true
      : process.argv[3] !== undefined &&
        errorMessage("invalidCommand", process.argv[3]);

  addProps(props);
} catch (e) {
  console.error(e);
}

function createProps() {
  const props = command.filter((argument, index) => {
    if (index < lodash.indexOf(command, "--props")) return null;

    if (argument === "--props") {
      !command[index + 1] && errorMessage("propsMissing");
      return null;
    }

    return argument;
  });

  const newProps = mapProps(props);

  return newProps;
}

function mapProps(props) {
  const result = props.map((prop) => {
    const regex = {
      notAlphaNum: /[^A-Za-z0-9]/,
      notOptionalKey: /^[a-z|A-Z|0-9]+[^?]\s?[?]{1}$/gm,
    };
    const props = prop.split(":");
    const [key, value] = props;

    props.length !== 2 && errorMessage("invalidProp", prop);

    key.match(regex.notAlphaNum)
      ? key.match(regex.notOptionalKey)
        ? null
        : errorMessage("invalidProp", key)
      : null;

    const newValues = value.match(regex.notAlphaNum)
      ? mapMultipleValues(value)
      : [value];

    return { prop: key, value: newValues.join(" | ") };

    function mapMultipleValues(value) {
      const values = value.split(",");

      const newValues = values.map((value) => {
        const newValue = types.map((type) => {
          !value.startsWith(type) &&
            value.match(regex.notAlphaNum) &&
            errorMessage("valueSpecialChar", value);
          return value.startsWith(type)
            ? `'${lodash.replace(value, type, "")}'`
            : value;
        });
        return `${newValue}`;
      });

      return newValues;
    }
  });

  return result;
}

function createFiles(folderPath, props) {
  fileExtensions.map((extensionName) => {
    fs.writeFile(
      `${folderPath}/${extensionName(nameComponent, "file")}`,
      extensionName(nameComponent, "data", props),
      {
        encoding: "utf8",
        flag: "w",
        mode: 0o666,
      },
      (err) => {
        if (err) console.log(err);
      }
    );
  });

  const newFolderPath = folderPath.replace(nameComponent, "index.ts");

  exportOnIndex(newFolderPath, nameComponent);

  console.log("Component created successfully");
}

function createFolder() {
  const folderName = `./testing-lib/${nameComponent}`;

  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    } else {
      //errorMessage("folderExists");
    }
  } catch (err) {
    console.error(err);
  }

  return folderName;
}

function addProps(props) {
  const path = createFolder();
  switch (props) {
    case true:
      const props = createProps();
      //Parei aqui \/
      createFiles(path, props);
      break;
    case false:
      createFiles(path);
      break;
  }
}

function exportOnIndex(path, nameComponent) {
  const component = nameComponent
    .split("-")
    .map((name) => {
      return name.charAt(0).toUpperCase() + name.slice(1);
    })
    .join("");

  fs.appendFile(
    path,
    `\nexport { ${component} } from './${nameComponent}/${nameComponent}';`,
    () => {}
  );
}
