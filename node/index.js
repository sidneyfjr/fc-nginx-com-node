const express   =   require('express');
const app       =   express();
const port      =   3000;
const mysql     = require('mysql');
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const sqlCount  = `select count(*) count from people`;
const sqlNames  = `select name from people`;
const sqlCreate = `create table people(id int not null auto_increment, name varchar(255), primary key(id));`;
const sqlInsert = `INSERT INTO people(name) values('Dominique França')`;
let   count;
let   names;
let   displayNames = [];

const connection    = mysql.createConnection(config);
    
const hasTable =   connection.query(sqlCount, function (err, result, fields)  {
    if (err) throw err;
    count = result[0]['count'] + 1;
});

if (!hasTable) {
    connection.query(sqlCreate);
    connection.query(sqlInsert);
} else {       
    connection.query(sqlInsert);
}

 connection.query(sqlNames, function (err, result, fields) {
    if (err) throw err;
    names =  result;
});

connection.end();
    
const result = () => {
    for (let i = 0 ; i < count ; i ++) {
        displayNames += '<li>'+names[i]['name']+'</li>';
    }
}
    
app.get('/', (req, res) => {
    result();
    res.send('<h1>Full Cycle Rocks!!</h1>'+displayNames);
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})