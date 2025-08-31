import { registerDecorator, type ValidationOptions } from 'class-validator';

export function StartWith(prefix: string, options?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'startWith',
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      validator: {
        validate(value: any, args: any) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: any) {
          return `Название должно начинаться c префикса ${prefix}`;
        },
      },
    });
  };
}
