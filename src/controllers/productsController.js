const { request } = require("express");

const controller = {};

controller.products = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      `select prd.id, prd.name, prd.model, prd.description, prd.price, prd.date, prd.store, prd.quantity, prd.project_id, pj.id as project_id, pj.name as project_name, pj.description as project_description
      from products prd 
      inner join projects pj on (pj.id=prd.project_id)
      order by id desc limit 0, 4;`,
      (err, products) => {
        if (err) {
          res.json(err);
        }

        conn.query(
          "SELECT id, name, description FROM projects",
          (err, projects) => {
            if (err) {
              res.json(err);
            }

            res.render("products", {
              data: products,
              dataprojects: projects,
            });
          }
        );
      }
    );
  });
};

controller.dashboard = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      `select prd.id, prd.name, prd.model, prd.description, prd.price, prd.date, prd.store, prd.quantity, prd.project_id, pj.id as project_id, pj.name as project_name, pj.description as project_description
      from products prd 
      inner join projects pj on (pj.id=prd.project_id)
      order by id desc limit 0, 4;`,
      (err, products) => {
        if (err) {
          res.json(err);
        }

        conn.query(
          "SELECT id, name, description FROM projects order by id desc limit 0, 4",
          (err, projects) => {
            if (err) {
              res.json(err);
            }

            conn.query(
              "SELECT id, name, quantity, model FROM products where quantity > 0 and quantity < 3",
              (err, lowstock) => {
                if (err) {
                  res.json(err);
                }

                conn.query(
                  "SELECT id, name, quantity FROM products where quantity = 0",
                  (err, outofstock) => {
                    if (err) {
                      res.json(err);
                    }

                    res.render("dashboard", {
                      data: products,
                      dataprojects: projects,
                      lowstock: lowstock,
                      outofstock: outofstock,
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
};

controller.productslist = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      `select prd.id, prd.name, prd.model, prd.description, prd.price, prd.date, prd.store, prd.quantity, prd.project_id, pj.id as project_id, pj.name as project_name, pj.description as project_description
      from products prd 
      inner join projects pj on (pj.id=prd.project_id);`,
      (err, products) => {
        if (err) {
          res.json(err);
        }

        res.render("productslist", {
          data: products,
        });
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

        res.render("projects", {
          dataprojects: projects,
        });
      }
    );
  });
};

controller.projectslist = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT id, name, description FROM projects",
      (err, projects) => {
        if (err) {
          res.json(err);
        }

        res.render("projectslist", {
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
    res.redirect("/?alert=true");
  } else {
    req.getConnection((err, conn) => {
      conn.query(
        `insert into products (name, model, description, price, date, store, quantity, project_id) values (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, model, description, price, date, store, quantity, project_id],
        (err, products) => {
          if (err) {
            console.error("ERROR:", err);
            res.json(err);
          }
          res.redirect("/");
          console.log(products);
        }
      );
    });
  }
};

controller.addproject = (req, res) => {
  console.log(req.body);
  const data = req.body;

  let name = data.name;
  let description = data.description;

  req.getConnection((err, conn) => {
    conn.query(
      `insert into projects (name, description) values (?, ?)`,
      [name, description],
      (err, products) => {
        if (err) {
          console.error("ERROR:", err);
          res.json(err);
        }
        res.redirect("/projectslist");
        console.log(products);
      }
    );
  });
};

controller.editproduct = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT id, name, model, description, price, date, store, quantity, project_id FROM products WHERE id = ?",
      [id],
      (err, product) => {
        conn.query(
          "SELECT id, name, description FROM projects",
          (err, projects) => {
            console.log(projects[0].name);
            if (err) {
              res.json(err);
            }
            res.render("products_edit", {
              data: product[0],
              dataprojects: projects,
            });
          }
        );
      }
    );
  });
};

controller.editproject = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query(
      "SELECT id, name, description FROM projects WHERE id = ?",
      [id],
      (err, projects) => {
        console.log(projects[0].name);
        if (err) {
          res.json(err);
        }
        res.render("projects_edit", {
          dataprojects: projects[0],
        });
      }
    );
  });
};

controller.updateproduct = (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "UPDATE products set ? where id = ?",
      [newProduct, id],
      (err, rows) => {
        console.log(newProduct, id);
        res.redirect("/");
      }
    );
  });
};

controller.updateproject = (req, res) => {
  const { id } = req.params;
  const newProject = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "UPDATE projects set ? where id = ?",
      [newProject, id],
      (err, rows) => {
        console.log(newProject, id);
        res.redirect("/projectslist");
      }
    );
  });
};

/* controller.deleteproduct = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    conn.query("DELETE FROM products WHERE id = ?", [id], (err, rows) => {
      res.redirect("/");
    });
  });
};

controller.deleteproject = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    conn.query("DELETE FROM projects WHERE id = ?", [id], (err, rows) => {
      res.redirect("/projectslist");
    });
  });
};
 */
module.exports = controller;
