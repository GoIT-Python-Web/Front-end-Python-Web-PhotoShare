import { Field } from "formik";
import Input from "../inputs/Input.jsx";
import css from "./LabeledField.module.css";

const LabeledField = ({
  label,
  name,
  type = "text",
  customComponent: Component,
  ...props
}) => {
  return (
    <div className={css.fieldWrapper}>
      {label && (
        <label className={css.label} htmlFor={name}>
          {label}
        </label>
      )}
      <Field name={name}>
        {({ field, form, meta }) => {
          const error = meta.touched && meta.error;

          if (Component) {
            return (
              <Component
                field={{ ...field, value: field.value || "" }}
                form={form}
                meta={meta}
              />
            );
          }

          return (
            <Input
              {...field}
              type={type}
              error={error}
              errorMessage={meta.error}
              value={field.value || ""}
              {...props}
            />
          );
        }}
      </Field>
    </div>
  );
};

export default LabeledField;
