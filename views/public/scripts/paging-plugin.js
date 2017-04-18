/**
 * Created by monty on 2017/4/19.
 */

class Pageing {
    constructor(name) {
        this.name = name
    }

    add(num) {
        console.log(num + 1);

        return this;
    }

    _replace() {
        console.log(this.name);
        return this;
    }
}

export default Pageing