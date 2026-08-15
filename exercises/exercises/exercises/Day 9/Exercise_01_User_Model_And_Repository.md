# Day 9 Exercise 1 - User Model and Repository

## Task

Create a `User` model and `UserRepository` so the Support Desk API can store registered users in MongoDB.

## Required files

```text
model/User.java
repository/UserRepository.java
```

## User fields

```text
id
name
email   (unique)
password (hashed, never stored in plain text)
role     (USER or ADMIN)
```

## Requirements

1. `User` is a MongoDB document mapped to the `users` collection.
2. `email` is indexed and unique.
3. `UserRepository` extends `MongoRepository<User, String>`.
4. Repository supports:
   - `findByEmailIgnoreCase(String email)`
   - `existsByEmailIgnoreCase(String email)`

## Submission

Submit `User.java` and `UserRepository.java`.
