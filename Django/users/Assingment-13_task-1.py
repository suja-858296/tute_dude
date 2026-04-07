#Write a python code for price Tracer Application..

import requests
from bs4 import BeautifulSoup

class PriceTracer:
    def __init__(self, url):
        self.url= url
        self.user_agent= {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"}
        self.response = requests.get(url= self.url, headers= self.user_agent).text
        self.soup = BeautifulSoup(self.response, 'lxml')

    def product_title(self):
            title = self.soup.find("span",{"id":"productTitle"})
            if title is not None:
                return title.text.strip()
            else:
                return "Tag not found"
    def product_price(self):
            price = self.soup.find("span", {"id":"a-price-whole" })
            if price is not None:
                return price.text
            else:
                return "Tag not found"

device = PriceTracer(url="https://www.amazon.in/ZEBRONICS-Launched-Rechargeable-Operation-Multicolor/dp/B0CQRNWJM2/?_encoding=UTF8&pd_rd_w=w1Lix&content-id=amzn1.sym.5f06effd-8e8f-4686-b8d9-883495d3c609&pf_rd_p=5f06effd-8e8f-4686-b8d9-883495d3c609&pf_rd_r=KV39ET4AGDFCYGEJXD71&pd_rd_wg=MiF2z&pd_rd_r=0d4df144-01b7-47d3-8361-3738e99302e3&ref_=pd_hp_d_btf_ls_gwc_pc_en2_&th=1")
print(device.product_title())
print(device.product_price())
