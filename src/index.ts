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
  const targetDocsUrl = 'https://docs.google.com/document/d/1A2F6TNh9lK3dSd04I5V-fpYi799xpg9F-qaGssGEefE/edit?usp=sharing';
  const targetDocs = DocumentApp.openByUrl(targetDocsUrl);
  const aaa = targetDocs.getBody().getParagraphs();
  const bbb = aaa.map(x => x.getText());
  console.log(bbb);
}
global.normalizeGoogleDocs = normalizeGoogleDocs
global.inputDoc = inputDoc
