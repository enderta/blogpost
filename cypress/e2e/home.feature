Feature: Home Page and Main to UI

  @login @ui
  Scenario:Main page
    Given I am on the main page I see the "Welcome to my Blog" text
    When I see the "Home" link
    Then I click the "Home" link
    Then I should see the posts in
