import { useEffect, useState } from "react"
import { useFormik } from "formik"
import axios from "axios"

import { avatar } from "../../assets/avatar.png"
import { BadgeCheckIcon } from "@heroicons/react/solid"
import { HeartIcon } from "@heroicons/react/outline"

const TweetForm = ({ loggedinUser, onSuccess }) => {
    const MAX_TWEET_CHARS = 140
    const formik = useFormik({
        onSubmit: async (values, form) => {
            await axios({
                method: "post",
                url: `${import.meta.env.VITE_API_HOST}/tweets`,
                headers: {
                    authorization: `Bearer ${loggedinUser.accessToken}`
                },
                data: {
                    text: values.text
                }
            })

            form.setFieldValue("text", "")
            onSuccess()
        },
        initialValues: {
            text: ""
        }
    })

    return (
        <div className="p-4 space-y-6 border-b border-brandSilver">
            <div className="flex space-x-5">
                <img
                    className="w-7"
                    src={avatar}
                    alt="Avatar placeholder small"
                />
                <h1 className="font-bold text-xl">Página Inicial</h1>
            </div>
            <form
                className="pl-12 flex flex-col text-lg"
                onSubmit={formik.handleSubmit}
            >
                <textarea
                    className="bg-transparent outline-none resize-none"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="text"
                    placeholder="O que está acontecendo?"
                    value={formik.values.text}
                    disabled={formik.isSubmitting}
                ></textarea>
                <div className="flex items-center justify-end space-x-3">
                    <span className="text-sm">
                        <span>{formik.values.text.length}</span>
                        <span className="text-brandBlue">
                            /{MAX_TWEET_CHARS}
                        </span>
                    </span>
                    <button
                        className="px-5 py-2 bg-brandBlue rounded-full disabled:opacity-50"
                        type="submit"
                        disabled={
                            formik.values.text.length > MAX_TWEET_CHARS ||
                            formik.isSubmitting
                        }
                    >
                        Tweetar
                    </button>
                </div>
            </form>
        </div>
    )
}

const Tweet = ({ name, username, avatar, alt, likes, children }) => {
    return (
        <div className="p-4 flex space-x-3 border-b border-brandSilver">
            <div>
                <img src={avatar} alt={alt} />
            </div>
            <div className="space-y-1 text-sm text-brandPlatinum">
                <div className="flex itens-center space-x-1">
                    <span className="font-bold">{name}</span>{" "}
                    <BadgeCheckIcon className="w-3.5 stroke-1" />{" "}
                    <span>@{username}</span>
                </div>
                <p>{children}</p>
                <div className="flex itens-center space-x-1">
                    <HeartIcon className="w-6 stroke-1" />
                    <span>{likes}</span>
                </div>
            </div>
        </div>
    )
}

export const Home = ({ loggedinUser }) => {
    const [data, setData] = useState([])

    async function getData() {
        const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
            headers: { authorization: `Bearer ${loggedinUser.accessToken}` }
        })
        setData(res.data)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <TweetForm loggedinUser={loggedinUser} onSuccess={getData} />
            <div>
                {(data.length &&
                    data.map(tweet => (
                        <Tweet
                            key={tweet.id}
                            name={tweet.user.name}
                            username={tweet.user.username}
                            avatar="./src/home/avatar.png"
                            alt="Avatar icon"
                            likes="1.2k"
                        >
                            {tweet.text}
                        </Tweet>
                    ))) ||
                    []}
            </div>
        </>
    )
}
