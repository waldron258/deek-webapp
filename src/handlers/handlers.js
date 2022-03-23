import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

/** DOCUMENTS COMMONS */

export const addDocument = async (collectionRef, document) => {
  try {
    await addDoc(collection(db, collectionRef), document);
  } catch (error) {
    return false;
  }
  return true;
};

export const deleteDocument = async (collectionRef, id) => {
  try {
    await deleteDoc(doc(db, collectionRef, id));
  } catch (error) {
    return false;
  }
  return true;
};

export const getCollection = async (collectionRef) => {
  let data = [];
  try {
    const response = await getDocs(collection(db, collectionRef));
    response.forEach((doc) => {
      let temp = doc.data();
      temp.id = doc.id;
      data.push(temp);
    });
  } catch (error) {
    return { status: false };
  }
  return { status: true, data: data };
};

export const getDocument = async (collectionRef, id) => {
  let data = null;
  try {
    const response = await getDoc(doc(db, collectionRef, id));
    data = response.data();
    data.id = id;
  } catch (error) {
    return { status: false };
  }
  return { status: true, data: data };
};

export const getDocumentsByQuery = async (collectionRef, field, value) => {
  let data = [];
  try {
    const response = await getDocs(
      query(collection(db, collectionRef), where(field, "==", value))
    );
    response.forEach((doc) => {
      let temp = doc.data();
      temp.id = doc.id;
      data.push(temp);
    });
  } catch (error) {
    console.log(error);
    return { status: false };
  }
  return { status: true, data: data };
};

export const updateDocument = async (collectionRef, document, id) => {
  try {
    await setDoc(doc(db, collectionRef, id), document);
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
};

export const uploadImage = async (image) => {
  const timeStamp = new Date().getTime();
  const imagesRef = ref(storage, `images/${timeStamp}`);
  let url = "";
  try {
    await uploadBytes(imagesRef, image);
    url = await getDownloadURL(imagesRef);
  } catch (error) {
    return { status: false };
  }
  return { status: true, url: url };
};

export const uploadImages = async (images) => {
  let urls = [];
  for (let i = 0; i < images.length; i++) {
    const timeStamp = new Date().getTime();
    const imagesRef = ref(storage, `images/${timeStamp}`);
    let url = "";
    try {
      await uploadBytes(imagesRef, images[i]);
      url = await getDownloadURL(imagesRef);
      urls.push(url);
    } catch (error) {
      return { status: false };
    }
  }
  return { status: true, urls: urls };
};

export const deleteImage = async (imageUrl) => {
  let imagesRef = ref(storage, imageUrl);
  try {
    deleteObject(imagesRef);
  } catch (error) {
    return false;
  }
  return true;
};
