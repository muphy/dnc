export function promisify(func: Function) {
    return function (...args: any[]) {
        return new Promise(function (resolve: Function, reject: Function) {
            let func1 = function (err: any, result: any) {
                return err ? reject(err) : resolve(result);
            }
            func(...args, func1);
        });
    }
}

// const delay = promisify((d:number,cb:Function)=>setTimeout(cb,d));


// delay(1000,()=>console.log(process.env.JWT_SECRETKEY));

