const types = require("./types").join(" ");

const errorMessage = (type, command = null) => {
  const commandsExpected = ["--props"].join(" ");
  let code;
  let message;
  let resolve = null;
  switch (type) {
    case "invalidCommand":
      code = 2;
      message = `Command '${command}' not found. Is '${command}' a command valid?`;
      resolve = `Expected commands: ${commandsExpected}`;

      break;
    case "propsMissing":
      code = 3;
      message =
        "Command '--props' added, but the property values ​​are missing";
      resolve = `Try to pass the property in this format: 'prop:value'`;
      break;
    case "propsAttribute":
      code = 4;
      message = `Command '${command}' invalid, the attribute ':' not found`;
      resolve = `Try to pass the property in this format: 'prop:value' or 'prop?:value'`;
      break;
    case "propsSpecialChar":
      code = 5;
      message = `Command '${command}' invalid. Don't use special characters`;
      resolve = `Try to pass the property in this format: 'prop:value' or 'prop?:value'`;
      break;
    case "valueSpecialChar":
      code = 6;
      message = `Value '${command}' invalid`;
      resolve = `Expected alphanumeric values or type values as: ${types}`;
      break;
    case "newValueSpecialChar":
      code = 7;
      message = `Value '${command}' invalid`;
      resolve = `Expected alphanumeric values`;
      break;
    case "folderExists":
      code = 8;
      message = `Folder name already exists`;
      resolve = "Write a different name for the folder";
      break;
    case "invalidProp":
      code = 9;
      message = `Property '${command}' invalid`;
      resolve = `Try to pass the property in this format: 'prop:value' or 'prop?:value'`;
      break;
    case "invalidValue":
      code = 10;
      message = `Value '${command}' invalid. Don't use special characters`;
      resolve = `Try to pass the property in this format: 'prop:value' or 'prop?:value'`;
      break;
    default:
      code = 1;
      message = "Command not found";
      resolve = `Expected commands: ${commandsExpected}`;
      break;
  }

  process.on("exit", () => {
    console.error(Error(`Code ${code}. ${message}. \n Resolve: ${resolve}`));
  });
  process.exit();
};

module.exports = errorMessage;
