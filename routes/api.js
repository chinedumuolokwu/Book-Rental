const express = require('express');
const router = express.Router();



/////////////Controllers Import////////////
const userController = require('../controllers/userController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');



////////////User Route Management////////////////
router.get('/all_users', userController.get_users);
router.get('/user/:user_id', userController.get_user);
router.post('/create_user', userController.create_user);
router.put('/edit_user', userController.edit_user);
router.delete('/delete_user/:user_id', userController.delete_user);

////////////Author Route Management////////////////
router.get('/all_authors', authorController.get_authors);
router.get('/author/:author_id', authorController.get_author);
router.put('/edit_author', authorController.edit_author);
router.delete('/delete_author/:author_id', authorController.delete_author);
router.post('/create_author', authorController.create_author);


////////////Genre Route Management////////////////
router.get('/all_genres', genreController.get_genres);
router.get('/genre/:genre_id', genreController.get_genre);
router.post('/create_genre', genreController.create_genre);
router.put('/edit_genre', genreController.edit_genre);
router.delete('/delete_genre/:genre_id', genreController.delete_genre);
router.post('/create_author', authorController.create_author);


/////////////Route Export//////////////
module.exports = router;