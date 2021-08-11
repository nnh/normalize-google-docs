function normalizeToNFC(targetObject: any) {
/*  targetObject.forEach(target: any => {
    if (target.getText() != '') {
      target.setText(target.getText().normalize('NFC'));
    }
  });*/
}
function normalizeGoogleDocs() {
  const targetDocsID = DocumentApp.getActiveDocument().getId();
  const targetDocs = DocumentApp.openById(targetDocsID); 
  const targetLists = [targetDocs.getBody().getParagraphs(), 
                       targetDocs.getHeader().getParagraphs(), 
                       targetDocs.getFooter().getParagraphs()]
  targetLists.forEach(target => normalizeToNFC(target));
}
function inputDoc() {
  const targetDocsUrl = 'https://docs.google.com/document/d/1iEMt9ZF5pSfGamWSs1urHprCFWr0XkmXWj6cGTaQZfk/edit';
  const targetDocs = DocumentApp.openByUrl(targetDocsUrl);
  const aaa = targetDocs.getBody().getParagraphs();
  const targetTextList = aaa.map(x => x.getText());
  const convertNFCTextList = checkNFC(targetTextList);
  if (convertNFCTextList.length <= 0) {
    return;
  }
  convertNFCTextList.forEach(x => targetDocs.getBody().replaceText(x[0], x[1]));
}
function checkNFC(target: string[]) {
    const checkStringArray = target.map(x => [x, convertNFC(x)]);
    return checkStringArray.filter(x => x[1] !== '');
}
function convertNFC(target: string) {
    return target !== target.normalize('NFC') ? target.normalize('NFC') : '';
}
global.normalizeGoogleDocs = normalizeGoogleDocs
global.inputDoc = inputDoc
