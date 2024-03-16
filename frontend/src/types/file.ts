export interface FileResponse {
  entityKey: string;
  filePath: string;
  fileKey: string;
  fileType: string;
}

export enum DocumentType {
  AADHAR = "AADHAR",
  PAN = "PAN",
  RATION_CARD = "RATION_CARD",
}
