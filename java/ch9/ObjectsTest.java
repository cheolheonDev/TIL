import java.util.*;
import static java.util.Objects.*;

class ObjectTest {
    public static void main(String[] args) {
        String[][] str2D = new String[][] { { "aaa", "bbb" }, { "AAA", "BBB" } };
        String[][] str2D_2 = new String[][] { { "aaa", "bbb" }, { "AAA", "BBB" } };

        System.out.print("str2D = {");
        for (String[] tmp : str2D)
            System.out.print(Arrays.toString(tmp));
        System.out.print("}");

        System.out.print("str2D_2 = {");
        for (String[] tmp : str2D_2)
            System.out.print(Arrays.toString(tmp));
        System.out.print("}");

        System.out.println("equals(str2D, str2D_2) = " + Objects.equals(str2D, str2D_2));
        System.out.println("deepEquals(str2D, str2D_2) = " + Objects.deepEquals(str2D, str2D_2));

        System.out.println("isNull(null) = " + isNull(null));
        System.out.println("nonNull(null) = " + nonNull(null));

        System.out.println("hashCode(null) = " + Objects.hashCode(null));
        // null체크를 해주는 정도.. null이면 0
        System.out.println("toStrint(null) = " + Objects.toString(null));
        System.out.println("toStrint(null,\"\") = " + Objects.toString(null));

        Comparator c = String.CASE_INSENSITIVE_ORDER;
        System.out.println("comapre(\"aa\", \"bb\") = " + compare("aa", "bb", c));
        System.out.println("comapre(\"aa\", \"bb\") = " + compare("bb", "aa", c));
        System.out.println("comapre(\"aa\", \"bb\") = " + compare("ab", "aB", c));

    }
}