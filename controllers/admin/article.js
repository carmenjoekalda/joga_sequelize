// connection to database
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root/qwerty@localhost:3306/joga_sequelize');

// read models data for table representations
const models = require('../../models')

// create new article into data table
const createArticle = (req, res) => {
    // get form data
    let name = req.body.name
    let slug = req.body.slug
    let image = req.body.image
    let body = req.body.body

    // create new article by Article model
    const newArticle = models.Article.create({
        // values for NOT NULL fields
        // left -> data table fields, right -> values from form
        name: name,
        slug: slug,
        image: image,
        body: body,
        // publish date generation
        published: new Date().toISOString().slice(0, 19).replace('T', ' ')
    })
        .then(article => {
            return res.status(200).json({ message: 'New article is added' });
        })
        .catch(error => {
            return res.status(500).send(error.message);
        })
};

// edit an article in the data table
const updateArticle = async (req, res) => {
    const { id } = req.params;

    if (req.method === 'GET') {
        try {
            const article = await models.Article.findByPk(id);
            const authors = await models.Author.findAll({
                attributes: ['id', 'name']
            });

            if (!article) {
                return res.status(404).send('Article not found');
            }

            res.render('article-edit', {
                article: article.get({ plain: true }),
                authors: authors.map(author => author.get({ plain: true }))
            });
        } catch (error) {
            console.error('Error retrieving article data:', error);
            res.status(500).send('Error retrieving article data');
        }
    } else if (req.method === 'POST') {
        try {
            const data = {
                name: req.body.name,
                slug: req.body.slug,
                image: req.body.image,
                body: req.body.body,
                author_id: req.body.author_id
            };
            const result = await models.Article.update(data, { where: { id } });

            if (result[0] > 0) {
                res.redirect('/article');
            } else {
                res.status(404).send('No rows updated - article not found or data not changed');
            }
        } catch (error) {
            res.status(500).send('Error updating article: ' + error.message);
        }
    }
};

// export functions
module.exports = {
    createArticle, updateArticle
};