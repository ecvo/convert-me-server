import os
import pandoc
import pypandoc

conout = pypandoc.convert_file('./uploads/1.docx', 'odt', outputfile="./output/1.odt")
conout = pypandoc.convert_file('./uploads/2.docx', 'odt', outputfile="./output/2.odt")
conout = pypandoc.convert_file('./uploads/3.docx', 'odt', outputfile="./output/3.odt")
conout = pypandoc.convert_file('./uploads/4.docx', 'odt', outputfile="./output/4.odt")
conout = pypandoc.convert_file('./uploads/5.docx', 'odt', outputfile="./output/5.odt")
conout = pypandoc.convert_file('./uploads/6.docx', 'odt', outputfile="./output/6.odt")
conout = pypandoc.convert_file('./uploads/7.docx', 'odt', outputfile="./output/7.odt")
conout = pypandoc.convert_file('./uploads/8.docx', 'odt', outputfile="./output/8.odt")


assert conout == ''
