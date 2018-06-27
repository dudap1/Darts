package tim.wat.darts.source;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Contest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String contestName;
    private String contestPass;
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "contest_player",
            joinColumns = { @JoinColumn(name = "contest_id") },
            inverseJoinColumns = { @JoinColumn(name = "player_id") })
    private Set< Player> players = new HashSet<>();

    public Player getWinner() {
        return winner;
    }

    public void setWinner(Player winner) {
        this.winner = winner;
    }

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="winner_id")
    private Player winner;

    public Contest(String contestName, String contestPass) {

        this.contestName = contestName;
        this.contestPass = contestPass;
    }

    protected Contest() {

    }


    public Long getId() {
        return id;
    }

    public Set<Player> getPlayers() {
        return players;
    }

    public void setPlayers(Set<Player> players) {
        this.players = players;
    }

    public String getContestName() {
        return contestName;
    }

    public void setContestName(String contestName) {
        this.contestName = contestName;
    }

    public String getContestPass() {
        return contestPass;
    }

    public void setContestPass(String contestPass) {
        this.contestPass = contestPass;
    }


}
