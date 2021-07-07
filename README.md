# Beer API

Basic beer database API for the following CRUD tasks:

- Displaying records
- Displaying records by ID
- Adding records (ID generated automatically)
- Deleting records (by ID)
- Updating records

We use node.js, express, and a MySQL database (XAMPP and phpMyAdmin).

**Required**: install the following packages. 

```shell
npm install express mysql dotenv
```

**Optional**: install nodemon to automatically restart the node application when file changes in the directory are detected. 
```shell
npm install --save-dev nodemon
```
Set up the application to run with nodemon by adding the "start" script under scripts in the `package.json` file.

```json
"scripts": {
 "start": "nodemon app.js",
 "test": "echo \"Error: no test specified\" && exit 1"
}
```
