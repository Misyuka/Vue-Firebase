<template>
  <div class="home-container">
    <div class="home-header">
      <div class="home-left">
        <div>Homepage / {{ url }}</div>
        <div class="home-setting">
          <div :class="[mailing]" @click="ShowData('mailing')">Mailing</div>
          <div :class="[meetings]" @click="ShowData('meetings')">Meetings</div>
        </div>
      </div>
      <div class="home-right">
        <div class="dropdown">
          <button class="dropbtn" @click="ActivityToggle">
            Add Activity
            <i class="fas fa-chevron-circle-down"></i>
          </button>
          <div v-if="this.activityState == true" class="dropdown-content">
            <router-link to="/mails">Mails</router-link>
            <router-link to="/meetings">Meetings</router-link>
          </div>
        </div>
        <div class="dropdown" style="margin-left: 10px">
          <button class="dropbtn" @click="ExportToggle">
            EXPORT
            <i class="fas fa-calendar-alt"></i>
          </button>
          <div v-if="this.exportState == true" class="dropdown-content">
            <div>
              From
              <input class="form-control ml" type="date" @change="e => this.export_from = e.target.value" />
            </div>
            <div>
              To
              <input class="form-control ml" type="date" @change="e => this.export_to = e.target.value" />
            </div>
            <div class="buttons">
              <button @click="this.exportState = false" class="cancel-button">
                Cancel
              </button>
              <button @click="ExportFunction" class="export-button">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-body">
      <table v-if="mailing_state == true" class="home-table">
        <tr>
          <th>No</th>
          <th>Mail Date</th>
          <th>Receiver</th>
          <th>Sender</th>
          <th>Mail Number</th>
          <th>Unit Code</th>
          <th>Subject</th>
          <th>Year</th>
          <th>Regarding</th>
          <th>Details</th>
          <th>Image's Link</th>
          <th>Mail's Link</th>
          <th>Action</th>
        </tr>
        <tr v-for="i in array_mailing" :key="i" id="mailing_table">
          <td>{{ i.no }}</td>
          <td>{{ i.date }}</td>
          <td>{{ i.receiver }}</td>
          <td>{{ i.sender }}</td>
          <td>{{ i.mail_number }}</td>
          <td>{{ i.unit_code }}</td>
          <td>{{ i.subject }}</td>
          <td>{{ i.year }}</td>
          <td>{{ i.regarding }}</td>
          <td>{{ i.details }}</td>
          <td class="url"><a :title="i.image_url" :href="i.image_url" target="_blank">{{ i.image_url }}</a></td>
          <td class="url"><a :title="i.pdf_url" :href="i.pdf_url" target="_blank">{{ i.pdf_url }}</a></td>
          <td><i @click="ShowMailEditModel(i)" class="far fa-edit edit-icon"></i><i @click="DeleteMailing(i.id)"
              class="far fa-trash-alt delete-icon ml"></i></td>
        </tr>
      </table>
      <table v-if="mailing_state == false" class="home-table">
        <tr>
          <th>No</th>
          <th>Meeting Date</th>
          <th>Topic</th>
          <th>Time Start</th>
          <th>Time Finish</th>
          <th>Room</th>
          <th>Image's Link</th>
          <th>Action</th>
        </tr>
        <tr v-for="i in array_meeting" :key="i">
          <td>{{ i.no }}</td>
          <td>{{ i.date }}</td>
          <td>{{ i.topic }}</td>
          <td>{{ i.time_start }}</td>
          <td>{{ i.time_finish }}</td>
          <td>{{ i.room }}</td>
          <td class="url"><a :title="i.image_url" :href="i.image_url" target="_blank">{{ i.image_url }}</a></td>
          <td><i @click="ShowMeetEditModel(i)" class="far fa-edit edit-icon"></i><i @click="DeleteMeeting(i.id)"
              class="far fa-trash-alt delete-icon ml"></i></td>
        </tr>
      </table>
    </div>
    <div v-if="mail_edit_state == true" class="background" @click="HideMailEditModel"></div>
    <div v-if="mail_edit_state == true" class="edit-model">
      <div class="mt-15">
        <div class="input-description">Mail Date</div>
        <input type="date" class="form-control ml" :value="mail_date" @change="e => mail_date = e.target.value">
      </div>
      <div class="mt-15">
        <div class="input-description">Receiver</div>
        <input type="text" class="form-control ml w" :value="receiver" @change="e => receiver = e.target.value">
      </div>
      <div class="mt-15">
        <div class="input-description">Sender</div>
        <input type="text" class="form-control ml w" :value="sender" @change="e => sender = e.target.value">
      </div>
      <div class="mt-15">
        <div class="input-description">Mail Number</div>
        <input type="text" class="form-control ml w" :value="mail_number" @change="e => mail_number = e.target.value">
      </div>
      <div class="mt-15" style="display: flex; flex-direction: row; align-items: center">
        <div class="input-description">Unit Code</div>
        <div class="dropdown ml" style="position: relative; width: 164px">
          <div class="room-dropbtn" @click="CodeToggle" id="code">
            /UN{{ code_1 }}.F{{ code_2 }}.{{ code_3 }}/
            <i class="fas fa-chevron-circle-down"></i>
          </div>
          <div v-if="this.codeState == true" class="room-select" style="position: absolute">
            <div class="room-content">
              <div v-for="i in array_code_1" :key="i" class="content" @click="SelectCode_1(i)">
                {{ i }}
              </div>
            </div>
            <div class="room-content">
              <div v-for="i in array_code_2" :key="i" class="content" @click="SelectCode_2(i)">
                {{ i }}
              </div>
            </div>
            <div class="room-content">
              <div v-for="i in array_code_3" :key="i" class="content" @click="SelectCode_3(i)">
                {{ i }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-15" style="display: flex; flex-direction: row; align-items: center">
        <div class="input-description">Subject</div>
        <select type="text" class="form-control ml" style="width: 150px; height: 39px" :value="subject"
          @change="e => subject = e.target.value">
          <option v-for="i in array_subject.sort()" :key="i" :value="i">{{ i }}</option>
        </select>
      </div>
      <div class="mt-15" style="display: flex; flex-direction: row; align-items: center">
        <div class="input-description">Year</div>
        <input type="text" class="form-control ml" style="width: 100px" :value="year"
          @change="e => year = e.target.value" />
      </div>
      <div class="mt-15">
        <div class="input-description">Regarding</div>
        <select type="text" class="form-control ml w" style="height: 39px" :value="regarding"
          @change="e => regarding = e.target.value">
          <option v-for="i in array_regarding.sort()" :value="i" :key="i">{{ i }}</option>
        </select>
      </div>
      <div class="mt-15">
        <div class="input-description">Details</div>
        <input type="text" class="form-control ml w" :value="details" @change="e => details = e.target.value" />
      </div>
      <div class="actions">
        <div @click="mail_edit_state = false" class="back">Cancle</div>
        <div class="save" @click="SaveMailing">Save</div>
      </div>
    </div>
    <div v-if="meet_edit_state == true" class="background" @click="HideMeetEditModel"></div>
    <div v-if="meet_edit_state == true" class="edit-model">
      <div class="mt-15">
        <div class="input-description">Meeting Date</div>
        <input type="date" class="form-control ml" :value="meet_date" @change="e => meet_date = e.target.value">
      </div>
      <div class="mt-15">
        <div class="input-description">Topic</div>
        <input type="text" class="form-control ml w" :value="topic" @change="e => topic = e.target.value">
      </div>
      <div class="mt-15" style="display: flex; flex-direction: row; align-items: center;">
        <div class="input-description">Time Start</div>
        <input class="form-control ml" type="time" style="width: 95px;" :value="time_start" @change="e => time_start = e.target.value"/>
      </div>
      <div class="mt-15" style="display: flex; flex-direction: row; align-items: center;">
        <div class="input-description">Time End</div>
        <input class="form-control ml" type="time" style="width: 95px;" :value="time_finish" @change="e => time_end = e.target.value"/>
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
      <div class="actions">
        <div @click="meet_edit_state = false" class="back">Back</div>
        <div @click="SaveMeeting" class="save">Save</div>
      </div>
    </div>
  </div>
</template>

<script>
import FirebaseService from "../services/FirebaseService";
import { saveExcel } from '@progress/kendo-vue-excel-export';
export default {
  name: "Home",
  components: {},
  data() {
    return {
      activityState: false,
      exportState: false,
      mailing: "mailing",
      meetings: "meetings",
      url: "Mailing",
      array_mailing: null,
      array_meeting: null,
      mailing_state: true,
      export_from: "",
      export_to: "",
      mail_default_data: "",
      mail_edit_state: false,
      meet_edit_state: false,
      mail_id: "",
      mail_date: "",
      receiver: "",
      sender: "",
      mail_number: "",
      unit_code: "",
      subject: "",
      year: "",
      regarding: "",
      details: "",
      code_1: "",
      code_2: "",
      code_3: "",
      codeState: false,
      meet_id: "",
      meet_date: "",
      topic: "",
      time_start: "",
      time_finish: "",
      room: "",
      array_code_1: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
      array_code_2: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
      ],
      array_code_3: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      array_subject: [
        "PP",
        "BA",
        "SP",
        "ND",
        "SRK",
        "SK",
        "PSKD",
        "PSA",
        "SPT",
        "SRT",
        "UD",
        "PD",
        "SKLLUS",
        "PST",
        "PPLP",
        "PPKL",
        "USPKL",
        "USS",
        "UUS",
      ],
      array_regarding: [
        "Penddidikan dan Pengajaran",
        "Diklat Dosen dan Pegawai",
        "Hubungan Masyarakat",
        "Hukum dan Organisasi",
        "Informatika",
        "Ketatausahaan",
        "Kerumahtanggan",
        "Keuangan",
        "Kepegawaian",
        "Kemahasiswaan",
        "Perencanaan dan Program",
        "Perlengkapan",
        "Pengawasan",
        "Penelitian",
        "Penganbidan Kepada Masyarakat",
        "Akademik",
        "Pengadaan",
        "Kurikulum",
        "Sarana dan Prasarana",
      ],
      room_1: "",
      room_2: "",
      room_3: "",
      roomState: false,
      array_room_1: [
        "F", "G", "H"
      ],
      array_room_2: [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
      ]
    };
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
    CodeToggle() {
      this.codeState = !this.codeState;
    },
    SelectCode_1(data) {
      this.code_1 = data;
    },
    SelectCode_2(data) {
      this.code_2 = data;
    },
    SelectCode_3(data) {
      this.code_3 = data;
      if (this.code_1 != "" && this.code_2 != "") {
        this.codeState = false;
        this.unit_code = `/UN.${this.code_1}F${this.code_2}.${this.code_3}/`;
      }
    },
    ActivityToggle() {
      this.activityState = !this.activityState;
      if (this.exportState == true) {
        this.exportState = false;
      }
    },
    ExportToggle() {
      this.exportState = !this.exportState;
      if (this.activityState == true) {
        this.activityState = false;
      }
    },
    ExportFunction() {
      if (this.mailing_state == true) {
        var default_data = this.array_mailing;
        var export_data = default_data.filter(e => e.date >= this.export_from && e.date <= this.export_to);
        saveExcel({
          data: export_data,
          fileName: `${this.export_from}~${this.export_to}(Mailing)`,
          columns: [
            { field: 'no' },
            { field: 'date' },
            { field: 'receiver' },
            { field: 'sender' },
            { field: 'mail_number' },
            { field: 'subject' },
            { field: 'yer' },
            { field: 'regarding' },
            { field: 'details' },
            { field: 'image_url' },
            { field: 'pdf_url' },
          ]
        });
        this.exportState = false;
      } else {
        var default_meet_data = this.array_meeting;
        var export_meet_data = default_meet_data.filter(e => e.date >= this.export_from && e.date <= this.export_to);
        saveExcel({
          data: export_meet_data,
          fileName: `${this.export_from}~${this.export_to}(Meetings)`,
          columns: [
            { field: 'no' },
            { field: 'date' },
            { field: 'topic' },
            { field: 'time_start' },
            { field: 'time_finish' },
            { field: 'room' },
            { field: 'image_url' },
            { field: 'Actions' }
          ]
        });
        this.exportState = false;
      }
    },
    ShowData(data) {
      if (data == 'mailing') {
        this.mailing = 'mailing';
        this.meetings = 'meetings';
        this.url = "Mailing";
        this.mailing_state = true;
      } else {
        this.mailing = 'meetings';
        this.meetings = 'mailing';
        this.url = "Meetings";
        this.mailing_state = false;
      }
    },
    onMailingChange(items) {
      let _mailing = [];
      var no = 0;
      items.forEach((item) => {
        no++;
        let id = item.id;
        let data = item.data();
        _mailing.push({
          'no': no,
          'id': id,
          'date': data.date,
          'receiver': data.receiver,
          'sender': data.sender,
          'mail_number': data.mail_number,
          'unit_code': data.unit_code,
          'subject': data.subject,
          'year': data.year,
          'regarding': data.regarding,
          'details': data.details,
          'image_url': data.image_url,
          'pdf_url': data.pdf_url
        });
      });

      this.array_mailing = _mailing;
    },
    onMeetingChange(items) {
      let _meeting = [];
      var no = 0;
      items.forEach((item) => {
        no++;
        let id = item.id;
        let data = item.data();
        _meeting.push({
          'no': no,
          'id': id,
          'date': data.date,
          'topic': data.topic,
          'time_start': data.time_start,
          'time_finish': data.time_finish,
          'room': data.room,
          'image_url': data.image_url
        });
      });
      this.array_meeting = _meeting;
    },
    ShowMailEditModel(data) {
      this.mail_edit_state = true;
      this.mail_id = data.id;
      this.mail_date = data.date;
      this.receiver = data.receiver;
      this.sender = data.sender;
      this.mail_number = data.mail_number;
      this.unit_code = data.unit_code;
      this.subject = data.subject;
      this.year = data.year;
      this.regarding = data.regarding;
      this.details = data.details
    },
    ShowMeetEditModel(data) {
      this.meet_edit_state = true;
      this.meet_id = data.id;
      this.meet_date = data.date;
      this.topic = data.topic;
      this.time_start = data.time_start;
      this.time_finish = data.time_finish;
      this.room = data.room;
    },
    HideMeetEditModel() {
      this.meet_edit_state = false;
    },
    HideMailEditModel() {
      this.mail_edit_state = false;
      this.unit_code = "";
    },
    SaveMailing() {
      var data = {
        date: this.mail_date,
        receiver: this.receiver,
        sender: this.sender,
        mail_number: this.mail_number,
        unit_code: this.unit_code,
        subject: this.subject,
        year: this.year,
        regarding: this.regarding,
        details: this.details,
      }
      FirebaseService.UpdateMailing(this.mail_id, data);
      this.mail_edit_state = false;
    },
    SaveMeeting() {
      var data = {
        date: this.meet_date,
        topic: this.topic,
        time_start: this.time_start,
        time_finish: this.time_finish,
        room: this.room
      }
      FirebaseService.UpdateMeeting(this.meet_id, data);
      this.meet_edit_state = false;
    },
    DeleteMailing(id) {
      FirebaseService.DeleteMailing(id);
    },
    DeleteMeeting(id) {
      FirebaseService.DeleteMeeting(id);
    }
  },
  mounted() {
    FirebaseService.GetMailing().orderBy("date", "asc").onSnapshot(this.onMailingChange);
    FirebaseService.GetMeeting().orderBy("date", "asc").onSnapshot(this.onMeetingChange);
  }
};
</script>
