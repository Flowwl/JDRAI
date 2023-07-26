import 'module-alias/register';
import { app } from './app';
import { projectConfig } from '@/config';
import { connectToDb } from "@/database/init";
import * as migrate from "migrate";

const port = projectConfig.PORT || 8082;
const isTest = projectConfig.NODE_ENV === 'test';

app.listen(isTest ? 1001 : port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at ${projectConfig.API_URL}`);
});


connectToDb()
  .then((client) => {
    console.log("FINISHED");
    if (projectConfig.CI_MODE === 'on') {
      console.log("EXITED BECAUSE ON CI MODE");
      process.exit(0);
    }
    migrate.load({
      stateStore: '.migrate'
    }, function (err, set) {
      if (err) {
        throw err;
      }

      set.up(function (err) {
        if (err) {
          throw err;
        }
        console.log('migrations successfully ran');
      });
    });
  })
  .catch(error => {
    console.log(error);
    if (projectConfig.CI_MODE === 'on') {
      console.log("EXITED (WITH ERROR) BECAUSE ON CI MODE", error);
      process.exit(1);
    }
  });


