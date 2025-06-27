import { fetchSession } from "@/actions/auth";
import { createUploadthing, UploadThingError } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
    editorUploader: f(['image', 'text', 'blob', 'pdf', 'video', 'audio'])
        .middleware(async ({ req }) => {
            const session = await fetchSession()

            if (!session) throw new UploadThingError("Unauthorized");

            return { userId: session.session.userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.ufsUrl);

            return { uploadedBy: metadata.userId };
        }),
    profileImageUploader: f({
        image: {
            maxFileSize: '8MB',
            maxFileCount: 1
        }
    }).middleware(async ({ req }) => {
        const session = await fetchSession()

        if (!session) throw new UploadThingError("Unauthorized");

        return { userId: session.session.userId };
    }).onUploadComplete(async ({ metadata, file }) => {
        console.log("Upload complete for userId:", metadata.userId);

        console.log("file url", file.ufsUrl);

        return { uploadedBy: metadata.userId };
    })
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
