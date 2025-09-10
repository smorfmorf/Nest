import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

// @StartWith('prefix')
export function StartWith(
  prefix: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      name: 'startWith',
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must start with "${prefix}"`;
        },
      },
    });
  };
}
