# React Posts

Pagina hecha en React donde se cargan Posts y Comentarios. Creada con Create-React-App

## Pre - requisitos

Para empezar es necesario tener instalado Node.js

### Pasos para iniciar la pagina

Primero cargar todos los modulos de node necesarios:
```
$ npm install
```
Para usar la base de datos hay que instalar json-server
```
$ npm install -g json-server
```
Y luego iniciar la base de datos 
```
$ json-server --watch db.json --port 1337
```
Por ultimo simplemente iniciar
```
$ npm start
```