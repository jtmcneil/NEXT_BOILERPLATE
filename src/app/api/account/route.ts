import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import {
    BadRequestError,
    InternalServerError,
    UnauthorizedError,
} from "@/types/errors";
import { NextRequest, NextResponse } from "next/server";
import { EditAccountPayload, GetAccountsResponse } from "@/types/api";

export async function GET() {
    const session = await auth();
    if (!session?.user) {
        return new UnauthorizedError().response;
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.user.id,
            },
        });

        if (!user) return new BadRequestError("User not found").response;

        const body: GetAccountsResponse = { user };

        return NextResponse.json(body);
    } catch (error) {
        return new InternalServerError("Failed to fetch user data").response;
    }
}

export async function PUT(req: NextRequest) {
    const session = await auth();
    if (!session?.user) {
        return new UnauthorizedError().response;
    }

    const body = await req.json();
    const { userId, name, image }: EditAccountPayload = body;

    if (!userId || userId !== session.user.id) {
        return new UnauthorizedError("You are not authorized to edit this user")
            .response;
    }

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (image !== undefined) data.image = image;

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data,
        });

        return NextResponse.json({ user });
    } catch (error) {
        return new InternalServerError("Failed to update user data").response;
    }
}
