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
        Vrednovanje vrednovanje = new Vrednovanje().sifraPostupka(DEFAULT_SIFRA_POSTUPKA);
        return vrednovanje;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Vrednovanje createUpdatedEntity(EntityManager em) {
        Vrednovanje vrednovanje = new Vrednovanje().sifraPostupka(UPDATED_SIFRA_POSTUPKA);
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
            .andExpect(jsonPath("$.[*].sifraPostupka").value(hasItem(DEFAULT_SIFRA_POSTUPKA)));
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
            .andExpect(jsonPath("$.sifraPostupka").value(DEFAULT_SIFRA_POSTUPKA));
    }

    @Test
    @Transactional
    void getNonExistingVrednovanje() throws Exception {
        // Get the vrednovanje
        restVrednovanjeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }
}
