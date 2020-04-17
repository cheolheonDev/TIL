class OperatorEx7 {
    public static void main(String[] args) {
        byte a = 10;
        byte b = 30;
        byte d = -1;
        byte c = (byte) (a * b);// byte!!!!
        int e = d;
        System.out.println(c);
        System.out.println(e);
    }
}