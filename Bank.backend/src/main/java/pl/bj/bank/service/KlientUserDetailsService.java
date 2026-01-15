package pl.bj.bank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.bj.bank.model.Klient;
import pl.bj.bank.repository.KlientRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KlientUserDetailsService implements UserDetailsService {

    private final KlientRepository klientRepository;

    @Override
    public UserDetails loadUserByUsername(String pesel) {
        Klient k = klientRepository.findByPesel(pesel)
            .orElseThrow(() -> new UsernameNotFoundException("Nie znaleziono klienta"));

        return User.builder()
            .username(k.getPesel())
            .password(k.getPinHash()) // ✅ HASH
            .roles("CLIENT")
            .build();
    }
}
