module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    addToCart: function (req, res) {
        if (req.body) {
            if (req.session.user) {

            } else {
                if (req.session.cart != undefined) {
                    if (req.body.type === "Activities") {
                        req.session.cart.activities.push(req.body);
                    }
                    if (req.body.type === "Accomodation") {
                        req.session.cart.accomodation.push(req.body);
                    }
                } else {
                    req.session.cart = {};
                    req.session.cart.activities = [];
                    req.session.cart.accomodation = [];
                    if (req.body.type === "Activities") {
                        req.session.cart.activities.push(req.body);
                    }
                    if (req.body.type === "Accomodation") {
                        req.session.cart.accomodation.push(req.body);
                    }
                }
                res.json({
                    value: true,
                    data: req.session.cart,
                    message: "Offline cart"
                });
            }
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },


    saveCart: function (req, res) {
        if (req.body) {
            req.body.myCart = req.session.cart;
            // req.body.myCart.package = req.session.cart.package;
            // req.body.myCart.activities = req.session.cart.activities;
            // req.body.myCart.whatshot = req.session.cart.whatshot;
            Customisation.saveCart(req.body, res.callback);
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },

    deleteCart: function (req, res) {
        if (req.body) {
            if (req.session.user) {

            } else {
                  if (req.body.type === "Activities") {
                    var id = req.body.activities;
                    var mycartdata = req.session.cart.activities
                    if (mycartdata.length > 0) {
                        mycartdata = _.remove(mycartdata, function (n) {
                            return n.activities === id;
                        });
                        res.json({
                            value: true,
                            message: "Removed",
                            data: mycartdata
                        });
                    } else {
                        res.json({
                            value: false,
                            data: "Cart is Empty"
                        });
                    }
                }  else if (req.body.type === "Accomodation") {
                    var name = req.body.name;
                    console.log("Name", req.body.name);
                    var mycartdata = req.session.cart.accomodation
                    if (mycartdata.length > 0) {
                        mycartdata = _.remove(mycartdata, function (n) {
                            return n.name === name;
                        });
                        res.json({
                            value: true,
                            message: "Removed",
                            data: mycartdata
                        });
                    } else {
                        res.json({
                            value: false,
                            data: "Cart is Empty"
                        });
                    }
                }

            }
        } else {
            res.json({
                value: false,
                data: "Invalid Request"
            });
        }
    },
};
module.exports = _.assign(module.exports, controller);