import re
st = """
def reverseString(string):
    return string[::-1]
# &&NAME&& Reverse String
# &&INPUT&& reverseString("hello world')
# &&OUTPUT&& "dlrow olleh"
"""


match = re.search(r"^[^#](.*\n*\r*)(?=[#]\s)?", st)
print(match[0])