// мы через require достаем из папки node_modules/express/index.js нужную библиотеку
const express = require('express');
const products = require('./src/js/products');
const path = require('path');
const telegramBot = require('./src/js/telegram');
const bodyParser = require('body-parser');
const prepareRequestCallMessage = require('./src/js/telegram/prepareRequestCallMessage');

// обозначает, какой порт будет использовать для запуска демона
const port = 3000;
const tgChat = '-500064724';

// получаем базовое серверное приложение
const app = express();
// telegramBot.launch();

// приложение установить движок отображения pug
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.set('view engine', 'pug');
app.use(express.static(__dirname + 'public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/jquery/dist'));
app.use(express.static(__dirname + '/node_modules/axios/dist'));

// описываем, что будет, если отправить get запрос по корню сервера
app.get('/', (req, res) => {
	// описываем, что мы делаем, когда постучались
	// с помощью объекта response мы отдаем в ответ контент
	res.render(
			'index',
			{
				pageTitle: 'Главная',
				message: 'Лучший дрон-шоп Великого Устюга',
				products
			}
		)
})

app.get('/product', (req, res) => {
	res.render(
			'product',
			{
				pageTitle: 'Страница продукта'
			}
		)
})

app.get('/:brand', (req, res) => {
	const brandProducts = products
		.filter(product => product.brand.toLowerCase() === req.params.brand.toLowerCase());

	if (brandProducts.length) {
		res.render(
			'brand',
			{
				pageTitle: `Дроны от бренда ${req.params.brand}`,
				brandName: req.params.brand,
				products: brandProducts
			}
		)
	} else {
		console.log('Тут Фиаско! Такого бренда не существует');
		res.redirect('/');
	}
})

app.get('/:brand/:id', (req, res) => {
	const brandProducts = products
		.filter(product => product.brand.toLowerCase() === req.params.brand.toLowerCase());

	if (brandProducts.length) {
		const pageItem = brandProducts.find(product => product.id == req.params.id);

		if (pageItem) {
			res.render(
				'product',
				{
					pageTitle: `Купить дрон ${pageItem.name}`,
					brandName: req.params.brand,
					product: pageItem
				}
			)
		} else {
			console.log('Тут фиаско, но бренд есть — посмотри еще у них');
			res.redirect(`/${req.params.brand}`);
		}
	} else {
		console.log('Тут Фиаско! Такого бренда не существует');
		res.redirect('/');
	}
})

app.get('/api/newRequest', (req, res) => {
	// описываем, что мы делаем, когда постучались
	// с помощью объекта response мы отдаем в ответ контент
	console.log('Что прилетело', req.query);
	telegramBot.telegram.sendMessage(
		tgChat,
		prepareRequestCallMessage(req.query)
	)
	res.redirect('/');
})

// запуск приложения
app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`);
})
