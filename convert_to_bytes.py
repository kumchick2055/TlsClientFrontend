import sys

def read_file_to_bytes(filename):
    with open(filename, 'rb') as file:
        return file.read()

def write_bytes_to_header(bytes_data, header_filename):
    with open(header_filename, 'w') as header_file:
        header_file.write("#ifndef DATA_H\n")
        header_file.write("#define DATA_H\n\n")
        header_file.write("const unsigned char fileData[] = {\n")
        
        bytes_per_line = 16  # Number of bytes per line for readability
        for i in range(0, len(bytes_data), bytes_per_line):
            line_bytes = bytes_data[i:i + bytes_per_line]
            hex_values = ', '.join(f"0x{b:02x}" for b in line_bytes)
            header_file.write("    " + hex_values + (',' if i + bytes_per_line < len(bytes_data) else '') + "\n")
        
        header_file.write("};\n")
        header_file.write(f"const size_t fileDataSize = sizeof(fileData);\n")
        header_file.write("\n#endif // DATA_H\n")

def main(input_filename, header_filename):
    try:
        bytes_data = read_file_to_bytes(input_filename)
        write_bytes_to_header(bytes_data, header_filename)
        print(f"Header file successfully created: {header_filename}")
    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python generate_header.py <input_file> <header_file>")
        sys.exit(1)
    
    input_filename = sys.argv[1]
    header_filename = sys.argv[2]
    
    main(input_filename, header_filename)
