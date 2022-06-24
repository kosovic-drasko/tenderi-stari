package tender.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import tender.IntegrationTest;
import tender.domain.Vrednovanje;
import tender.repository.VrednovanjeRepository;

/**
 * Integration tests for the {@link VrednovanjeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VrednovanjeResourceIT {

    private static final Integer DEFAULT_SIFRA_POSTUPKA = 1;
    private static final Integer UPDATED_SIFRA_POSTUPKA = 2;

    private static final Integer DEFAULT_SIFRA_PONUDE = 1;
    private static final Integer UPDATED_SIFRA_PONUDE = 2;

    private static final Integer DEFAULT_BROJ_PARTIJE = 1;
    private static final Integer UPDATED_BROJ_PARTIJE = 2;

    private static final String DEFAULT_ATC = "AAAAAAAAAA";
    private static final String UPDATED_ATC = "BBBBBBBBBB";

    private static final String DEFAULT_NAZIV_PROIZVODJACA = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV_PROIZVODJACA = "BBBBBBBBBB";

    private static final String DEFAULT_NAZIV_PONUDJACA = "AAAAAAAAAA";
    private static final String UPDATED_NAZIV_PONUDJACA = "BBBBBBBBBB";

    private static final String DEFAULT_ZASTICENI_NAZIV = "AAAAAAAAAA";
    private static final String UPDATED_ZASTICENI_NAZIV = "BBBBBBBBBB";

    private static final Integer DEFAULT_TRAZENA_KOLICINA = 1;
    private static final Integer UPDATED_TRAZENA_KOLICINA = 2;

    private static final Double DEFAULT_PROCIJENJENA_VRIJEDNOST = 1D;
    private static final Double UPDATED_PROCIJENJENA_VRIJEDNOST = 2D;

    private static final Double DEFAULT_PONUDJENA_VRIJEDNOST = 1D;
    private static final Double UPDATED_PONUDJENA_VRIJEDNOST = 2D;

    private static final Integer DEFAULT_ROK_ISPORUKE = 1;
    private static final Integer UPDATED_ROK_ISPORUKE = 2;

    private static final Double DEFAULT_BOD_CIJENA = 1D;
    private static final Double UPDATED_BOD_CIJENA = 2D;

    private static final Double DEFAULT_BOD_ROK = 1D;
    private static final Double UPDATED_BOD_ROK = 2D;

    private static final Double DEFAULT_BOD_UKUPNO = 1D;
    private static final Double UPDATED_BOD_UKUPNO = 2D;

    private static final String ENTITY_API_URL = "/api/vrednovanjes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VrednovanjeRepository vrednovanjeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVrednovanjeMockMvc;

    private Vrednovanje vrednovanje;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vrednovanje createEntity(EntityManager em) {
        Vrednovanje vrednovanje = new Vrednovanje()
            .sifraPostupka(DEFAULT_SIFRA_POSTUPKA)
            .sifraPonude(DEFAULT_SIFRA_PONUDE)
            .brojPartije(DEFAULT_BROJ_PARTIJE)
            .atc(DEFAULT_ATC)
            .nazivProizvodjaca(DEFAULT_NAZIV_PROIZVODJACA)
            .nazivPonudjaca(DEFAULT_NAZIV_PONUDJACA)
            .zasticeniNaziv(DEFAULT_ZASTICENI_NAZIV)
            .trazenaKolicina(DEFAULT_TRAZENA_KOLICINA)
            .procijenjenaVrijednost(DEFAULT_PROCIJENJENA_VRIJEDNOST)
            .ponudjenaVrijednost(DEFAULT_PONUDJENA_VRIJEDNOST)
            .rokIsporuke(DEFAULT_ROK_ISPORUKE)
            .bodCijena(DEFAULT_BOD_CIJENA)
            .bodRok(DEFAULT_BOD_ROK)
            .bodUkupno(DEFAULT_BOD_UKUPNO);
        return vrednovanje;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vrednovanje createUpdatedEntity(EntityManager em) {
        Vrednovanje vrednovanje = new Vrednovanje()
            .sifraPostupka(UPDATED_SIFRA_POSTUPKA)
            .sifraPonude(UPDATED_SIFRA_PONUDE)
            .brojPartije(UPDATED_BROJ_PARTIJE)
            .atc(UPDATED_ATC)
            .nazivProizvodjaca(UPDATED_NAZIV_PROIZVODJACA)
            .nazivPonudjaca(UPDATED_NAZIV_PONUDJACA)
            .zasticeniNaziv(UPDATED_ZASTICENI_NAZIV)
            .trazenaKolicina(UPDATED_TRAZENA_KOLICINA)
            .procijenjenaVrijednost(UPDATED_PROCIJENJENA_VRIJEDNOST)
            .ponudjenaVrijednost(UPDATED_PONUDJENA_VRIJEDNOST)
            .rokIsporuke(UPDATED_ROK_ISPORUKE)
            .bodCijena(UPDATED_BOD_CIJENA)
            .bodRok(UPDATED_BOD_ROK)
            .bodUkupno(UPDATED_BOD_UKUPNO);
        return vrednovanje;
    }

    @BeforeEach
    public void initTest() {
        vrednovanje = createEntity(em);
    }

    @Test
    @Transactional
    void getAllVrednovanjes() throws Exception {
        // Initialize the database
        vrednovanjeRepository.saveAndFlush(vrednovanje);

        // Get all the vrednovanjeList
        restVrednovanjeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vrednovanje.getId().intValue())))
            .andExpect(jsonPath("$.[*].sifraPostupka").value(hasItem(DEFAULT_SIFRA_POSTUPKA)))
            .andExpect(jsonPath("$.[*].sifraPonude").value(hasItem(DEFAULT_SIFRA_PONUDE)))
            .andExpect(jsonPath("$.[*].brojPartije").value(hasItem(DEFAULT_BROJ_PARTIJE)))
            .andExpect(jsonPath("$.[*].atc").value(hasItem(DEFAULT_ATC)))
            .andExpect(jsonPath("$.[*].nazivProizvodjaca").value(hasItem(DEFAULT_NAZIV_PROIZVODJACA)))
            .andExpect(jsonPath("$.[*].nazivPonudjaca").value(hasItem(DEFAULT_NAZIV_PONUDJACA)))
            .andExpect(jsonPath("$.[*].zasticeniNaziv").value(hasItem(DEFAULT_ZASTICENI_NAZIV)))
            .andExpect(jsonPath("$.[*].trazenaKolicina").value(hasItem(DEFAULT_TRAZENA_KOLICINA)))
            .andExpect(jsonPath("$.[*].procijenjenaVrijednost").value(hasItem(DEFAULT_PROCIJENJENA_VRIJEDNOST.doubleValue())))
            .andExpect(jsonPath("$.[*].ponudjenaVrijednost").value(hasItem(DEFAULT_PONUDJENA_VRIJEDNOST.doubleValue())))
            .andExpect(jsonPath("$.[*].rokIsporuke").value(hasItem(DEFAULT_ROK_ISPORUKE)))
            .andExpect(jsonPath("$.[*].bodCijena").value(hasItem(DEFAULT_BOD_CIJENA.doubleValue())))
            .andExpect(jsonPath("$.[*].bodRok").value(hasItem(DEFAULT_BOD_ROK.doubleValue())))
            .andExpect(jsonPath("$.[*].bodUkupno").value(hasItem(DEFAULT_BOD_UKUPNO.doubleValue())));
    }

    @Test
    @Transactional
    void getVrednovanje() throws Exception {
        // Initialize the database
        vrednovanjeRepository.saveAndFlush(vrednovanje);

        // Get the vrednovanje
        restVrednovanjeMockMvc
            .perform(get(ENTITY_API_URL_ID, vrednovanje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vrednovanje.getId().intValue()))
            .andExpect(jsonPath("$.sifraPostupka").value(DEFAULT_SIFRA_POSTUPKA))
            .andExpect(jsonPath("$.sifraPonude").value(DEFAULT_SIFRA_PONUDE))
            .andExpect(jsonPath("$.brojPartije").value(DEFAULT_BROJ_PARTIJE))
            .andExpect(jsonPath("$.atc").value(DEFAULT_ATC))
            .andExpect(jsonPath("$.nazivProizvodjaca").value(DEFAULT_NAZIV_PROIZVODJACA))
            .andExpect(jsonPath("$.nazivPonudjaca").value(DEFAULT_NAZIV_PONUDJACA))
            .andExpect(jsonPath("$.zasticeniNaziv").value(DEFAULT_ZASTICENI_NAZIV))
            .andExpect(jsonPath("$.trazenaKolicina").value(DEFAULT_TRAZENA_KOLICINA))
            .andExpect(jsonPath("$.procijenjenaVrijednost").value(DEFAULT_PROCIJENJENA_VRIJEDNOST.doubleValue()))
            .andExpect(jsonPath("$.ponudjenaVrijednost").value(DEFAULT_PONUDJENA_VRIJEDNOST.doubleValue()))
            .andExpect(jsonPath("$.rokIsporuke").value(DEFAULT_ROK_ISPORUKE))
            .andExpect(jsonPath("$.bodCijena").value(DEFAULT_BOD_CIJENA.doubleValue()))
            .andExpect(jsonPath("$.bodRok").value(DEFAULT_BOD_ROK.doubleValue()))
            .andExpect(jsonPath("$.bodUkupno").value(DEFAULT_BOD_UKUPNO.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingVrednovanje() throws Exception {
        // Get the vrednovanje
        restVrednovanjeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }
}
