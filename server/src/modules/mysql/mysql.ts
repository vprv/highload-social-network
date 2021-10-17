
import mysql from "mysql"

export class Mysql {
    static executeQuery(sql: string, data: Object | Array<Object> | null = null): Promise<any> {
        return new Promise((resolve, reject) => {

            const poolConfig = {
                host: "localhost",
                user: "root",
                password: "mypass1234",
                insecureAuth: true,
                database: "sn"
            }
            const pool = mysql.createPool(poolConfig)

            pool.getConnection((err: any, connection: any) => {
                if (err) return reject(err);
                connection.query(sql, data, (err: any, result: any) => {
                    connection.release();
                    if (err) return reject(err);
                    resolve(result);
                });
            });
        });
    }
}