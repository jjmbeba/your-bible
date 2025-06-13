import parse, { Element, Text } from 'html-react-parser';

export function parseBible(content: string) {
    return parse(content ?? '', {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'span' && domNode.attribs?.class === 'v') {
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
            } else if (child.type === 'text' && acc.length > 0) {
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