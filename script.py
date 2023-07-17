import os
import pypandoc

path = './data'

for filename in os.listdir(path):
    file_path = os.path.join(path, filename, 'uploads')
    num_files = len(os.listdir(file_path))
    
    for x in range(num_files):
        input_file = os.path.join(file_path, f'{x}.docx')
        output_file = os.path.join(path, filename, 'output', f'{x}.odt')
        
        pypandoc.convert_file(input_file, 'odt', outputfile=output_file)