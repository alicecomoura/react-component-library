const fs = require("fs");
const types = require("./types");
const fileExtensions = require("./data");
const nameComponent = process.argv[2];
const errorMessage = require("./error");

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
  const command = process.argv;
  const props = [];
  let newProps = [];
  const propsIndex = command.findIndex((argument) => argument === "--props");

  try {
    command.map((argument, index) => {
      if (index < propsIndex) return;

      if (argument === "--props") {
        !command[index + 1] && errorMessage("propsMissing");
        //Adicionar dicas pós mensagem erro para ajudar o usuário na resolução do problema

        return;
      }

      props.push(argument);
    });
  } catch (e) {
    console.error(e);
  }
  newProps = mappingProps(props);

  newProps.map((newProp) => {
    newProp.value = convertType(newProp);
  });

  return newProps;
}

function convertType(prop) {
  const type = prop.value.map((type) =>
    type.type !== undefined ? `"${type.value}"` : `${type}`
  );

  const newType = type.join(" | ");
  return newType;
}

function mappingProps(props) {
  const propsArray = [];
  try {
    props.map((prop) => {
      propsArray.push(validateProperty(prop));
    });
  } catch (e) {
    console.error(e);
  }
  return propsArray;
}

function validateProperty(prop) {
  const propArray = prop.split(":");
  const key = propArray[0];
  const value = propArray[1];
  if (!prop.match(/[A-Za-z0-9?]:[A-Za-z0-9]/)) {
    if (prop.match(/[^\w\s]/)) return errorMessage("propsSpecialChar", prop);
    return errorMessage("propsAttribute", prop);
  }

  const values = value.split(",");

  const newValues = [];
  values.map((value) => {
    const type = types.find((type) => value.startsWith(type));

    newValues.push(type !== undefined ? getTypeValue(value, type) : value);
  });

  function getTypeValue(value, type) {
    let newValue = value.replace(type, "");

    newValue.match(/[^\w\s,]/) && errorMessage("newValueSpecialChar", newValue);

    newValue = newValue.match(/[,]/)
      ? (newValue[0] === "," && errorMessage("newValueSpecialChar", newValue),
        newValue.split(",")[0])
      : newValue;

    return { type: type, value: newValue };
  }
  return { prop: key, value: newValues };
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
  const folderName = `./src/modules/design-system/components/${nameComponent}`;

  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    } else {
      errorMessage("folderExists");
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
