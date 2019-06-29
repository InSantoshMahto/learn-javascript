"use strict";
var Rectangle;
(function (Rectangle) {
    function area(l, b) {
        return l * b;
    }
    Rectangle.area = area;
})(Rectangle || (Rectangle = {}));
console.log(Rectangle.area(5, 5));
//# sourceMappingURL=rectangle.js.map