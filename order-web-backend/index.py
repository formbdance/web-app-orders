from flask import Flask, request, render_template
import json
from bson import json_util
from bson.objectid import ObjectId
from pymongo import MongoClient


# Инициализация приложения
app = Flask(__name__)

# Подключение базы данных
client = MongoClient('mongodb://localhost:27017/')  # Адрес БД
db = client['demo']  # название БД
collection = db['data']  # название коллекции БД

@app.route('/')
def index() -> str:
    return render_template("index.html")

# получение и сохранение данных в БД
@app.route('/orders', methods=['POST']) 
def add_order(): 
    try:
        # получение данных с запроса
        data = request.json 
        # сохраняем в монго
        collection.insert_one(data) 
        return 'Ордер добавлен', 201
    except:
        return 'Ошибка добавления ордера', 500

# получение данных из БД
@app.route('/orders', methods=['GET'])
def get_orders():
    try:
        orders = collection.find({})
        return json.loads(json_util.dumps(orders)), 200  # преобразование mongo bson в json
    except:
        return 'Ошибка получения', 500

# получение данных об ордере <id> из БД
@app.route('/orders/<id>', methods=['GET'])
def get_order():
    try:
        filter = {'_id': ObjectId(id)}
        orders = collection.find(filter)
        return json.loads(json_util.dumps(orders))
    except:
        return 'Ошибка получения', 500

# удаление ордера <id>
@app.route('/orders/<id>', methods=['DELETE'])
def delete_order(id):
    try:
        filter = {'_id': ObjectId(id)}
        collection.delete_one(filter)
        return 'Документ удалён', 204
    except:
        return 'Ошибка удаления', 500
    

if __name__ == '__main__':
    app.run(debug=True)