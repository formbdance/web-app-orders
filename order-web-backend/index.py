from flask import Flask, request,jsonify, render_template
from flask_cors import CORS, cross_origin
import json
from bson import json_util
from bson.objectid import ObjectId
from pymongo import MongoClient


UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
# Инициализация приложения
app = Flask(__name__)
cors = CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# Подключение базы данных
client = MongoClient('mongodb://localhost:27017/')  # Адрес БД
db = client['agregator']  # название БД
ordersdb = db['orders']  # название коллекции БД
productsdb = db['products'] # другая коллекция

@app.route('/')
def index() -> str:
    return render_template("index.html")

# получение и сохранение данных в БД
@app.route('/products', methods=['POST']) 
def add_product(): 
    try:
        # получение данных с запроса
        data = request
        # сохраняем в монго
        productsdb.insert_one(data.form.to_dict()) 
        return 'Продукт добавлен', 201
    except Exception as e:
        print(e)
        return jsonify({'error': 'Произошла ошибка'}, 500)

# получение данных из БД
@app.route('/products', methods=['GET'])
def get_products():
    try:
        products = productsdb.find({})
        print('done')
        return json.loads(json_util.dumps(products)), 200  # преобразование mongo bson в json
    except:
        return 'Ошибка получения продуктов', 500

# получение данных об продукте <id> из БД
@app.route('/products/<id>', methods=['GET'])
def get_product():
    try:
        filter = {'_id': ObjectId(id)}
        products = productsdb.find(filter)
        return json.loads(json_util.dumps(products))
    except:
        return 'Ошибка получения продукта', 500

# удаление продукта <id>
@app.route('/products/<id>', methods=['DELETE'])
def delete_product(id):
    try:
        filter = {'_id': ObjectId(id)}
        productsdb.delete_one(filter)
        return 'Продукт удалён', 204
    except:
        return 'Ошибка удаления продукта', 500


# получение и сохранение данных в БД
@app.route('/orders', methods=['POST']) 
def add_order(): 
    try:
        # получение данных с запроса
        data = request.json 
        # сохраняем в монго
        ordersdb.insert_one(data) 
        return 'Ордер добавлен', 201
    except:
        return 'Ошибка добавления ордера', 500

# получение данных из БД
@app.route('/orders', methods=['GET'])
def get_orders():
    try:
        orders = ordersdb.find({})
        return json.loads(json_util.dumps(orders)), 200  # преобразование mongo bson в json
    except:
        return 'Ошибка получения', 500

# получение данных об ордере <id> из БД
@app.route('/orders/<id>', methods=['GET'])
def get_order():
    try:
        filter = {'_id': ObjectId(id)}
        orders = ordersdb.find(filter)
        return json.loads(json_util.dumps(orders))
    except:
        return 'Ошибка получения', 500

# удаление ордера <id>
@app.route('/orders/<id>', methods=['DELETE'])
def delete_order(id):
    try:
        filter = {'_id': ObjectId(id)}
        ordersdb.delete_one(filter)
        return 'Документ удалён', 204
    except:
        return 'Ошибка удаления', 500
    

if __name__ == '__main__':
    app.run(debug=True)