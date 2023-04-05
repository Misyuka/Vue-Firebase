import firebase from "../firebase";

const mailing = firebase.collection("/mailing");
const meeting = firebase.collection("/meeting");

class FirebaseService {
  GetMailing() {
    return mailing;
  }

  GetMeeting() {
    return meeting;
  }

  CreateMailing(data) {
    return mailing.add(data);
  }

  CreateMeeting(data) {
    return meeting.add(data);
  }

  UpdateMailing(id, data) {
    return mailing.doc(id).update(data);
  }

  UpdateMeeting(id, data) {
    return meeting.doc(id).update(data);
  }

  DeleteMailing(id) {
    return mailing.doc(id).delete();
  }

  DeleteMeeting(id) {
    return meeting.doc(id).delete();
  }
}

export default new FirebaseService();
