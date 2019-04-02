# Tensorflow as API
## Requirements and installation
- for this project you have to use node v10+ to run
 
for install use: 
```sh
$ npm install
```
for run is strongly recommended use:
```sh
$ npm start
```
it will run at `localhost:3000` 

## Installation troubleshooting
This project use [node-supervisor](https://github.com/petruisfan/node-supervisor/) for reload automatization one of the most commun problems is the instalation in the package.json if you can't run the project just run: 
```sh
$ npm install supervisor -g
```
this command would install all the requirements

## API structure 

is an API RestFull structure express based; 

for request item by ID  -> `/v1/tensorflow/:id` (id as integer)
