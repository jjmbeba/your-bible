import React from 'react'
import { EmojiToolbarButton } from '../ui/emoji-toolbar-button';
import { LinkToolbarButton } from '../ui/link-toolbar-button';
import { BulletedListToolbarButton, NumberedListToolbarButton, TodoListToolbarButton } from '../ui/list-toolbar-button';
import { MediaToolbarButton } from '../ui/media-toolbar-button';
import { BoldIcon, HighlighterIcon, ItalicIcon, Loader2, QuoteIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react';
import { KEYS } from 'platejs';
import { FixedToolbar } from '../ui/fixed-toolbar';
import { ToolbarButton, ToolbarGroup } from '../ui/toolbar';
import { MarkToolbarButton } from '../ui/mark-toolbar-button';
import type { Editor } from 'platejs';
import { TurnIntoToolbarButton } from '../ui/turn-into-toolbar-button';

type Props = {
    editor: Editor
}

const NoteEditorToolbar = ({ editor }: Props) => {
    return (
        <FixedToolbar className="justify-start rounded-t-lg">
            <ToolbarGroup>
                <TurnIntoToolbarButton />
            </ToolbarGroup>
            <ToolbarGroup>
                <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
                    <BoldIcon />
                </MarkToolbarButton>
                <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
                    <ItalicIcon />
                </MarkToolbarButton>
                <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
                    <UnderlineIcon />
                </MarkToolbarButton>
                <MarkToolbarButton nodeType="strikethrough" tooltip="Strikethrough (⌘+S)">
                    <StrikethroughIcon />
                </MarkToolbarButton>
            </ToolbarGroup>
            <ToolbarGroup>
                <LinkToolbarButton />
                <MarkToolbarButton nodeType={KEYS.highlight} tooltip="Highlight">
                    <HighlighterIcon />
                </MarkToolbarButton>
                <EmojiToolbarButton />
            </ToolbarGroup>
            <ToolbarGroup>
                <BulletedListToolbarButton />
                <NumberedListToolbarButton />
                <TodoListToolbarButton />
            </ToolbarGroup>
            <ToolbarGroup>
                <MediaToolbarButton nodeType={KEYS.img} />
                <MediaToolbarButton nodeType={KEYS.video} />
                <MediaToolbarButton nodeType={KEYS.audio} />
                <MediaToolbarButton nodeType={KEYS.file} />
            </ToolbarGroup>
        </FixedToolbar>
    )
}

export default NoteEditorToolbar