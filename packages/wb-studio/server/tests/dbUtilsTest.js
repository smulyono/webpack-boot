import log from '../logger';
import db from '../utils/dbUtils';

const dbUtilsTests = async (err) =>  {
    try {
        await db.put('test', {"id": "test", "name" : "test"});
        let value = await db.get("test");
        log.info(JSON.stringify(value));
    } catch (err) {
        log.error("Something bad happended");
        log.error(err);
    }
}

dbUtilsTests();