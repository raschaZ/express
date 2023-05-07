import sequelize from './sequelize';
import * as dotenv from 'dotenv';
const fs = require("fs");
const os = require("os");

dotenv.config();

const sqlScripts = [
    'ALTER TABLE `tasks` ADD `userId` INT NOT NULL AFTER `completed`;',
    'ALTER TABLE `tasks` ADD CONSTRAINT FK_userId FOREIGN KEY (userId) REFERENCES users(id);',
    'ALTER TABLE `tasks` ADD column_name varchar(25);',
    'ALTER TABLE `tasks` DROP COLUMN column_name;',
  ];
let i = parseInt(process.env.MIGRATION!);

// const migrations = (async () => {
//   await sequelize.query("ALTER TABLE `todos` CHANGE `done` `complete` TINYINT(1) NOT NULL;")
//   .then(() => console.log('Column renamed successfully'))
//   .catch((error) => console.log('Error while renaming column', error));
// })();

  if(i >= sqlScripts.length)
  console.log(`Nothing to migrate`)
  else{
    for ( i ; i < sqlScripts.length; i++) {
    const sqlScript = sqlScripts[i];
    sequelize.query(sqlScript)
      .then(() => {
        console.log(`SQL script ${i+1} executed successfully`);
        // process.env.MIGRATION = i.toString() ;
        setEnvValue("MIGRATION", i.toString());
      })
      .catch((error) =>{ 
        console.log(`Error while executing SQL script ${i+1}`, error)
      });
  }
}

 function setEnvValue(key:string, value:string) {

  // read file from hdd & split if from a linebreak to a array
  const ENV_VARS = fs.readFileSync("./.env", "utf8").split(os.EOL);

  // find the env we want based on the key
  const target = ENV_VARS.indexOf(ENV_VARS.find((line:string) => {
      return line.match(new RegExp(key));
  }));

  // replace the key/value with the new value
  ENV_VARS.splice(target, 1, `${key}=${value}`);

  // write everything back to the file system
  fs.writeFileSync("./.env", ENV_VARS.join(os.EOL));

}
