import { createContext, useState } from "react";

interface FileContextType {
  fileName: string;
  setFileName: (name: string) => void;
  folderName: string;
  setFolderName: (name: string) => void;
  parentFolderName: string;
  setParentFolderName: (name: string) => void;
}

export const FileContext = createContext<FileContextType>({} as FileContextType);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const [fileName, setFileName] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("InitialMessage");
  const [parentFolderName, setParentFolderName] = useState<string>("");

  return (
    <FileContext.Provider value={{
      fileName,
      setFileName,
      folderName,
      setFolderName,
      parentFolderName,
      setParentFolderName
    }}>
      {children}
    </FileContext.Provider>
  );
};
