import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import { get } from 'lodash';
import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { Input, InputProps } from '../Input';

export type FormInputProps<TFormValues extends FieldValues> = {
    name: Path<TFormValues>;
    rules?: RegisterOptions;
    register?: UseFormRegister<TFormValues>;
    errors?: Partial<DeepMap<TFormValues, FieldError>>;
} & Omit<InputProps, 'name'>;

export const FormInput = <TFormValues extends Record<string, unknown>>({
    name,
    register,
    rules,
    errors,
    className,
    ...props
}: FormInputProps<TFormValues>): JSX.Element => {
    const errorMessages = get(errors, name);
    const hasError = !!(errors && errorMessages);

    return (
        <div className={classNames('', className)} aria-live='polite'>
            <Input
                name={name}
                aria-invalid={hasError}
                className={
                    classNames({
                        'transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-600 hover:border-red-600 focus:border-red-600 focus:ring-red-600':
                            hasError,
                    })
                }
                {...props}
                {...(register && register(name, rules))}
            />
            <ErrorMessage
                errors={errors}
                name={name as any}
                render={({ message }) => (
                    <p className="mt-1 text-sm text-left block">
                        {message}
                    </p>
                )}
            />
        </div>
    )
};