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
telegramBot.launch();

// приложение установить движок отображения pug
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
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

app.get('/about', (req, res) => {
	res.render(
			'about',
			{
				pageTitle: 'About'
			}
		)
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
