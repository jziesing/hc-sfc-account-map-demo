/*
 * @AddExtData.js
 */
"use strict";


let AddExtDataHelper = require('./AddExtDataHelper');


class AddExtData {

    constructor() {
        this.ahelper = new AddExtDataHelper();
		// methods
        this.AddExtDataPost = this.AddExtDataPost.bind(this);
    }
    /*  @route: /new/account
     *     - POST
     */
    AddExtDataPost(req, res) {
        console.log('AddExtDataPost');
        res.setHeader('Content-Type', 'application/json');
        return this.ahelper.addExtDataPost(req.body)
                      .then(result => {
                            console.log(result);
                            return res.status(200).json(result);
                      }).catch(err => {
                            console.log(err);
                            return res.sendStatus(400);
                      });

    }

}

module.exports = AddExtData;
