import React, { useEffect } from "react";

function InvoicePreview({ isOpen, onClose, tableData, invoiceDetails }) {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Calculate subtotal from tableData (assumes each item has a 'total' field)
    const subtotal = tableData.reduce(
        (sum, item) => sum + Number(item.total),
        0
    );
    const discount = invoiceDetails.discount || 0;
    const grandTotal = subtotal - discount;

    // To preserve the A4 aspect ratio (210:297),  calculate the width based on the height.
    // height is 90vh so width is: 90vh * (210/297)
    const widthStyle = `calc(90vh * (210 / 297))`;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={onClose}>
            <div
                className="bg-white rounded-lg overflow-auto flex flex-col"
                style={{ height: "90vh", width: widthStyle }}
                onClick={e => e.stopPropagation()}>
                {/* Main Content */}
                <div className="flex-1 ">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 pt-10">
                        <div>
                            <h2 className="text-4xl bg-cus-primary h-20 flex justify-center items-center text-white">
                                {invoiceDetails.title}
                            </h2>
                            <p>Date: {invoiceDetails.date}</p>
                            <p>Voucher Code: {invoiceDetails.voucherCode}</p>
                        </div>
                        <img
                            src={invoiceDetails.logo}
                            alt="Logo"
                            className="w-24 h-auto"
                        />
                    </div>
                    {/* Table */}
                    <table className="w-full border-collapse border-2 mb-4">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">No</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Qty</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.length > 0 ? (
                                tableData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border p-2">
                                            {index + 1}
                                        </td>
                                        <td className="border p-2">
                                            {item.name}
                                        </td>
                                        <td className="border p-2">
                                            {item.qty}
                                        </td>
                                        <td className="border p-2">
                                            {item.price}
                                        </td>
                                        <td className="border p-2">
                                            {item.total}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-2">
                                        No items added
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* Totals */}
                    <div className="mb-4 text-right font-semibold px-4">
                        <p className="text-gray-500 flex truncate justify-end">
                            Subtotal:{" "}
                            <div className="text-cus-primary">
                                {subtotal} MMK
                            </div>
                        </p>
                        <p className="text-gray-500 flex truncate justify-end">
                            Discount:{" "}
                            <div className="text-cus-primary">
                                {discount} MMK
                            </div>
                        </p>
                        <p className="text-gray-500 flex truncate justify-end">
                            Grand Total:{" "}
                            <div className="text-cus-primary">
                                {grandTotal} MMK
                            </div>
                        </p>
                    </div>
                </div>
                {/* Footer */}
                <div className="bg-cus-primary text-white text-center py-3 rounded-b-lg">
                    <p>
                        {invoiceDetails.shopInfo.phone} |{" "}
                        {invoiceDetails.shopInfo.email} |{" "}
                        {invoiceDetails.shopInfo.address}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InvoicePreview;
