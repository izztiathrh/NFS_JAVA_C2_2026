package src.main.java.com.fullstack.demo;
public class Demo {
    public static void main(String[] args) {
        System.out.println("Hello, World!");

        // Primitives data types in Java

        int number = 10; //32 bit signed integer
        double pi = 3.14159; //64 bit floating-point number
        boolean isTrue = true; //stores true or false
        char character = 'A'; //16 bit Unicode character. Stores a single character.
        byte smallNumber = 127; //8 bit signed integer. Larger than this use integer.
        short mediumNumber = 32767; //16 bit signed integer -32768 to 32767. Larger than this use integer.
        long largeNumber = 123456789L; //64 bit signed integer. Use L at the end to indicate long literal.
        float floatNumber = 3.14f; //32 bit floating-point number. Use f at the end to indicate float literal.


        // Reference data types in Java

        String text = "Hello, Java!"; //String is a class in Java. It is a sequence of characters.
        Object obj = new Object(); //Object is the root class of all classes in Java. It can store any type of data.
        int[] numbers = {1, 2, 3, 4, 5}; //Array is a reference data type that can store multiple values of the same type.
        double[] decimalNumbers = {1.1, 2.2, 3.3}; //Array of double values.
        String[] words = {"Hello", "World", "Java"}; //Array of String values.
        String[] emptyArray = new String[5]; //Array of String with 5 elements. All elements are initialized to null.
        // any other class you create will also be a reference data type. For example:
        // MyClass[] myObjects = new MyClass[5];
    }
}