import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import renderer from "react-test-renderer"
import QuoteFormInputs from "../QuoteFormInputs"

const baseProps = {
  form: {
    fsc: 5,
    fuel: 100,
    roundtrip: 200,
    company: "",
    destination: "",
    requestor: "",
    linehaul: "",
    prePull: "",
    chassis: "",
    stopOff: "",
    storage: "",
    hazMat: "",
    reefer: "",
    dryRun: "",
    manualAdjustment: "",
    specialInstructions: "",
    promoCode: "",
    validThrough: ""
  },
  handleChange: jest.fn(),
  loadingDistance: false,
  formatCurrency: function (val: string | number) {
    return `$${val}`;
  }
};

describe("QuoteFormInputs", () => {
  it("renders Roundtrip Miles and Fuel Surcharge fields", () => {
    render(<QuoteFormInputs {...baseProps} />);
    expect(screen.getByText(/Roundtrip Miles:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fuel Surcharge %/i)).toBeInTheDocument();
  });

  it("calls handleChange when FSC input changes", () => {
    render(<QuoteFormInputs {...baseProps} />);
    const input = screen.getByLabelText(/Fuel Surcharge %/i);
    fireEvent.change(input, { target: { value: "10" } });
    expect(baseProps.handleChange).toHaveBeenCalled();
  });

  it("renders dynamic fields from map()", () => {
    render(<QuoteFormInputs {...baseProps} />);
    expect(screen.getByPlaceholderText("Company")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Promo Code")).toBeInTheDocument();
  });

  it("formats currency correctly", () => {
    const result = baseProps.formatCurrency(123);
    expect(result).toBe("$123");
  });

  it("shows 'Calculating...' when loadingDistance is true", () => {
    render(<QuoteFormInputs {...baseProps} loadingDistance={true} />);
    expect(screen.getByText("(Calculating...)")).toBeInTheDocument();
  });

  it("renders correct roundtrip value", () => {
    render(<QuoteFormInputs {...baseProps} />);
    expect(screen.getByText(/200/)).toBeInTheDocument();
  });

  it("renders N/A when roundtrip is missing", () => {
    const props = { ...baseProps, form: { ...baseProps.form, roundtrip: "" } };
    render(<QuoteFormInputs {...props} />);
    expect(screen.getByText(/N\/A/)).toBeInTheDocument();
  });

  it("matches the snapshot", () => {
    const tree = renderer.create(<QuoteFormInputs {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("lets the user type in company field (with state)", async () => {
    const Wrapper = () => {
      const [form, setForm] = React.useState({ ...baseProps.form });
      return (
        <QuoteFormInputs
          form={form}
          handleChange={(e) =>
            setForm({ ...form, [e.target.name]: e.target.value })
          }
          loadingDistance={false}
          formatCurrency={(val) => `$${val}`}
        />
      );
    };
    render(<Wrapper />);
    const input = screen.getByPlaceholderText("Company");
    await userEvent.type(input, "CyberCorp", { delay: 0 });
    expect(input).toHaveValue("CyberCorp");
  });
});

it("shows error on blur if required field is empty", async () => {
  const Wrapper = () => {
    const [form, setForm] = React.useState({ ...baseProps.form });
    const [errors, setErrors] = React.useState({});
    return (
      <QuoteFormInputs
        form={form}
        handleChange={(e) =>
          setForm({ ...form, [e.target.name]: e.target.value })
        }
        loadingDistance={false}
        formatCurrency={(val) => `$${val}`}
      />
    );
  };

  render(<Wrapper />);
  const input = screen.getByPlaceholderText("Company");
  await userEvent.clear(input);
  input.blur();
  expect(await screen.findByText("This field is required")).toBeInTheDocument();
});
