const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT id, name, model, description, price, date, store, quantity, project_id FROM products",
      (err, products) => {
        if (err) {
          res.json(err);
        }

        conn.query("SELECT id, name, description FROM projects",
          (err, projects) => {
            if (err) {
              res.json(err);
            }

            res.render("products", {
              data: products,
              dataprojects: projects,
            });

          }
        )


      }
    );
  });
};

controller.projects = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT id, name, description FROM projects",
      (err, projects) => {
        if (err) {
          res.json(err);
        }

        res.render("products", {
          dataprojects: projects,
        });
      }
    );
  });
};

controller.save = (req, res) => {
  console.log(req.body);
  const data = req.body;

  let name = data.name;
  let model = data.model;
  let description = data.description;
  let price = data.price;
  let date = data.date;
  let store = data.store;
  let quantity = data.quantity;
  let project_id = data.project_id;

  console.log("project_id", project_id);

  if (project_id === "-1") {
    res.redirect('/?alert=true');
  }
  else {
    req.getConnection((err, conn) => {
      conn.query(
        `insert into products (name, model, description, price, date, store, quantity, project_id) values (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, model, description, price, date, store, quantity, project_id],
        (err, products) => {
          if (err) {
            console.error("ERROR:", err);
            res.json(err);
          }
          res.send("works");
          console.log(products);
        }
      );
    });

  }


};

module.exports = controller;
