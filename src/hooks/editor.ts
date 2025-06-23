import { BasicBlocksKit } from '@/components/basic-blocks-kit';
import { LinkKit } from '@/components/link-kit';
import { ListKit } from '@/components/list-kit';
import { MediaKit } from '@/components/media-kit';
import { BlockquoteElement } from '@/components/ui/blockquote-node';
import { H1Element, H2Element, H3Element } from '@/components/ui/heading-node';
import { BlockquotePlugin, BoldPlugin, H1Plugin, H2Plugin, H3Plugin, ItalicPlugin, UnderlinePlugin } from '@platejs/basic-nodes/react';
import { Value } from "platejs";
import { usePlateEditor } from "platejs/react";

type Props = {
    defaultContent: Value
}

export const useEditor = ({ defaultContent }: Props) => {
    return usePlateEditor({
        plugins: [
            ...BasicBlocksKit,
            ...LinkKit,
            ...ListKit,
            ...MediaKit,
            BoldPlugin,
            ItalicPlugin,
            UnderlinePlugin,
            H1Plugin.withComponent(H1Element),
            H2Plugin.withComponent(H2Element),
            H3Plugin.withComponent(H3Element),
            BlockquotePlugin.withComponent(BlockquoteElement),
        ],
        value: defaultContent,
    });
}