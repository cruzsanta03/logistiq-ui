"use client";
import React from "react";

export default function QuoteHtmlPreview({ form, totals, generateQuoteHtml }) {
  const {
    company,
    destination,
    requestor,
    linehaul,
    fuel,
    specialInstructions,
  } = form;

  const {
    accessorialTotal,
    baseRate,
    manualAdjustment,
    discount,
    totalRate,
    validThrough
  } = totals;

  return (
    <div className="p-4 border rounded bg-white shadow mt-4 text-sm text-gray-800">
      <h2 className="text-xl font-bold mb-2">Quote Preview</h2>
      <p><strong>Company:</strong> {company}</p>
      <p><strong>Destination:</strong> {destination}</p>
      <p><strong>Requestor:</strong> {requestor}</p>
      <p><strong>Linehaul:</strong> ${linehaul}</p>
      <p><strong>Fuel:</strong> ${fuel}</p>
      <p><strong>Accessorial Charges:</strong> ${accessorialTotal}</p>
      <p><strong>Manual Adjustment:</strong> ${manualAdjustment}</p>
      <p><strong>Discount:</strong> ${discount}</p>
      <p><strong>Total Rate:</strong> <span className="font-bold text-green-700">${totalRate}</span></p>
      <p><strong>Valid Through:</strong> {validThrough}</p>
      {specialInstructions && (
        <p><strong>Special Instructions:</strong> {specialInstructions}</p>
      )}
    </div>
  );
}
