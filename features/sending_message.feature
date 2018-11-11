Feature: Sending a message

Scenario: When receiving a message, message is save in DB (content + generated image)
  Given there is no "message" in database
  When I send a "POST" request to "/messages" with body:
  """
  {
    "content": "Coucou"
  }
  """
  Then the response status code should be 201
  And the response should be in JSON
  And the response should have a field "id" of type "uuid"
  And the response should have a field "content" equal to "Coucou"
  And the response should have a field "imagePath" of type "string"
  And should be 1 message in database like:
      | content |
      | Coucou  |
  And should be 1 ticket generated with response id
