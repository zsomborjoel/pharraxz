import React, { createContext, FC, useState } from 'react';

interface FileContextInterface {
    pwdState: [pwd: string, setPwd: React.Dispatch<React.SetStateAction<string>>];
    isFileUploadedState: [isFileUploaded: boolean, setIsFileUploaded: React.Dispatch<React.SetStateAction<boolean>>];
    deletedPathState: [deletedPath: string, setDeletedPath: React.Dispatch<React.SetStateAction<string>>];
}

const FileContext = createContext<FileContextInterface>({
    pwdState: ['', () => {}],
    isFileUploadedState: [false, () => {}],
    deletedPathState: ['', () => {}],
});

const FileContextProvider: FC<any> = ({ children }) => {
    const [pwd, setPwd] = useState<string>('');
    const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
    const [deletedPath, setDeletedPath] = useState<string>('');

    return (
        <FileContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{
                pwdState: [pwd, setPwd],
                isFileUploadedState: [isFileUploaded, setIsFileUploaded],
                deletedPathState: [deletedPath, setDeletedPath],
            }}
        >
            {children}
        </FileContext.Provider>
    );
};

export { FileContext, FileContextProvider };
