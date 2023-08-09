const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // find all categories
  // be sure to include its associated Products
  try { // using to talk to a server or a database

    const category = await Category.findAll();
    if (category) {
      res.json(category); // returns a json objects made of any varible input
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get Category" });
  }

});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try { // using to talk to a server or a 
    
    const { id } = req.params;

    const category = await Category.findByPk(id);

    if (category) {

      res.json(category); // returns a json objects made of any varible input

    } else {

      res.status(404).json({ error: "Catergory not found" });
    }

  } catch (error) {
    
    res.status(500).json({ error: "Failed to get Category" });
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const category = await Category.create({
      category_name: req.body.category_name
      })
      res.status(200).json(category);
  }
  
  catch (error) {
  
  res.status(500).json({ error: "Failed to create Category" });
  }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    await Category.update({ category_name: req.body.category_name},

      {
      where:{id:req.params.id}
      })
      res.status(200).json("updated Successfully");
  }
  
  catch (error) {
  
  res.status(500).json({ error: "Failed to create Category" });
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    await Category.destroy({
      where:{id:req.params.id}
      })
      res.status(200).json("Deleted Successfully");
  }
  
  catch (error) {
  
  res.status(500).json({ error: "Failed to create Category" });
  }
});

module.exports = router;
