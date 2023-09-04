export interface RawDataBody {
    enodebId?: string,
    cellId?: string,
    startDate?: any,
    endDate?: any
}

export interface RawDataResponse {
    enodebId: string,
    cellId: string,
    availDur: number,
    resultTime: Date,
}

export interface GraphResponse {
    availability: number,
    resultTime: Date,
}