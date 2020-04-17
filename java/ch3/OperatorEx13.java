class OperatorEx13 {
    public static void main(String[] args) {
        char c1 = 'a';
        // char c2 = c1 + 1; // compile error
        char c2 = 'a' + 1; // 리터럴 간 연산에는 타입캐스팅이 발생하지 않다.
    }
}