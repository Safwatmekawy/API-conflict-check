export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { skus } = req.query;

  if (!skus) {
    return res.status(400).json({ error: 'Missing skus parameter' });
  }

  const skuList = skus.split(',').map(s => s.trim().toUpperCase());

  // --- MOCK DATA SOURCE ---
  const mockInventory = [
    { sku: 'SKU1', currentStock: 10, warehouseLocation: 'WH-A' },
    { sku: 'SKU1', currentStock: 5, warehouseLocation: 'WH-B' },
    { sku: 'SKU1', currentStock: 3 }, // no location
    { sku: 'SKU2', currentStock: 20, warehouseLocation: 'WH-A' },
    { sku: 'SKU3', currentStock: 0 },
    { sku: 'SKU3', currentStock: 7, warehouseLocation: 'WH-C' },
  ];

  const result = skuList.map(sku => {
    const records = mockInventory.filter(item => item.sku === sku);

    if (records.length === 0) {
      return {
        sku,
        currentStock: 0,
        warehouseBreakdown: []
      };
    }

    // Total stock
    const totalStock = records.reduce(
      (sum, item) => sum + (item.currentStock || 0),
      0
    );

    // Group by warehouse
    const warehouseMap = {};

    records.forEach(item => {
      const location = item.warehouseLocation || 'UNKNOWN';

      if (!warehouseMap[location]) {
        warehouseMap[location] = 0;
      }

      warehouseMap[location] += item.currentStock || 0;
    });

    // Convert to array format
    const warehouseBreakdown = Object.keys(warehouseMap).map(location => ({
      warehouseLocation: location,
      stock: warehouseMap[location]
    }));

    return {
      sku,
      currentStock: totalStock,
      warehouseBreakdown
    };
  });

  return res.status(200).json({
    success: true,
    count: result.length,
    result
  });
}