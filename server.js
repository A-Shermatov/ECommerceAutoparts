const PORT = 3001
let express = require('express'), 
    http = require("http"),
	// импорт представлений
	// MealsController = require("./controllers/meals_controller.js"),
	// UsersController = require("./controllers/users_controller.js"),
	// MenuController = require("./controllers/menu_controller.js"),
    // импортируем библиотеку mongoose
    mongoose = require("mongoose"),
	database = 'testWebCourseWork'; //название хранилища в Mongo
app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');


// начинаем слушать запросы
http.createServer(app).listen(PORT);

app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/',express.static(__dirname + "/views/html"));
// app.use('/user/:username',express.static(__dirname + "/views/html"));

app.set("html", path.join(__dirname, "views/html"))
app.use(express.static("views"))

// командуем Express принять поступающие объекты JSON
// app.use(express.urlencoded({ extended: true }));

const admin_routes = require("./routes/admin"),
	buyer_routes = require("./routes/buyer"),
	seller_routes = require("./routes/seller"),
	auth_routes = require("./routes/auth"),
	main_routes = require("./routes/main");


app.use('/', admin_routes);
app.use('/', seller_routes);
app.use('/', buyer_routes);
app.use('/', auth_routes);
app.use('/', main_routes);


// подключаемся к хранилищу данных в базе данных Mongo
mongoose.connect('mongodb://127.0.0.1:27017/' + database, {
		useNewUrlParser: true,
		useUnifiedTopology: true 
}).then(res => {
	console.log("DB Connected!")
}).catch(err => {
	console.log(Error, err.message);
});
