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
  const targetLists = [targetDocs.getBody(), targetDocs.getHeader(), targetDocs.getFooter()].map(x => {
    const textList = x.getParagraphs().map(x => x.getText());
    return [x, textList];
  });
  targetLists.forEach(x => normalizeToNFC(x));
}
function checkNFC(target: string[]) {
    const checkStringArray = target.map(x => [x, convertNFC(x)]);
    return checkStringArray.filter(x => x[1] !== '');
}
function convertNFC(target: string) {
    return target !== target.normalize('NFC') ? target.normalize('NFC') : '';
}
global.normalizeGoogleDocs = normalizeGoogleDocs
