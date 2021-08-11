function normalizeGoogleDocs() {
  const targetDocsUrl = 'https://docs.google.com/document/d/1iEMt9ZF5pSfGamWSs1urHprCFWr0XkmXWj6cGTaQZfk/edit';
  const targetDocs = DocumentApp.openByUrl(targetDocsUrl);
  [targetDocs.getBody(), targetDocs.getHeader(), targetDocs.getFooter()].forEach(target => {
    const textList = target.getParagraphs().map(x => x.editAsText().getText());
    // Get the character to be NFC normalized
    const convertTargetStringList: string[][] = textList.map(x => getReplaceTargetStr(x));
    // Flatten the array
    const flatConvertTargetStringList: string[] = convertTargetStringList.reduce((x, y) => {
      x.push(...y);
      return x;
    }, []);
    // Remove duplicates, blank space
    const uniqueConvertTargetStringList = [...new Set(flatConvertTargetStringList)];
    const temp_arrayBeforeAfter = uniqueConvertTargetStringList.filter(x => x != '');
    const arrayBeforeAfter = temp_arrayBeforeAfter.map(x => [x, x.normalize('NFC')]);
    // Replace
    arrayBeforeAfter.forEach(x => target.replaceText(x[0], x[1]));
  });
}
function getReplaceTargetStr(target: string): string[] {
  const voicingMarkCodeList = ['\u3099', '\u309A'];
  const temp = voicingMarkCodeList.map(x => target.includes(x));
  // If there are no characters to be converted, return blank.
  return temp.every(x => !x) ? [''] : getVoicingMarkStr(target, voicingMarkCodeList);
}
function getVoicingMarkStr(target: string, voicingMarkCodeList: string[]): string[] {
  let targetString: string[] = [];
  for (let i = 1; i < target.length; i++) {
    if (target.charAt(i) == voicingMarkCodeList[0] || target.charAt(i) == voicingMarkCodeList[1]) {
      targetString.push(target[i - 1] + target[i]);
    }
  }
  return targetString;
}
global.normalizeGoogleDocs = normalizeGoogleDocs
