package tender.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import tender.domain.Postupci;

/**
 * Spring Data SQL repository for the Postupci entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostupciRepository extends JpaRepository<Postupci, Long>, JpaSpecificationExecutor<Postupci> {}
