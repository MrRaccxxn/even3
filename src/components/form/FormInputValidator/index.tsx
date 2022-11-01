import { InputProps } from '../Input';

export type FormInputProps = InputProps;

export const FormInput = ({
    className,
    ...props
}: FormInputProps): JSX.Element => {
    return (
        <div className={className} aria-live="polite">
        </div>
    );
};