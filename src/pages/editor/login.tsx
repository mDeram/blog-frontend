import { withUrqlClient } from "next-urql";
import { ChangeEvent, FormEvent, useState } from "react";
import { useLoginMutation } from "../../generated/graphql";
import Layout from "../../components/Layout";
import createUrqlClient from "../../utils/createUrqlClient";
import router from "next/router";
import { pushNotificationError } from "src/utils/defaultNotifications";

const Login: React.FC = () => {
    const [inputs, setInputs] = useState({ username: "", password: "", authToken: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [,login] = useLoginMutation();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        const result = await login({
            username: inputs.username,
            password: inputs.password,
            authToken: parseInt(inputs.authToken) || 0
        });

        if (result.data?.login)
            router.push("/editor");
        else
            pushNotificationError("Could not loggin");

        setIsSubmitting(false);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setInputs(prev => {
             return {
                 ...prev,
                 [e.target.name]: e.target.value
             };
        });
    }

    return (
        <Layout title="mDeram's blog editor">
            <form onSubmit={handleSubmit}>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={inputs.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={inputs.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <input
                    id="authToken"
                    name="authToken"
                    type="authToken"
                    value={inputs.authToken}
                    onChange={handleChange}
                    placeholder="Auth Token"
                />

                <button disabled={isSubmitting}>Submit</button>
            </form>
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient)(Login);
