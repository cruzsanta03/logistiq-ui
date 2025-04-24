import React from "react"

type Props = {
  form: {
    email: string
    phone: string
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onSubmit?: (result: any) => void
  format: (val: string) => string
}

const NextForm: React.FC<Props> = ({ form, handleChange, handleBlur, onSubmit, format }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/nextform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    onSubmit?.(result);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow">
      <label htmlFor="email" className="block font-semibold mb-1">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className="mb-4 border px-2 py-1 rounded w-full"
      />

      <label htmlFor="phone" className="block font-semibold mb-1">Phone</label>
      <input
        id="phone"
        name="phone"
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        onBlur={handleBlur}
        className="border px-2 py-1 rounded w-full"
      />

      <div className="mt-4 text-sm text-gray-600">
        <strong>Formatted Phone:</strong> {format(form.phone)}
      </div>

      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  )
}

export default NextForm
