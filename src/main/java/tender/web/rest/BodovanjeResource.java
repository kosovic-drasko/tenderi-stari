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
import tender.domain.Bodovanje;
import tender.repository.BodovanjeRepository;
import tender.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link tender.domain.Bodovanje}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class BodovanjeResource {

    private final Logger log = LoggerFactory.getLogger(BodovanjeResource.class);

    private final BodovanjeRepository bodovanjeRepository;

    public BodovanjeResource(BodovanjeRepository bodovanjeRepository) {
        this.bodovanjeRepository = bodovanjeRepository;
    }

    /**
     * {@code GET  /bodovanjes} : get all the bodovanjes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bodovanjes in body.
     */
    @GetMapping("/bodovanjes")
    public List<Bodovanje> getAllBodovanjes() {
        log.debug("REST request to get all Bodovanjes");
        return bodovanjeRepository.findAll();
    }

    /**
     * {@code GET  /bodovanjes/:id} : get the "id" bodovanje.
     *
     * @param id the id of the bodovanje to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bodovanje, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/bodovanjes/{id}")
    public ResponseEntity<Bodovanje> getBodovanje(@PathVariable Long id) {
        log.debug("REST request to get Bodovanje : {}", id);
        Optional<Bodovanje> bodovanje = bodovanjeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(bodovanje);
    }
}
