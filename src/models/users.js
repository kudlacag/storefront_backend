"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersStore = void 0;
const dababase_1 = __importDefault(require("../dababase"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcrypt_2 = __importDefault(require("bcrypt"));
class UsersStore {
    async index() {
        try {
            const conn = await dababase_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`something went wrong in users index : ${error}`);
        }
    }
    // checks if user already exists
    // async userExist(email: string): Promise<boolean> {
    //   // console.log(email);
    //   try {
    //     const conn = await client.connect();
    //     const sql = 'SELECT email FROM users WHERE email=$1';
    //     const result = await conn.query(sql, [email]);
    //     // console.log(result);
    //     conn.release;
    //     const emailFromDatabse = result.rows[0];
    //     console.log(emailFromDatabse);
    //     if (emailFromDatabse === email) {
    //       throw new Error(`the ${email} you trying to sigup exist already`);
    //     }
    //     return emailFromDatabse;
    //   } catch (error) {
    //     // console.log(error);
    //     throw new Error(`something went wront ${error}`);
    //   }
    // }
    async create(u) {
        try {
            const conn = await dababase_1.default.connect();
            const sql = "INSERT INTO users(user_id, first_name, last_name, password_digest) VALUES(default, $1, $2, $3) RETURNING *";
            const saltRounds = process.env.SALT_ROUNDS;
            const hash = bcrypt_2.default.hashSync(u.password_digest + bcrypt_1.default, parseInt(saltRounds));
            const result = await conn.query(sql, [
                u.first_name,
                u.last_name,
                // u.email,
                hash,
            ]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async show(id) {
        try {
            const conn = await dababase_1.default.connect();
            const sql = "SELECT * FROM users WHERE user_id = $1";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`the ${id} did not found ${error}`);
        }
    }
    //   signin password check
    async authenticate(user_id, password) {
        console.log(password);
        try {
            const conn = await dababase_1.default.connect();
            const sql = "SELECT  password_digest FROM users WHERE user_id = ($1)";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            if (result.rows.length) {
                const user = result.rows[0];
                console.log(user);
                if (bcrypt_2.default.compareSync(password + bcrypt_1.default, user.password_digest)) {
                    return user;
                }
            }
            return null;
        }
        catch (error) {
            console.log(error);
            throw new Error(`error happened in authenticantion ${error}`);
        }
    }
    // delete method will not be tested because it will delete user_id =1
    // which will make the test to not pass second time
    async deleted(id) {
        console.log(id);
        try {
            const conn = await dababase_1.default.connect();
            const sql = `DELETE FROM users WHERE user_id = $1`;
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            console.log(error);
            throw new Error(`the ${id} was deleted ${error}`);
        }
    }
}
exports.UsersStore = UsersStore;
