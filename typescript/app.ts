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

    constructor(username: string) {
        super('work', username)
    }
}

const santosh = new Santosh('IN');
console.info(santosh);

// getter & setters
class Plant {
    private _name: string = 'default';

    get name() {
        console.log('getter executed');
        return this._name;
    }

    set name(plantName: string) {
        console.log('setter executed');
        this._name = plantName;
        console.info('my plant name is', this._name)
    }
}

const plant = new Plant();
plant.name = 'rose';
console.log(plant.name);

