Feature: Sending a message

Scenario: When receiving a message, message is save in DB
  Given there is no "message" in database
  When I send a "POST" request to "/messages" with body:
  """
  {
    "content": "Coucou"
  }
  """
  Then the response status code should be 201
  And should be 1 message in database like:
      | content |
      | Coucou  |
