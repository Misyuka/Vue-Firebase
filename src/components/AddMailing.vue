<template>
  <div class="activity-container">
    <div><router-link to="/">Homepage</router-link> / Add Mailing</div>
    <div class="page-name">Mailings</div>
    <div class="activity-body">
      <div class="mt-15">
        <div class="input-description">Date</div>
        <input class="form-control ml" type="date" @change="e => date = e.target.value" />
      </div>
      <div class="mt-15">
        <div class="input-description">Receiver</div>
        <input type="text" class="form-control ml w" @change="e => receiver = e.target.value" />
      </div>
      <div class="mt-15">
        <div class="input-description">Sender</div>
        <input type="text" class="form-control ml w" @change="e => sender = e.target.value" />
      </div>
      <div style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          flex-wrap: wrap;
        ">
        <div class="mt-15" style="display: flex; flex-direction: row; align-items: center">
          <div class="input-description">Mail Number</div>
          <input type="text" class="form-control ml" style="width: 100px" @change="e => mail_number = e.target.value" />
        </div>
        <div class="mt-15" style="display: flex; flex-direction: row; align-items: center">
          <div class="input-description">Unit Code</div>
          <div class="dropdown ml" style="position: relative; width: 164px">
            <div class="room-dropbtn" @click="CodeToggle">
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
          <select type="text" class="form-control ml" style="width: 150px; height: 39px"
            @change="e => subject = e.target.value">
            <option v-for="i in array_subject.sort()" :key="i" :value="i">{{ i }}</option>
          </select>
        </div>
        <div class="mt-15" style="display: flex; flex-direction: row; align-items: center">
          <div class="input-description">Year</div>
          <input type="text" class="form-control ml" style="width: 100px" @change="e => year = e.target.value" />
        </div>
      </div>
      <div class="mt-15">
        <div class="input-description">Regarding</div>
        <select type="text" class="form-control ml w" style="height: 39px" @change="e => regarding = e.target.value">
          <option v-for="i in array_regarding.sort()" :value="i" :key="i">{{ i }}</option>
        </select>
      </div>
      <div class="mt-15">
        <div class="input-description">Details</div>
        <input type="text" class="form-control ml w" @change="e => details = e.target.value" />
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
      <div class="mt-15" style="height: 37px">
        <div class="input-description">Mail's Link</div>
        <div style="
            display: flex;
            width: 100%;
            margin-left: 10px;
            flex-direction: row;
            align-items: center;
            position: relative;
          ">
          <input type="file" @change="onPDFChange" />
          <div class="file-display"></div>
        </div>
      </div>
      <div class="actions">
        <router-link to="/" class="back">Back</router-link>
        <div class="save" @click="uploadToFirebase">Save</div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage } from "../firebase";
import FirebaseService from "../services/FirebaseService";
export default {
  data() {
    return {
      code_1: "",
      code_2: "",
      code_3: "",
      codeState: false,
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
        "",
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
        "",
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
      image: null,
      pdf: null,
      image_state: false,
      pdf_state: false,
      image_url: "",
      pdf_url: "",
      date: "",
      receiver: "",
      sender: "",
      mail_number: "",
      unit_code: "",
      subject: "",
      year: "",
      regarding: "",
      details: "",
      created_id: ""
    };
  },
  methods: {
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
        this.unit_code = `/UN${this.code_1}F.${this.code_2}.${this.code_3}`;
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
    onPDFChange(e) {
      const reader = new FileReader();
      let file = e.target.files[0];
      if (file) {
        reader.onload = () => {
          if (reader.readyState === 2) {
            this.pdf = file;
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        this.pdf = null;
      }
    },
    uploadToFirebase() {
      var data = {
        date: this.date,
        receiver: this.receiver,
        sender: this.sender,
        mail_number: this.mail_number,
        unit_code: this.unit_code,
        subject: this.subject,
        year: this.year,
        regarding: this.regarding,
        details: this.details,
        image_url: this.image_url,
        pdf_url: this.pdf_url
      }

      FirebaseService.CreateMailing(data).then((data) => {
        this.created_id = data.id;
        if (this.pdf == null && this.image == null) {
          window.location.assign("/")
        }
      })

      if (this.image) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(this.image.name);
        imageRef.put(this.image).then(() => {
          imageRef.getDownloadURL().then((url) => {
            FirebaseService.UpdateMailing(this.created_id, { image_url: url }).then(() => {
              this.image_state = true;
              if (this.pdf == null) {
                window.location.assign("/")
              } else if (this.pdf_state == true) {
                window.location.assign("/")
              }
            })
          });
        });
      }

      if (this.pdf) {
        const storageRef = storage.ref();
        const pdfRef = storageRef.child(this.pdf.name);
        pdfRef.put(this.pdf).then(() => {
          pdfRef.getDownloadURL().then((url) => {
            FirebaseService.UpdateMailing(this.created_id, { pdf_url: url }).then(() => {
              this.pdf_state = true;
              if (this.image == null) {
                window.location.assign("/")
              } else if (this.image_state == true) {
                window.location.assign("/")
              }
            });
          });
        });
      }
    },
  },
};
</script>
