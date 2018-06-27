package tim.wat.darts.objects;

import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

public class PlayerObject {
    private Long id;
    private String name;
    private String surname;
    private String login;
    private String avatarPath;

    public PlayerObject(Long id, String name, String surname, String login, String avatarPath) {
        this.id=id;
        this.name = name;
        this.surname = surname;
        this.login = login;
        this.avatarPath = avatarPath;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getAvatarPath() {
        return avatarPath;
    }

    public void setAvatarPath(String avatarPath) {
        this.avatarPath = avatarPath;
    }

}
