export interface userCredentialType {
    uniqueid: number,
    fullname: string,
    email: string,
    password: string,
}


export interface allChatsType {
    id: number,
    message: string,
    status: string,
    senderid: number,
    receiverid: number,
}


export interface messageSendDataType {
    message: string,
    senderid: number,
    receiverid: number
}