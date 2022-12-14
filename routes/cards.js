const router = require('express')
  .Router();

const {
  celebrate,
  Joi,
} = require('celebrate');
// eslint-disable-next-line object-curly-newline
const {
  findCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { isValid } = require('../isvalid/isvalid');

router.get('/cards', findCards);

router.post('/cards', celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .required()
        .min(2)
        .max(30),
      link: Joi.string()
        .required()
        .custom(isValid),
    }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .length(24)
        .hex(),
    }),
}), deleteCard);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .length(24)
        .hex(),
    }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .length(24)
        .hex(),
    }),
}), dislikeCard);

module.exports = router;
