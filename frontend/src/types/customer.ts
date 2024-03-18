export interface CustomerDocumentRequest {
  documentType: string;
  documentPath: string;
  documentKey: string;
  documentContentType: string;
}

export interface CustomerRequest {
  name: string;
  phoneNumber: string;
  altPhoneNumber: string,
  address: string;
  email: string;
  occupation: string;
  documents: CustomerDocumentRequest[];
}

export interface CustomerDocumentResponse extends CustomerDocumentRequest {
  id: number;
}

export interface CustomerResponse extends CustomerRequest {
  id: number;
  documents: CustomerDocumentResponse[];
}
