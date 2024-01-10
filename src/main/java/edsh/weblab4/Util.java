package edsh.weblab4;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class Util {
    public static String encodeString(String str) {
        try {
            var digest = MessageDigest.getInstance("SHA-256");
            byte[] bytes = digest.digest(str.getBytes(StandardCharsets.UTF_8));

            return String.format("%032X", new BigInteger(1, bytes));

        } catch (Exception ignored) {}
        return null;
    }

    public static boolean stringHashEquals(String str, String hash) {
        return hash.equals(encodeString(str));
    }

}
