const express = require("express");
const router = express.Router();
const db = require("../../config/db");

// GET: /api/user/order/by-code/:order_code
router.get("/:order_code", async (req, res) => {
  const { order_code } = req.params;

  try {
    const [orders] = await db
      .promise()
      .query(`SELECT * FROM orders WHERE order_code = ?`, [order_code]);

    if (!orders.length) {
      return res.status(404).json({ message: "ไม่พบคำสั่งซื้อนี้" });
    }

    const orderId = orders[0].order_id;

    const [items] = await db.promise().query(
      `SELECT oi.*, m.menu_name 
   FROM order_items oi
   JOIN menu m ON oi.menu_id = m.menu_id
   WHERE oi.order_id = ?`,
      [orderId]
    );

    res.json({ order: orders[0], items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "ดึงข้อมูลล้มเหลว" });
  }
});

// PUT: /api/user/order/cancel-order/:order_code
router.put("/cancel-order/:order_code", async (req, res) => {
  const { order_code } = req.params;
  const { status } = req.body;

  try {
    const [result] = await db
      .promise()
      .query(`UPDATE orders SET status = ? WHERE order_code = ?`, [
        status,
        order_code,
      ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "ไม่พบคำสั่งซื้อนี้" });
    }

    res.json({ message: "ยกเลิกคำสั่งซื้อเรียบร้อยแล้ว" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "ไม่สามารถยกเลิกคำสั่งซื้อได้" });
  }
});


module.exports = router;
