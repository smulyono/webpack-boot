import level from 'level';
import path from 'path';
import config from '../config';

const dbPath = config.dbPath;
const dbOptions = {
    keyEncoding : "utf8",
    valueEncoding: "json"
};
console.info("Setting up level db at ", dbPath);
const db = level(dbPath, dbOptions);

export default db;
