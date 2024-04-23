from flask import Flask, render_template, request, jsonify
import json
import pymongo
import os
import spider
from bson import ObjectId
import math
app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('hello.html')

@app.route('/dataview')
def dataview():
    return render_template('dataview.html')

@app.route('/select')
def select():
    return render_template('select.html')

@app.route('/start_crawling', methods=['POST'])
def start_crawling():
    # 获取选择框的值
    data = json.loads(request.data)
    category = data.get('cid')
    crawlLimit = data.get('num')

    result = spider.start_crawling(category, crawlLimit)
    
    return jsonify({'status': 'success'})

@app.route('/get_data_from_mongodb/<int:cid>', methods=['GET'])
def get_data_from_mongodb(cid):
    try:
        client = pymongo.MongoClient("mongodb://Useradmin:Userpwd@localhost:27017/")
        db = client["APPData"]
        collection_name = f"apps{cid}"
        
        page = request.args.get('page', 1, type=int)
        per_page = 15

        total_count = db[collection_name].count_documents({})
        total_pages = math.ceil(total_count / per_page)
        
        data = list(db[collection_name].find({}).skip((page - 1) * per_page).limit(per_page))
        for item in data:
            item['_id'] = str(item['_id'])  # 将 ObjectId 转换为字符串

        return jsonify({'data': data, 'total_pages': total_pages})
    
    except pymongo.errors.PyMongoError as e:
        print(f"查询数据库失败：{e}")
        return jsonify({'error': 'Failed to fetch data from MongoDB'}), 500

@app.route('/get_all_collection_data_count', methods=['GET'])
def get_all_collection_data_count():
    try:
        client = pymongo.MongoClient("mongodb://Useradmin:Userpwd@localhost:27017/")
        db = client["APPData"]

        collection_names = [f"apps{i}" for i in range(1, 8)] 

        data_counts = {}
        for collection_name in collection_names:
            total_count = db[collection_name].count_documents({})
            data_counts[collection_name] = total_count

        return jsonify(data_counts)
    
    except pymongo.errors.PyMongoError as e:
        print(f"查询数据库失败：{e}")
        return jsonify({'error': 'Failed to fetch data count from MongoDB'}), 500


@app.route('/get_high_rating_data_count', methods=['GET'])
def get_high_rating_data_count():
    try:
        client = pymongo.MongoClient("mongodb://Useradmin:Userpwd@localhost:27017/")
        db = client["APPData"]
        
        high_rating_counts = {}

        for cid in range(1, 8):
            collection_name = f"apps{cid}"
            high_rating_counts[f'apps{cid}'] = db[collection_name].count_documents({'应用评分': {'$gt': 8}})
        return jsonify(high_rating_counts)
    
    except pymongo.errors.PyMongoError as e:
        print(f"查询数据库失败：{e}")
        return jsonify({'error': 'Failed to fetch high rating data count from MongoDB'}), 500


@app.route('/rating_numbers', methods=['GET'])
def get_rating_numbers():
    try:
        client = pymongo.MongoClient("mongodb://Useradmin:Userpwd@localhost:27017/")
        db = client["APPData"]
        
        rating_numbers = {}

        for cid in range(1, 8):
            collection_name = f"apps{cid}"
            rating_numbers[f'apps{cid}'] = db[collection_name].count_documents({'评分人数': {'$gt': 1000}})
        return jsonify(rating_numbers)
    
    except pymongo.errors.PyMongoError as e:
        print(f"查询数据库失败：{e}")
        return jsonify({'error': 'Failed to fetch rating numbers from MongoDB'}), 500



if __name__ == '__main__':
    app.run(debug=True)