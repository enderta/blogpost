Feature: Blogging System Administration

  Background:
    Given I am on the main page I see the "Welcome to my Blog" text
    And I click the "Home" link
    Then I should see the Admin Login button
    When I click the Admin Login button
    When I enter my "username" and "password"
    And I click the Login button

  @crud @ui
  Scenario Outline: User Login and Create Post
    When The "Add" button is clicked
    When The user enters a valid "<title>" "<content>" "<author>" for the post
    And The "Submit" button is clicked
    Then The post with "author" is visible on the Blog Homepage

    Examples:
      | title   | content     | author   |
      | my title| my content  | my author|

  @crud @ui
  Scenario: User Edit a Post
    When The "Edit" button is clicked
    When The user enters new "author2" for the post
    And The "Submit" button is clicked
    Then The post with "author2" is visible on the Blog Homepage

  @crud @ui
  Scenario: User Delete a Post
    When The "Delete" button is clicked


