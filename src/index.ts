function normalizeToNFC(target: any) {
  const convertNFCTextList = checkNFC(target[1]);
  if (convertNFCTextList.length <= 0) {
    return;
  }
  convertNFCTextList.forEach(x => target[0].replaceText(x[0], x[1])); 
}
function normalizeGoogleDocs() {
  const targetDocsUrl = 'https://docs.google.com/document/d/1iEMt9ZF5pSfGamWSs1urHprCFWr0XkmXWj6cGTaQZfk/edit';
  const targetDocs = DocumentApp.openByUrl(targetDocsUrl);
  /*const targetLists = [targetDocs.getBody(), targetDocs.getHeader(), targetDocs.getFooter()].map(x => {
    const textList = x.getParagraphs().map(x => x.getText());
    return [x, textList];
  });
  targetLists.forEach(x => normalizeToNFC(x));*/
  const textList = targetDocs.getBody().getParagraphs().map(x => x.editAsText().getText());
  // Get the character to be NFC normalized
  const convertTargetStringList: string[][] = textList.map(x => getReplaceTargetStr(x));
  // Flatten the array
  const flatConvertTargetStringList: string[] = convertTargetStringList.reduce((x, y) => {
    x.push(...y);
    return x;
  }, []);
  // Remove duplicates, blank space
  const uniqueConvertTargetStringList = [...new Set(flatConvertTargetStringList)];
  const arrayBeforeAfter = uniqueConvertTargetStringList.filter(x => {
    if (x != '') {
      return [x, x.normalize('NFC')];
    }
  });
  // Replace
  arrayBeforeAfter.forEach(x => targetDocs.getBody().replaceText(x[0], x[1]));
}
function checkNFC(target: string[]) {
    const checkStringArray = target.map(x => [x, convertNFC(x)]);
    return checkStringArray.filter(x => x[1] !== '');
}
function convertNFC(target: string) {
    const targetNfc = target.normalize('NFC');
    if (target == targetNfc) {
      return;
    }
    return target !== target.normalize('NFC') ? target.normalize('NFC') : '';
}
function getReplaceTargetStr(target: string): string[] {
  const voicingMarkCodeList = ['\u3099', '\u309A'];
  const temp = voicingMarkCodeList.map(x => target.includes(x));
  // If there are no characters to be converted, exit the process.
  if (temp.every(x => !x)) {
    return [''];
  }
  return getVoicingMarkStr(target, voicingMarkCodeList);
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
