package tender.service.criteria;

import java.io.Serializable;
import java.util.Objects;
import org.springdoc.api.annotations.ParameterObject;
import tech.jhipster.service.Criteria;
import tech.jhipster.service.filter.BooleanFilter;
import tech.jhipster.service.filter.DoubleFilter;
import tech.jhipster.service.filter.Filter;
import tech.jhipster.service.filter.FloatFilter;
import tech.jhipster.service.filter.IntegerFilter;
import tech.jhipster.service.filter.LocalDateFilter;
import tech.jhipster.service.filter.LongFilter;
import tech.jhipster.service.filter.RangeFilter;
import tech.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link tender.domain.Postupci} entity. This class is
 * used
 * in {@link tender.web.rest.PostupciResource} to receive all the possible
 * filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /postupcis?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific
 * {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
@ParameterObject
public class PostupciCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private IntegerFilter sifraPostupka;

    private StringFilter brojTendera;

    private StringFilter opisPostupka;

    private StringFilter vrstaPostupka;

    private LocalDateFilter datumObjave;

    private LocalDateFilter datumOtvaranja;

    private IntegerFilter kriterijum_cijena;

    private IntegerFilter drugi_kriterijum;

    private Boolean distinct;

    public PostupciCriteria() {}

    public PostupciCriteria(PostupciCriteria other) {
        this.id = other.id == null ? null : other.id.copy();
        this.sifraPostupka = other.sifraPostupka == null ? null : other.sifraPostupka.copy();
        this.brojTendera = other.brojTendera == null ? null : other.brojTendera.copy();
        this.opisPostupka = other.opisPostupka == null ? null : other.opisPostupka.copy();
        this.vrstaPostupka = other.vrstaPostupka == null ? null : other.vrstaPostupka.copy();
        this.datumObjave = other.datumObjave == null ? null : other.datumObjave.copy();
        this.datumOtvaranja = other.datumOtvaranja == null ? null : other.datumOtvaranja.copy();
        this.kriterijum_cijena = other.kriterijum_cijena == null ? null : other.kriterijum_cijena.copy();
        this.drugi_kriterijum = other.drugi_kriterijum == null ? null : other.drugi_kriterijum.copy();
        this.distinct = other.distinct;
    }

    @Override
    public PostupciCriteria copy() {
        return new PostupciCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public LongFilter id() {
        if (id == null) {
            id = new LongFilter();
        }
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public IntegerFilter getSifraPostupka() {
        return sifraPostupka;
    }

    public IntegerFilter sifraPostupka() {
        if (sifraPostupka == null) {
            sifraPostupka = new IntegerFilter();
        }
        return sifraPostupka;
    }

    public void setSifraPostupka(IntegerFilter sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
    }

    public StringFilter getBrojTendera() {
        return brojTendera;
    }

    public StringFilter brojTendera() {
        if (brojTendera == null) {
            brojTendera = new StringFilter();
        }
        return brojTendera;
    }

    public void setBrojTendera(StringFilter brojTendera) {
        this.brojTendera = brojTendera;
    }

    public StringFilter getOpisPostupka() {
        return opisPostupka;
    }

    public StringFilter opisPostupka() {
        if (opisPostupka == null) {
            opisPostupka = new StringFilter();
        }
        return opisPostupka;
    }

    public void setOpisPostupka(StringFilter opisPostupka) {
        this.opisPostupka = opisPostupka;
    }

    public StringFilter getVrstaPostupka() {
        return vrstaPostupka;
    }

    public StringFilter vrstaPostupka() {
        if (vrstaPostupka == null) {
            vrstaPostupka = new StringFilter();
        }
        return vrstaPostupka;
    }

    public void setVrstaPostupka(StringFilter vrstaPostupka) {
        this.vrstaPostupka = vrstaPostupka;
    }

    public LocalDateFilter getDatumObjave() {
        return datumObjave;
    }

    public LocalDateFilter datumObjave() {
        if (datumObjave == null) {
            datumObjave = new LocalDateFilter();
        }
        return datumObjave;
    }

    public void setDatumObjave(LocalDateFilter datumObjave) {
        this.datumObjave = datumObjave;
    }

    public LocalDateFilter getDatumOtvaranja() {
        return datumOtvaranja;
    }

    public LocalDateFilter datumOtvaranja() {
        if (datumOtvaranja == null) {
            datumOtvaranja = new LocalDateFilter();
        }
        return datumOtvaranja;
    }

    public void setDatumOtvaranja(LocalDateFilter datumOtvaranja) {
        this.datumOtvaranja = datumOtvaranja;
    }

    public IntegerFilter getKriterijum_cijena() {
        return kriterijum_cijena;
    }

    public IntegerFilter kriterijum_cijena() {
        if (kriterijum_cijena == null) {
            kriterijum_cijena = new IntegerFilter();
        }
        return kriterijum_cijena;
    }

    public void setKriterijum_cijena(IntegerFilter kriterijum_cijena) {
        this.kriterijum_cijena = kriterijum_cijena;
    }

    public IntegerFilter getDrugi_kriterijum() {
        return drugi_kriterijum;
    }

    public IntegerFilter drugi_kriterijum() {
        if (drugi_kriterijum == null) {
            drugi_kriterijum = new IntegerFilter();
        }
        return drugi_kriterijum;
    }

    public void setDrugi_kriterijum(IntegerFilter drugi_kriterijum) {
        this.drugi_kriterijum = drugi_kriterijum;
    }

    public Boolean getDistinct() {
        return distinct;
    }

    public void setDistinct(Boolean distinct) {
        this.distinct = distinct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final PostupciCriteria that = (PostupciCriteria) o;
        return (
            Objects.equals(id, that.id) &&
            Objects.equals(sifraPostupka, that.sifraPostupka) &&
            Objects.equals(brojTendera, that.brojTendera) &&
            Objects.equals(opisPostupka, that.opisPostupka) &&
            Objects.equals(vrstaPostupka, that.vrstaPostupka) &&
            Objects.equals(datumObjave, that.datumObjave) &&
            Objects.equals(datumOtvaranja, that.datumOtvaranja) &&
            Objects.equals(kriterijum_cijena, that.kriterijum_cijena) &&
            Objects.equals(drugi_kriterijum, that.drugi_kriterijum) &&
            Objects.equals(distinct, that.distinct)
        );
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            sifraPostupka,
            brojTendera,
            opisPostupka,
            vrstaPostupka,
            datumObjave,
            datumOtvaranja,
            kriterijum_cijena,
            drugi_kriterijum,
            distinct
        );
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PostupciCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (sifraPostupka != null ? "sifraPostupka=" + sifraPostupka + ", " : "") +
                (brojTendera != null ? "brojTendera=" + brojTendera + ", " : "") +
                (opisPostupka != null ? "opisPostupka=" + opisPostupka + ", " : "") +
                (vrstaPostupka != null ? "vrstaPostupka=" + vrstaPostupka + ", " : "") +
                (datumObjave != null ? "datumObjave=" + datumObjave + ", " : "") +
                (datumOtvaranja != null ? "datumOtvaranja=" + datumOtvaranja + ", " : "") +
                (kriterijum_cijena != null ? "kriterijum_cijena=" + kriterijum_cijena + ", " : "") +
                (drugi_kriterijum != null ? "drugi_kriterijum=" + drugi_kriterijum + ", " : "") +
                (distinct != null ? "distinct=" + distinct + ", " : "") +
                "}";
    }

    public RangeFilter getKriterijumCijena() {
        return null;
    }

    public RangeFilter getDrugiKriterijum() {
        return null;
    }
}
