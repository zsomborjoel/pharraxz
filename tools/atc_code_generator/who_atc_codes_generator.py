import requests
from bs4 import BeautifulSoup
import pandas as pd
import string
from tqdm import tqdm

ATC_DDD_URL = "https://www.whocc.no/atc_ddd_index/?code="


def getATC_DDD_Data(targetList, level):
    temp_list = []
    for n in tqdm(targetList):
        req = requests.get(ATC_DDD_URL + n)
        soup = BeautifulSoup(req.text, 'lxml')
        row_data_list = [i.find('a') for i in soup.findAll('b')]
        if level == 1:
            row_data_list = row_data_list[:level]
        else:
            row_data_list = row_data_list[level - 1:]
        if row_data_list:
            for i in row_data_list:
                temp_list.append((i['href'].split('&')[0].split('=')[1], i.text,))
    return pd.DataFrame(temp_list, columns=['href', 'text'])


ATC_L1 = getATC_DDD_Data(string.ascii_uppercase, 1)
ATC_L1.to_excel('ATC_L1.xlsx', index=False)
ATC_L2 = getATC_DDD_Data(string.ascii_uppercase, 2)
ATC_L2.to_excel('ATC_L2.xlsx', index=False)
ATC_L3 = getATC_DDD_Data(list(ATC_L2['href']), 3)
ATC_L3.to_excel('ATC_L3.xlsx', index=False)
ATC_L4 = getATC_DDD_Data(list(ATC_L3['href']), 4)
ATC_L4.to_excel('ATC_L4.xlsx', index=False)
ATC_L4List = []

for i in tqdm(list(ATC_L4['href'])):
    req = requests.get(ATC_DDD_URL + i)
    soup = BeautifulSoup(req.text, 'lxml')
    try:
        Row4DF = pd.read_html(str(soup.select('ul table')), header=0)[0].fillna('')
        for n in Row4DF.index:
            if Row4DF.at[n, 'ATC code'] == '':
                try:
                    Row4DF.at[n, 'ATC code'] = Row4DF.at[n - 1, 'ATC code']
                except KeyError:
                    Row4DF.at[n, 'ATC code'] = i
        ATC_L4List.extend(Row4DF.to_dict('r'))
    except ValueError:
        ATC_L4List.extend([{'ATC code': i}])

with pd.ExcelWriter('ATC_DDD.xlsx') as xlsx:
    ATC_L1.to_excel(xlsx, sheet_name='ATC_L1', index=False)
    ATC_L2.to_excel(xlsx, sheet_name='ATC_L2', index=False)
    ATC_L3.to_excel(xlsx, sheet_name='ATC_L3', index=False)
    ATC_L4.to_excel(xlsx, sheet_name='ATC_L4', index=False)
    pd.DataFrame(ATC_L4List).to_excel(xlsx, sheet_name='ATC_L5', index=False)
