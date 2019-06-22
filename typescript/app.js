"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @descriptions
 * classes
 */
var Person = /** @class */ (function () {
    function Person(name, username) {
        this.username = username;
        this.type = 'default';
        this.age = 21;
        this.name = name;
    }
    Person.prototype.printAge = function () {
        console.info(this.age);
        this.setType("love");
    };
    Person.prototype.setType = function (type) {
        this.type = type;
        console.info(this.type);
    };
    return Person;
}());
var person = new Person("Santosh", "sks");
console.info(person);
console.info(person.name, person.username);
person.printAge();
// person.setType(`india`)
// inheritance
var Santosh = /** @class */ (function (_super) {
    __extends(Santosh, _super);
    function Santosh(username) {
        var _this = _super.call(this, 'work', username) || this;
        _this.state = 'jharkhand';
        return _this;
    }
    return Santosh;
}(Person));
var santosh = new Santosh('IN');
console.info(santosh);
// getter & setters
var Plant = /** @class */ (function () {
    function Plant() {
        this._name = 'default';
    }
    Object.defineProperty(Plant.prototype, "name", {
        get: function () {
            console.log('getter executed');
            return this._name;
        },
        set: function (plantName) {
            console.log('setter executed');
            this._name = plantName;
            console.info('my plant name is', this._name);
        },
        enumerable: true,
        configurable: true
    });
    return Plant;
}());
var plant = new Plant();
plant.name = 'rose';
console.log(plant.name);
