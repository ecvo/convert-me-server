import os
import pandoc
import pypandoc

for x in range (1, 100):
    conout = pypandoc.convert_file(f'./uploads/{str(x)}.docx', 'odt', outputfile=f'./output/{str(x)}.odt')

assert conout == ''
