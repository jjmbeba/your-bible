import AddToCollectionDialog from '@/components/bible/add-to-collection-dialog';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import parse, { Element, Text } from 'html-react-parser';
import { BookmarkPlus } from 'lucide-react';

export function parseBible(
  content: string,
  highlightSid?: string,
  bibleId?: string,
  chapterId?: string,
) {
  return parse(content ?? '', {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'span' && domNode.attribs?.class?.split(' ').includes('v')) {
        const element = domNode as Element;
        const verseNumber = element.children[0] as Text;
        return (
          <div key={element.attribs['data-number']} className="inline-flex items-center gap-1">
            <span
              className={cn(
                'inline-block font-bold text-primary mr-3'
              )}
              data-number={element.attribs['data-number']}
              tabIndex={0}
              aria-label={`Verse ${verseNumber.data}`}
            >
              {verseNumber.data}
            </span>
            <AddToCollectionDialog
              verseText={verseNumber.data}
              verseId={element.attribs['data-sid']}
              chapterId={element.attribs['data-chapter']}
              bibleId={element.attribs['data-bible']}
              trigger={
                <button
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity'
                  )}
                  aria-label={`Add verse ${verseNumber.data} to collection`}
                  tabIndex={0}
                >
                  <BookmarkPlus className="h-4 w-4" />
                </button>
              }
            />
          </div>
        );
      }
      if (domNode.type === 'tag' && domNode.name === 'p') {
        const element = domNode as Element;
        // Split content by verse numbers
        const verses = element.children.reduce((acc: { number: string; text: string; id: string }[], child) => {
          if (child.type === 'tag' && child.name === 'span' && child.attribs?.class === 'v') {
            const verseNumber = child.children[0] as Text;
            acc.push({ number: verseNumber.data, text: '', id: child.attribs['data-sid'] });
          } else if (child.type === 'text') {
            if (acc.length === 0) {
              acc.push({ number: '', text: '', id: '' });
            }
            acc[acc.length - 1].text += child.data;
          }
          return acc;
        }, []);

        return (
          <div className="space-y-4">
            {verses.map((verse, index) => {
              const isHighlighted = highlightSid && verse.id === highlightSid;

              return (
                <p
                  key={index}
                  className={cn(
                    'leading-relaxed text-foreground group',
                    isHighlighted && 'bg-yellow-200 rounded px-1',
                  )}
                  id={isHighlighted ? 'highlighted-verse' : undefined}
                  tabIndex={0}
                  aria-label={`Verse ${verse.number}${isHighlighted ? ' (selected)' : ''}`}
                >
                  <span className="inline-flex items-center gap-1">
                    <span className="inline-block font-bold text-primary mr-3">
                      {verse.number}
                    </span>
                    <AddToCollectionDialog
                      chapterId={chapterId ?? ''}
                      bibleId={bibleId ?? ''}
                      verseText={verse.text.trim()}
                      verseId={verse.id}
                      trigger={
                        <Button
                          variant={'ghost'}
                          className='size-6 opacity-0 group-hover:opacity-100 transition-opacity'
                          size={'icon'}
                          aria-label={`Add verse ${verse.id} to collection`}
                        >
                          <BookmarkPlus className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </span>
                  {verse.text.trim()}
                </p>
              );
            })}
          </div>
        );
      }
    }
  })
}

export const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200 dark:bg-yellow-800/50 font-medium">
        {part}
      </span>
    ) : part
  );
};

export const verseParamToDataSid = (verse?: string) => {
  if (!verse) return '';
  const parts = verse.split('.');
  if (parts.length < 3) return '';
  return `${parts[0]} ${parts[1]}:${parts[2]}`;
};