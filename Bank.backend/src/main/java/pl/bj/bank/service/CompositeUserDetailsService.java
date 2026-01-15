package pl.bj.bank.service;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Primary
@RequiredArgsConstructor
public class CompositeUserDetailsService implements UserDetailsService {

    private final KlientUserDetailsService klientUserDetailsService;
    private final PracownikUserDetailsService pracownikUserDetailsService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            // Try klient first
            return klientUserDetailsService.loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            // If not found, try pracownik
            return pracownikUserDetailsService.loadUserByUsername(username);
        }
    }
}
