package tim.wat.darts.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tim.wat.darts.repositories.PlayerRepository;
import tim.wat.darts.source.Player;

import java.util.Collection;
import java.util.Collections;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    PlayerRepository playerRepository;
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        Player player = playerRepository.findByLogin(s);

        return new UserDetails() {
            @Override
            public Collection<? extends GrantedAuthority> getAuthorities() {
                return player.getRoles();
            }

            @Override
            public String getPassword() {
                return player.getPassword();
            }

            @Override
            public String getUsername() {
                return player.getLogin();
            }

            @Override
            public boolean isAccountNonExpired() {
                return true;
            }

            @Override
            public boolean isAccountNonLocked() {
                return true;
            }

            @Override
            public boolean isCredentialsNonExpired() {
                return true;
            }

            @Override
            public boolean isEnabled() {
                return !player.isDeleted();
            }
        };
    }
}
