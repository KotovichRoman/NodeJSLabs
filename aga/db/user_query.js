const postgres = require("pg");

class DB {
    constructor() {
        this.pool = new postgres.Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'aga',
            password: '614523',
            port: 5432,
        });
    }

    async registrationUser(login, email, password, roleId) {
        try {
            await this.pool.query('begin');
            const findResult = await this.pool.query(`select * from get_user_by_login_or_email('${login}', '${email}')`);

            if (!findResult) {
                const query = 'call add_user($1, $2, $3, $4)';
                const values = [login, email, password, roleId];
                await this.pool.query(query, values);

                await this.pool.query('commit');
                return true;
            }
            else {
                return false;
            }
        } catch (error) {
            await this.pool.query('rollback');
            console.log(error);
            return false;
        }
    }

    // async getUserByLogin(login) {
    //     try {
    //         const { rows } = await database.pool.query(`select * from get_user_by_login('${login}')`);
    //         return rows;
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     }
    // }
    //
    // async getUserById(id) {
    //     try {
    //         const { rows } = await database.pool.query(`select * from get_user_by_id('${id}')`);
    //         return rows;
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     }
    // }
    //
    // async getUsersById(usersId) {
    //     try {
    //         const { rows } = await database.pool.query(`select * from get_user_by_ids(array[${usersId}])`);
    //         return rows;
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     }
    // }
}

module.exports = DB;
