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

is an API RestFull structure express based: 

for request items by typeId  -> `/v1/tensorflow/:typeId` 

for request the graphic of regresion  by typId  -> `/v1/tensorflow/regression/graphic/:typeId` 

for request the regresion data by typId  -> `/v1/tensorflow/regression/data/:typeId` 

 for request variance and dispersion data by typId  ->  `/v1/tensorflow/variance/:typeId` 

 all `:typeId` are integers

 
 ## changelog
 you can find the changelog at [here](changelog.md)