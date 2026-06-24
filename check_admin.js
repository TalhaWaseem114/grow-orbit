const { getFirestore, FieldValue } = require("firebase-admin/firestore");
console.log("FieldValue:", typeof FieldValue);
if (FieldValue) {
  console.log("FieldValue.serverTimestamp:", typeof FieldValue.serverTimestamp);
  console.log("FieldValue.arrayUnion:", typeof FieldValue.arrayUnion);
}
