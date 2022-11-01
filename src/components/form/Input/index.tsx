import classNames from 'classnames';
import {
    DetailedHTMLProps, forwardRef, InputHTMLAttributes
} from 'react';
export type InputSize = 'medium' | 'large';
export type InputType = 'text' | 'email';

export type InputProps = {
    id: string;
    name: string;
    label: string;
    type?: InputType;
    size?: InputSize;
    className?: string;
} & Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'size'
>;

const sizeMap: { [key in InputSize]: string } = {
    medium: 'p-3 text-base',
    large: 'p-4 text-base',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            id,
            name,
            label,
            type = 'text',
            size = 'medium',
            className = '',
            placeholder,
            ...props
        },
        ref
    ) => {
        return (
            <input
                id={id}
                ref={ref}
                name={name}
                type={type}
                aria-label={label}
                placeholder={placeholder}
                autoComplete='off'
                className={classNames([
                    'relative inline-flex w-full rounded leading-none transition-colors ease-in-out placeholder-gray-500 text-gray-700 bg-gray-50 border border-gray-300 hover:border-blue-400 focus:outline-none focus:border-blue-400 focus:ring-paragraph focus:ring-2 focus:ring-opacity-30',
                    sizeMap[size],
                    className,
                ])}
                {...props}
            />
        );
    }
);