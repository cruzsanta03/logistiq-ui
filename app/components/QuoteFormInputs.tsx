import React from "react"

type Props = {
  form: Record<string, string | number>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  loadingDistance: boolean
  formatCurrency: (val: string | number) => string
}

const QuoteFormInputs: React.FC<Props> = ({ form, handleChange, loadingDistance, formatCurrency }) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  return (
    <div className="grid gap-4 p-6 border rounded-md shadow bg-white">
      <div className="text-sm text-gray-700">
        <p className="mb-2">
          <strong>Roundtrip Miles:</strong> {form.roundtrip || "N/A"}{" "}
          {loadingDistance && <span className="text-blue-500">(Calculating...)</span>}
        </p>
        <label htmlFor="fsc" className="block font-semibold">Fuel Surcharge %</label>
        <input
          id="fsc"
          type="number"
          name="fsc"
          value={form.fsc as string | number}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-24"
        />
        <span className="ml-4">
          <strong>Fuel:</strong> {formatCurrency(form.fuel)}
        </span>
      </div>

      {[
        "company", "destination", "requestor", "linehaul", "prePull", "chassis", "stopOff", "storage",
        "hazMat", "reefer", "dryRun", "manualAdjustment", "specialInstructions", "promoCode", "validThrough"
      ].map((field) => (
        <div key={field} className="flex flex-col">
          <input
            name={field}
            placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            type={
              [
                "manualAdjustment", "prePull", "chassis", "stopOff",
                "storage", "hazMat", "reefer", "dryRun"
              ].includes(field)
                ? "number"
                : field === "validThrough"
                ? "date"
                : "text"
            }
            value={form[field] as string | number}
            onChange={handleChange}
            onBlur={(e) => {
              if (!e.target.value.trim()) {
                setErrors((prev) => ({ ...prev, [e.target.name]: "This field is required" }));
              } else {
                const { [e.target.name]: _, ...rest } = errors;
                setErrors(rest);
              }
            }}
            className="border px-2 py-1 rounded"
          />
          {errors[field] && (
            <p className="text-red-600 text-sm">{errors[field]}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuoteFormInputs;
