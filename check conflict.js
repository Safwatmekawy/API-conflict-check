export default function handler(req, res) {
  const name = (req.query.name || "").toLowerCase();

  // Mock dataset (you can expand this)
  const registry = {
    "client2": { matched_entity: "Client2", source: "internal_registry" },
    "abc corp": { matched_entity: "ABC Corp", source: "internal_registry" }
  };

  if (!name) {
    return res.status(400).json({
      success: false,
      error: "Missing required parameter: name"
    });
  }

  const match = registry[name];

  if (match) {
    return res.status(200).json({
      success: true,
      data: {
        input: name,
        known_match: true,
        matched_entity: match.matched_entity,
        match_source: match.source
      },
      message: "Potential conflict found"
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      input: name,
      known_match: false,
      matched_entity: null,
      match_source: null
    },
    message: "No conflict detected"
  });
}