class OperatorEx16 {
    public static void main(String[] args) {
        float pi = 3.141492f;
        float shortPi = (int) (pi * 1000) / 1000f; // 버림
        // float shortPi = (int) (pi * 1000 + 0.5) / 1000f; // 반올림1
        // double shortPi = Math.random(pi*1000) / 1000.0; // 반올림2

        System.out.println(shortPi);
    }
}