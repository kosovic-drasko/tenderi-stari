export interface IVrednovanje {
  id?: number;
  sifraPostupka?: number | null;
}

export class Vrednovanje implements IVrednovanje {
  constructor(public id?: number, public sifraPostupka?: number | null) {}
}

export function getVrednovanjeIdentifier(vrednovanje: IVrednovanje): number | undefined {
  return vrednovanje.id;
}
