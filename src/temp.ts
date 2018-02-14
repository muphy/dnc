const promiseFn = (): Promise<string> => {
    return Promise.resolve("hello world");
}

const asyncFn = async () => {
    let result = await promiseFn();
    console.log(result);
}

asyncFn();

function f() {
    console.log("f() evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f() called");
    }
}

function g() {
    console.log("g() evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`method=> ${propertyKey}`);
        console.log(`${JSON.stringify(descriptor)}`);
        console.log("g() called");
    }
}

class Foo {
    @f()
    @g()
    method(a: string, b: number) {
        console.log(`method called ${a},${b}`);
    }
}

let foo = new Foo();
foo.method("hello",3);