### Building ThreeJS Project in VS Code:

* Download and extract Three JS package from: https://threejs.org/
* Create a folder called CGLabs
* Open that folder in vscode and create a subfolder called 'js'
* Copy 'three.js' from the 'ThreeJS/build' folder into 'js'
* Create index.html in CGLabs [by default vscode uses emmet to generate html snipets]
* Download 'Live Server extension' in vs code [live server provides local server live-runtime for static apps]
* Download Javascript ES6/ES7 extension
* Download Javascript Babel extension
* Create lab for each lab to develop threejs apps inside the labs folder
* Insert the labs js scripts into index.html and load using live server


### Enable ThreeJS autocomplete in VS Code:

* Install nodejs for your operating system [https://nodejs.org/en/download/]
* In the vscode terminal run the commands:
```
sudo apt install node
sudo apt install npm
sudo apt update
sudo apt upgrade
```
* In the vscode terminal run the command:  
```
npm init -y
[This command will generate the package.json file for your project]
```
* In the vscode terminal run the command:  
```
npm install @types/three 
[This command will install the ThreeJS definition module in vscode]
```