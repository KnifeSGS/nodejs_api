# nodejs_api
NodeJS API

## Test create
```javascript
fetch('http://localhost:3000/person', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({first_name: 'Jack', last_name:'London', email: 'j@mail.com'})
}).then(r => r.json())
.then(d => console.log(d))
```

## Test update
```javascript
fetch('http://localhost:3000/person/6', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({first_name: 'Jacky', last_name:'Lond', email: 'jack@mail.com'})
}).then(r => r.json())
.then(d => console.log(d))
```

## Test delete
```javascript
fetch('http://localhost:3000/person/6', {
    method: 'DELETE'
}).then(r => r.json())
.then(d => console.log(d))
```