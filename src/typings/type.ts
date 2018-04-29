export interface VehicleRaw {
    gmvid?: number | null
    id?: number | null
    linia?: string | null
    brygada?: string | null
    typlinii?: string | null
    pojazd?: string | null
    trasa?: string | null
    z?: string | null
    do?: string | null
    lat?: string | null
    lon?: string | null
    predkosc?: string | null
    punktualnosc1?: string | null
    punktualnosc2?: string | null
    ikonka?: string | null
}

export interface StopRaw {
    id?: number | null
    szerokoscgeo?: number | null
    dlugoscgeo?: number | null
    nazwa?: string | null
    nrzespolu?: number | null
    nrslupka?: string | null
}
