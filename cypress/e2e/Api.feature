Feature: API tests for Graphql Blog, User and Authentication services

  @api @apicrud
  Scenario: Verify updating a blog post
    Given I am an authenticated user
    When I perform a POST request to "/blogposts" with valid payload
    Then I expect the status code to be 200
    And I verify the response contains the id, title, content and author
    When I perform a POST request to "/blogposts/1" with valid payload for update
    Then I expect the status code to be 200
    And I verify the response contains the new author
    When I perform a DELETE request to "/blogposts/1"
    Then I expect the status code to be 200
