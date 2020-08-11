import pandas as pd
import numpy as np
import mysql.connector
from random import randrange
from datetime import datetime
import re
import dateutil.parser

dataset = pd.read_csv('./Data/Amazon_Phones_Db/items.csv', delimiter=',')
reviews = pd.read_csv('./Data/Amazon_Phones_Db/reviews.csv', delimiter=',')
dataset.dropna(inplace= True)
reviews.dropna(inplace= True)
myDb = mysql.connector.connect(user='root',password='root1234',host='127.0.0.1', database="Phone_Db")


# Brands table
brands = np.unique(dataset['brand'].to_numpy( dtype='S').astype(str)).tolist()


def queryGenForInsert(table, columns):
  str = 'INSERT INTO ' + table + ' ('
  length = len(columns)
  counter = 0
  for item in columns:
    counter += 1
    if counter < length:
      str += item + ', '
    else:
      str += item
  str += ') VALUES ('
  counter = 0
  for item in range(length):
    counter += 1
    if counter < length:
      str += '%s,'
    else:
      str += '%s'
  str += ')'
  return str

#Inserting brands to Database
cursor = myDb.cursor()
columns = ['idBrand','name']
add_brands = queryGenForInsert('Brand', columns)
key = 0
all_brands = []

lol = [('ASUS'), ('Apple'), ('Samsung')]

for i in brands:
    key+=1
    all_brands.append((key, i))

cursor.executemany(add_brands, all_brands)
myDb.commit()



#Products table
products = dataset[['asin', 'title', 'image', 'rating', 'price','brand']]
rows = products.shape[0]
all_products = []
columns = ['id_products','name', 'rating', 'price', 'img_url', 'product_asin', 'Brand_idBrand', 'stock']
mycursor_Select = myDb.cursor()

#Inserting products to database
key = 0
for i in range(rows):
    key+=1
    query = 'SELECT idBrand FROM Phone_Db.Brand Where name = "{}";'.format(products.iloc[i,-1])
    mycursor_Select.execute((query))
    records = mycursor_Select.fetchall()
    id = records[0][0]
    stock = randrange(10)
    all_products.append((key, products.iloc[i, 1], float(products.iloc[i, 3]), float(products.iloc[i, 4]), products.iloc[i,2], products.iloc[i, 0], id, stock))

add_products = queryGenForInsert('Product', columns)
cursor.executemany(add_products, all_products)
myDb.commit()

#Reveiewers table
reviewers = np.unique(reviews['name'].to_numpy().astype(str)).tolist()
reviewers = [ names.encode('ascii', 'ignore').decode('ascii') for names in reviewers ]


#Inserting reviewers to databse
columns = ['id_reveiwer','username']
add_reviewers = queryGenForInsert('Reveiwer', columns)
key = 0
all_reviewers = []

for i in reviewers:
    key+=1
    all_reviewers.append((key, i))

cursor.executemany(add_reviewers, all_reviewers)
myDb.commit()


#CommentsTable
comments = reviews[['title', 'body', 'date', 'rating', 'name','asin']]
columns = ['id_comment','title', 'body', 'created', 'rating', 'product_id', 'reviewer_id']
rows = comments.shape[0]
add_comments = queryGenForInsert('Comment', columns)
all_comments = []
mycursor_Select = myDb.cursor()



query = 'SELECT id_products FROM Phone_Db.Product WHERE product_asin = "{}";'.format('B0029F2O3A')
mycursor_Select.execute((query))
records = mycursor_Select.fetchall()

if records:
    print('lol')


key = 1
for i in range(rows):
    date = comments.iloc[i,2]
    timeObject = dateutil.parser.parse(date)
    date = timeObject.strftime("%Y-%m-%d")

    asin = comments.iloc[i,-1]
    query = 'SELECT id_products FROM Phone_Db.Product WHERE product_asin = "{}";'.format(asin)
    mycursor_Select.execute((query))
    records = mycursor_Select.fetchall()

    if records:
        product_id = records[0][0]
        user = comments.iloc[i,-2]
        query = 'SELECT id_reveiwer FROM Phone_Db.Reveiwer WHERE username = "{}";'.format(user)
        mycursor_Select.execute((query))
        records = mycursor_Select.fetchall()

        if records:
            reviewer_id = records[0][0]
            all_comments.append((key, re.escape(str(comments.iloc[i, 0]).encode('ascii', 'ignore').decode('ascii')), str(re.escape(comments.iloc[i, 1]).encode('ascii', 'ignore').decode('ascii')), date, int(comments.iloc[i, 3]),product_id, reviewer_id))
            key += 1


cursor.executemany(add_comments, all_comments)
myDb.commit()


myDb.close()






