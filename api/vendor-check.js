export default function handler(req, res) {
  const rawName = req.query.vendor_name;

  // ❌ Validation
  if (!rawName) {
    return res.status(400).json({
      success: false,
      error: "Missing required parameter: vendor_name"
    });
  }

  // ✅ Normalization function
  const normalize = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/gi, "")   // remove special chars
      .replace(/\s+/g, " ");      // normalize spaces
  };

  const normalized_name = normalize(rawName);

  // 🧠 Mock vendor registry
  const vendorRegistry = [
    "Safwat",
    "microsoft",
    "google",
    "oracle",
    "sap"
  ];

  const vendor_exist = vendorRegistry.includes(normalized_name);

  // ✅ Response
  return res.status(200).json({
    success: true,
    data: {
      input: rawName,
      normalized_name,
      vendor_exist
    },
    message: vendor_exist
      ? "Vendor exists in registry"
      : "Vendor not found"
  });
}