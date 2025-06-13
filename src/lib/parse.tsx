import parse, { Element, Text } from 'html-react-parser';

export function parseBible(content: string) {
  return parse(content ?? '', {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'span' && domNode.attribs?.class?.split(' ').includes('v')) {
        const element = domNode as Element;
        const verseNumber = element.children[0] as Text;
        return (
          <span
            key={element.attribs['data-number']}
            className="inline-block font-bold text-primary mr-3"
            data-number={element.attribs['data-number']}
          >
            {verseNumber.data}
          </span>
        );
      }
      if (domNode.type === 'tag' && domNode.name === 'p') {
        const element = domNode as Element;
        // Split content by verse numbers
        const verses = element.children.reduce((acc: { number: string; text: string }[], child) => {
          if (child.type === 'tag' && child.name === 'span' && child.attribs?.class === 'v') {
            const verseNumber = child.children[0] as Text;
            acc.push({ number: verseNumber.data, text: '' });
          } else if (child.type === 'text') {
            // If acc is empty, create a default verse container
            if (acc.length === 0) {
              acc.push({ number: '', text: '' });
            }
            acc[acc.length - 1].text += child.data;
          }
          return acc;
        }, []);

        return (
          <div className="space-y-4">
            {verses.map((verse, index) => (
              <p key={index} className="leading-relaxed text-foreground">
                <span className="inline-block font-bold text-primary mr-3">
                  {verse.number}
                </span>
                {verse.text.trim()}
              </p>
            ))}
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