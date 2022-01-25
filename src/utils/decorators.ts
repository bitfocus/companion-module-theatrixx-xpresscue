export function createClassKeyDecorator(idKey: string): (id: string) => ClassDecorator {
  return function (id: string): ClassDecorator {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return function(constructor: any) {
      constructor[idKey] = id;
    };
  }
}
