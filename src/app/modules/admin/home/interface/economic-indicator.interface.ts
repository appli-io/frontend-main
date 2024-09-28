export interface IEconomicIndicator {
    version: string;
    autor: string;
    fecha: string;
    uf: IEconomicIndicatorDetail;
    ivp: IEconomicIndicatorDetail;
    dolar: IEconomicIndicatorDetail;
    dolar_intercambio: IEconomicIndicatorDetail;
    euro: IEconomicIndicatorDetail;
    ipc: IEconomicIndicatorDetail;
    utm: IEconomicIndicatorDetail;
    imacec: IEconomicIndicatorDetail;
    tpm: IEconomicIndicatorDetail;
    libra_cobre: IEconomicIndicatorDetail;
    tasa_desempleo: IEconomicIndicatorDetail;
    bitcoin: IEconomicIndicatorDetail;
}

export interface IEconomicIndicatorDetail {
    codigo: string;
    nombre: string;
    unidad_medida: string;
    fecha: string;
    valor: number;
}
