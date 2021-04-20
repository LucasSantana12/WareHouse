# Warahouse




<h1 align="center">
  <img alt="Logo" src="https://res.cloudinary.com/dfas3xwca/image/upload/v1618933718/samples/logoFucapi_szeegx.svg" width="200px">
</h1>

<h3 align="center">
  Express Application for GoBarber project
</h3>

<p align="center">The best way to schedule your service!</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/EliasGcf/gobarber-api?color=%23FF9000">

  <a href="https://www.linkedin.com/in/lucas-da-silva-santana-00965017b/" target="_blank" rel="noopener noreferrer">
  <p>create by</p>
  </a>
</p>

<p align="center">
  <a href="#%EF%B8%8F-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>


## 💇🏻‍♂️ About the project

Application developed to manage a warehouse, of a company (a school in this example), which has the function of lending materials to its customers;

## 🚀 Technologies

Technologies that I used to develop this api

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## 💻 Getting started

Import the `Insomnia.json`(in a backend/ folder) on Insomnia App

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)

- One instance of [PostgreSQL](https://www.postgresql.org/)

> Obs.: I recommend use docker
- [Docker](https://www.docker.com/get-started)
- Postbird
**Clone the project and access the folder**

```bash
$ git clone https://github.com/LucasSantana12/WareHouse.git 
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Create the instance of postgreSQL using docker
$ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

# On Postbird, create a database named "amox"

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# To finish, run the api service
$ yarn dev:server

# Well done, project is started!
```


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 &nbsp;by Lucas Santana 👋 &nbsp;[See my linkedin](https://www.linkedin.com/in/lucas-da-silva-santana-00965017b/)
