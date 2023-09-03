require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const dbName = process.env.DATABASE_NAME
const dbUrl = process.env.DATABASE_URL
const url = `mongodb://${dbUrl}/${dbName}`;

const createDatabase = async () => {
    const client = new MongoClient(url)
    try {
        await client.connect()
        const db = client.db(dbName)
        console.log(`Database ${dbName} created!`);
    } catch (error)  {
        console.error('Error creating database:', error);
    } finally {
      await client.close();
    }
}

createDatabase()