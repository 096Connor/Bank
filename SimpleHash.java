import java.security.SecureRandom;
import java.util.Base64;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

public class SimpleHash {
    public static void main(String[] args) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id, 16, 32);
        char[] password = "0000".toCharArray();
        String hash = argon2.hash(3, 65536, 1, password);
        System.out.println(hash);
        argon2.wipeArray(password);
    }
}
