export interface IVrednovanje {
  id?: number;
  sifraPostupka?: number | null;
  sifraPonude?: number | null;
  brojPartije?: number | null;
  atc?: string | null;
  nazivProizvodjaca?: string | null;
  sifraPonudjaca?: string | null;
  nazivPonudjaca?: string | null;
  zasticeniNaziv?: string | null;
  trazenaKolicina?: number | null;
  procijenjenaVrijednost?: number | null;
  ponudjenaVrijednost?: number | null;
  rokIsporuke?: number | null;
  bodCijena?: number | null;
  bodRok?: number | null;
  bodUkupno?: number | null;
}

export class Vrednovanje implements IVrednovanje {
  constructor(
    public id?: number,
    public sifraPostupka?: number | null,
    public sifraPonude?: number | null,
    public brojPartije?: number | null,
    public atc?: string | null,
    public nazivProizvodjaca?: string | null,
    public sifraPonudjaca?: string | null,
    public nazivPonudjaca?: string | null,
    public zasticeniNaziv?: string | null,
    public trazenaKolicina?: number | null,
    public procijenjenaVrijednost?: number | null,
    public ponudjenaVrijednost?: number | null,
    public rokIsporuke?: number | null,
    public bodCijena?: number | null,
    public bodRok?: number | null,
    public bodUkupno?: number | null
  ) {}
}

export function getVrednovanjeIdentifier(vrednovanje: IVrednovanje): number | undefined {
  return vrednovanje.id;
}
