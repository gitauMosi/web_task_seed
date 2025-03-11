# my todo app

 ## -------- docs -----------
 
## Register a new user
POST	/api/auth/register	

## Login and get JWT token
POST	/api/auth/login	

## Create a new To-Do (Auth required)
POST	/api/todos/	

## Get all To-Dos for logged-in user
GET	/api/todos/	

## Update a To-Do (Auth required)
PUT	/api/todos/:id	

## Delete a To-Do (Auth required)
DELETE	/api/todos/:id	