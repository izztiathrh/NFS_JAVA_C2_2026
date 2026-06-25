# Day 1 Exercise 01 - Read and Explain the Demo Code

## Learning Goal

By the end of this exercise, you should be able to explain a basic Java class, object, constructor, field, method, and object relationship.

## Files to Open

Open the Day 1 demo project and review these files:

```text
Course.java
Instructor.java
Student.java
Main.java
```

## Tasks

Answer the following questions in your notebook or README.md file:

1. What is the purpose of `Course.java`?
> Each Course object stores details about one course (ID, title, duration in hours, level, and an instructor) and has methods to read those details and print a summary.

2. What is the purpose of `Instructor.java`?
> Defines an instructor. Each Instructor object stores an ID, name, and area of expertise, with methods to read them. A course can be linked to one instructor.

3. What is the purpose of `Student.java`?

4. What does the constructor do?
> Sets up a new object when you create one. It takes the values you pass in and saves them into the object's fields.

5. Why are the fields marked as `private`?
> So they can only be accessed from inside their own class. Other code must use getter/setter methods instead of touching the fields directly. This protects the data and lets the class control how values are read or changed (encapsulation).

6. What does `course1.assignInstructor(instructor1);` mean?
> Links an instructor to a course, storing instructor1 inside course1 so the course knows who teaches it.

7. What does `student1.printProfile();` do?
> Would print a student's profile details to the screen. 

## AI-Assisted Task

Use ChatGPT, Gemini, Claude, or Windsurf and ask:

```text
Explain this Java class to someone who already knows TypeScript or C#.
```

Then write down:

1. One explanation from AI that helped you.
> The mapping to languages I already know made it click. A Java class with private fields plus public getters is just like a C# class with properties or a TypeScript class with private members and accessor methods. The constructor pattern this.field = field is the same as in C#/TS, and a Course holding an Instructor reference is a "has-a" relationship — identical to a TS class with a field of another class type (private instructor: Instructor). Seeing those direct parallels made the Java syntax feel familiar instead of new.

2. One part you still needed the trainer or your own reading to understand.
> The AI only give syntax level comparison but not in term of encapsulation, validation or controlling object state.

## Submission Evidence

Add your answers to README.md under:

```text
## Day 1 Exercise 01 - Code Explanation
```