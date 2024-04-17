from flask import Flask, request,jsonify, render_template
from flask_cors import CORS, cross_origin
import json
from bson import json_util
from bson.objectid import ObjectId
from pymongo import MongoClient
from werkzeug.utils import secure_filename
import os

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
        # Получение файла из формы
        file = request.files['image']
        # Получение имени файла и расширения
        filename, extension = os.path.splitext(file.filename)
        # сохраняем в монго
        insertFile = productsdb.insert_one(data.form.to_dict()) 
        # Создание пути для сохранения файла
        folder = 'static/images'
        path = os.path.join(folder, f'{insertFile.inserted_id}{extension}')
        # Сохранение файла
        file.save(path)

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

# удаление всех продуктов
@app.route('/products', methods=['DELETE'])
def removed_products():
    try:
        filter = {}
        productsdb.delete_many(filter)
        return 'Продукт удалён', 204
    except:
        return 'Ошибка удаления продукта', 500


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
        data = request
        # сохраняем в монго
        ordersdb.insert_one(data.form.to_dict()) 
        return 'Ордер добавлен', 201
    except Exception as e:
        print(e)
        return jsonify({'error': 'Произошла ошибка'}, 500)
    
# получение данных из БД
@app.route('/orders', methods=['GET'])
def get_orders():
    try:
        orders = ordersdb.find({})
        return json.loads(json_util.dumps(orders)), 200  # преобразование mongo bson в json
    except:
        return 'Ошибка получения', 500

# получение данных об ордере <id> из БД
@app.route('/orders/<order_id>', methods=['PUT'])
def update_order(order_id):
    try:
        # Получить новый статус из тела запроса
        new_status = request.json.get('status')

        # Обновить заказ с указанным _id
        result = ordersdb.update_one({'_id': ObjectId(order_id)}, {'$set': {'status': new_status}})

        if result.modified_count:
            return 'Статус заказа успешно обновлен', 200
        else:
            return 'Заказ с указанным _id не найден', 404
    except Exception as e:
        return f'Ошибка обновления заказа: {str(e)}', 500

# удаление ордера <id>
@app.route('/orders/<id>', methods=['DELETE'])
def delete_order(id):
    try:
        filter = {'_id': ObjectId(id)}
        ordersdb.delete_one(filter)
        return 'Документ удалён', 204
    except:
        return 'Ошибка удаления', 500
    
#картинки
@app.route('/images/<path:image_name>', methods=['GET'])
def get_image(image_name):
    try:
        # Путь к папке с изображениями (например, static/images)
        folder = 'static/images'
        
        # Отправить файл из папки с изображениями
        return (folder, image_name)
    except Exception as e:
        return f'Ошибка получения изображения: {str(e)}', 500

if __name__ == '__main__':
    app.run(host="192.168.0.2", port=5000, debug=True)