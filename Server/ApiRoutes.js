/*
 * @ApiRoutes.js
 */
"use strict";


let express = require('express'),
    PublicAddAccount = require('./PubApiRoutes/AddAccount'),
    PublicAddExtData = require('./PubApiRoutes/AddExtData'),
    PublicFetchAccounts = require('./PubApiRoutes/FetchAccounts'),
    ApiRoutes = express.Router(),
    PubAddAccount = new PublicAddAccount(),
    PubAddExtData = new PublicAddExtData(),
    PubFetchAccounts = new PublicFetchAccounts();



/*
 *  routes
 */
// add account
ApiRoutes.post("/new/account/", PubAddAccount.AddAccountPost);
// add external data
ApiRoutes.post("/new/extdata/", PubAddExtData.AddExtDataPost);

// get parent accounts
ApiRoutes.get("/fetch/accounts/", PubFetchAccounts.FetchAccountsGet);
// get child accounts
ApiRoutes.get("/fetch/account/:parentAccountId", PubFetchAccounts.FetchChildAccountsGet);


/*
 * export
 */
module.exports = ApiRoutes;
