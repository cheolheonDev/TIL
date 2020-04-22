import java.util.*;

class HashSetEx4 {
    public static void main(String[] args) {
        HashSet set = new HashSet();

        set.add(new String("abc"));
        set.add(new String("abc"));
        set.add(new Person2("David", 10));
        set.add(new Person2("David", 10));

        System.out.println(set);
    }
}

class Person2 {
    String name;
    int age;

    Person2(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public boolean equals(Object obj) {
        if (obj instanceof Person2) {
            Person2 tmp = (Person2) obj;
            return name.equals(tmp.name) && age == tmp.age;
        }
        return false;
    }

    public int hashCode() {
        return (name + age).hashCode();
    }
    // 두 객체에 대해서 equals가 true이면, 두 객체의 해시코드는 반드시 같아야 하지만
    // 두 객체의 해시코드가 같다고 해서 equals메서드가 반드시 같아야 하는 것은 아니다.

    public String toString() {
        return name + ":" + age;
    }
}