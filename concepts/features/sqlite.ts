import { Database } from "bun:sqlite";

const db = new Database("bundb.sqlite");

const query = db.query("select 'Hello world' as message;");
console.log(query.get()); 

function sqlLiteDemo() {
    db.run(`
        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);
    console.log("Table 'User' created successfully");

    const insetUser = db.prepare(`INSERT INTO user (name, email) VALUES (?,?)`)
    /* insetUser.run ('Anish','anishbarke@gmial.com')
    insetUser.run ('Vinish','Vinish@gmial.com')
    insetUser.run ('Manish','Manish@gmial.com')*/
    const extractUser = db.query('SELECT * FROM user').all()
    console.log(extractUser);
    

    db.run('UPDATE user SET name = ? WHERE email = ?',[
      "KIRAN",
      "Vinish@gmial.com"
    ])
    const updatedUserInfo = db.query('SELECT * FROM user WHERE email= ?').get('Vinish@gmial.com')
    console.log(updatedUserInfo);
    
} 

sqlLiteDemo();
