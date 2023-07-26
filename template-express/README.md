# Template ExpressJS 

Ce projet est un backend Node.js avec le framework Express avec une base de données MySQL.

## Run
* [Node Version Manager](https://github.com/nvm-sh/nvm)
* Lint
* Mongodb
    * [installer docker](https://docs.docker.com/install/)
    * [installer docker-compose](https://docs.docker.com/compose/install/)
    * ```docker-compose up```



### Liens locaux

* [API](http://localhost:5005)


### Installation

Aller à la racine du projet et installer les packages node :
```
nvm use
yarn install
```

### Usage

Lancer l'application :
```
yarn dev
```

Exécuter les tests :
```
yarn test
```

## Développement

### Référence et documentation externes (RTFM)
* Plateforme: [Node](https://nodejs.org/docs/latest-v10.x/api/)
* Framework: [Express](https://expressjs.com/fr/4x/api.html)
* ORM: [Sequelize](https://sequelize.org/v5/)
* Migrations [Umzug](https://github.com/sequelize/umzug/tree/v2.x)
* Validation: [Yup](https://github.com/jquense/yup)
* Logger: [Winston](https://github.com/winstonjs/winston)
* Swagger: [Swagger](https://swagger.io/docs/)
* Mail: [Nodemailer](https://nodemailer.com/about/)
* Tests: [Supertest](https://github.com/visionmedia/supertest) & [Mocha](https://mochajs.org/)


### Architecture

L'application est découpée en composants et modules de la manière suivante :

```
src/
    components/
    database/
    enums/
    middlewares/
    services/
    tests/
    server.ts
    app.ts
package.json
docker-compose.yml
README.md
```


