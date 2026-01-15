package pl.bj.bank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.bj.bank.model.Pracownik;
import pl.bj.bank.repository.PracownikRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PracownikUserDetailsService implements UserDetailsService {

    private final PracownikRepository repo;

    @Override
    public UserDetails loadUserByUsername(String login) {
        Pracownik p = repo.findFirstByLogin(login)
            .orElseThrow(() -> new UsernameNotFoundException("Nie znaleziono pracownika"));

        return User.builder()
            .username(p.getLogin())
            .password(p.getHasloHash())
            .roles("EMPLOYEE")
            .build();
    }
}
