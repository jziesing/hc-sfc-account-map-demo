/*
 * @AddExtDataHelper.js
 */
"use strict";

const { Client } = require('pg');

class AddExtDataHelper {

    constructor() {
		// methods
        this.addExtDataPost = this.addExtDataPost.bind(this);
    }

    addExtDataPost(reqBodyForm) {
        return new Promise((resolve, reject) => {
            console.log(reqBodyForm);

            let currclient = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true,
            });

            currclient.connect();

            currclient.query('INSERT INTO Salesforce.external_data(account_id, data) VALUES($1, $2) RETURNING ID;', [reqBodyForm.account, reqBodyForm.data_val],(err, res) => {
                if (err){
                    reject();
                }
                currclient.end();
                resolve(res.rows);
            });
        });

    }

}

module.exports = AddExtDataHelper;
