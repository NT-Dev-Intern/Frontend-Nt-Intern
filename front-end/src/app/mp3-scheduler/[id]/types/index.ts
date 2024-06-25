export interface FileType {
    uploadTime: string;
    uploadEndTime: string;
}

export interface UploadedData {
    id: number,
    title: string,
    duration: number,
    filePath: string,
    uploadTime: string,
    endTime: string,
    uploadedById: number
}