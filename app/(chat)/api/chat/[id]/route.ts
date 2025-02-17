import { auth } from "@/app/(auth)/auth";
import { getChatById, getMessagesByChatId } from "@/lib/db/queries";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chatData = await getChatById({ id: params.id });
    if (!chatData) {
      return new NextResponse("Chat not found", { status: 404 });
    }

    if (chatData.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const messages = await getMessagesByChatId({ id: params.id });

    return NextResponse.json({
      ...chatData,
      messages,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
