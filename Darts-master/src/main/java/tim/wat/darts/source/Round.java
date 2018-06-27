package tim.wat.darts.source;

import javax.persistence.*;

@Entity
public class Round {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int amount;
    private int fullAmount;
    private String photoPath;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="contest_id")
    private Contest contest;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="player_id")
    private Player player;
    public Round(int amount, String photoPath) {
        this.amount = amount;
        this.photoPath = photoPath;
    }

    public Long getId() {
        return id;
    }

    public Contest getContest() {
        return contest;
    }

    public void setContest(Contest contest) {
        this.contest = contest;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getFullAmount() {
        return fullAmount;
    }

    public void setFullAmount(int fullAmount) {
        this.fullAmount = fullAmount;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    protected Round(){

    }
}
