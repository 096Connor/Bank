import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class CheckHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println("BCrypt hash for 'examplehash1': " + encoder.encode("examplehash1"));
        System.out.println("BCrypt hash for 'examplehash2': " + encoder.encode("examplehash2"));
        System.out.println("BCrypt hash for 'examplehash3': " + encoder.encode("examplehash3"));
        System.out.println("BCrypt hash for '1234': " + encoder.encode("1234"));
    }
}
