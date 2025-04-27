import { signIn } from "@/lib/auth";
import { Button } from "../ui/button";

export default function SignInButton() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn();
            }}
        >
            <Button type="submit">Sign in</Button>
        </form>
    );
}
