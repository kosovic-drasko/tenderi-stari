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
import tender.domain.Prvorangirani;
import tender.repository.PrvorangiraniRepository;
import tender.service.PrvorangiraniQueryService;
import tender.service.PrvorangiraniService;
import tender.service.criteria.PrvorangiraniCriteria;
import tender.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link Prvorangirani}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrvorangiraniResource {

    private final Logger log = LoggerFactory.getLogger(PrvorangiraniResource.class);

    private static final String ENTITY_NAME = "prvorangirani";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrvorangiraniService prvorangiraniService;

    private final PrvorangiraniRepository prvorangiraniRepository;

    private final PrvorangiraniQueryService prvorangiraniQueryService;

    public PrvorangiraniResource(
        PrvorangiraniService prvorangiraniService,
        PrvorangiraniRepository prvorangiraniRepository,
        PrvorangiraniQueryService prvorangiraniQueryService
    ) {
        this.prvorangiraniService = prvorangiraniService;
        this.prvorangiraniRepository = prvorangiraniRepository;
        this.prvorangiraniQueryService = prvorangiraniQueryService;
    }

    @GetMapping("/prvorangiranis")
    public ResponseEntity<List<Prvorangirani>> getAllPrvorangiranis(PrvorangiraniCriteria criteria) {
        log.debug("REST request to get Prvorangiranis by criteria: {}", criteria);
        List<Prvorangirani> entityList = prvorangiraniQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }
}
