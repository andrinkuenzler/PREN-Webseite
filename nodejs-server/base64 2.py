import base64
from base64 import b64encode
from json import dumps, loads

def image_capture():
    path = './asd.PNG'
    with open(path, "rb") as imageFile:
        str = base64.b64encode(imageFile.read())
    print(str)

    string = pngToBase64(path)
    with open("imageToSave.png", "wb") as fh:
        fh.write(base64.decodebytes(str))

    print("Published file")

def pngToBase64(filename):
    ENCODING = 'utf-8'
    IMAGE_NAME = filename

    with open(IMAGE_NAME, 'rb') as open_file:
        byte_content = open_file.read()

    base64_bytes = b64encode(byte_content)
    base64_string = base64_bytes.decode(ENCODING)
    return base64_string

image_capture()