# Beer API

Basic beer catalog API for the following CRUB tasks.

- Displaying records
- Displaying records by ID
- Adding records
- Deleting records
- Updating records

We use Node.js, Express, and a MySQL database (XAMPP and phpMyAdmin).

Install packages:

```shell
npm install express mysql dotenv ; 
npm install --save-dev nodemon
```

Setup application to run with nodemon add the “start” line under scripts in your package.json file.

```json
"scripts": {
 "start": "nodemon app.js",
 "test": "echo \"Error: no test specified\" && exit 1"
}
```
