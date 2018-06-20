import os

direc = os.getcwd() + "\\static\\styles" # Get current working directory
ext = '.css' # Select your file delimiter

file_dict = {} # Create an empty dict

# Select only files with the ext extension
txt_files = [i for i in os.listdir(direc) if os.path.splitext(i)[1] == ext]

with open("themes.js", "w+") as f:
    f.write("themes = " + str([x[:-4] for x in txt_files]))

print("done")