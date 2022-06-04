import { useFormik } from "formik"
import * as yup from "yup"
import axios from "axios"

const Input = props => (
    <input
        {...props}
        className="p-4 w-full bg-transparent border rounded-xl border-brandOnix focus:border-brandPlatinum outline-none text-lg"
    />
)

const validationSchema = yup.object({
    user: yup.string().required("Digite usuário ou email"),
    password: yup.string().required("Digite sua senha")
})

export function Login({ signinUser }) {
    const formik = useFormik({
        onSubmit: async values => {
            const res = await axios.get(`${import.meta.env.VITE_API_HOST}/login`, {
                auth: {
                    username: values.user,
                    password: values.password
                }
            })

            signinUser(res.data)
        },
        initialValues: {
            user: "",
            password: ""
        },
        validateOnMount: true,
        validationSchema
    })

    return (
        <div className="h-full flex">
            <div className="lg:flex-1 flex items-center justify-center bg-brandBlue"></div>
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md flex flex-col space-y-6">
                    <h1 className="text-3xl">Acesse sua conta</h1>
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div className="space-y-1">
                            <Input
                                name="user"
                                placeholder="Usuário ou E-mail"
                                type="text"
                                value={formik.values.user}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting}
                            />
                            {formik.touched.user && formik.errors.user && (
                                <div className="text-sm text-red-500">
                                    {formik.errors.user}
                                </div>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Input
                                name="password"
                                placeholder="Senha"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                disabled={formik.isSubmitting}
                            />
                            {formik.touched.password &&
                                formik.errors.password && (
                                    <span className="text-sm text-red-500">
                                        {formik.errors.password}
                                    </span>
                                )}
                        </div>
                        <button
                            className="py-4 w-full bg-brandBlue rounded-full text-lg disabled:opacity-50"
                            type="submit"
                            disabled={!formik.isValid || formik.isSubmitting}
                        >
                            {formik.isSubmitting ? "Entrando..." : "Entrar"}
                        </button>
                    </form>
                    <span className="text-sm text-brandSilver">
                        Não tem uma conta?{" "}
                        <a className="text-brandBlue" href="/signup">
                            Inscreva-se
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}
