package tender.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpHeaders;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.ehcache.shadow.org.terracotta.offheapstore.paging.Page;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;
import tender.domain.Vrednovanje;
import tender.repository.VrednovanjeRepository;
import tender.service.VrednovanjeQueryService;
import tender.service.VrednovanjeService;
import tender.service.criteria.VrednovanjeCriteria;

/**
 * REST controller for managing {@link tender.domain.Vrednovanje}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VrednovanjeResource {

    private final Logger log = LoggerFactory.getLogger(VrednovanjeResource.class);

    private final VrednovanjeQueryService VrednovanjeQueryService;

    private VrednovanjeService vrednovanjeService;

    private VrednovanjeRepository viewVrednovanjeRepository;

    public VrednovanjeResource(
        VrednovanjeService vrednovanjeService,
        VrednovanjeRepository vrednovanjeRepository,
        VrednovanjeQueryService vrednovanjeQueryService
    ) {
        this.vrednovanjeService = vrednovanjeService;
        this.VrednovanjeQueryService = vrednovanjeQueryService;
    }

    @GetMapping("/vrednovanjes")
    public ResponseEntity<List<Vrednovanje>> getAllVrednovanjes(VrednovanjeCriteria criteria) {
        log.debug("REST request to get Vrednovanjes by criteria: {}", criteria);
        List<Vrednovanje> entityList = VrednovanjeQueryService.findByCriteria(criteria);
        return ResponseEntity.ok().body(entityList);
    }
}
