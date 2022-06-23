package tender.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Bodovanje.
 */
@Entity
@Table(name = "view_vrednovanje")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bodovanje implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "sifra_postupka")
    private Integer sifraPostupka;

    @Column(name = "sifra_ponude")
    private Integer sifraPonude;

    @Column(name = "broj_partije")
    private Integer brojPartije;

    @Column(name = "atc")
    private String atc;

    @Column(name = "naziv_proizvodjaca")
    private String nazivProizvodjaca;

    @Column(name = "naziv_ponudjaca")
    private String nazivPonudjaca;

    @Column(name = "zasticeni_naziv")
    private String zasticeniNaziv;

    @Column(name = "trazena_kolicina")
    private Integer trazenaKolicina;

    @Column(name = "procijenjena_vrijednost")
    private Double procijenjenaVrijednost;

    @Column(name = "ponudjena_vrijednost")
    private Double ponudjenaVrijednost;

    @Column(name = "rok_isporuke")
    private Integer rokIsporuke;

    @Column(name = "bod_cijena")
    private Double bodCijena;

    @Column(name = "bod_rok")
    private Double bodRok;

    @Column(name = "bod_ukupno")
    private Double bodUkupno;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Bodovanje id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSifraPostupka() {
        return this.sifraPostupka;
    }

    public Bodovanje sifraPostupka(Integer sifraPostupka) {
        this.setSifraPostupka(sifraPostupka);
        return this;
    }

    public void setSifraPostupka(Integer sifraPostupka) {
        this.sifraPostupka = sifraPostupka;
    }

    public Integer getSifraPonude() {
        return this.sifraPonude;
    }

    public Bodovanje sifraPonude(Integer sifraPonude) {
        this.setSifraPonude(sifraPonude);
        return this;
    }

    public void setSifraPonude(Integer sifraPonude) {
        this.sifraPonude = sifraPonude;
    }

    public Integer getBrojPartije() {
        return this.brojPartije;
    }

    public Bodovanje brojPartije(Integer brojPartije) {
        this.setBrojPartije(brojPartije);
        return this;
    }

    public void setBrojPartije(Integer brojPartije) {
        this.brojPartije = brojPartije;
    }

    public String getAtc() {
        return this.atc;
    }

    public Bodovanje atc(String atc) {
        this.setAtc(atc);
        return this;
    }

    public void setAtc(String atc) {
        this.atc = atc;
    }

    public String getNazivProizvodjaca() {
        return this.nazivProizvodjaca;
    }

    public Bodovanje nazivProizvodjaca(String nazivProizvodjaca) {
        this.setNazivProizvodjaca(nazivProizvodjaca);
        return this;
    }

    public void setNazivProizvodjaca(String nazivProizvodjaca) {
        this.nazivProizvodjaca = nazivProizvodjaca;
    }

    public String getNazivPonudjaca() {
        return this.nazivPonudjaca;
    }

    public Bodovanje nazivPonudjaca(String nazivPonudjaca) {
        this.setNazivPonudjaca(nazivPonudjaca);
        return this;
    }

    public void setNazivPonudjaca(String nazivPonudjaca) {
        this.nazivPonudjaca = nazivPonudjaca;
    }

    public String getZasticeniNaziv() {
        return this.zasticeniNaziv;
    }

    public Bodovanje zasticeniNaziv(String zasticeniNaziv) {
        this.setZasticeniNaziv(zasticeniNaziv);
        return this;
    }

    public void setZasticeniNaziv(String zasticeniNaziv) {
        this.zasticeniNaziv = zasticeniNaziv;
    }

    public Integer getTrazenaKolicina() {
        return this.trazenaKolicina;
    }

    public Bodovanje trazenaKolicina(Integer trazenaKolicina) {
        this.setTrazenaKolicina(trazenaKolicina);
        return this;
    }

    public void setTrazenaKolicina(Integer trazenaKolicina) {
        this.trazenaKolicina = trazenaKolicina;
    }

    public Double getProcijenjenaVrijednost() {
        return this.procijenjenaVrijednost;
    }

    public Bodovanje procijenjenaVrijednost(Double procijenjenaVrijednost) {
        this.setProcijenjenaVrijednost(procijenjenaVrijednost);
        return this;
    }

    public void setProcijenjenaVrijednost(Double procijenjenaVrijednost) {
        this.procijenjenaVrijednost = procijenjenaVrijednost;
    }

    public Double getPonudjenaVrijednost() {
        return this.ponudjenaVrijednost;
    }

    public Bodovanje ponudjenaVrijednost(Double ponudjenaVrijednost) {
        this.setPonudjenaVrijednost(ponudjenaVrijednost);
        return this;
    }

    public void setPonudjenaVrijednost(Double ponudjenaVrijednost) {
        this.ponudjenaVrijednost = ponudjenaVrijednost;
    }

    public Integer getRokIsporuke() {
        return this.rokIsporuke;
    }

    public Bodovanje rokIsporuke(Integer rokIsporuke) {
        this.setRokIsporuke(rokIsporuke);
        return this;
    }

    public void setRokIsporuke(Integer rokIsporuke) {
        this.rokIsporuke = rokIsporuke;
    }

    public Double getBodCijena() {
        return this.bodCijena;
    }

    public Bodovanje bodCijena(Double bodCijena) {
        this.setBodCijena(bodCijena);
        return this;
    }

    public void setBodCijena(Double bodCijena) {
        this.bodCijena = bodCijena;
    }

    public Double getBodRok() {
        return this.bodRok;
    }

    public Bodovanje bodRok(Double bodRok) {
        this.setBodRok(bodRok);
        return this;
    }

    public void setBodRok(Double bodRok) {
        this.bodRok = bodRok;
    }

    public Double getBodUkupno() {
        return this.bodUkupno;
    }

    public Bodovanje bodUkupno(Double bodUkupno) {
        this.setBodUkupno(bodUkupno);
        return this;
    }

    public void setBodUkupno(Double bodUkupno) {
        this.bodUkupno = bodUkupno;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bodovanje)) {
            return false;
        }
        return id != null && id.equals(((Bodovanje) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bodovanje{" +
            "id=" + getId() +
            ", sifraPostupka=" + getSifraPostupka() +
            ", sifraPonude=" + getSifraPonude() +
            ", brojPartije=" + getBrojPartije() +
            ", atc='" + getAtc() + "'" +
            ", nazivProizvodjaca='" + getNazivProizvodjaca() + "'" +
            ", nazivPonudjaca='" + getNazivPonudjaca() + "'" +
            ", zasticeniNaziv='" + getZasticeniNaziv() + "'" +
            ", trazenaKolicina=" + getTrazenaKolicina() +
            ", procijenjenaVrijednost=" + getProcijenjenaVrijednost() +
            ", ponudjenaVrijednost=" + getPonudjenaVrijednost() +
            ", rokIsporuke=" + getRokIsporuke() +
            ", bodCijena=" + getBodCijena() +
            ", bodRok=" + getBodRok() +
            ", bodUkupno=" + getBodUkupno() +
            "}";
    }
}
