import java.util.*;

class HashMapEx4 {
    public static void main(String[] args) {
        String[] data = { "A", "K", "A", "K", "D", "K", "A", "A", "A", "K", "K", "K", "A", "Z", "D", "A" };

        HashMap map = new HashMap();

        for (int i = 0; i < data.length; i++) {
            if (map.containsKey(data[i])) {
                Integer value = (Integer) map.get(data[i]);
                map.put(data[i], Integer.valueOf(value.intValue() + 1));
            } else {
                map.put(data[i], Integer.valueOf(1));
            }
        }
        Iterator it = map.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry entry = (Map.Entry) it.next();
            int value = ((Integer) entry.getValue()).intValue();
            System.out.println(entry.getKey() + " : " + printBar('#', value) + " " + value);
        }
    }

    public static String printBar(char ch, int value) {
        char[] bar = new char[value];
        for (int i = 0; i < bar.length; i++) {
            bar[i] = ch;
        }
        return new String(bar);
    }
}