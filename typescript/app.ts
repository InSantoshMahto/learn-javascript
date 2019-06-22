/**
 * @descriptions
 * classes
 */
class Person {
    public name: string;
    private type: string = 'default';
    protected age: number = 21;

    constructor(name: string, public username: string) {
        this.name = name;
    }

    public printAge(): void {
        console.info(this.age);
        this.setType(`love`);
    }

    private setType(type: string): void {
        this.type = type;
        console.info(this.type);
    }
}

const person = new Person("Santosh", "sks");
console.info(person);
console.info(person.name, person.username);
person.printAge();
// person.setType(`india`)


// inheritance
class Santosh extends Person {
    state: string = 'jharkhand';
}

const santosh = new Santosh('india', 'IN');
console.info(santosh);
