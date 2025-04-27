import SignInButton from "@/components/buttons/SignInButton";
import SignOutButton from "@/components/buttons/SignOutButton";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
    const session = await auth();
    return (
        <div className="flex flex-col h-full justify-center items-center px-72 py-24">
            {/* <MdOutlineWifi className=" text-gray-200 text-5xl rotate-45" /> */}
            <h1 className=" text-4xl font-bold pb-6">
                ⚠️ CONSTRUCTION ZONE ⚠️
            </h1>
            <div className="flex flex-col gap-8 pl-4 border-[--foreground] border-l-2">
                <section>
                    <h2 className="text-2xl">Welcome to your new app!</h2>
                    <div className="flex flex-col gap-4">
                        <p className="">
                            Welcome to your new app! This template is a starting
                            point for your Next.js project. It comes with the
                            following already build it:
                        </p>
                        <ul>
                            <li>
                                <Link
                                    href={"https://authjs.dev/"}
                                    className="text-yellow-500 underline"
                                >
                                    <b>Auth JS</b>{" "}
                                </Link>
                                with email only authentication
                            </li>
                            <li>
                                <Link
                                    href={"https://www.prisma.io/docs"}
                                    className="text-yellow-500 underline"
                                >
                                    <b>Prisma ORM</b>
                                </Link>{" "}
                                ready to connect to your database
                            </li>
                            <li>
                                <Link
                                    href={
                                        "https://tailwindcss.com/docs/installation/using-vite"
                                    }
                                    className="text-yellow-500 underline"
                                >
                                    <b>Tailwind CSS</b>
                                </Link>{" "}
                                for styling and responsive design
                            </li>
                            <li>
                                <Link
                                    href={"https://ui.shadcn.com/"}
                                    className="text-yellow-500 underline"
                                >
                                    <b>Shadcn</b>
                                </Link>{" "}
                                for some components to get you started
                            </li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl">Get Started</h2>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl">.env</h3>
                        <p>Add the following variables to your .env:</p>
                        <ul>
                            <li>
                                <p>
                                    <b className="text-yellow-500">
                                        AUTH_SECRET
                                    </b>{" "}
                                    or just run{" "}
                                    <span className="bg-gray-200 px-1 py-0.5 rounded-sm italic">
                                        npm exec auth secret
                                    </span>{" "}
                                    (may place the secret in a .env.local file)
                                </p>
                            </li>
                            <li>
                                <p>
                                    <b className="text-yellow-500">
                                        AUTH_RESEND_KEY
                                    </b>{" "}
                                    get this one from{" "}
                                    <Link
                                        href={"https://resend.com/"}
                                        className="text-yellow-500 underline"
                                    >
                                        resend
                                    </Link>{" "}
                                    to enable email sending
                                </p>
                            </li>
                            <li>
                                <p>
                                    <b className="text-yellow-500">
                                        USER_DATABASE_URL
                                    </b>{" "}
                                    set this to your postgres db connection
                                    string (try{" "}
                                    <Link
                                        href={"https://neon.tech//"}
                                        className="text-yellow-500 underline"
                                    >
                                        neon
                                    </Link>
                                    )
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl">Examples</h2>
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl">Auth</h3>

                        {session?.user && (
                            <>
                                <div className="">
                                    <p>You are signed in</p>
                                    <p>
                                        Email address:{" "}
                                        <b>{session.user.email}</b>
                                    </p>
                                </div>
                                <SignOutButton />
                            </>
                        )}
                        {!session?.user && (
                            <>
                                <div className="pb-2">
                                    <p>
                                        You are <b>not</b> signed in
                                    </p>
                                </div>
                                <SignInButton />
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
