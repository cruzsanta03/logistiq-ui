import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import renderer from "react-test-renderer"
import NextForm from "../NextForm"

describe("NextForm", () => {
  const baseProps = {
    form: {
      email: "",
      phone: ""
    },
    handleChange: jest.fn(),
    format: (val: string) => `formatted-${val}`
  }

  it("matches the snapshot", () => {
    const tree = renderer.create(<NextForm {...baseProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders all input fields", () => {
    render(<NextForm {...baseProps} />)
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/phone/i)).toBeInTheDocument()
  })

  it("calls handleChange on input type", async () => {
    render(<NextForm {...baseProps} />)
    const input = screen.getByPlaceholderText(/email/i)
    await userEvent.type(input, "test@example.com", { delay: 0 })
    expect(baseProps.handleChange).toHaveBeenCalled()
  })

  it("shows validation error on blur for email and phone", async () => {
    const ComponentWithBlur = () => {
      const [form, setForm] = React.useState({ ...baseProps.form })
      const [errors, setErrors] = React.useState<Record<string, string>>({})

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value })

      const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!e.target.value.trim()) {
          setErrors((prev) => ({ ...prev, [e.target.name]: "Required" }))
        } else {
          const { [e.target.name]: _, ...rest } = errors
          setErrors(rest)
        }
      }

      return (
        <div>
          <NextForm
            form={form}
            handleChange={handleChange}
            handleBlur={handleBlur}
            format={(val) => val}
          />
          {errors.email && <p>{errors.email}</p>}
          {errors.phone && <p>{errors.phone}</p>}
        </div>
      )
    }

    render(<ComponentWithBlur />)

    const emailInput = screen.getByPlaceholderText(/email/i)
    const phoneInput = screen.getByPlaceholderText(/phone/i)

    await userEvent.clear(emailInput)
    await userEvent.tab()
    await userEvent.clear(phoneInput)
    await userEvent.tab()

    expect(await screen.findAllByText("Required")).toHaveLength(2)
  })
})
