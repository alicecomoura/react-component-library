const errorMessage = (type, command = null) => {
  const commandsExpected = ["--props"].join(" ");
  let code;
  let message;
  let resolve = null;
  switch (type) {
    case "invalidCommand":
      code = 2;
      message = `Command '${command}' not found, is '${command}' a command valid?`;
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
      resolve = `Try to pass the property in this format: 'prop:value'`;
      break;
    default:
      code = 1;
      message = "Command not found.";
      resolve = `Expected commands: ${commandsExpected}`;
      break;
  }

  throw new Error(`Code ${code}. ${message}. \n Resolve: ${resolve}`);
};

module.exports = errorMessage;
