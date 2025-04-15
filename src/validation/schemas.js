import * as Yup from "yup";

export const ProfileEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Занадто коротке!")
    .max(20, "Занадто довге!")
    .optional(),
  email: Yup.string().email("Недійсний email!").optional(),
  phone: Yup.string()
    .matches(
      /^\+\d{2}\d{3}\d{3}\d{2}\d{2}$/,
      "Має бути у форматі +380777777777"
    )
    .optional(),
  password: Yup.string()
    .min(8, "Має бути не менше 8 символів!")
    .max(30, "Має бути менше 30 символів!")
    .optional(),
  birthdate: Yup.string().typeError("Невірний формат дати").optional(),
  description: Yup.string()
    .min(10, "Занадто короткий опис!")
    .max(1000, "Занадто довгий опис")
    .optional(),
});

export const CreatePostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Заголовок занадто короткий!")
    .max(30, "Заголовок занадто довгий!")
    .required("Заголовок обов'язковий!"),

  description: Yup.string()
    .min(5, "Опис занадто короткий!")
    .max(1000, "Опис занадто довгий!")
    .optional(),

  location: Yup.string()
    .min(2, "Місто занадто коротке!")
    .max(30, "Назва міста занадто довга!")
    .optional(),

  tags: Yup.array()
    .of(
      Yup.string()
        .transform((val) => (val ? val.trim() : ""))
        .matches(/^#?[a-zа-яіїєґ0-9_]*$/i, {
          message: "Некоректний тег!",
          excludeEmptyString: true,
        })
        .test("min-2-chars", "Мінімум 2 символи!", (val) => {
          const clean = val?.replace(/^#/, "") || "";
          return clean.length === 0 || clean.length >= 2;
        })
    )
    .test("valid-tags", "Додайте хоча б один коректний тег!", (tags) => {
      return tags?.some((tag) => tag && tag.trim() !== "");
    }),
});
