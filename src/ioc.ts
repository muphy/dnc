import { Container, Inject } from "typescript-ioc";

class Foo {
    doSomething(): string {
        return "Hello World";
    }
}

class Bar {
    constructor(@Inject private foo: Foo) {
        this.foo = foo;
    }

    doAnotherThing(): string {
        return this.foo.doSomething();
    }
}

const bar: Bar = Container.get(Bar);
console.log(bar.doAnotherThing());