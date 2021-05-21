# pp-felix-urrieta--back
server with nodejs and express (backend)

Getting Started
First, run the development server, branch master

npm start

routes:
create token 
 POST: http://localhost:3000/api/createToken

create new user
 POST: http://localhost:3000/api/user
   {
    "name":"Fulanita",
    "email":"correo@ejemplo.com",
    "phone":"2491129255",
    "password":"admin",
    "age":"15",
    "gender":"Femenino",
    "hobby":"leer"
  }
 
all users
 GET: http://localhost:3000/api/user
 
search users by name/hobby
  POST: http://localhost:3000/api/search 
  {
    "search":"name",
    "value":"Felix"
  }

delete user
  DELETE: http://localhost:3000/api/user/60a41c717de62828f45fdb9c
  
Check the name, phone number, and hobby of all users who are over 18 years of age, with a gender ‘Female’
 GET: http://localhost:3000/api/userGroup
