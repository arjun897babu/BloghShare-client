import { z } from "zod";
import { errorMessage, invalidMessage } from "./validator-helper";

const passwordSchema = z
  .string()
  .nonempty(errorMessage("password"))
  .regex(/[A-Z]/, `at least one ${errorMessage("upper case")}`)
  .regex(/[a-z]/, `at least one ${errorMessage("smaller case")}`)
  .regex(/[\d]/, `at least one ${errorMessage("number")}`)
  .regex(
    /[-/~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/,
    `at least one ${errorMessage("special character")}`
  )
  .regex(/^.{6,20}$/, `Password must be between 6 and 20 characters`);

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty(errorMessage("email"))
    .regex(
      /^(?=.{11,100}$)([a-zA-Z\d]+([.-_]?[a-zA-Z\d]+)*)\@[a-zA-Z\d-]{2,}\.[a-zA-Z]{2,}$/,
      invalidMessage("email")
    ),
  password: passwordSchema,
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .nonempty(errorMessage("name"))
      .regex(/^.{3,25}$/, "min 3-25 character needed")
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, invalidMessage("name")),
    confirm_password: passwordSchema,
  })
  .merge(loginSchema)
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const blogSchema = z.object({
  content: z.string().nonempty(errorMessage("content")),
  title: z.string().nonempty(errorMessage("title")),
  file: z.union([
    z.object({
      publicId: z.string(),
      url: z
        .string()
        .regex(/^https:\/\/res\.cloudinary\.com\/.*\.(jpeg|png|gif|webp|jpg)$/i, {
          message: "invalid image url",
        }),
    }),
    z
      .instanceof(File)
      .optional()
      .refine(
        (file) => {
          if (!(file instanceof File)) {
            return false;
          }

          const validImageTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/jpg",
          ];
          if (!validImageTypes.includes(file.type.toLowerCase())) {
            return false;
          }
          return true;
        },
        {
          message: errorMessage('image')+"  supported types (jpeg, png, gif, webp,jpg)",
        }
      )
      
  ]),
});

export type logniFormSchemaType = z.infer<typeof loginSchema>;
export type signUpFormSchemaType = z.infer<typeof signupSchema>;
export type BlogFormSchemaType = z.infer<typeof blogSchema>;
