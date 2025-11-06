interface Spinnable {
  on(): void;
  off(): void;
  error(err: any): void;
}

function spinner<T extends Spinnable>() {
  return function (
    target: T,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const oldFunction = descriptor.value;
    descriptor.value = async function(this: T, ...args: any[]) {
      try {
        this.on();
        console.log("Before");
        return oldFunction.apply(this, args);
        //console.log("After");        
      } catch(err) {
        this.error(err);
        console.log(err);
      } finally {
        this.off();
        console.log("Finally");
      }
    };
  };
}

// ❌ Esto ahora SÍ da error en compilación
/*class Foo {
  @spinner() 
  async writer(data: any) {
    console.log(data);
  }
}*/


class Bar implements Spinnable {
  on(): void {
    console.log("Spinner ON");
  }
  
  off(): void {
    console.log("Spinner OFF");
  }
  
  error(err: any): void {
    console.log("Error:", err);
  }

  @spinner()
  async writer(data: any) {
    console.log(data);
  }
}
const baz = new Bar()
baz.writer("Hello");

