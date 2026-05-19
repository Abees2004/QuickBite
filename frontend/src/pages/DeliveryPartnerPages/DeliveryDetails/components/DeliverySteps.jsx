import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../../../api/axiosapi";

const DeliverySteps = ({ order, onStatusChange }) => {

  // Backend status → UI step
  const getStepFromStatus = (status) => {
    switch (status) {
      case "PICKED":
        return 2;

      case "DELIVERED":
        return 3;

      default:
        return 1;
    }
  };

  const [step, setStep] = useState(() =>
    getStepFromStatus(order?.status)
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStep(getStepFromStatus(order?.status));
  }, [order?.status]);

  // Common API error handler
  const handleApiError = (err, fallbackMessage) => {
    console.error(err);

    if (err.response) {
      // Backend responded with error
      const data = err.response.data;

      const message =
        data?.message ||
        data?.detail ||
        data?.error ||
        data?.status ||
        fallbackMessage;

      toast.error(message);
    } else if (err.request) {
      // Request sent but no response
      toast.error("Server not responding. Please try again.");
    } else {
      // Something else
      toast.error(fallbackMessage);
    }
  };

  const updateOrderStatus = async (status, successMessage) => {
    if (loading) return;

    try {
      setLoading(true);

      await axiosInstance.patch(
        `/api/delivery/update-status/${order.id}/`,
        { status }
      );

      setStep(getStepFromStatus(status));

      toast.success(successMessage);

      if (onStatusChange) {
        onStatusChange();
      }

    } catch (err) {
      handleApiError(err, `Failed to update order status`);
    } finally {
      setLoading(false);
    }
  };

  const handlePickup = async () => {
    await updateOrderStatus("PICKED", "Order picked successfully");
  };

  const handleDelivery = async () => {

    if (!window.confirm("Confirm successful delivery?")) {
      return;
    }

    await updateOrderStatus(
      "DELIVERED",
      "Order delivered successfully"
    );
  };

  const StoreIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 7h20M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="m2 7 4-4h12l4 4" />
    </svg>
  );

  const CheckIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const UserIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="7" r="4" />
      <path d="M17 11l2 2 4-4" />
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    </svg>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-10 pb-12">

      {/* Merchant */}
      <div className={`relative pl-12 ${step > 1 ? "opacity-60" : ""}`}>

        <div className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 text-white">
          {step > 1 ? <CheckIcon /> : <StoreIcon />}
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xs font-bold text-orange-500 uppercase mb-1">
            Stage 01 · Merchant
          </h2>

          <h3 className="text-xl font-bold">
            {order?.restaurant?.name}
          </h3>

          <p className="text-slate-500 text-sm">
            {order?.restaurant?.street_name},
            {order?.restaurant?.city},
            {order?.restaurant?.pincode}
          </p>

          <button
            onClick={handlePickup}
            disabled={step !== 1 || loading}
            className={`mt-6 w-full py-3 rounded-lg font-bold transition
              ${
                step === 1
                  ? "bg-slate-900 text-white hover:bg-black"
                  : "bg-emerald-100 text-emerald-700 cursor-default"
              }`}
          >
            {loading && step === 1
              ? "PROCESSING..."
              : step > 1
              ? "PICKED UP"
              : "CONFIRM PICKUP"}
          </button>

        </div>
      </div>

      {/* Recipient */}
      <div className={`relative pl-12 ${step === 1 ? "opacity-30" : ""}`}>

        <div className="absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 text-white">
          <UserIcon />
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">

          <h2 className="text-xs font-bold text-slate-400 uppercase mb-1">
            Stage 02 · Recipient
          </h2>

          <h3 className="text-xl font-bold">
            {order?.customer?.name}
          </h3>

          <p className="text-slate-500 text-sm">
            {order?.street_name},
            {order?.city},
            {order?.pincode}
          </p>

          <button
            onClick={handleDelivery}
            disabled={step !== 2 || loading}
            className={`mt-6 w-full py-4 rounded-xl font-bold transition
              ${
                step === 2
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
          >
            {loading && step === 2
              ? "PROCESSING..."
              : "MARK AS DELIVERED"}
          </button>

        </div>
      </div>

      {/* Completed */}
      {step === 3 && (
        <div className="text-center text-emerald-600 font-bold text-lg">
          Order Completed
        </div>
      )}
    </div>
  );
};

export default DeliverySteps;
