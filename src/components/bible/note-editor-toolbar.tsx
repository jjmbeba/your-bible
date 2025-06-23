import { BoldIcon, HighlighterIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react';
import { KEYS } from 'platejs';
import { useEditorReadOnly } from 'platejs/react';
import { EmojiToolbarButton } from '../ui/emoji-toolbar-button';
import { FixedToolbar } from '../ui/fixed-toolbar';
import { RedoToolbarButton, UndoToolbarButton } from '../ui/history-toolbar-button';
import { LinkToolbarButton } from '../ui/link-toolbar-button';
import { BulletedListToolbarButton, NumberedListToolbarButton, TodoListToolbarButton } from '../ui/list-toolbar-button';
import { MarkToolbarButton } from '../ui/mark-toolbar-button';
import { MediaToolbarButton } from '../ui/media-toolbar-button';
import { ModeToolbarButton } from '../ui/mode-toolbar-button';
import { ToolbarGroup } from '../ui/toolbar';
import { TurnIntoToolbarButton } from '../ui/turn-into-toolbar-button';

const NoteEditorToolbar = () => {
    const readOnly = useEditorReadOnly()

    return (
        <FixedToolbar className="justify-start rounded-t-lg">
            {!readOnly && (
                <>
                    <ToolbarGroup>
                        <UndoToolbarButton />
                        <RedoToolbarButton />
                    </ToolbarGroup>
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
                </>
            )}
            <div className='grow' />
            <ToolbarGroup>
                <MarkToolbarButton nodeType={KEYS.highlight} tooltip="Highlight">
                    <HighlighterIcon />
                </MarkToolbarButton>
            </ToolbarGroup>
            <ModeToolbarButton />
        </FixedToolbar>
    )
}

export default NoteEditorToolbar