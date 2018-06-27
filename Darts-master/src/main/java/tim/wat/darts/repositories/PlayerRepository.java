package tim.wat.darts.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tim.wat.darts.source.Player;


@Repository
public interface PlayerRepository extends CrudRepository<Player, Long> {
    Player findByLogin(String login);
}
