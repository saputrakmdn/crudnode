const var_dump = require('var_dump')
module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT product.name as name, category.name as category, cashier.name as cashier, product.* FROM `product` LEFT JOIN category ON category.id=product.id_category LEFT JOIN cashier on cashier.id=product.id_cashier"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to Socka View Players",
                products: result
            });
        });

        function log(socket,data){
            console.log(data);
            socket.emit('message',data);
       }
    },
};