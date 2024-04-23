import requests
import csv
import pymongo
import time
import os
from flask import jsonify


def get_url(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/93.0.4577.63 Safari/537.36 Edg/93.0.961.47'
    }
    try:
        res = requests.get(url, headers=headers)
        res.raise_for_status()
        return res.json()['data']
    except requests.RequestException as e:
        print(f"请求失败：{e}")
        return None
    except KeyError as e:
        print(f"JSON 解析失败：{e}")
        return None

def parse_url(html):
    app_data = []
    for app in html:
        item = {'应用名': app['displayName'], '应用类型': app['level1CategoryName'],
                '应用链接': 'https://app.mi.com/details?id=' + app['packageName'],'应用图标': app['icon'], '应用评分': app['ratingScore'],
                '评分人数': app['ratingTotalCount']}
        app_data.append(item)
    return app_data

def save_data_to_files(data, cid):
    file_name = f'data{cid}.txt'
    header = ['应用名', '应用类型', '应用链接', '应用图标', '应用评分', '评分人数']
    with open(file_name, 'a', encoding='utf-8', newline="") as f:
        writ = csv.DictWriter(f, header)
        writ.writerows(data)

def save_data_to_mongodb(data, cid):
    try:
        client = pymongo.MongoClient("mongodb://Useradmin:Userpwd@localhost:27017/")
        db = client["APPData"]
        collection = db[f"apps{cid}"]
        collection.insert_many(data)
        print("插入数据库成功")
    except pymongo.errors.PyMongoError as e:
        print(f"插入数据库失败：{e}")


def start_crawling(cid, num):
    try:
        client = pymongo.MongoClient("mongodb://Useradmin:Userpwd@localhost:27017/")
        db = client["APPData"] 
        collection = db[f"apps{cid}"]
        collection.delete_many({})
        print("已清空数据库中的所有数据")
    except pymongo.errors.PyMongoError as e:
        print(f"清空数据库失败：{e}")
    
    intnum = int(num)
    file_name = f'data{cid}.txt'
    if os.path.exists(file_name):
        os.remove(file_name)
        print("原文件已删除")

    for i in range(intnum):
        url = f'https://app.mi.com/categotyAllListApi?page={i}&categoryId={cid}&pageSize=30'
        print(url)
        html = get_url(url)
        if html:
            lis_data = parse_url(html)
            save_data_to_files(lis_data, cid)
            save_data_to_mongodb(lis_data, cid)
            time.sleep(2)
    return jsonify({'message': '爬取完成'})

if __name__ == '__main__':
    pass