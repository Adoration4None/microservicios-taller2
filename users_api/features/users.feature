Feature: Users API

  Background:
    Given the API is up and running

  Scenario: Get API welcome message
    When a GET request is made to "/api/v1/"
    Then the response status code should be 200
    And the response body should contain "Welcome to the Users Authentication API"

  Scenario: Get a list of all users
    When a GET request is made to "/api/v1/users/"
    Then the response status code should be 200
    And the response body should contain a list of users

  Scenario: Get user by ID
    Given a valid user ID
    When a GET request is made to "/api/v1/users/"
    Then the response status code should be 200
    And the response body should contain user details

  Scenario: Register a new user
    Given a valid user object
    When a POST request is made to "/api/v1/users/"
    Then the response status code should be 201
    And the response body should contain "User successfully registered"

  Scenario: Update user
    Given a valid user ID
    And a valid user object
    When a PUT request is made to "/api/v1/users/"
    Then the response status code should be 200
    And the response body should contain "User updated successfully"

  Scenario: User login
    Given an existing email
    And a valid password
    When a POST request is made to "/api/v1/users/login"
    Then the response status code should be 200
    And the response body should contain an authentication token

  Scenario: Update user's password
    Given an existing email 
    And a new password
    When a PATCH request is made to "/api/v1/users/update-password"
    Then the response status code should be 200
    And the response body should contain "Password updated successfully"

  Scenario: Generates an authentication token for user to request a password update
    Given an existing email
    When a POST request is made to "/api/v1/users/forgot-password"
    Then the response status code should be 200
    And the response body should contain an authentication token

  Scenario: Delete user
    Given a valid user ID
    When a DELETE request is made to "/api/v1/users/"
    Then the response status code should be 200
    And the response body should contain "User deleted successfully"

  
