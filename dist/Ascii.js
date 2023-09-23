"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ascii = void 0;
class Ascii {
    constructor() {
        //List of Ascii items cooresponding to bytes via their index
        this.library = [
            "Null",
            "Start of Heading",
            "Start of Text",
            "End of Text",
            "End of Transmission",
            "Enquiry",
            "Acknowledgment",
            "Bell",
            "Backspace",
            "Horizontal Tab",
            "Line Feed",
            "Vertical Tab",
            "Form Feed",
            "Carriage Return",
            "Shift Out",
            "Shift In",
            "Data Link Escape",
            "Device Control 1",
            "Device Control 2",
            "Device Control 3",
            "Device Control 4",
            "Negative ACK",
            "Synchronous idle",
            "End of Trans. Block",
            "Cancel",
            "End of Medium",
            "Substitute",
            "Escape",
            "File Separator",
            "Group Separator",
            "Record Separator",
            "Unit Separator",
            "Space",
            "!",
            "'",
            "#",
            "$",
            "%",
            "&",
            "'",
            "(",
            ")",
            "*",
            "+",
            ",",
            "-",
            ".",
            "/",
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            ":",
            ";",
            "<",
            "=",
            ">",
            "?",
            "@",
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z",
            "[",
            "'\'",
            "]",
            "^",
            "_",
            "`",
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            "{",
            "|",
            "}",
            "~",
            "Del",
        ];
    }
    //Converting from Byte to Ascii
    //List should accept the byte which will be the index of the ascii and return the ascii
    toAscii(tempByte) {
        return this.library[tempByte];
    }
    //Converting from Ascii to Byte
    //indexOf will search the list for the item and give the index of said item which will be the byte
    toByte(tempAscii) {
        return this.library.indexOf(tempAscii);
    }
}
exports.Ascii = Ascii;
//# sourceMappingURL=Ascii.js.map