// src/pages/seller/Messages.jsx
// Same behavior as buyer messages but used in seller area (path ../services/api)

import React from "react";
import BuyerMessages from "../../pages/buyer/Messages"; // reuse component if present

export default function SellerMessagesWrapper() {
  // Re-use BuyerMessages component logic; it handles orderId via query string.
  // This wrapper keeps pathing consistent in routes.
  return <BuyerMessages />;
}
