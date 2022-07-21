const fs = require("fs");
const path = "./testing-lib/";
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
      mappingProps(props);
    });
  } catch (e) {
    console.error(e);
  }

  console.log(props);
}

function mappingProps(props) {
  try {
    props.map((prop) => {
      if (!prop.includes(":")) return errorMessage("propsAttribute", prop);
    });
  } catch (e) {
    console.error(e);
  }
}

function createFiles() {
  fileExtensions.map((extensionName) => {
    fs.writeFile(
      `${path}${extensionName(nameComponent, "file")}`,
      extensionName(nameComponent, "data"),
      {
        encoding: "utf8",
        flag: "w",
        mode: 0o666,
      },
      (err) => {
        if (err) console.log(err);
        else {
          console.log("File written successfully\n");
        }
      }
    );
  });
}

function addProps(props) {
  switch (props) {
    case true:
      createProps();
      break;
    case false:
      createFiles();
      break;
  }
}
