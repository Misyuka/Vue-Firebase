<template>
  <div class="activity-container">
    <div><router-link to="/">Homepage</router-link> / Add Meeting</div>
    <div class="page-name">Meetings</div>
    <div class="activity-body">
      <div class="mt-15">
        <div class="input-description">Date</div>
        <input class="form-control ml" type="date" @change="e => date = e.target.value" />
      </div>
      <div class="mt-15">
        <div class="input-description">Topic</div>
        <input type="text" class="form-control ml w" @change="e => topic = e.target.value" />
      </div>
      <div style="display: flex; flex-direction: row; justify-content: space-between; flex-wrap: wrap;">
        <div class="mt-15" style="display: flex; flex-direction: row; align-items: center;">
          <div class="input-description">Time Start</div>
          <input class="form-control ml" type="time" style="width: 95px;" @change="e => time_start = e.target.value" />
        </div>
        <div class="mt-15" style="display: flex; flex-direction: row; align-items: center;">
          <div class="input-description">Time End</div>
          <input class="form-control ml" type="time" style="width: 95px;" @change="e => time_finish = e.target.value" />
        </div>
        <div class="mt-15" style="display: flex; flex-direction: row; align-items: center;">
          <div class="input-description">Room</div>
          <div class="dropdown ml" style="position: relative; width: 164px;">
            <div class="room-dropbtn" @click="RoomToggle">
              {{ room_1 }}{{ room_2 }}.{{ room_3 }}
              <i class="fas fa-chevron-circle-down"></i>
            </div>
            <div v-if="this.roomState == true" class="room-select" style="position: absolute;">
              <div class="room-content">
                <div v-for="i in array_room_1" :key="i" class="content" @click="SelectRoom_1(i)">{{ i }}</div>
              </div>
              <div class="room-content">
                <div v-for="i in array_room_2" :key="i" class="content" @click="SelectRoom_2(i)">{{ i }}</div>
              </div>
              <div class="room-content">
                <div v-for="i in array_room_2" :key="i" class="content" @click="SelectRoom_3(i)">{{ i }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-15" style="height: 37px">
        <div class="input-description">Image's Link</div>
        <div style="
            display: flex;
            width: 100%;
            margin-left: 10px;
            flex-direction: row;
            align-items: center;
            position: relative;
          ">
          <input type="file" @change="onImageChange" />
          <div class="file-display"></div>
        </div>
      </div>
      <div class="actions">
        <router-link to="/" class="back">Back</router-link>
        <div class="save" @click="SaveMeeting">Save</div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from '../firebase';
import FirebaseService from '../services/FirebaseService';

export default {
  data() {
    return {
      room_1: "",
      room_2: "",
      room_3: "",
      roomState: false,
      array_room_1: [
        "F", "G", "H"
      ],
      array_room_2: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
      ],
      date: "",
      topoc: "",
      time_start: "",
      time_finish: "",
      room: "",
      created_id: "",
      image: null,
      image_url: "",
    }
  },
  methods: {
    RoomToggle() {
      this.roomState = !this.roomState;
    },
    SelectRoom_1(data) {
      this.room_1 = data;
    },
    SelectRoom_2(data) {
      this.room_2 = data;
    },
    SelectRoom_3(data) {
      this.room_3 = data;
      if (this.room_1 != "" && this.room_2 != "") {
        this.roomState = false;
        this.room = `${this.room_1}${this.room_2}.${this.room_3}`;
      }
    },
    onImageChange(e) {
      const reader = new FileReader();
      let file = e.target.files[0];
      if (file) {
        reader.onload = () => {
          if (reader.readyState === 2) {
            this.image = file;
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        this.iamge = null;
      }
    },

    SaveMeeting() {
      var data = {
        date: this.date,
        topic: this.topic,
        time_start: this.time_start,
        time_finish: this.time_finish,
        room: this.room,
        image_url: this.image_url,
      }

      FirebaseService.CreateMeeting(data).then((data) => {
        this.created_id = data.id;
        if(this.image == null) {
          window.location.assign("/")
        }
      })

      if (this.image) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(this.image.name);
        imageRef.put(this.image).then(() => {
          imageRef.getDownloadURL().then((url) => {
            FirebaseService.UpdateMeeting(this.created_id, {image_url: url}).then(() => {
              window.location.assign("/")
            })
          });
        });
      }
    }
  },
}
</script>