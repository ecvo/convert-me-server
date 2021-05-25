import os
import pandoc
import pypandoc

path = './data'

for filename in os.listdir(path):
    file = f'./data/{filename}/uploads'
    print(len(os.listdir(file)))
    ster = len(os.listdir(file))
    for x in range (0, ster):
        conout = pypandoc.convert_file(f'./data/{filename}/uploads/{str(x)}.docx', 'odt', outputfile=f'./data/{filename}/output/{str(x)}.odt')
        assert conout == ''
