import pandas as pd
import numpy as np
import mysql.connector
from random import randrange
from datetime import datetime
import re
import dateutil.parser
import warnings
warnings.filterwarnings("ignore")

# Insert your mysql username and password
db_username = 'root'
db_password = ''

dataset = pd.read_csv('./Dataset/Amazon_Phones_Db/items.csv', delimiter=',')
reviews = pd.read_csv('./Dataset/Amazon_Phones_Db/reviews.csv', delimiter=',')
comments = reviews[['title', 'body', 'date', 'rating', 'name','asin']]

dataset.dropna(inplace= True)
comments.dropna(inplace= True)
comments['name'] = comments['name'].str.replace('"', '')

# Change 
myDb = mysql.connector.connect(user=db_username, password=db_password,host='localhost', database="Phone_Db")


# Brands table
brands = np.unique(dataset['brand'].to_numpy( dtype='S').astype(str)).tolist()

def testIfAscii(str):
    try:
        str.encode('ascii')
    except UnicodeEncodeError:
        return False
    else:
        return True

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

for i in brands:
    key+=1
    all_brands.append((key, i))

cursor.executemany(add_brands, all_brands)
myDb.commit()
print('Inserted All Brands')

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
print('Inserted Products Table')

#Reveiewers table
reviewers = np.unique(comments['name'].to_numpy().astype(str)).tolist()

#Inserting reviewers to database
columns = ['id_reveiwer','username']
add_reviewers = queryGenForInsert('Reveiwer', columns)
key = 0
all_reviewers = []

for i in reviewers:
    if testIfAscii(i):
        key += 1
        all_reviewers.append((key, i))

cursor.executemany(add_reviewers, all_reviewers)
myDb.commit()
print('Inserted Reviewers Table')


#CommentsTable
columns = ['id_comment','title', 'body', 'created', 'rating', 'product_id', 'reviewer_id']
rows = comments.shape[0]
add_comments = queryGenForInsert('Comment', columns)
all_comments = []
mycursor_Select = myDb.cursor()

key = 1

for i in range(rows):
    date = comments.iloc[i,2]
    timeObject = dateutil.parser.parse(date)
    date = timeObject.strftime("%Y-%m-%d")

    asin = comments.iloc[i,-1]
    query = 'SELECT id_products FROM Phone_Db.Product WHERE product_asin = "{}";'.format(asin)
    mycursor_Select.execute(query)
    records = mycursor_Select.fetchall()

    if records:
        product_id = records[0][0]
        user = comments.iloc[i,-2]
        if not testIfAscii(user):
            continue
        query = 'SELECT id_reveiwer FROM Phone_Db.Reveiwer WHERE username = "{}";'.format(user)
        mycursor_Select.execute(query)
        records = mycursor_Select.fetchall()

        if records:
            reviewer_id = records[0][0]
            all_comments.append((key, re.escape(str(comments.iloc[i, 0]).encode('ascii', 'ignore').decode('ascii')), str(re.escape(comments.iloc[i, 1]).encode('ascii', 'ignore').decode('ascii')), date, int(comments.iloc[i, 3]),product_id, reviewer_id))
            key += 1


cursor.executemany(add_comments, all_comments)
myDb.commit()
print('Inserted Comments Table')
print('All Insert Complete Closing Database Connection')
myDb.close()