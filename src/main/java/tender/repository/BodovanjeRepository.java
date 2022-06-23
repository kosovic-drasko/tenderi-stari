package tender.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import tender.domain.Bodovanje;

/**
 * Spring Data SQL repository for the Bodovanje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BodovanjeRepository extends JpaRepository<Bodovanje, Long> {}
