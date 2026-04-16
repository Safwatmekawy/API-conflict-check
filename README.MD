# Conflict Check API

Simple mock API for conflict detection.

## Endpoint

GET /api/check-conflict?name=<client_name>

## Example

### Request
/api/check-conflict?name=client2

### Response
{
  "success": true,
  "data": {
    "input": "client2",
    "known_match": true,
    "matched_entity": "Client2",
    "match_source": "internal_registry"
  },
  "message": "Potential conflict found"
}