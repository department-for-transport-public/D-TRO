#!/bin/bash

if [ $# -ne 2 ]; then
  echo "Usage: $0 <input_file> <output_file>"
  exit 1
fi

input_file=$1
output_file=$2

if [ ! -f "$input_file" ]; then
  echo "Error: Input file '$input_file' not found"
  exit 1
fi

pandoc "$input_file" -f docx -t html --template=custom.html --extract-media=media --metadata title="D-TRO User Guide v3.4.0" --include-before-body=before-body.html --include-after-body=after-body.html --include-after-body=scripts.html --css=style.css --number-sections -o "$output_file"
tidy -utf8 -indent -wrap 0 -asxhtml -q -m "$output_file"

