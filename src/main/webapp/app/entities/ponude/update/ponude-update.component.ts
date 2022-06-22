import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPonude, Ponude } from '../ponude.model';
import { PonudeService } from '../service/ponude.service';
import { IPonudjaci } from '../../ponudjaci/ponudjaci.model';
import { PonudjaciService } from '../../ponudjaci/service/ponudjaci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'jhi-ponude-update',
  templateUrl: './ponude-update.component.html',
  styleUrls: ['./ponude-update.scss'],
})
export class PonudeUpdateComponent implements OnInit {
  isSaving = false;
  ponudes: IPonude[] = [];
  ponudjaci: IPonudjaci[] = [];
  editForm: FormGroup;
  aktivno: boolean;
  constructor(
    protected ponudeService: PonudeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected ponudjaciService: PonudjaciService,
    public dialogRef: MatDialogRef<PonudeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA)
    {
      id,
      sifraPostupka,
      sifraPonude,
      brojPartije,
      sifraPonudjaca,
      nazivProizvodjaca,
      zasticeniNaziv,
      ponudjenaVrijednost,
      jedinicnaCijena,
      rokIsporuke,
      name,
    }: any
  ) {
    this.editForm = this.fb.group({
      id: [id],
      sifraPostupka: [sifraPostupka, [Validators.required]],
      sifraPonude: [sifraPonude, [Validators.required]],
      brojPartije: [brojPartije, [Validators.required]],
      sifraPonudjaca: [sifraPonudjaca, [Validators.required]],
      nazivProizvodjaca: [nazivProizvodjaca],
      zasticeniNaziv: [zasticeniNaziv],
      ponudjenaVrijednost: [ponudjenaVrijednost, [Validators.required]],
      jedinicnaCijena: [jedinicnaCijena],
      rokIsporuke: [rokIsporuke, [Validators.required]],
    });
    this.aktivno = name;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ponude }) => {
      this.updateForm(ponude);
    });
    this.loadAllPonudjaci();
  }
  loadAllPonudjaci(): void {
    this.ponudjaciService.query().subscribe((res: HttpResponse<IPonudjaci[]>) => {
      this.ponudjaci = res.body ?? [];
    });
  }
  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ponude = this.createFromForm();
    if (ponude.id !== undefined) {
      this.subscribeToSaveResponse(this.ponudeService.update(ponude));
    } else {
      this.subscribeToSaveResponse(this.ponudeService.create(ponude));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPonude>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      // next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  // protected onSaveSuccess(): void {
  //   this.previousState();
  // }
  close(): any {
    this.dialogRef.close();
  }
  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
  public confirmAdd(): void {
    const ponude = this.createFromForm();
    this.subscribeToSaveResponse(this.ponudeService.create(ponude));
    this.dialogRef.close();
  }
  protected updateForm(ponude: IPonude): void {
    this.editForm.patchValue({
      id: ponude.id,
      sifraPostupka: ponude.sifraPostupka,
      sifraPonude: ponude.sifraPonude,
      brojPartije: ponude.brojPartije,
      nazivProizvodjaca: ponude.nazivProizvodjaca,
      zasticeniNaziv: ponude.zasticeniNaziv,
      ponudjenaVrijednost: ponude.ponudjenaVrijednost,
      rokIsporuke: ponude.rokIsporuke,
      sifraPonudjaca: ponude.sifraPonudjaca,
      jedinicnaCijena: ponude.jedinicnaCijena,
    });
  }
  protected createFromForm(): IPonude {
    return {
      ...new Ponude(),
      id: this.editForm.get(['id'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      sifraPonude: this.editForm.get(['sifraPonude'])!.value,
      brojPartije: this.editForm.get(['brojPartije'])!.value,
      nazivProizvodjaca: this.editForm.get(['nazivProizvodjaca'])!.value,
      zasticeniNaziv: this.editForm.get(['zasticeniNaziv'])!.value,
      ponudjenaVrijednost: this.editForm.get(['ponudjenaVrijednost'])!.value,
      rokIsporuke: this.editForm.get(['rokIsporuke'])!.value,
      sifraPonudjaca: this.editForm.get(['sifraPonudjaca'])!.value,
      jedinicnaCijena: this.editForm.get(['jedinicnaCijena'])!.value,
    };
  }
}
