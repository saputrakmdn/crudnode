const fs = require('fs');

module.exports = {
    addPlayerPage: (req, res) => {
        let category = "SELECT * FROM `category`";
        let cashier = "SELECT * FROM `cashier`";
        db.query(category, (err, result)=>{
            console.log(err)
            db.query(cashier, (err, data)=>{
                res.render('add-player.ejs', {
                    title: "Welcome to Socka | Add a new player"
                    ,message: '',
                    category: result,
                    cashier: data
                });
            })
            
        })
        
    },
    addPlayer: (req, res) => {

        let message = '';
        let name = req.body.name;
        let price = req.body.price;
        let category = req.body.category;
        let cashier = req.body.cashier

        let productQuery = "SELECT * FROM `product` WHERE name = '" + name + "'";

        db.query(productQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Product already exists';
                res.render('add-player.ejs', {
                    message,
                    title:" Welcome to Socka | Add a new player"
                });
            } else {
              
                let query = "INSERT INTO `product` (name, price, id_category, id_cashier) VALUES ('" +
                            name + "', '" + price + "', '" + category + "', '" + cashier + "')";
                db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    
            }
        });
    },
    editPlayerPage: (req, res) => {
        let productId = req.params.id;
        let query = "SELECT * FROM `product` WHERE id = '" + productId + "' ";
        let category = "SELECT * FROM `category`";
        let cashier = "SELECT * FROM `cashier`";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            db.query(category, (err, data) =>{
                db.query(cashier, (err, cashier) => {
                    res.render('edit-player.ejs', {
                        title: "Edit  Player"
                        ,product: result[0]
                        ,message: '',
                        category: data,
                        cashier: cashier
                    });
                })
            })
            
        });
    },
    editPlayer: (req, res) => {
        let productId = req.params.id;
        let name = req.body.name;
        let price = req.body.price;
        let category = req.body.category;
        let cashier = req.body.cashier

        let query = "UPDATE `product` SET `name` = '" + name + "', `price` = '" + price + "', `id_category` = '" + category + "', `id_cashier` = '" + cashier + "' WHERE `product`.`id` = '" + productId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deletePlayer: (req, res) => {
        let productID = req.params.id;
        let deleteUserQuery = 'DELETE FROM product WHERE id = "' + productID + '"';

       
                db.query(deleteUserQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
        
    }
};