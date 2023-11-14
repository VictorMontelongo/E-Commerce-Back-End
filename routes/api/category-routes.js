const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const catagories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(catagories)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const catagories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!catagories) {
      res.status(404).json({ message: 'Sorry, we could not find a Catagory under this ID' });
      return;
    }
    res.status(200).json(catagories);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new cat{egory
  try {
    const catagories = await Category.create(req.body);
    res.status(200).json(catagories);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((category) => {
      res.status(200).json(category);
    }).catch((err) => {
      console.log(err);
      res.stats(400).json(err);
    })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const catagories = Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(catagories => res.status(200).json(catagories))
    .catch((err) => {
      res.status(500).json(err)
    })
});

module.exports = router;
