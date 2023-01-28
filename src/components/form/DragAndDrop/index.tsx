import classnames from "classnames";
import _ from "lodash";
import Image from 'next/image';
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface Props {
    className: string,
    register: UseFormRegister<any>,
    inputName: string,
    label: string,
    helperText?: string,
    maxMb?: number,
    square?: boolean,
    memoryImage?: any
}

export const DragAndDrop = ({ register, inputName, className, label, helperText = '', maxMb = 10, square = false, memoryImage = null }: Props) => {
    const [image, setImage] = useState<string>('');

    const onChangeImage = (event: any) => {
        setImage(URL?.createObjectURL(event.target?.files[0]) || '')
    }

    return <div className={classnames(`${className} ${square ? 'w-96 h-96 sm:w-72 sm:h-72' : ''} flex justify-center items-center w-full m-auto`)}>
        <label htmlFor="dropzone-file" className={classnames([`${square ? 'w-96 h-96 sm:w-72 sm:h-72' : 'sm:h-48 h-80'}  relative flex flex-col justify-center items-center w-full rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-900 dark:bg-gray-700 hover:bg-gray-900 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`])}>
            {
                image != '' || !_.isEmpty(memoryImage) ?
                    <Image
                        alt="Event"
                        src={image || URL?.createObjectURL(memoryImage[0])}
                        layout='fill'
                        objectFit='cover'
                        className={classnames(`${square ? 'w-96 h-96 sm:w-72 sm:h-72 rounded-full' : 'w-full h-full'}`)}
                    /> :
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                        <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload a {label}</span></p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">JPG or PNG, Max. upload size : {maxMb}Mb</p>
                    </div>
            }
            <input id="dropzone-file" type="file" className="hidden" {...register(inputName, { onChange: onChangeImage })} />

        </label>


    </div>
}