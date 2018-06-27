package tim.wat.darts.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tim.wat.darts.source.Contest;

import java.util.List;


@Repository
public interface ContestRepository extends CrudRepository<Contest, Long> {
    Contest findByContestNameAndContestPass(String contestName,String contestPass);

}
