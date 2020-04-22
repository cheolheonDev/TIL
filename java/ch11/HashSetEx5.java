import java.util.*;

class HashSetEx5 {
    public static void main(String[] args) {
        HashSet setA = new HashSet();
        HashSet setB = new HashSet();
        HashSet setHab = new HashSet();
        HashSet setKyo = new HashSet();
        HashSet setCha = new HashSet();

        String[] arrA = { "1", "2", "3", "4", "5" };
        for (Object temp : arrA)
            setA.add(temp);
        System.out.println(" A = " + setA);

        String[] arrB = { "4", "5", "6", "7", "8" };
        for (Object temp : arrB)
            setB.add(temp);
        System.out.println(" B = " + setB);

        Iterator it = setB.iterator();
        while (it.hasNext()) {
            Object tmp = it.next();
            if (setA.contains(tmp)) {
                setKyo.add(tmp);
            }
        }

        it = setA.iterator();
        while (it.hasNext()) {
            Object tmp = it.next();
            if (!setB.contains(tmp)) {
                setCha.add(tmp);
            }
        }

        it = setA.iterator();
        while (it.hasNext())
            setHab.add(it.next());

        it = setB.iterator();
        while (it.hasNext())
            setHab.add(it.next());

        System.out.println("A B 교집합 :" + setKyo);
        System.out.println("A B 합집합 :" + setHab);
        System.out.println("A B 차집합 :" + setCha);
    }
}