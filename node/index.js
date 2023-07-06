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

const sqlNames  = `select * from people`;
const sqlCreate = `create table IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id));`;
const sqlInsert = `INSERT INTO people(name) values('Sidney França')`;
let   names = [];

const connection    = mysql.createConnection(config);    
	
connection.query(sqlCreate);
connection.query(sqlInsert);

 connection.query(sqlNames, function (err, result, fields) {
	for (const user of result) {
		names += `<li>${user.name}</li>`;
	}
});

connection.end();
       
app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!!</h1><ul>'+names+'</ul>');
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
})