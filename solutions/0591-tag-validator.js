/**
 * Tag Validator
 * Intuition: A valid snippet is one well-formed nested TAG_CONTENT. Scan left to right: CDATA is opaque, closing tags must match a stack of 1–9 uppercase names, text/CDATA only appear inside tags, and nothing may follow the outer close.
 * Approach: 1. Walk `currentReadPosition`. If `isOutsideAnyTag` (pos>0 and empty `tagRepository`), fail. 2. `<![CDATA[` … `]]>` only if stack nonempty. 3. `</name>`: regex `/^[A-Z]{1,9}$/`, must equal `tagRepository.pop()`. 4. `<name>`: same regex, push. 5. Else increment if inside a tag. 6. End with empty stack.
 * Dry Run: code = "<DIV>HELLO</DIV>".
 *   - Push DIV, skip HELLO, pop DIV matching. Stack empty → true. Extra text after close would fail `isOutsideAnyTag`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isValid = function (snippetContent) {
  const tagRepository = [];
  let currentReadPosition = 0;
  const contentLength = snippetContent.length;

  while (currentReadPosition < contentLength) {
    const isOutsideAnyTag =
      currentReadPosition > 0 && tagRepository.length === 0;
    if (isOutsideAnyTag) {
      return false;
    }

    const cdataStartSequence = "<![CDATA[";
    if (snippetContent.startsWith(cdataStartSequence, currentReadPosition)) {
      if (tagRepository.length === 0) {
        return false;
      }
      const cdataContentStartIndex =
        currentReadPosition + cdataStartSequence.length;
      const cdataEndSequenceIndex = snippetContent.indexOf(
        "]]>",
        cdataContentStartIndex
      );
      if (cdataEndSequenceIndex === -1) {
        return false;
      }
      currentReadPosition = cdataEndSequenceIndex + 3;
      continue;
    }

    const closingTagStartSequence = "</";
    if (
      snippetContent.startsWith(closingTagStartSequence, currentReadPosition)
    ) {
      const tagNameIdentifierStart =
        currentReadPosition + closingTagStartSequence.length;
      const tagNameIdentifierEnd = snippetContent.indexOf(
        ">",
        tagNameIdentifierStart
      );
      if (tagNameIdentifierEnd === -1) {
        return false;
      }
      const extractedTagString = snippetContent.slice(
        tagNameIdentifierStart,
        tagNameIdentifierEnd
      );
      if (!/^[A-Z]{1,9}$/.test(extractedTagString)) {
        return false;
      }
      if (
        tagRepository.length === 0 ||
        tagRepository.pop() !== extractedTagString
      ) {
        return false;
      }
      currentReadPosition = tagNameIdentifierEnd + 1;
      continue;
    }

    const openingTagCharacter = "<";
    if (snippetContent[currentReadPosition] === openingTagCharacter) {
      const tagContentStart = currentReadPosition + 1;
      const tagContentEnd = snippetContent.indexOf(">", tagContentStart);
      if (tagContentEnd === -1) {
        return false;
      }
      const tagTextContent = snippetContent.slice(
        tagContentStart,
        tagContentEnd
      );
      if (!/^[A-Z]{1,9}$/.test(tagTextContent)) {
        return false;
      }
      tagRepository.push(tagTextContent);
      currentReadPosition = tagContentEnd + 1;
      continue;
    }

    if (tagRepository.length === 0) {
      return false;
    }
    currentReadPosition++;
  }

  return tagRepository.length === 0;
};
