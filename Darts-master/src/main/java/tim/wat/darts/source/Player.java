package tim.wat.darts.source;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String surname;
    @Column(unique = true)
    private String login;
    private String password;
    private String avatarPath;
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "players_role", uniqueConstraints = @UniqueConstraint(columnNames = {"player_id", "role"}))
    @Column(name = "role")
    private List<PlayerRole> roles;

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }

    private boolean isDeleted;
    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "players")
    private Set<Contest> contests = new HashSet<>();

    protected Player() {

    }

    public Player(String name, String surname, String login, String password, String avatarPath) {
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.password = password;
        this.avatarPath = avatarPath;

    }

    public List<PlayerRole> getRoles() {
        return roles;
    }

    public void setRoles(List<PlayerRole> roles) {
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public String getAvatarPath() {
        return avatarPath;
    }

    public void setAvatarPath(String avatarPath) {
        this.avatarPath = avatarPath;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public enum PlayerRole implements GrantedAuthority{
        ROLE_USER,
        ROLE_ADMIN;
        @Override
        public String getAuthority() {
            return name();
        }
    }

}
