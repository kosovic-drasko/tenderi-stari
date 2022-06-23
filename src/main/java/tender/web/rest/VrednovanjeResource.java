package tender.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import tender.domain.Vrednovanje;
import tender.repository.VrednovanjeRepository;
import tender.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link tender.domain.Vrednovanje}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VrednovanjeResource {

    private final Logger log = LoggerFactory.getLogger(VrednovanjeResource.class);

    private final VrednovanjeRepository vrednovanjeRepository;

    public VrednovanjeResource(VrednovanjeRepository vrednovanjeRepository) {
        this.vrednovanjeRepository = vrednovanjeRepository;
    }

    /**
     * {@code GET  /vrednovanjes} : get all the vrednovanjes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vrednovanjes in body.
     */
    @GetMapping("/vrednovanjes")
    public List<Vrednovanje> getAllVrednovanjes() {
        log.debug("REST request to get all Vrednovanjes");
        return vrednovanjeRepository.findAll();
    }

    /**
     * {@code GET  /vrednovanjes/:id} : get the "id" vrednovanje.
     *
     * @param id the id of the vrednovanje to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vrednovanje, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/vrednovanjes/{id}")
    public ResponseEntity<Vrednovanje> getVrednovanje(@PathVariable Long id) {
        log.debug("REST request to get Vrednovanje : {}", id);
        Optional<Vrednovanje> vrednovanje = vrednovanjeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(vrednovanje);
    }
}
