const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <string>", "choose action")
  .option("-i, --id <string>", "user id")
  .option("-n, --name <string>", "user name")
  .option("-e, --email <string>", "user email")
  .option("-p, --phone <string>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const { listContacts, getContactById, removeContact, addContact, } = require('./contacts');


function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case "list":
          listContacts();
      break;

      case "get":
          getContactById(id);
      break;

      case "add":
          addContact(name, email, phone);
      break;

      case "remove":
          removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);