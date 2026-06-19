package src.main.java.com.fullstack.demo;

public class Main {
    public static void main(String[] args) {
        //Syntax for creating objects of Course, Instructor, and Student classes
        //ClassName objectName = new Constructor();
        //ClassName and Constructor usually match

        Instructor instructor1 = new Instructor("I001", "Alice Smith", "Computer Science");
        Instructor instructor2 = new Instructor("I002", "Bob Johnson", "Data Science");
        
        Course course1 = new Course("C001", "Java Programming", 40, "Beginner", "Programming", true);
        Course course2 = new Course("C002", "Data Science with Python", 60, "Intermediate", "Database", false);
        
        Student student1 = new Student("S001", "Charlie Brown", "charlie.brown@example.com");
        Student student2 = new Student("S002", "Diana Prince", "diana.prince@example.com");

        course1.setInstructor(instructor1);
        course2.setInstructor(instructor2);

        System.out.println("Instructor Profiles:");
        instructor1.printProfile();
        instructor2.printProfile();

        System.out.println("\nCourse Summaries:");
        course1.printSummary();
        course2.printSummary();

        System.out.println("Student Profiles:");
        student1.printProfile();
        student2.printProfile();
        
        

        CourseOffering offering = new CourseOffering("O001", "Java Programming - Spring 2024", course1, instructor1,
                "2024-03-01", "2024-06-01", 30, "In-person");
        CourseOffering offering2 = new CourseOffering("O002", "Data Science with Python - Summer 2024", course2, instructor2,
                "2024-06-15", "2024-09-15", 25, "Online");

        System.out.println("\nCourse Offering Summaries:");
        offering.printOfferingSummary();
        offering2.printOfferingSummary();
    }
}
