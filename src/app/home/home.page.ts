import { Component, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AddPSK } from "../components/addpsk/addpsk.component";
import { AlertController } from '@ionic/angular';
import { Router } from "@angular/router";
import {NgForm} from '@angular/forms';
import {GetAuthProvider} from '../services/getauth';
import CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';
import { LogfilterComponent } from './../logfilter/logfilter.component';
import { saveAs } from 'file-saver';
import { Chart } from 'chart.js';
import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import * as Blob from "blob";
import { ReadVarExpr } from '@angular/compiler';
import { DOCUMENT } from '@angular/common';
import { Observable, Subscription, timer } from 'rxjs';

//import { readFileSync } from 'fs';
//fs
//import fs;
//import * as fs from 'fs';
//import {fs} from "fs";
//import fs from 'fs';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nodereal: any;
  qelmreal: any;
  pskreal: any;
  nodelogsreal: any;
  qelmlogsreal: any;
  nodealllogsreal: any;
  qelmalllogsreal: any;
  initqelmalllogsreal: any;
  resultfromqkd: any;
  resultbulkupload:any;

  sysmonlogsreal: any;

  hostnamefromqkd: any;

  sysmonalllogs = "";
  number_active_event:any;
  active_event_list:any;
  sourceOrDestNodeList = [];
  selectedArray = [];

  nodeobj = {
    nodeid: "",
    nodename: "",
    nodehwversion: "",
    nodeswversion: "",
    nodedevicename: "",
    nodeclidevicename: "",
    nodeintipv4: "",
    nodeinternalipv4: "",
    nodefirmversion: "",
    nodeclidevicesubnetmask: "",
    nodeclidevicegatewayaddress: ""
  }


  nodeobjnetwork = {
    
    qclidevicename: "",
    qclideviceIP: "",
    qclidevicesubnetmask: "",
    qclidevicegatewayaddress: "",
    nodeclidevicename: "",
    nodeclideviceIP: "",
    nodeclidevicesubnetmask: "",
    nodeclidevicegatewayaddress: ""
  }

  qelmarray = [];


  qelmobj1 = {
    qelmid: "",
    qelmtype: "",
    qelmhwversion: "",
    qelmswversion: "",
    qelmdevicename: "",
    qelmpairdevicename: "",
    qelmpairipv4: "",
    qelminternalipv4: "",
    qelmremoteipv4: "",
    qelmfirmversion: ""
  }

  buttontoshow = 0;

  public items: any = [];

  psk: any;
  newpsk = "";
  backupkey= ""
  pskexpanded = false;
  voaexpanded = false;
  voaexpanded2 = false;
  pskexpandedbulk=false;
  backupkeyexpanded = false;
  paexpanded=false;
  diagnose = [];
  enablesave=0;

  configalice = [];

  nodelogs = "";
  qelmlogs = "";
  nodealllogs = "";
  qelmalllogs = "";

  nodelogarray = [];
  filteredNodelogarray = [];
  segmentChangedLogValue = "nodelog";
  qelmlogarray = [];
  filteredqelmlogarray = [];
  nodetimerId: any;
  qelmtimerId: any;

  oldpassword = null;
  newpassword = null;
  confirmpassword = null;
  SPD_THRESH = 24

  allpositivelevel = [];

  qelmtype = "A";

  useridtochange = null;

  qcdistance = 40;
  qcloss = 0;
  clockdistance = 40;
  clockloss = 0;

  channeltype1 = "Single";
  channeltype2 = "Dark";

  saelocal = "SAE001";
  saeremote = "SAE002";

  keytype = "ASCII";
  groundvoltage = 0;
  saelocalip = "192.168.0.56";
  saeremoteip = "192.168.0.99";
  qelmtab = "qelm1";
  finalqelmtype = "";
  logtab = "nodelog";
  roleheader = "";

  flag_b0 = 0;
  internalcheckon = 0;
  externalcheckon = 0;
  syncchannelcheckon=0;
  externalcheckconnect=0;

  aemonstarted = 0;
  aemoffstarted = 0;
  bemonstarted = 0;
  bemoffstarted = 0;

  nodelogstarted = 0;
  qelmlogstarted = 0;

  nodelogfilesize = 0;
  qelmlogfilesize = 0;
  graphlogfilesize = 0;

  advancedconfigalice = [];

  graphparameterstarted = 0;
  event_list:any;

  @ViewChild('content1', {static: false}) private myScrollContainer1: ElementRef;
  @ViewChild('content2', {static: false}) private myScrollContainer2: ElementRef;

  @ViewChild('lineCanvas', {static: false}) lineCanvas: ElementRef;

  private lineChart: Chart;
  expandGraphEnable = false;

  versionnum = "V0.1.1";

  nodeloadover = 0;
  qelmloadover = 0;
  configqelmloadover = 0;
  diagnoseloadover = 0;
  debugloadover = 0;
  credentialsloadover = 0;
  changepasswordloadover = 0;
  resetpasswordloadover = 0;

  qkdmode = "Key Generation";
  qkddatatype = "Non-Tunned Data";
  synccollectionstate = "Off";

  qberthreshold = null;
  tsthreshold = null;

  numofselfkeysavailable = 0;
  numoframkeysavailable = 0;
  processortoshow=2;
  staticipsettingenable=0;

  masterparametertypebob: any;
  masterparametertypealice: any;
  parametertype: any = [];


  average_signal_qber = [];
  qbertstamp = [];

  ccount1 = [];
  ccount2 = [];
  ccounttstamp = [];

  clickrawtimestamp = [];
  rawtstamp = [];
  filttscount = [];
  filttststamp = [];

 systemstatus = "";

 statusreal: any;

 modeinfo: any;

 tsinfo: any;

 tuneinfo: any;

 voaset: any;

 voaset2: any;

 pacomp:any

 orngset: any;

 graphstarted = 0;

 graphtimerId: any;
 graphtimerId2: any;
 alerttimerid:any;

 keyrate = [];
 keyratetstamp = [];
 flush_dest_id = "";
 dest_id = "";
 systemtemp = 0;
 fanspeed1 = "";
 fanspeed2 = "";
 fanspeed3 = "";
 fanspeed4 = "";
 runtime = "";
 qberdisplay = "";
 showHoverCard = false;

 node_id = "";
 path_option="";
 ip_addr = "";
 connect_status = "";

 clickcountdisplay = 0;

 currenttime = 0;
 boottime = 0;

 timedifference = 0;

 finalboottime = "";
 finallocaltime = "";

 timestatusreal : any;

 elasticserverip = "";
 nodehostname = "";

 uptimeseconds = 0;
 resultnetworkinfo : any;
 VOA_MAX40=1.501;
 VOA_MAX3=1.361;
 fiberlength="3 m"

 //voavalue = null;

 //orangeval = "Full Scan";

 saveval = 1;
 savestatus: any;
 
 public backupkeyuploader: FileUploader = new FileUploader({});
 public hasBaseDropZoneOver: boolean = false;
//Addede here for psk uploader
public pskuploader: FileUploader = new FileUploader({});
// tuneset = 0;

defaultSelectedRadio = "radio_2";
//Get value on ionChange on IonRadioGroup
selectedRadioGroup:any;
//Get value on ionSelect on IonRadio item
selectedRadioItem:any;
nodeid ="";
radio_list = [
  {
    id: '1',
    name: 'radio_list',
    value: 0,
    text: 'Node',
    disabled: false,
    checked: false,
    color: 'primary'
  }, {
    id: 1,
    name: 'radio_list',
    value: 1,
    text: 'Q-element',
    disabled: false,
    checked: true,
    color: 'secondary'
  }, {
    id: '1',
    name: 'radio_list',
    value: 3,
    text: 'Key Interface',
    disabled: false,
    checked: false,
    color: 'primary'
  }, {
    id: 1,
    name: 'radio_list',
    value: 4,
    text: 'Classical Channel Remote Interface',
    disabled: false,
    checked: false,
    color: 'secondary'
  }
];

  jsonKeyCountObj;
  jsonFlushKeyObj;
  hasResponse = false;
  flushNodeBasket = [];
  listener;
  selectAllCheckBox: any;
  checkBoxes: HTMLCollection;
  key_count;
  loading = false;
  loadingKeysPerNode = false;
  loadingFlushKeysPerNode = false;
  loadingFlushKeysPerNodeData = false;
  flushKeyNodes;
  subscription: Subscription;
  everyThreeSeconds: Observable<number> = timer(0, 3000);
  everyThreeMinutes: Observable<number> = timer(0, 180000);

  customAlertOptions: any = {
    header: 'Available Nodes',
    subHeader: 'Select All',
    message: '<ion-checkbox id="selectAllCheckBox"></ion-checkbox>'
  };


  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2,
              public popoverController: PopoverController,
              public alertController: AlertController,
              private router: Router,
              public authprovider: GetAuthProvider,
              private storage: Storage) 
  {
    this.qelmarray.push(this.qelmobj1);
    this.items = [
      { expanded: true }
      //{ expanded: false }
    ];
    this.getparametertypeAlice();
    this.getparametertypeBob();

    this.storage.get('usermeta').then((value) => {
      if(value.role == "admin") {
        this.roleheader = "Admin";
      } else if (value.role == "operator") {
        this.roleheader = "Operator";
      } else if (value.role == "officer") {
        this.roleheader = "Crypto Officer";
      } else if(value.role == "superadmin") {
        this.roleheader = "SuperAdmin";
      }
    })
  }

  openSelector(selector) {
    selector.open().then((alert)=>{
      this.selectAllCheckBox = this.document.getElementById("selectAllCheckBox");
      this.checkBoxes = this.document.getElementsByClassName("alert-checkbox");
      this.listener = this.renderer.listen(this.selectAllCheckBox, 'click', () => {
          if (this.selectAllCheckBox.checked) {
            for (let checkbox of this.checkBoxes) {
              if (checkbox.getAttribute("aria-checked")==="false") {
                (checkbox as HTMLButtonElement).click();
              };
            };
          } else {
            for (let checkbox of this.checkBoxes) {
              if (checkbox.getAttribute("aria-checked")==="true") {
                (checkbox as HTMLButtonElement).click();
              };
            };
          }
      });
      alert.onWillDismiss().then(()=>{
        this.listener();
      });
    })
  }

  flushKeyNodeChange(event) {
    this.flushKeyNodes = event.target.value;
    console.log('flushKeyNodes -> ', this.flushKeyNodes);
  }

  radioGroupChange(event) {
    console.log("radioGroupChange",event.detail);
    this.selectedRadioGroup = event.detail;
  }
  
  radioFocus() {
    console.log("radioFocus");
  }
  setprocessorselection(event) {

    if (event.detail.value=='1') {
      this.processortoshow=1;
    } else if(event.detail.value=='0') {
      this.processortoshow=0;
    } else if (event.detail.value=='3') {
      this.nodeloadover = 0;
      this.qelmloadover = 0;
      this.configqelmloadover = 0;
      this.diagnoseloadover = 0;
      this.debugloadover = 0;
      this.credentialsloadover = 0;
      this.changepasswordloadover = 0;
      this.resetpasswordloadover = 0;
      this.authprovider.getnodeinfo().subscribe((res) => {
        this.nodereal = res;
        this.nodeobj.nodeid = this.nodereal.nid;
        this.nodeobj.nodename = this.nodereal.nname;
        this.nodeobj.nodehwversion = this.nodereal.nhwv;
        this.nodeobj.nodeswversion = this.nodereal.nswv;
        this.nodeobj.nodedevicename = this.nodereal.nintdvname;
        this.nodeobj.nodeclidevicename = this.nodereal.nclidvname;
        this.nodeobj.nodeintipv4 = this.nodereal.ncliipv4;
        this.nodeobj.nodeinternalipv4 = this.nodereal.nintipv4;
        this.nodeobj.nodefirmversion = "F0.08.76.67";
        this.nodeobj.nodeclidevicegatewayaddress=this.nodereal.gateway_addr
        this.nodeobj.nodeclidevicesubnetmask=this.nodereal.subnet_mask
        this.nodeloadover = 1;
      });
      this.processortoshow=3;
    } else if (event.detail.value=='4') {
      this.nodeloadover = 0;
      this.qelmloadover = 0;
      this.configqelmloadover = 0;
      this.diagnoseloadover = 0;
      this.debugloadover = 0;
      this.credentialsloadover = 0;
      this.changepasswordloadover = 0;
      this.resetpasswordloadover = 0;
      this.authprovider.getqelminfo().subscribe((res) => {
        this.qelmreal = res;
        this.qelmobj1.qelmid = this.qelmreal.qid;
        this.qelmobj1.qelmtype = this.qelmreal.qtype;
        this.qelmobj1.qelmhwversion = this.qelmreal.qhwv;
        this.qelmobj1.qelmswversion = this.qelmreal.qswv;
        this.qelmobj1.qelmdevicename = this.qelmreal.qintdvname;
        this.qelmobj1.qelmpairdevicename = this.qelmreal.qpairdvname;
        this.qelmobj1.qelmpairipv4 = this.qelmreal.qpairipv4;
        this.qelmobj1.qelminternalipv4 = this.qelmreal.qintipv4;
        this.qelmobj1.qelmremoteipv4 = this.qelmreal.qremoteipv4;
        this.qelmobj1.qelmfirmversion = "F0.08.76.67";
        this.qelmarray.push(this.qelmobj1);
        this.qelmloadover = 1;
      }); 
      this.processortoshow=4;
    } else {
      this.processortoshow=2;
    }
    console.log("radioSelect",event.detail);
    console.log("radioSelect",this.processortoshow, event.value, event.detail.value);
    this.selectedRadioItem = event.detail;
  }
  radioBlur() {
    console.log("radioBlur");
  }

  checkpasswordstrength(password) {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])(?=.{8,})");

    if(strongRegex.test(password)) {
      return (true)
    } else {
      return (false)
    }
  }


 ValidateIPaddress(ipaddress) {  
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    return (true)  
  }  
  return (false)  
} 

checkpskstrength(psk) {
  if(/^([a-zA-Z0-9_-]){2176,}$/.test(psk)) {
    return true
  } else {
    return false
  }
}

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segmentChangedLogValue = ev.detail.value;
  }

  segmentChanged1(ev: any) {
    console.log('Segment changed', ev);
  }


 async notifications(ev: any) {
    const popover = await this.popoverController.create({
        component: LogfilterComponent,
        event: ev,
        animated: true,
        showBackdrop: true,
        backdropDismiss: false
    });

    popover.onDidDismiss()
      .then((result) => {
      //console.log(result['data']);
    });

    return await popover.present();
}

  ngOnInit() {
    this.loading = true;    
    this.authprovider.gettimeinfo().subscribe((res) => {
      this.timestatusreal = res;

      this.currenttime = Math.floor(this.timestatusreal.LocalTime/1000000);
      this.boottime = Math.floor(this.timestatusreal.BootTime/1000000);
      //this.timedifference = this.timestatusreal.UpTime;
      this.timedifference = this.timestatusreal.UpTime*1000;
      this.uptimeseconds = this.timestatusreal.UpTime;
      this.runtime = this.secondsToDhms(this.uptimeseconds);
      let now = Date.now();

      let date1 = new Date(now);


      let hours1 =  "0" + date1.getHours();

      // Minutes part from the timestamp
      let minutes1 = "0" + date1.getMinutes();
      // Seconds part from the timestamp
      let seconds1 = "0" + date1.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime1 = hours1.substr(-2) + ':' + minutes1.substr(-2) + ':' + seconds1.substr(-2);


      let formattedDate1 = date1.getDate() + '-' + (date1.getMonth() + 1) + '-' + date1.getFullYear()


      this.finallocaltime = formattedDate1 + " " + formattedTime1;


      let date2 = new Date(now - this.timedifference);

      let hours2 = "0" + date2.getHours();
      // Minutes part from the timestamp
      let minutes2 = "0" + date2.getMinutes();
      // Seconds part from the timestamp
      let seconds2 = "0" + date2.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime2 = hours2.substr(-2) + ':' + minutes2.substr(-2) + ':' + seconds2.substr(-2);

      let formattedDate2 = date2.getDate() + '-' + (date2.getMonth() + 1) + '-' + date2.getFullYear()

      this.finalboottime = formattedDate2 + " " + formattedTime2;

      //this.runtime = this.secondsToDhms(this.timedifference/1000);


      this.authprovider.getnodeinfo().subscribe((res) => {
        this.nodereal = res;
        this.nodeobj.nodeid = this.nodereal.nid;
        this.nodeobj.nodename = this.nodereal.nname;
        this.nodeobj.nodehwversion = this.nodereal.nhwv;
        this.nodeobj.nodeswversion = this.nodereal.nswv;
        this.nodeobj.nodedevicename = this.nodereal.nintdvname;
        this.nodeobj.nodeclidevicename = this.nodereal.nclidvname;
        this.nodeobj.nodeintipv4 = this.nodereal.ncliipv4;
        this.nodeobj.nodeinternalipv4 = this.nodereal.nintipv4;
        this.nodeobj.nodefirmversion = "F0.08.76.67";
        this.nodeobj.nodeclidevicegatewayaddress=this.nodereal.gateway_addr
        this.nodeobj.nodeclidevicesubnetmask=this.nodereal.subnet_mask

        this.nodeloadover = 1;

        this.authprovider.getqelminfo().subscribe((res) => {
          this.loading = false;
          this.qelmreal = {"qid":"A000003","qtype":"A","qhwv":"HW1.0.0","qswv":"SW1.0.0","qintdvname":"eth0:0","qintipv4":"10.90.7.2","qpairdvname":"eth0:1","qpairipv4":"182.168.10.24","qremoteipv4":"182.169.10.24"}

          this.qelmobj1.qelmid = this.qelmreal.qid;
          this.qelmobj1.qelmtype = this.qelmreal.qtype;

          if(this.qelmobj1.qelmtype == "A") {
            this.finalqelmtype = "Alice";
          } else if(this.qelmobj1.qelmtype == "B") {
            this.finalqelmtype = "Bob";
          }
          this.qelmobj1.qelmhwversion = this.qelmreal.qhwv;
          this.qelmobj1.qelmswversion = this.qelmreal.qswv;
          this.qelmobj1.qelmdevicename = this.qelmreal.qintdvname;
          this.qelmobj1.qelmpairdevicename = this.qelmreal.qpairdvname;
          this.qelmobj1.qelmpairipv4 = this.qelmreal.qpairipv4;
          this.qelmobj1.qelminternalipv4 = this.qelmreal.qintipv4;
          this.qelmobj1.qelmremoteipv4 = this.qelmreal.qremoteipv4;
          this.qelmobj1.qelmfirmversion = "F0.08.76.67";

          this.qelmarray.push(this.qelmobj1);

          this.startgraph();

          this.authprovider.getqkdstatus().subscribe((res) => {
            this.statusreal = res;

            console.log(this.statusreal);
            this.systemstatus = this.statusreal.message
            this.credentialsloadover = 1;

            this.authprovider.doexternaclheck().subscribe((res) => {
              this.resultfromqkd = res;
              if(this.resultfromqkd.Status == "Success") {
                this.authprovider.getkeycount().subscribe((res) => {
                  this.pskreal = res;
                  this.numofselfkeysavailable = this.pskreal.self_key_count
                  this.numoframkeysavailable = this.pskreal.ram_key_count
                  this.credentialsloadover = 1;
                }, err => {
                  console.log('getkeycount response not found -> ', err);
                  this.presentAlert(err.message);
                }); 
              }

              this.getparainit(function(snap1) {
              }.bind(this));
              this.getparamoninit(function(snap2) {
              }.bind(this));
              if ( this.finalqelmtype == "Alice")
              {
                this.getvoathreshold(function(snap2) {

                }.bind(this));
                this.getvoa(function(snap2) {

                }.bind(this));
              }
            }, err => {
              console.log('Error doing externalcheck -> ', err);
              this.presentAlert(err.message);
            }); 
          }, err => {
            console.log('Error getting qkdstatus -> ', err);
            this.presentAlert(err.message);
          });  
        }, err => {
          console.log('Error getting qelminfo -> ', err);
          this.loading = false;
          this.presentAlert(err.message);
        }); 
      },
        () => console.log("Error getting nodeinfo")
      );
    },
      () => console.log("Error getting timeinfo")
    );
this.flag_b0 = 1;
//this.graphtimerId2=  setInterval( () => this.button0(), 10000);// button0 here
    this.getNodesFromAllPaths();
  }

  getNodesFromAllPaths() {
    // console.log('buttoninput getNodesFromAllPaths -> ', buttoninput);
    console.log('this.qelmobj1.qelmid getNodesFromAllPaths -> ', this.qelmobj1.qelmid);
    var path;
    var splitPath;
    var indexOfCurrentNode;
    var indexOfCurrentNodeList = [];
    var sourceOrDestNode = [];
    this.loadingKeysPerNode = true;
    this.loadingFlushKeysPerNode = true;
    // this.subscription = this.everyThreeMinutes.subscribe(() => {
      // this.authprovider.getAllPaths().subscribe((res) => {
        // path = res;
        path = {"PathConfig":"Version=15\nA000001,B000001,A000002,B000002,A000003,B000003\nA000001,B000001,A000002,B000002\nA000002,B000002,A000003,B000003"}

        path = path.PathConfig;
        console.log('path -> ', path);
        splitPath = path.split("\n");
        console.log('splitPath before -> ', splitPath);
        splitPath = splitPath.filter(item => !(item.includes("version") || item.includes("Version")));
        splitPath = splitPath.filter(item => item != "");
        console.log('splitPath after -> ', splitPath);
        var splitSPath;
        splitPath.forEach(spath => {
          console.log('spath -> ', spath);
          splitSPath = spath.split(",");
          console.log('splitSPath -> ', splitSPath);
          indexOfCurrentNode = [];
          indexOfCurrentNodeList = [];
          if((splitSPath.includes(this.qelmobj1.qelmid)) == true) {
            indexOfCurrentNode = (splitSPath.indexOf(this.qelmobj1.qelmid));
            console.log('indexOfCurrentNode in if -> ', indexOfCurrentNode);
            if(indexOfCurrentNode == 0 || indexOfCurrentNode == (splitSPath.length-1)) {
              indexOfCurrentNodeList.push(indexOfCurrentNode);
              console.log('indexOfCurrentNodeList -> ', indexOfCurrentNodeList);
              if(indexOfCurrentNodeList.includes(0)) {
                console.log('0 index');
                sourceOrDestNode.push(splitSPath[splitSPath.length-1]);
              } 
              if(indexOfCurrentNodeList.includes((splitSPath.length-1))) {
                console.log('last index');
                sourceOrDestNode.push(splitSPath[0]);
              }
              console.log('sourceOrDestNode -> ', sourceOrDestNode);
              this.sourceOrDestNodeList = sourceOrDestNode;
            }
            this.sourceOrDestNodeList = [...new Set(this.sourceOrDestNodeList)];
          }
          console.log('sourceOrDestNodeList -> ', this.sourceOrDestNodeList);
          this.loadingFlushKeysPerNode = false;
        });
        console.log('qelmobj1.qelmid -> ', this.qelmobj1.qelmid);
        // this.authprovider.getKeycountTnode(this.sourceOrDestNodeList.length, this.sourceOrDestNodeList).subscribe((res) => {
          // console.log('res key count->> ', res);
          this.loadingKeysPerNode = false;
          this.hasResponse = true;
          // this.jsonKeyCountObj = res;
          this.jsonKeyCountObj = {"count":1,"key_count":[{"node_id":"B000003","keys":1504}]}

          this.jsonKeyCountObj = this.jsonKeyCountObj.key_count;
          this.jsonKeyCountObj.map(i=>i.checked=false);
          console.log('this.jsonKeyCountObj => ', this.jsonKeyCountObj);
        // }, err => {
        //   console.log('getKeycountTnode response not found -> ', err);
        //   this.loadingKeysPerNode = false;
        //   this.presentAlert(err.message);
        // });
      // }, err => {
      //   console.log('getAllPaths response not found -> ', err);
      //   this.loadingFlushKeysPerNode = false;
      //   this.loadingKeysPerNode = false;
      //   this.presentAlert(err.message);
      // });
    // });
    console.log('sourceOrDestNodeList final ******** -> ', this.sourceOrDestNodeList);
  }
 
  clickbutton(buttoniput) {

    this.authprovider.gettimeinfo().subscribe((res) => {
      this.timestatusreal = res;

      this.currenttime = Math.floor(this.timestatusreal.LocalTime/1000000);
      this.boottime = Math.floor(this.timestatusreal.BootTime/1000000);

      //this.timedifference = this.currenttime - this.boottime;

      this.timedifference = this.timestatusreal.UpTime*1000;


      let now = Date.now();

      let date1 = new Date(now);


      let hours1 = "0" + date1.getHours();

      // Minutes part from the timestamp
      let minutes1 = "0" + date1.getMinutes();
      // Seconds part from the timestamp
      let seconds1 = "0" + date1.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime1 = hours1.substr(-2)  + ':' + minutes1.substr(-2) + ':' + seconds1.substr(-2);


      let formattedDate1 = date1.getDate() + '-' + (date1.getMonth() + 1) + '-' + date1.getFullYear()


      this.finallocaltime = formattedDate1 + " " + formattedTime1;


      let date2 = new Date(now - this.timedifference);
      console.log("date after time difference", date2)

      let hours2 = "0" + date2.getHours();
      // Minutes part from the timestamp
      let minutes2 = "0" + date2.getMinutes();
      // Seconds part from the timestamp
      let seconds2 = "0" + date2.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime2 = hours2.substr(-2)  + ':' + minutes2.substr(-2) + ':' + seconds2.substr(-2);

      let formattedDate2 = date2.getDate() + '-' + (date2.getMonth() + 1) + '-' + date2.getFullYear()

      this.finalboottime = formattedDate2 + " " + formattedTime2;

      //this.runtime = this.secondsToDhms(this.timedifference/1000);

      this.uptimeseconds = this.timestatusreal.UpTime;

      this.runtime = this.secondsToDhms(this.uptimeseconds);


    });

    this.alerttimerid = setInterval(() => this.checkforalerts(), 50000);


    //this.nodetimerId = setInterval(() => this.checkforalerts(), 3000);

    if(buttoniput == 0) {

      this.authprovider.getqkdstatus().subscribe((res) => {
        this.statusreal = res;
        console.log(this.statusreal);
        this.systemstatus = this.statusreal.message
        this.credentialsloadover = 1;

            this.authprovider.getkeycount().subscribe((res) => {
              this.pskreal = res;
              this.numofselfkeysavailable = this.pskreal.self_key_count
              this.numoframkeysavailable = this.pskreal.ram_key_count
              this.credentialsloadover = 1;
            }); 
          this.getparainit(function(snap1) {
          }.bind(this));
          this.getparamoninit(function(snap2) {

          }.bind(this));
      });  

   // }
/*    if(buttoniput == 0) { 
      if(this.flag_b0 == 0){
      this.flag_b0 =1;
      this.button0()
     // this.graphtimerId2=  setInterval( () => this.button0(), 10000);
}
    }else {
      clearInterval(this.graphtimerId2);
      this.flag_b0 = 0;*/
    } else if (buttoniput == 2) {
      
    } else if(buttoniput == 3) {

      this.nodeloadover = 0;
      this.qelmloadover = 0;
      this.configqelmloadover = 1;
      this.diagnoseloadover = 0;
      this.debugloadover = 0;
      this.credentialsloadover = 0;
      this.changepasswordloadover = 0;
      this.resetpasswordloadover = 0;

    } else if(buttoniput == 4) {
      this.nodeloadover = 0;
      this.qelmloadover = 0;
      this.configqelmloadover = 0;
      this.diagnoseloadover = 1;
      this.debugloadover = 0;
      this.credentialsloadover = 0;
      this.changepasswordloadover = 0;
      this.resetpasswordloadover = 0;

    } else if(buttoniput == 5) {

      if(this.finalqelmtype == 'Bob') {
        this.authprovider.getmodeinfo().subscribe((res) => {
          this.modeinfo = res;
          if(this.modeinfo.mode == "0") {
            this.qkdmode = "Key Generation";
          }
          else if(this.modeinfo.mode == "1") {
            this.qkdmode = "Data Collection";
          }

          else if(this.modeinfo.mode == "2") {
            this.qkdmode = "Key Recon Monitor";
          }

          if(this.modeinfo.datatype == "0") {
            this.qkddatatype = "Tuned Data";
          }
          else if(this.modeinfo.datatype == "1") {
            this.qkddatatype = "Non-Tuned Data";
          }

          this.authprovider.gettsholdinfo().subscribe((res) => {
            this.tsinfo = res;
            this.tsthreshold = this.tsinfo.tshold;
            this.qberthreshold = this.tsinfo.qtshold;

            if(this.tsinfo.syncdata == "0") {
              this.synccollectionstate = "Off";
            }
            else if(this.tsinfo.syncdata == "1") {
              this.synccollectionstate = "On";
            }

            /*this.authprovider.gettuneinfo().subscribe((res) => {
              this.tuneinfo = res;
              this.tuneset = this.tuneinfo.value;*/

              
              this.authprovider.qkdmode_savestatus().subscribe((res) => {
                this.savestatus = res;

                if(this.savestatus.status == 0){
                  this.saveval = 0;
                } else if(this.savestatus.status == 1) {
                  this.saveval = 1;
                } else if(this.savestatus.status == 2) {
                  this.saveval = 2;
                }
             // });
            });
          });
        });      
      }

      else if(this.finalqelmtype == 'Alice') {
        this.authprovider.getmodeinfo().subscribe((res) => {
          this.modeinfo = res;

          if(this.modeinfo.mode == "0") {
            this.qkdmode = "Key Generation";
          }
          else if(this.modeinfo.mode == "1") {
            this.qkdmode = "Data Collection";
          }
          else if(this.modeinfo.mode == "2") {
            this.qkdmode = "Key Recon Monitor";
          }
  
          if(this.modeinfo.datatype == "0") {
            this.qkddatatype = "Tuned Data";
          }
          else if(this.modeinfo.datatype == "1") {
            this.qkddatatype = "Non-Tuned Data";
          }

          /*this.authprovider.getvoa().subscribe((res) => {
            this.voaset = res;
            this.voavalue = this.voaset.voa;

            this.authprovider.settingorange().subscribe((res) => {
              this.orngset = res;
              if(this.orngset.val == "0") {
                this.orangeval = "Full Scan";
              }
              else if(this.orngset.val == "1") {
                this.orangeval = "Limited Scan";  
              }
            });
          });*/
        });   
      }  

    } else if(buttoniput == 6) {
      this.nodeloadover = 0;
      this.qelmloadover = 0;
      this.configqelmloadover = 0;
      this.diagnoseloadover = 0;
      this.debugloadover = 1;
      this.credentialsloadover = 0;
      this.changepasswordloadover = 0;
      this.resetpasswordloadover = 0;


      this.authprovider.getqkdstatus().subscribe((res) => {
        this.statusreal = res;
        this.systemstatus = this.statusreal.message
        this.credentialsloadover = 1;
      });  


    } else if (buttoniput == 8) {
      this.nodeloadover = 0;
      this.qelmloadover = 0;
      this.configqelmloadover = 0;
      this.diagnoseloadover = 0;
      this.debugloadover = 0;
      this.credentialsloadover = 0;
      this.changepasswordloadover = 0;
      this.resetpasswordloadover = 0;


      // this.authprovider.doexternaclheck().subscribe((res) => {
      //   this.resultfromqkd = res;
      //   if(this.resultfromqkd.Status == "Success") {
          this.authprovider.getkeycount().subscribe((res) => {
            this.pskreal = res;
            this.numofselfkeysavailable = this.pskreal.self_key_count
            this.numoframkeysavailable = this.pskreal.ram_key_count
            this.credentialsloadover = 1;
          }); 
      //   }
      // }); 

 
    } else if (buttoniput == 13) {
      console.log('buttoniput 13');
      
      this.nodeloadover = 0;
      this.qelmloadover = 0;
      this.configqelmloadover = 0;
      this.diagnoseloadover = 0;
      this.debugloadover = 0;
      this.credentialsloadover = 0;
      this.changepasswordloadover = 0;
      this.resetpasswordloadover = 0;


      // this.authprovider.doexternaclheck().subscribe((res) => {
      //   this.resultfromqkd = res;
      //   if(this.resultfromqkd.Status == "Success") {
          this.authprovider.getkeycount().subscribe((res) => {
            this.pskreal = res;
            this.numofselfkeysavailable = this.pskreal.self_key_count
            this.numoframkeysavailable = this.pskreal.ram_key_count
            this.credentialsloadover = 1;
          }, err => {
            console.log('getkeycount response not found -> ', err);
            this.presentAlert(err.message);
          }); 
      //   }
      // }); 

 
    } else if(buttoniput == 9) {
      this.nodeloadover = 0;
      this.qelmloadover = 0;
      this.configqelmloadover = 0;
      this.diagnoseloadover = 0;
      this.debugloadover = 0;
      this.credentialsloadover = 0;
      this.changepasswordloadover = 1;
      this.resetpasswordloadover = 0;
    } else if(buttoniput == 10) {
      this.nodeloadover = 0;
      this.qelmloadover = 0;
      this.configqelmloadover = 0;
      this.diagnoseloadover = 0;
      this.debugloadover = 0;
      this.credentialsloadover = 0;
      this.changepasswordloadover = 0;
      this.resetpasswordloadover = 1;
    } else if(buttoniput == 11) {
      this.authprovider.gethostnameinfo().subscribe((res) => {
        this.hostnamefromqkd = res;
        this.nodehostname = this.hostnamefromqkd.Hostname;
      });
    } else if(buttoniput ==15) {

      this.getnetworkinfo(0)
      this.getnetworkinfo(1)
      
    } else if(buttoniput == 21) {
    } else if(buttoniput == 19) {
      this.authprovider.doexternaclheck().subscribe(res => {
        console.log('buttoniput 19 doexternaclheck response -> ', res);
      }, err => {
        console.log('buttoniput 19 doexternaclheck response not found -> ', err);
        this.loadingFlushKeysPerNode = false;
        this.presentAlert(err.message);
      })
    }

    if(buttoniput != 0) {
      this.stopgraph();
    }

  //	this.buttontoshow = buttoniput;
 // }
 this.buttontoshow = buttoniput;
  }

//Button 0
button0(){
//time from here
    this.authprovider.gettimeinfo().subscribe((res) => {
      this.timestatusreal = res;

      this.currenttime = Math.floor(this.timestatusreal.LocalTime/1000000);
      this.boottime = Math.floor(this.timestatusreal.BootTime/1000000);

      //this.timedifference = this.currenttime - this.boottime;

      this.timedifference = this.timestatusreal.UpTime*1000;


      let now = Date.now();

      let date1 = new Date(now);


      let hours1 = "0" + date1.getHours();

      // Minutes part from the timestamp
      let minutes1 = "0" + date1.getMinutes();
      // Seconds part from the timestamp
      let seconds1 = "0" + date1.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime1 = hours1.substr(-2)  + ':' + minutes1.substr(-2) + ':' + seconds1.substr(-2);


      let formattedDate1 = date1.getDate() + '-' + (date1.getMonth() + 1) + '-' + date1.getFullYear()


      this.finallocaltime = formattedDate1 + " " + formattedTime1;


      let date2 = new Date(now - this.timedifference);
      console.log("date after time difference", date2)

      let hours2 = "0" + date2.getHours();
      // Minutes part from the timestamp
      let minutes2 = "0" + date2.getMinutes();
      // Seconds part from the timestamp
      let seconds2 = "0" + date2.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime2 = hours2.substr(-2)  + ':' + minutes2.substr(-2) + ':' + seconds2.substr(-2);

      let formattedDate2 = date2.getDate() + '-' + (date2.getMonth() + 1) + '-' + date2.getFullYear()

      this.finalboottime = formattedDate2 + " " + formattedTime2;

      //this.runtime = this.secondsToDhms(this.timedifference/1000);

      this.uptimeseconds = this.timestatusreal.UpTime;

      this.runtime = this.secondsToDhms(this.uptimeseconds);


    });

//till here
/*
    this.authprovider.dointernalcheck().subscribe((res) => {
      this.internalcheckon = 0;
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        

      this.authprovider.getqkdstatus().subscribe((res) => {
        this.statusreal = res;
        console.log("SUCCESS ",this.statusreal.message);
	console.log(this.statusreal)
	console.log("RES ABOVE")
        this.systemstatus = this.statusreal.message
        this.credentialsloadover = 1;

            this.authprovider.getkeycount().subscribe((res) => {
              this.pskreal = res;
           //if(this.pskreal.self_key_count != 0){
            this.numofselfkeysavailable = this.pskreal.self_key_count
            this.numoframkeysavailable = this.pskreal.ram_key_count
            this.credentialsloadover = 1;
            //} else {
                //console.log("Inside else of self_key=0")
              //this.systemstatus = "Q-Element not available"
            //}
            });
          this.getparainit(function(snap1) {
          }.bind(this));
          this.getparamoninit(function(snap2) {

          }.bind(this));
      });

      } else {
console.log("Inside  Else")
        this.systemstatus = "Q-element not available"
      }
    });
*/
    this.authprovider.getqkdstatus().subscribe((res) => {
        this.statusreal = res;
        console.log(this.statusreal);
        this.systemstatus = this.statusreal.message
        this.credentialsloadover = 1;

            this.authprovider.getkeycount().subscribe((res) => {
              this.pskreal = res;
              this.numofselfkeysavailable = this.pskreal.self_key_count
              this.numoframkeysavailable = this.pskreal.ram_key_count
              this.credentialsloadover = 1;
            });
          this.getparainit(function(snap1) {
          }.bind(this));
          this.getparamoninit(function(snap2) {

          }.bind(this));
      });

  }
  
  //////

  enableintermediatesave(event){
    if(event.detail.checked){
    this.enablesave=1;
  } else {
    this.enablesave=0;
  }
    console.log(event.detail);
    console.log(this.enablesave)
  }
  setstaticselection(event){
    if(event.detail.checked){
    this.staticipsettingenable=1;
  } else {
    this.staticipsettingenable=0;
  }
    console.log(event.detail);
    console.log(this.staticipsettingenable)
  }
  editdynamicnetworkinfo(isDHCP, elem_sel){
    this.authprovider.set_network_info(isDHCP, elem_sel,"", "", "",  "").subscribe((res) => {
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("successfully set DHCP configuration");
        this.getnetworkinfo(elem_sel);
      } else {
        this.presentAlert("Something went wrong: Try again");  
        return  
      }
    }) 

 
  }
  editnetworkinfo(isDHCP, elem_sel, clidevicegatewayaddress, clidevicesubnetmask, clideviceIP,  clidevicename){
    console.log(isDHCP, elem_sel,clidevicegatewayaddress, clidevicesubnetmask, clideviceIP,  clidevicename);
    if((this.ValidateIPaddress(clideviceIP)) && (this.ValidateIPaddress(clidevicesubnetmask)) && (this.ValidateIPaddress(clidevicegatewayaddress))) {
    this.authprovider.set_network_info(isDHCP, elem_sel,clidevicegatewayaddress, clidevicesubnetmask, clideviceIP,  clidevicename).subscribe((res) => {
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("successfully set static configuration");
        this.getnetworkinfo(elem_sel)
      } else {
        this.presentAlert("Something went wrong: Try again");    
      }
    }) 
  } else {
    this.presentAlert("Invalid Address"); 
  }
  }

  getnetworkinfo(element){
    console.log(element)
    this.authprovider.get_network_info(element).subscribe((res) => {
      this.resultnetworkinfo=res;
      console.log(res)
      if(element==0)
      {
        this.nodeobjnetwork.nodeclideviceIP = this.resultnetworkinfo.ip_address;
        this.nodeobjnetwork.nodeclidevicegatewayaddress= this.resultnetworkinfo.gateway_addr;
        this.nodeobjnetwork.nodeclidevicename=this.resultnetworkinfo.interface_name;
        this.nodeobjnetwork.nodeclidevicesubnetmask=this.resultnetworkinfo.subnet_mask;
      } else if (element==1){
        this.nodeobjnetwork.qclideviceIP = this.resultnetworkinfo.ip_address;
        this.nodeobjnetwork.qclidevicegatewayaddress= this.resultnetworkinfo.gateway_addr;
        this.nodeobjnetwork.qclidevicename=this.resultnetworkinfo.interface_name;
        this.nodeobjnetwork.qclidevicesubnetmask=this.resultnetworkinfo.subnet_mask;
      }
      console.log(this.nodeobjnetwork)
      if(this.resultnetworkinfo == "Error retrieving IP info") {
        this.presentAlert("Error retrieving IP info");    
      }
    }) 
  }
  startnodelog() {
    this.nodelogstarted = 1;
    this.nodelogfilesize = 0;
    this.nodetimerId = setInterval(() => this.nodelogfunction(), 3000);
  }

  startqelmlog() {
    this.qelmlogstarted = 1;
    this.qelmlogfilesize = 0;
    this.qelmtimerId = setInterval(() => this.qelmlogfunction(), 3000);
  }

  getFiles(): FileLikeObject[] {
    return this.backupkeyuploader.queue.map((fileItem) => {
      console.log("Fsdad")
      return fileItem.file;
    });
  }
  pskgetFiles(): FileLikeObject[] {
    return this.pskuploader.queue.map((fileItem) => {
      console.log("pskgetFiles called!")
      return fileItem.file;
    });
  }

  fileOverBase(ev): void {
    this.hasBaseDropZoneOver = ev;
  }

  reorderFiles(reorderEvent: CustomEvent): void {
    let element = this.backupkeyuploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.backupkeyuploader.queue.splice(reorderEvent.detail.to, 0, element);
  }

  pskreorderFiles(reorderEvent: CustomEvent): void {
    let element = this.pskuploader.queue.splice(reorderEvent.detail.from, 1)[0];
    this.pskuploader.queue.splice(reorderEvent.detail.to, 0, element);
  }


  deleteFiles() {
    this.backupkeyuploader.clearQueue();
 
  }
  pskdeleteFiles() {
    this.pskuploader.clearQueue();
 
  }

  uploadpathconfiguration(){

  let files= this.getFiles();

  let formData = new FormData();// Add any other data you want to send
  let fname = 0
  files.forEach((file) => {

  formData.append("files[]", file.rawFile, file.name);
  let a="pathconfig.txt"
  
  if(file.name == a)
  {
  fname = 1
  }else{
    this.presentAlert("File name should be pathconfig.txt!")
  }

});

  if(fname == 1)
  {
    this.authprovider.uploadpathconfiguration(formData).subscribe((res) => {
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") { //From go backend, if the uploaded file passess the checks
        this.presentSuccess("File Uploaded successfully");
        this.getNodesFromAllPaths();
      } else {

        this.presentAlert("Something went wrong: Upload again");  
        this.presentAlert_Tnode("Value from sitara : ",this.resultfromqkd.Value)  
      }
    }) 


  }
  this.deleteFiles();

  }
  uploadipconfiguration(){

  let files= this.getFiles();

  let formData = new FormData();// Add any other data you want to send
  let fname = 0
  files.forEach((file) => {

  formData.append("files[]", file.rawFile, file.name);
  let a="ipconfig.txt"
  
  if(file.name == a)
  {
  fname = 1
  }else{
    this.presentAlert("File name should be ipconfig.txt!")
  }
});

  if(fname == 1)
  {
    this.authprovider.uploadipconfiguration(formData).subscribe((res) => {
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") { //From go backend, if the uploaded file passess the checks
        this.presentSuccess("File Uploaded successfully");
        this.getNodesFromAllPaths();
      } else {
        
        this.presentAlert("Something went wrong: Upload again");    
        this.presentAlert_Tnode("Value from sitara : ",this.resultfromqkd.Value)  
      }
    }) 


  }
  this.deleteFiles();
  
  }


  uploadcertificate(){
    let files = this.getFiles();
    let flag=true

    let formData = new FormData();// Add any other data you want to send

    let i = 0
    let sk =0
    let sc = 0

    files.forEach((file) => {

      i = i+1
      formData.append("files[]", file.rawFile, file.name);
      let a="server_cert.pem"
      let b="server_key.pem"
      
      if(file.name == a)
      {
      sc = 1
      }else if(file.name == b){
        sk = 1
      }else{
       // this.presentAlert("File names should be server_cert.pem or server_key.pem!!")
      }

    });
    
  if(i == 2 && sc == 1 && sk == 1)
  {
    this.authprovider.uploadcertificate(formData).subscribe((res) => {
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("files Uploaded successfully");
      } else {
        this.presentAlert("Something went wrong: Upload again");    
      }
    }) 


  }else if(i == 2 && sc == 1 && sk == 0){

    this.presentAlert("Please enter VALID server_key.pem!\n Please enter 2 valid files: server_cert.pem and server_key.pem")

  }else if(i == 2 && sc == 0 && sk == 1){

    this.presentAlert("Please enter VALID server_cert.pem!\n Please enter 2 valid files: server_cert.pem and server_key.pem")

    }else if(i == 2 && sc == 0 && sk == 0){

      this.presentAlert("INVALID file names entered!\n Please enter 2 valid files: server_cert.pem and server_key.pem")

  }else if(i == 1 && (sk == 1 || sc == 1)){

    if(sk == 0){
      this.presentAlert("server_key.pem not added!\n Enter server_key.pem")
    }
    if(sc == 0){
      this.presentAlert("server_cert.pem not added!\n Enter server_cert.pem")
    }

  }else if(i == 0){

    this.presentAlert("File List EMPTY!\n  Please enter 2 valid files: server_cert.pem and server_key.pem ")

  }else{

    this.presentAlert("Entered files exceed 2. Please enter 2 valid files server_cert.pem and server_key.pem")

  }

  this.deleteFiles();


  }

  bulkuploadpsk(){
    let files = this.pskgetFiles();
    let flag=true

    let formData = new FormData();// Add any other data you want to send

    files.forEach((file) => {
 
      formData.append("files[]", file.rawFile, file.name);
      console.log("form data"+formData)
      let a="psk.txt"
      
      console.log(file.name)
      if(file.name==a)
      {
        flag=true
      }
    });
    

    if (flag==true){
      this.authprovider.bulkuploadpsk(formData).subscribe((res) => {
        this.resultbulkupload = res;
        this.presentbulkupload(this.resultbulkupload)
      }) 
    } else {
      this.presentAlert("Invalid file names\n allowed value: psk.txt");
    }
    this.pskdeleteFiles();

  }

  stopnodelog() {
    this.nodelogstarted = 0;
    this.nodelogfilesize = 0;
    clearInterval(this.nodetimerId);
  }

  stopqelmlog() {
    this.qelmlogstarted = 0;
    this.qelmlogfilesize = 0;
    clearInterval(this.qelmtimerId);
  }

  nodelogfunction() {
    this.authprovider.getnodelogs(this.nodelogfilesize).subscribe((res) => {
      let temparray = [];
      this.nodelogsreal = res;
      if(this.nodelogsreal.hasOwnProperty('Status')) {
        this.nodelogfilesize = this.nodelogsreal.Filesize;
        this.nodelogs = this.nodelogsreal.Status;
        temparray = this.nodelogs.split('\n');

        if (temparray == []) {

        } else {
          this.nodelogarray = this.nodelogarray.concat(temparray);
          this.filteredNodelogarray = this.nodelogarray;
        }
        
        setTimeout(() => 
          this.myScrollContainer1.nativeElement.scrollTop = this.myScrollContainer1.nativeElement.scrollHeight, 100);
      }
    }, err => {
      console.log('response not found -> ', err);
      this.presentAlert(err.message);
    });
  }

  filterItems(event) {
    const val = event.target.value;
    console.log('val filter -> ', val);
    console.log('segmentChangedLogValue filter -> ', this.segmentChangedLogValue);
    if(this.segmentChangedLogValue == 'nodelog') {
      if (val && val.trim() != '') {
        this.filteredNodelogarray = this.nodelogarray.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      } else {
        this.filteredNodelogarray = this.nodelogarray;
        return this.filteredNodelogarray;
      }
    } else if(this.segmentChangedLogValue == 'qelmlog') {
      if (val && val.trim() != '') {
        this.filteredqelmlogarray = this.qelmlogarray.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      } else {
        this.filteredqelmlogarray = this.qelmlogarray;
        return this.filteredqelmlogarray;
      }
    }
  }

  qelmlogfunction() {
    this.authprovider.getqelmlogs(this.qelmlogfilesize).subscribe((res) => {
      let temparray = [];
      this.qelmlogsreal = res;
      if(this.qelmlogsreal.hasOwnProperty('Status')) {
        this.qelmlogfilesize = this.qelmlogsreal.Filesize;
        this.qelmlogs = this.qelmlogsreal.Status;

        temparray = this.qelmlogs.split('\n');

        if (temparray == []) {

        } else {
          this.qelmlogarray = this.qelmlogarray.concat(temparray);
          this.filteredqelmlogarray = this.qelmlogarray;
        }
        setTimeout(() => 
          this.myScrollContainer2.nativeElement.scrollTop = this.myScrollContainer2.nativeElement.scrollHeight, 100);
      }
    }, err => {
      console.log('response not found -> ', err);
      this.presentAlert(err.message);
    });

  }


  savenodelog() {
    this.authprovider.getallnodelogs().subscribe((res) => {
      let temparray = [];
      this.nodealllogsreal = res;
      if(this.nodealllogsreal.hasOwnProperty('Status')) {
        this.nodealllogs = this.nodealllogsreal.Status;
        this.downLoadNodeLogFile(this.nodealllogs, "txt");
      }
    });
  }

  saveqelmlog() {
    this.authprovider.getallqelmlogs().subscribe((res) => {
      let temparray = [];
      this.qelmalllogsreal = res;
      if(this.qelmalllogsreal.hasOwnProperty('Status')) {
        this.qelmalllogs = this.qelmalllogsreal.Status;
        this.downLoadQelmLogFile(this.qelmalllogs, "txt");
      }
    });
  }


  downLoadNodeLogFile(data: any, type: string) {
    var blob = new Blob([data], { type: type.toString() });
    var url = window.URL.createObjectURL(blob);
    saveAs(blob,"nodelog.txt");
    window.open(url);

  }

  downLoadQelmLogFile(data: any, type: string) {
    var blob = new Blob([data], { type: type.toString() });
    var url = window.URL.createObjectURL(blob);
    saveAs(blob,"qelmlog.txt");
    window.open(url);

  }

  editnodeinfo(nodeid, nodename, nodeintipv4, nodeintfipv4, nodeclidevicesubnetmask, nodeclidevicegatewayaddress) {

    if((this.ValidateIPaddress(nodeintipv4)) && (this.ValidateIPaddress(nodeintfipv4))) {
      this.authprovider.sendnodeinfo(nodeid, nodename, nodeintipv4, nodeintfipv4, nodeclidevicesubnetmask, nodeclidevicegatewayaddress).subscribe((res) => {
        this.resultfromqkd = res;
        if(this.resultfromqkd.Status == "Success") {
          this.presentSuccess("Node information successfully changed");
        } else {
          this.presentAlert("Something went wrong");    
        }
      })
    } else {
      this.presentAlert("Invalid IP entered");
    }
  }

   editvoaset() {

    if( this.systemstatus == "SYSTEM_BOOT_UP" ){

    
    //Added alert here

/*
    //async eavesdrop() {
      const alert = await this.alertController.create({
        header: 'System STATUS!',
        message: 'System not in bootup state, cannot use this functionality...',
      });
    
      await alert.present();
    //} */

    //Till here
    console.log(this.voaset);
    if((this.voaset <= this.VOA_MAX40) && (this.voaset >= 0)) {
      this.authprovider.sendvoainfo(this.voaset).subscribe((res) => {
        this.resultfromqkd = res;
        if(this.resultfromqkd.Status == "Success") {
          this.presentSuccess("VOA successfully changed");
        } else {
          this.presentAlert("Something went wrong");    
        }
      }) 
    } else {
      this.presentAlert("Invalid VOA setting");
    }

  }else {
    this.presentAlert("System not in boot up state");
  }
  
  if ( this.finalqelmtype == "Alice")
  {
    this.getvoa(function(snap2) {

    }.bind(this));
  }

  }


   editvoaset2() {

    if(this.systemstatus == "SYSTEM_BOOT_UP"){

    
/*
    const alert = await this.alertController.create({
      header: 'System STATUS!',
      message: 'System not in bootup state, cannot use this functionality...',
    }); */
  
    //await alert.present();
    console.log(this.voaset2);
    if((this.voaset2 <= this.VOA_MAX40) && (this.voaset2 >= 0)) {
      this.authprovider.sendvoainfo2(this.voaset2).subscribe((res) => {
        this.resultfromqkd = res;
        if(this.resultfromqkd.Status == "Success") {
          this.presentSuccess("VOA successfully changed");
        } else {
          this.presentAlert("Something went wrong");    
        }
      }) 
    } else {
      this.presentAlert("Invalid VOA setting");
    }
  }else{
    this.presentAlert("System not in boot up state");
  }
  
  if ( this.finalqelmtype == "Alice")
  {
    this.getvoa(function(snap2) {

    }.bind(this));
  }
  }

  editpacomp() {
    if(this.pacomp>=1 && this.pacomp<=99){
      this.authprovider.editpacomp(this.pacomp).subscribe((res)=>{
        this.resultfromqkd = res;
        if(this.resultfromqkd.Status == "Success") {
          this.presentSuccess("PA compression successfully changed");
        } else {
          this.presentAlert("Something went wrong");    
        }
      }) 
    } else {
      this.presentAlert("Invalid PA setting");
    }
  }

  editqelminfo(qelmid, qelmtype, qelmintipv4, qelmpairipv4, qelmremoteipv4) {
    if((this.ValidateIPaddress(qelmintipv4)) && (this.ValidateIPaddress(qelmpairipv4)) && (this.ValidateIPaddress(qelmremoteipv4))) {
      this.authprovider.sendqelminfo(qelmid, qelmtype, qelmintipv4, qelmpairipv4, qelmremoteipv4).subscribe((res) => {
        this.resultfromqkd = res;
        if(this.resultfromqkd.Status == "Success") {
          this.presentSuccess("Q-Element information successfully changed");
        } else {
          this.presentAlert("Something went wrong");    
        }
      }) 
     } else {
        this.presentAlert("Invalid IP entered");
     }  
  }

  setnewpassword(oldpassword, newpassword, confirmpassword) {

    let oldpasshash = CryptoJS.SHA512(this.oldpassword).toString();
    let newpasshash = CryptoJS.SHA512(this.newpassword).toString();

    this.storage.get('usermeta').then((value) => {
      if(oldpasshash == value.passhash) {
        if(newpassword == confirmpassword) {
          if(this.checkpasswordstrength(newpassword)) {
            this.authprovider.sendnewauth(value.userid, oldpasshash, newpasshash, value.role).subscribe((res) => {
              this.resultfromqkd = res;
              this.oldpassword = null;
              this.newpassword = null;
              this.confirmpassword = null;
              this.presentSuccess("Password successfully changed");
            })
          } else {
            this.presentAlert("Password should have 1 Uppercase alphabetical character, 1 numeric character, 1 special character and must be of atleast 8 character long");
          }
         } else {
            this.oldpassword = null;
            this.newpassword = null;
            this.confirmpassword = null;
           this.presentAlert("Confirm password doesn't match the new password");
         }
      } else {
        this.oldpassword = null;
        this.newpassword = null;
        this.confirmpassword = null;
        this.presentAlert("Old Password entered is not correct");
      }
    });
  }

  setnewpasswordforuser(userid, newpassword, confirmpassword) {
    let newpasshash = CryptoJS.SHA512(this.newpassword).toString();
    let role = "";

    if(this.roleheader == "SuperAdmin") {
      if((userid == "operator") || (userid == "cryptoofficer") || (userid == "admin")) {

        if (userid == "operator") {
          role = "operator";
        } else if(userid == "cryptoofficer") {
          role = "officer";
        } else if(userid == "admin") {
          role = "admin";
        }

        if(newpassword == confirmpassword) {
          if(this.checkpasswordstrength(newpassword)) {
            this.authprovider.sendnewauthforuser(userid, newpasshash, role).subscribe((res) => {
              this.resultfromqkd = res;
              this.useridtochange = null;
              this.newpassword = null;
              this.confirmpassword = null;
              this.presentSuccess("Password successfully changed");
            })
          } else {
            this.useridtochange = null;
            this.newpassword = null;
            this.confirmpassword = null;
            this.presentAlert("Password should have 1 Uppercase alphabetical character, 1 numeric character, 1 special character and must be of atleast 8 character long");
          }

         } else {
          this.useridtochange = null;
          this.newpassword = null;
          this.confirmpassword = null;
          this.presentAlert("Confirm password doesn't match the new password");
         }
      } else {
        this.useridtochange = null;
        this.newpassword = null;
        this.confirmpassword = null;
        this.presentAlert("Incorrect UserId");
      } 
    } else if(this.roleheader == "Admin") {
      if((userid == "operator") || (userid == "cryptoofficer")) {

        if (userid == "operator") {
          role = "operator";
        } else if(userid == "cryptoofficer") {
          role = "officer";
        }

        if(newpassword == confirmpassword) {
          if(this.checkpasswordstrength(newpassword)) {
            this.authprovider.sendnewauthforuser(userid, newpasshash, role).subscribe((res) => {
              this.resultfromqkd = res;
              this.useridtochange = null;
              this.newpassword = null;
              this.confirmpassword = null;
              this.presentSuccess("Password successfully changed");
            })
          } else {
            this.useridtochange = null;
            this.newpassword = null;
            this.confirmpassword = null;
            this.presentAlert("Password should have 1 Uppercase alphabetical character, 1 numeric character, 1 special character and must be of atleast 8 character long");
          }

         } else {
          this.useridtochange = null;
          this.newpassword = null;
          this.confirmpassword = null;
          this.presentAlert("Confirm password doesn't match the new password");
         }
      } else {
        this.useridtochange = null;
        this.newpassword = null;
        this.confirmpassword = null;
        this.presentAlert("Incorrect UserId");
      }      
    }

  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  expandpskadd(item) {
    if (item == false) {
      this.pskexpanded = true;
    } else {
      this.pskexpanded = false;
    }
  }

  expandpskbulk(item) {
    if (item == false) {
      this.pskexpandedbulk = true;
    } else {
      this.pskexpandedbulk = false;
    }
  }
  //Adding voa here
  expandvoaadd(item) {
    if(this.systemstatus == 'SYSTEM_BOOT_UP'){
    if (item == false) {
      this.voaexpanded = true;
    } else {
      this.voaexpanded = false;
    }
  }
  }
  expandvoaadd2(item) {
    if(this.systemstatus == 'SYSTEM_BOOT_UP'){
    if (item == false) {
      this.voaexpanded2 = true;
    } else {
      this.voaexpanded2 = false;
    }
  }
  }
  expandpa(item){
    if(item==false){
      this.paexpanded=true;
    } else{
      this.paexpanded=false;
    }
  }

  getvoathreshold(callback){
    console.log("function called")
    this.authprovider.getvoathreshold().subscribe((res) => {
      this.resultfromqkd = res;
      console.log(this.resultfromqkd)
      if (this.resultfromqkd.parameter_name=="VOA"){
        this.VOA_MAX3=this.resultfromqkd.parameter_max_3m
        this.VOA_MAX40=this.resultfromqkd.parameter_max_40km
        console.log(this.VOA_MAX3, this.VOA_MAX40)
      }
      callback(0);
    },
    () => callback(0)
    )

  }

  getvoa(callback){
    console.log("function called")
    this.authprovider.getvoa().subscribe((res) => {
      this.resultfromqkd = res;
      if (this.resultfromqkd.Status=="Success"){
        this.voaset=this.resultfromqkd.VOA1
        this.voaset2=this.resultfromqkd.VOA2
      }
      callback(0);
    },
    () => callback(0)
    )

  }
  //till here

  expanddiagnose(index) {
    if(this.diagnose[index] == true) {
      this.diagnose[index] = false;
    } else {
      this.diagnose[index] = true;
    }
  }

  expandconfigalice(index) {
    if(this.configalice[index] == true) {
      this.configalice[index] = false;
    } else {
      this.configalice[index] = true;
    }
  }

  /*addpsk() {
    if(this.checkpskstrength(this.newpsk)) {
      this.authprovider.apppskinfo(this.newpsk).subscribe((res) => {
        this.resultfromqkd = res;
        this.psk = this.newpsk;
        this.newpsk = "";
        this.presentSuccess("Pre-Shared key successfully saved");
      })
    } else {
      this.presentAlert("Pre-Shared Key should be of atleast 2176 characters long");
    }
  }*/


  setsystemsetup(qcdistance, qcloss, clockdistance, clockloss, channeltype1, channeltype2, groundvoltage, saelocal, saelocalip, saeremote,    saeremoteip, keytype) {
    
  }


  diagnosefunc1() {
    this.internalcheckon = 1;
    this.authprovider.dointernalcheck().subscribe((res) => {
      this.internalcheckon = 0;
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("Internal Communication OK");
      } else {
        this.presentAlert("Internal Communication check failed");
      }
    });
  }

  diagnosefunc2() {
    this.externalcheckon = 1;
    this.authprovider.doexternaclheck().subscribe((res) => {
      this.externalcheckon = 0;
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("Classical Channel OK");
      } else {
         this.presentAlert("Classical Channel check failed");
      }
    }); 
  }

  diagnosefunc3(){
    this.syncchannelcheckon=1;
    this.authprovider.dosyncchanheck().subscribe((res) => {
      this.syncchannelcheckon = 0;
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess(this.resultfromqkd.Reason);
      } else {
         this.presentAlert("Sync Channel check failed");
      }
    }); 

  }

  diagnosefunc4(){
    this.externalcheckconnect=1;
    this.authprovider.doexternalconnectcheck(this.nodeid).subscribe((res) => {
      this.externalcheckconnect = 0;
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        if(this.resultfromqkd.data=="1"){
          this.presentAlert("Value from backend ")
          this.presentAlert(this.resultfromqkd.data)
        }
        this.presentSuccess(this.resultfromqkd.data);
      } else {
         this.presentAlert("Connection to destination node Failed!");
         this.presentAlert_Tnode("Value from sitara : ",this.resultfromqkd.Value)
         this.presentAlert_Tnode("Dest_id from sitara : ",this.resultfromqkd.Dest_id)
         this.presentAlert_Tnode("Data from sitara : ",this.resultfromqkd.data)
         
      }
    }); 

  }

  diagnosefunc5(){
    this.externalcheckconnect=1;
    this.authprovider.doexternalconnectcheckall(this.nodeid).subscribe((res) => {
      this.externalcheckconnect = 0;
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess(this.resultfromqkd.Reason);
      } else {
         this.presentAlert("Connection to destination node Failed!");
      }
    }); 

  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.dofinallogout();
          }
        }
      ]
    });

    await alert.present();
  }

  dofinallogout() {
    this.storage.remove('usermeta').then(function (next) {
      this.router.navigate(["login"]);
    }.bind(this));
  }


 async presentAlert(message) {
  let alert = await this.alertController.create({
    header: 'Oops',
    message: message,
    buttons: ['Ok']
  });
  await alert.present();
}
async presentAlert_Tnode(message,p1) {
  let alert = await this.alertController.create({
    header: 'Oops',
    message: message+p1,
    buttons: ['Ok']
  });
  await alert.present();
}
 async presentSuccess(message) {
  let alert = await this.alertController.create({
    header: 'Success',
    message: message,
    buttons: ['Ok']
  });
  await alert.present();
}
async presentmodeSuccess(message, mode){
  if(mode==2){
    message="Intermediate data saved successfully"
  }
  let alert = await this.alertController.create({
    header: 'Success',
    message: message,
    buttons: ['Ok']
  });
  await alert.present();
}

async presentbulkupload(result) {
  var str=result.NumKeys + " Successfully added"
  if (result.Status != "Success"){
    str= str + " before encountering failure"
  }
  console.log(result.NumKeys)
  let alert = await this.alertController.create({
    header: result.Status,
    subHeader: result.Message,
    message: str,
    buttons: ['Ok']
  });
  await alert.present();
}



  async flushselfkeys() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to flush self keys?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.dofinalselfkeyflush();
          }
        }
      ]
    });

    await alert.present();
  }

  dofinalselfkeyflush() {
    this.authprovider.flushselfkeys().subscribe((res) => {
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("Self keys flush successful");

        // this.authprovider.doexternaclheck().subscribe((res) => {
        //   this.resultfromqkd = res;
        //   if(this.resultfromqkd.Status == "Success") {
            this.authprovider.getkeycount().subscribe((res) => {
              this.pskreal = res;
              this.numofselfkeysavailable = this.pskreal.self_key_count
              this.numoframkeysavailable = this.pskreal.ram_key_count
              this.credentialsloadover = 1;
            }); 
        //   }
        // },
        //   () => console.log("Error doing externalcheck")
        // ); 

      } else {
        this.presentAlert("Self keys flush failed");

        // this.authprovider.doexternaclheck().subscribe((res) => {
        //   this.resultfromqkd = res;
        //   if(this.resultfromqkd.Status == "Success") {
            this.authprovider.getkeycount().subscribe((res) => {
              this.pskreal = res;
              this.numofselfkeysavailable = this.pskreal.self_key_count
              this.numoframkeysavailable = this.pskreal.ram_key_count
              this.credentialsloadover = 1;
            }); 
        //   }
        // },
        //   () => console.log("Error doing externalcheck")
        // ); 

      }
    }); 
  }


  async flushramkeys() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to flush quantum keys?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.dofinalramkeyflush();
          }
        }
      ]
    });

    await alert.present();
  }

  dofinalramkeyflush() {
    this.authprovider.flushramkeys().subscribe((res) => {
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("Quantum keys flush successful");
        // this.authprovider.doexternaclheck().subscribe((res) => {
        //   this.resultfromqkd = res;
        //   if(this.resultfromqkd.Status == "Success") {
            this.authprovider.getkeycount().subscribe((res) => {
              this.pskreal = res;
              this.numofselfkeysavailable = this.pskreal.self_key_count
              this.numoframkeysavailable = this.pskreal.ram_key_count
              this.credentialsloadover = 1;
            }); 
        //   }
        // },
        //   () => console.log("Error doing externalcheck")
        // ); 

      } else {
        this.presentAlert("Quantum keys flush failed");

        this.authprovider.doexternaclheck().subscribe((res) => {
          this.resultfromqkd = res;
          if(this.resultfromqkd.Status == "Success") {
            this.authprovider.getkeycount().subscribe((res) => {
              this.pskreal = res;
              this.numofselfkeysavailable = this.pskreal.self_key_count
              this.numoframkeysavailable = this.pskreal.ram_key_count
              this.credentialsloadover = 1;
            }); 
          }
        },
          () => console.log("Error doing externalcheck")
        ); 

      }
    }); 
  }
//Trusted node additions
async flushramkeys_tnode() {
  console.log('flushKeyNodes flushramkeys_tnode -> ', this.flushKeyNodes);
  const alert = await this.alertController.create({
    header: 'Confirm!',
    message: 'Are you sure you want to flush quantum keys?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Yes',
        handler: () => {
          this.dofinalramkeyflush_tnode();
        }
      }
    ]
  });

  await alert.present();
}

dofinalramkeyflush_tnode() {
  console.log('---dofinalramkeyflush_tnode flushKeyNodes ---> ', this.flushKeyNodes);
  this.loadingFlushKeysPerNodeData = true;
  if(this.flushKeyNodes != undefined) {
    this.authprovider.flushramkeys_tnodeall(this.flushKeyNodes.length, this.flushKeyNodes).subscribe((res) => {
      console.log('res flushramkeys_tnodeall -> ', res);
      this.loadingFlushKeysPerNodeData = false;
      this.resultfromqkd = res
      this.jsonFlushKeyObj = this.resultfromqkd.flush_status;
      console.log('jsonFlushKeyObj flushramkeys_tnodeall -> ', this.jsonFlushKeyObj);
      this.jsonFlushKeyObj.forEach(fkey => {
        if(fkey.status == 1) {
          this.presentSuccess("Quantum keys flush successful for Node ID - " + fkey.node_id);
        } else if(fkey.status == 0) {
          this.presentAlert("Quantum keys flush across the path failed for Node ID - " + fkey.node_id + ". Please flush the keys manually!");
        } else {
          this.presentAlert("Something Went Wrong!");
        }
      });
    }, err => {
      console.log('flushramkeys_tnodeall response not found -> ', err);
      this.loadingFlushKeysPerNodeData = false;
      this.presentAlert(err.message);
    });
  } else {
    this.loadingFlushKeysPerNodeData = false;
    this.presentAlert("Please Select ateast 1 Node");
  }
}


startkeymigration() {
  this.authprovider.dostartkeymigration(this.dest_id,this.path_option).subscribe((res) => {
    this.externalcheckconnect = 0;
    this.resultfromqkd = res;
    if(this.resultfromqkd.Status == "Success") {
      this.presentSuccess(this.resultfromqkd.Value);
    } else {
       this.presentAlert("Connection to destination node Failed!");
       this.presentAlert_Tnode("Value from sitara : ",this.resultfromqkd.Value);
    }
  }); 

}

stopkeymigration() {
  this.authprovider.dostopkeymigration(this.dest_id,this.path_option).subscribe((res) => {
    this.externalcheckconnect = 0;
    this.resultfromqkd = res;
    if(this.resultfromqkd.Status == "Success") {
      this.presentSuccess(this.resultfromqkd.Reason);
    } else {
       this.presentAlert("Connection to destination node Failed!");
       this.presentAlert_Tnode("Value from sitara : ",this.resultfromqkd.Value);
    }
  }); 

}

startkeymigrationall() {
  this.authprovider.dostartkeymigrationall().subscribe((res) => {
    this.externalcheckconnect = 0;
    this.resultfromqkd = res;
    if(this.resultfromqkd.Status == "Success") {
      this.presentSuccess(this.resultfromqkd.Reason);
    } else {
       this.presentAlert("Connection to destination node Failed!");
       this.presentAlert(this.resultfromqkd.Reason);
    }
  }); 

}

stopkeymigrationall() {
  this.authprovider.dostopkeymigrationall().subscribe((res) => {
    this.externalcheckconnect = 0;
    this.resultfromqkd = res;
    if(this.resultfromqkd.Status == "Success") {
      this.presentSuccess(this.resultfromqkd.Reason);
    } else {
       this.presentAlert("Connection to destination node Failed!");
       this.presentAlert(this.resultfromqkd.Reason);
    }
  }); 

}

//SPD EMERGENCY

async spdtemp(spdtemp:any, time:any) {
  let str= 'SPD temperature:' + spdtemp + '    time:' + time;
  const alert = await this.alertController.create({
    header: 'SPD temperature beyond threshold',
    message: str,
  });

  await alert.present();
}


spdtemp2() {

  console.log("reached here")
  this.authprovider.spdtemp2().subscribe((res) => {
    this.resultfromqkd = res;
    if(this.resultfromqkd.Status == "Success") {
      this.presentSuccess("spd temp resultfromqkd.Status == success ");
     
    } else {
      //this.presentAlert("Quantum keys flush failed");

      console.log("and reached here")
    }
  }); 
  // const alert = await this.alertController.create({
  //   header: 'Eaves Dropping ALERT!',
  //   message: 'Eaves dropping detected...',
  // });

  // await alert.present();
}


 eavesdrop() {

  console.log("reached here")
  this.authprovider.eavesdrop().subscribe((res) => {
    this.resultfromqkd = res;
    if(this.resultfromqkd.Status == "critical") {
      this.presentSuccess("eaves drop resultfromqkd.Status == success ");
     this.presentAlert("EAVES DROPPING ALERT!!! Abanodon key!")
    } else {
      //this.presentAlert("evaes drop failed :) ");

      console.log("and reached here")
    }
  }); 
  // const alert = await this.alertController.create({
  //   header: 'Eaves Dropping ALERT!',
  //   message: 'Eaves dropping detected...',
  // });

  // await alert.present();
}



  aeminiton() {
    this.aemonstarted = 1;
    this.authprovider.doaemon().subscribe((res) => {
      this.aemonstarted = 0;
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("AEM Initialization Done");
      } else {
        this.presentAlert("AEM Initialization failed");
      }
    });
  }

  testfunction1() {
    this.aemoffstarted = 0;
    this.presentSuccess("AEM Off Done");
  }

   aeminitoff() {
    this.aemoffstarted = 1;
    this.authprovider.doaemoff().subscribe((res) => {
      this.aemoffstarted = 0;
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("AEM Off Done");
      } else {
        this.presentAlert("AEM Off failed");
      }
    });

  }

  bemturnon() {
    this.bemonstarted = 1;
    this.authprovider.dobemon().subscribe((res) => {
      this.bemonstarted = 0;
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("BEM Turn On Done");
      } else {
        this.presentAlert("BEM Turn On failed");
      }
    });
  }

  bemturnoff() {
    this.bemoffstarted = 1;
    this.authprovider.dobemoff().subscribe((res) => {
      this.bemoffstarted = 0;
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("BEM Turn Off Done");
      } else {
        this.presentAlert("BEM Turn Off failed");
      }
    });
  }

  savemodeselection(qkdmode) {
    //console.log(this.qkdmode, this.qkddatatype);

    let mode = "0";
    let datatype = "0";

    if(qkdmode == 0) {
      mode = "0";
    }else if(qkdmode == 2) {
      mode = "2";
    }


    if(this.qkddatatype == "Tunned Data") {
      datatype = "1";
    } else if(this.qkddatatype == "Non-Tunned Data") {
      datatype = "0";
    }

    if ( this.finalqelmtype == "Alice")
    {
      this.getvoa(function(snap2) {
  
      }.bind(this));
    
      if(this.voaset < this.VOA_MAX40 && this.voaset > this.VOA_MAX3){
        this.fiberlength="40 km";
      } else if(this.voaset < this.VOA_MAX3){
        this.fiberlength="3 m"
      }
      if(this.systemstatus == "SYSTEM_BOOT_UP"){
        this.presentAlertvoaconfirm(this.fiberlength, mode, datatype);
      } else {
        this.authprovider.setmode(mode, datatype).subscribe((res) => {
          this.resultfromqkd = res;
          if(this.resultfromqkd.Status == "Success") {
            this.presentmodeSuccess("QKD mode successfully set", mode);
          } else {
            this.presentAlert("QKD mode set failed");
          }
        });
      }
    } else{
      this.authprovider.setmode(mode, datatype).subscribe((res) => {
        this.resultfromqkd = res;
        if(this.resultfromqkd.Status == "Success") {
          this.presentmodeSuccess("QKD mode successfully set", mode);
        } else {
          this.presentAlert("QKD mode set failed");
        }
      });
    }




  }

  async presentAlertvoaconfirm(length:string, mode:string, datatype:string) {
    const alert = await this.alertController.create({
      header: 'VOA settings correspond to ' + length,
      message: 'Ensure fiber length to protect SPD',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => { /*
            if(this.voaset < this.VOA_MAX40) {
              this.authprovider.sendvoainfo(this.voaset).subscribe((res)=>{
                this.resultfromqkd = res;
                this.authprovider.sendvoainfo2(this.voaset2).subscribe((res) => {
                  this.resultfromqkd = res;
                  if(this.resultfromqkd.Status == "Success") {
                    this.presentSuccess("VOA successfully set");*/
                    this.authprovider.setmode(mode, datatype).subscribe((res) => {
                      this.resultfromqkd = res;
                      if(this.resultfromqkd.Status == "Success") {
                        this.presentSuccess("QKD mode successfully set");
                      } else {
                        this.presentAlert("QKD mode set failed");
                      }
                    });/*
                  } else {
                    this.presentAlert("Something went wrong");    
                  }
                }) ;
              });
            } else {
              this.presentAlert("Invalid VOA setting");
            }
*/
          }
        }
      ]
    });

    await alert.present();
  }

  savesetupdata() {
    console.log(this.tsthreshold, this.qberthreshold, this.synccollectionstate);
    let collectionstate = "0";
    if(this.synccollectionstate == "On") {
      collectionstate = "1";
    } else if(this.synccollectionstate == "Off") {
      collectionstate = "0";
    }

    this.authprovider.setsetup(this.tsthreshold, this.qberthreshold, collectionstate).subscribe((res) => {
      this.resultfromqkd = res;
      this.synccollectionstate = "Off";
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("QBER Threshold Set successfully");
      } else {
        this.presentAlert("QBER Threshold Set failed");
      }
    });


  }


  /*orangeselection() {
    console.log(this.orangeval);

    let orange = 0;

    if(this.orangeval == "Full Scan") {
      orange = 0;
    } else if(this.orangeval == "Limited Scan") {
      orange = 1;
    }

    this.authprovider.setorange(orange).subscribe((res) => {
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("Offset Scan successfully set");
      } else {
        this.presentAlert("Offset Scan set failed");
      }
    });

  }*/

 /* tunesetselection(tuneset) {
    console.log(tuneset);

    this.authprovider.settune(tuneset).subscribe((res) => {
      this.resultfromqkd = res;
      if(this.resultfromqkd.Status == "Success") {
        this.presentSuccess("Tune Selection successfully set");
      } else {
        this.presentAlert("Tune Selection set failed");
      }
    });

  }*/


getparametertypeAlice() {
  this.masterparametertypealice = [
    {
      name: "Qber",
      id: 0,
      checked: true,
      dataLinechart: this.average_signal_qber,
      label: this.qbertstamp,
      min: 1,
      max: 50,
      yaxistext: "Quantum Bit Error rate",
      yAxisId: "Qber"
    },
    {
      name: "Key rate",
      id: 1,
      checked: true,
      dataLinechart: this.keyrate,
      label: this.keyratetstamp,
      min: 0,
      max: 50,
      yaxistext: "Key rate (kbps)",
      yAxisId: "KeyRate"
    }
  ]
}

getparametertypeBob() {
  this.masterparametertypebob = [
    {
      name: "Click Count 1",
      id: 0,
      checked: true,
      dataLinechart: this.ccount1,
      label: this.ccounttstamp,
      min: 0,
      max: 7000,
      yaxistext: "Click Count SPD 1",
      yAxisId: "ClickCount1"
    },
    {
      name: "Qber",
      id: 1,
      checked: true,
      dataLinechart: this.average_signal_qber,
      label: this.qbertstamp,
      min: 1,
      max: 50,
      yaxistext: "Quantum Bit Error rate",
      yAxisId: "Qber"
    },
    {
      name: "Key rate",
      id: 2,
      checked: true,
      dataLinechart: this.keyrate,
      label: this.keyratetstamp,
      min: 0,
      max: 50,
      yaxistext: "Key rate (kbps)",
      yAxisId: "KeyRate"
    },
    {
      name: "Click Count 2",
      id: 3,
      checked: true,
      dataLinechart: this.ccount2,
      label: this.ccounttstamp,
      min: 0,
      max: 7000,
      yaxistext: "Click Count SPD 2",
      yAxisId: "ClickCount2"
    }
  ]
}

  startgraph() {
    this.graphparameterstarted = 1;
    this.graphstarted = 1;
    this.graphlogfilesize = 0;

    this.average_signal_qber = [];
    this.qbertstamp = [];
    this.clickrawtimestamp = [];
    this.rawtstamp = [];
    this.keyrate = [];
    this.keyratetstamp = [];
    this.ccount1 = [];
    this.ccount2 = [];
    console.log('this.finalqelmtype start -> ', this.finalqelmtype);
    if(this.finalqelmtype == 'Alice') {  
      this.selectedArray = this.masterparametertypealice.filter(d => d.checked === true)
    } else if(this.finalqelmtype == 'Bob') {
      this.selectedArray = this.masterparametertypebob.filter(d => d.checked === true)
    }
    console.log('selectedArray startgraph -> ', this.selectedArray);
    // if(this.selectedArray.length == 0) {
    //   setInterval(() => {
    //     this.presentAlert("Please Select atleast one Parameter");
    //     this.stopgraph();
    //   }, 2000);
    // } else {
      this.graphtimerId = setInterval(() => this.interrunforgraph(), 2000);
    // }
  }

  graphparameterclicked(event, i) {
    console.log('event detail.checked -> ', event.detail.checked);
    console.log('event i -> ', i);
    if(event.detail.checked == true) {
      this.selectedArray.push(i);
      this.stopgraph();
      this.startgraph();
    } else if(event.detail.checked == false) {
      const objIndex = this.selectedArray.findIndex(o => o.checked == false)
      console.log('event objIndex -> ', objIndex);
      if(objIndex > -1) {
        this.selectedArray.splice(objIndex, 1);
      }
      this.stopgraph();
      this.startgraph();
    } 
    console.log('event selectedArray graphparameterclicked -> ', this.selectedArray);
  }

  stopgraph() {
    this.graphparameterstarted = 0;
    this.graphstarted = 0;
    this.graphlogfilesize = 0;
    clearInterval(this.graphtimerId);
  }

  checkforalerts(){
    this.authprovider.checkforalerts().subscribe((res) => {
      console.log(res)
      this.active_event_list=res
      let i=0
      this.event_list=[]
      this.number_active_event=this.active_event_list.ActiveEvents
      for (i=0; i< this.number_active_event;i++)
      {
        this.event_list[i]=this.active_event_list.EventList[i]
        this.event_list[i].EventAssertTime =this.secondsToDhms(this.event_list[i].EventAssertTime);
      }

          });

  }


  interrunforgraph() {
    this.authprovider.getqkdstatus().subscribe((res) => {
      this.statusreal = res;
      this.systemstatus = this.statusreal.message
      this.credentialsloadover = 1;
      this.runforgraph();
    });  
  }




  runforgraph() {
    
    this.qelmalllogsreal = [];
    this.authprovider.getqelmlogs(this.graphlogfilesize).subscribe((res) => {
      let temparray = [];
      this.qelmalllogsreal = res;
      if(this.qelmalllogsreal.hasOwnProperty('Status')) {
        this.qelmalllogs = this.qelmalllogsreal.Status;
        this.graphlogfilesize = this.qelmalllogsreal.Filesize;
        temparray = this.qelmalllogs.split('\n');
      }

      let localqber = [];
      let localqbertstamp = [];
      let localclickrawtimestamp = [];
      let localrawtstamp = [];

      let clickcount1 = [];
      let clickcount2 = [];
      let clickcount1_1 = [];
      let clickcount2_1 = [];
      let clickts = [];
      
      let key_bits = 0;
      let keyratetemp = "";
      let keyratetstemp = "";

      let clickcounttemp = 0;
      let clickcountetstemp = "";

      let temprand = [];
      let temprandts = [];

      let temprandqber = [];
      let temprandqberts = [];
      let clickcountts = [];

      let temprandclick = [];
      let temprandclickts = [];


      for(let i = 0; i<((temparray.length)-1);i++) {
        console.log(temparray[i]);
        let teststring = temparray[i];
        if (/^[\],:{}\s]*$/.test(teststring.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

          let obj = JSON.parse(temparray[i]);
          console.log('obj -> ', obj);

           if(obj.hasOwnProperty('average_signal_qber')) {              
             localqber.push((obj.average_signal_qber).toFixed(2));
             localqbertstamp.push(obj.ts);
             keyratetstemp = obj.ts;
             clickcountetstemp = obj.ts;
           }

           if(obj.hasOwnProperty('Click_Count1')) {
             clickcount1.push(obj.Click_Count1);
            clickts.push(obj.ts);
            clickcountetstemp = obj.ts;
          }
          if(obj.hasOwnProperty('Click_Count2')) {
            clickcount2.push(obj.Click_Count2);
           clickts.push(obj.ts);
           clickcountetstemp = obj.ts;
         }



           if(obj.hasOwnProperty('Key_bits')) {       //num_of_keys //key_bits
             key_bits = key_bits + obj.Key_bits;
             keyratetstemp = obj.ts;
             clickcountetstemp = obj.ts;
           }

        } else {
          console.log("Not JSON", temparray[i]);
        }
      }

      keyratetemp = (key_bits/2000).toFixed(2);

      if(this.keyrate.length < 20) {
        this.keyrate.push(keyratetemp);
        this.keyratetstamp.push(keyratetstemp);

      } else {
        temprand = this.keyrate.slice(1, 20); 
        temprand.push(keyratetemp);
        temprandts = this.keyratetstamp.slice(1,20);
        temprandts.push(keyratetstemp);

        this.keyrate = temprand;
        this.keyratetstamp = temprandts;
      }


      if((this.average_signal_qber.length + localqber.length) < 20) {   //localqber localqbertstamp
        temprandqber = this.average_signal_qber;
        temprandqberts = this.qbertstamp;
        for(let j = 0; j<localqber.length;j++) {
          temprandqber.push(localqber[j]);
          temprandqberts.push(localqbertstamp[j]);

        }
      } else {
        temprandqber = this.average_signal_qber.slice((this.average_signal_qber.length + localqber.length - 20), this.average_signal_qber.length); 
        temprandqberts = this.qbertstamp.slice((this.qbertstamp.length + localqbertstamp.length - 20), this.qbertstamp.length); 

        for(let k = 0; k<localqber.length;k++) {
           temprandqber.push(localqber[k]);
           temprandqberts.push(localqbertstamp[k]);
        }
      }

      this.average_signal_qber = temprandqber;
      this.qbertstamp = temprandqberts;

      if((this.ccount1.length + clickcount1.length) < 20) {   //clickcount1 clickcount2 clickts
        clickcount1_1 = this.ccount1;
        clickcount2_1 = this.ccount2;
        clickcountts = this.ccounttstamp;
        for(let j = 0; j<clickcount1.length;j++) {
          clickcount1_1.push(clickcount1[j]);
          clickcount2_1.push(clickcount2[j]);
          clickcountts.push(clickts[j]);
    
        }
      } else {
        clickcount1_1 = this.ccount1.slice((this.ccount1.length + clickcount1.length - 20), this.ccount1.length);
        clickcount2_1 = this.ccount2.slice((this.ccount2.length + clickcount2.length - 20), this.ccount2.length);
        clickcountts = this.ccounttstamp.slice((this.ccounttstamp.length + clickts.length - 20), this.ccounttstamp.length); 
    
        for(let k = 0; k<clickcount1.length;k++) {
           clickcount1_1.push(clickcount1[k]);
           clickcount2_1.push(clickcount2[k]);
           clickcountts.push(clickts[k]);
        }
      }
    
      this.ccount1 = clickcount1_1;
      this.ccount2 = clickcount2_1;
      this.ccounttstamp = clickcountts;
      
      if(this.finalqelmtype == "Bob") {
        this.renderlinechart(this.ccount1, this.ccounttstamp, 0, 7000, "Click Count SPD 1", "ClickCount1");
      } else if(this.finalqelmtype == "Alice") {
        this.renderlinechart(this.average_signal_qber, this.qbertstamp, 1, 50, "Quantum Bit Error rate", "Qber");
      }
      console.log(this.average_signal_qber);
      console.log(this.qbertstamp)
    });

  }


//Add here for extracting eaves dropping message and spd temperature
eavesdropping(callback){
  this.initqelmalllogsreal = [];
    this.authprovider.getqelmlogs(0).subscribe((res) => {
      let temparray = [];
      this.initqelmalllogsreal = res;
      //if(this.initqelmalllogsreal.hasOwnProperty('Status')) {
        if(this.initqelmalllogsreal.hasOwnProperty('Message')) {
        this.qelmalllogs = this.initqelmalllogsreal.Status;
        temparray = this.qelmalllogs.split('\n');
      }



      for(let i = 0; i<((temparray.length)-1);i++) {
        //console.log(temparray[i]);
        let teststring = temparray[i];
        if (/^[\],:{}\s]*$/.test(teststring.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

          let obj = JSON.parse(temparray[i]);

          if(obj.hasOwnProperty('Eaves')) {                      
            this.qberdisplay = (obj.Qb_error).toFixed(2) ;
            //this.qberdisplay = ((obj.Qb_error * 100).toFixed(2));
          }



        } else {
          console.log("Not JSON", temparray[i]);
        }
      }
    callback(0);
    },
      () => callback(0)
    );
}

//SPD temperature
spdtemperature(callback){
  this.initqelmalllogsreal = [];
    this.authprovider.getsitaraqelmlogs(0).subscribe((res) => {
      let temparray = [];
      this.initqelmalllogsreal = res;
      //if(this.initqelmalllogsreal.hasOwnProperty('Status')) {
        if(this.initqelmalllogsreal.hasOwnProperty('Temperature')) {
        this.qelmalllogs = this.initqelmalllogsreal.Status;
        temparray = this.qelmalllogs.split('\n');
      }
    
    
    
      for(let i = 0; i<((temparray.length)-1);i++) {
        //console.log(temparray[i]);
        let teststring = temparray[i];
        if (/^[\],:{}\s]*$/.test(teststring.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
    
          let obj = JSON.parse(temparray[i]);
    
          if(obj.hasOwnProperty('FCM_TEMP1')) {                      
            this.qberdisplay = (obj.Qb_error).toFixed(2) ;
            //this.qberdisplay = ((obj.Qb_error * 100).toFixed(2));
          }
    
    
    
        } else {
          console.log("Not JSON", temparray[i]);
        }
      }
    callback(0);
    },
      () => callback(0)
    );
  }
//Till here
    getparainit(callback) {

    this.initqelmalllogsreal = [];
      this.authprovider.getqelmlogs(0).subscribe((res) => {
        let temparray = [];
        this.initqelmalllogsreal = res;
        if(this.initqelmalllogsreal.hasOwnProperty('Status')) {
          this.qelmalllogs = this.initqelmalllogsreal.Status;
          temparray = this.qelmalllogs.split('\n');
        }



        for(let i = 0; i<((temparray.length)-1);i++) {
          console.log(temparray[i]);
          let teststring = temparray[i];
          if (/^[\],:{}\s]*$/.test(teststring.replace(/\\["\\\/bfnrtu]/g, '@').
          replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
          replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

            try
            {
            let obj = JSON.parse(temparray[i]);

            if(obj.hasOwnProperty('Qb_error')) {                      
              this.qberdisplay = (obj.Qb_error).toFixed(2) ;
              //this.qberdisplay = ((obj.Qb_error * 100).toFixed(2));
            }


            if(obj.hasOwnProperty('Click_Count')) {
              this.clickcountdisplay = obj.Click_Count;
            }

            if(obj.hasOwnProperty('Node_ID')) {
              this.node_id = obj.Node_ID;
            }
            // if(obj.hasOwnProperty('IP_Address')) {
            //   this.ip_addr = obj.IP_Address;
            // }
            if(obj.hasOwnProperty('Connect_Status')) {
              this.connect_status = obj.Connect_Status;
            }
            }
            catch (Error)
            {
              console.log(Error.message)
            }
  //alert for broken path to adjacent nodes
  if(this.connect_status == "DOWN"){
    this.presentAlert_Tnode("Path corresponding to adjacent node broken! \n Node ID : ",this.node_id);
  }

          } else {
            console.log("Not JSON", temparray[i]);
          }
        }
      callback(0);
      },
        () => callback(0)
      );
  }

  showEnvironmentalParameters() {  
    if (!this.showHoverCard) {
      this.showHoverCard = true;
    } else {
      this.showHoverCard = false;
    }
  }

   getparamoninit(callback) {

    let statusbit = 0;

    this.sysmonlogsreal = [];
    this.subscription = this.everyThreeSeconds.subscribe(() => {
      this.authprovider.getsysmonlogs(0).subscribe((res) => {
        let temparray = [];
        this.sysmonlogsreal = res;
        if(this.sysmonlogsreal.hasOwnProperty('Status')) {
          this.sysmonalllogs = this.sysmonlogsreal.Status;
          temparray = this.sysmonalllogs.split('\n');
        }

        let tach4msbint = "";
        let tach4lsbint = "";
        let tach3msbint = "";
        let tach3lsbint = "";
        let tach2msbint = "";
        let tach2lsbint = "";
        let tach1msbint = "";
        let tach1lsbint = "";

        for(let i = 0; i<((temparray.length)-1);i++) {
    //     console.log(temparray[i]);
          let teststring = temparray[i];
          if (/^[\],:{}\s]*$/.test(teststring.replace(/\\["\\\/bfnrtu]/g, '@').
          replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
          replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
      //     console.log(teststring);

            try
            {
            let obj = JSON.parse(temparray[i]);

            if(obj.hasOwnProperty('Tacho4_MSB')) { 

              if(obj.Tacho4_MSB.length == 2) {
                tach4msbint = obj.Tacho4_MSB;
              } else {
                tach4msbint = "0" + obj.Tacho4_MSB;
              }

              if(obj.Tacho4_LSB.length == 2) {
                tach4lsbint = obj.Tacho4_LSB;
              } else {
                tach4lsbint = "0" + obj.Tacho4_LSB;
              }

              let tacho4string = tach4msbint + tach4lsbint

              //console.log(tacho4string);                   
              this.fanspeed4 = (((90000*60)/parseInt(tacho4string, 16))/2).toFixed(0);
              console.log('Tacho 4 fanspeed4 -> ', this.fanspeed4);
            }

            if(obj.hasOwnProperty('Tacho3_MSB')) { 

              if(obj.Tacho3_MSB.length == 2) {
                tach3msbint = obj.Tacho3_MSB;
              } else {
                tach3msbint = "0" + obj.Tacho3_MSB;
              }

              if(obj.Tacho3_LSB.length == 2) {
                tach3lsbint = obj.Tacho3_LSB;
              } else {
                tach3lsbint = "0" + obj.Tacho3_LSB;
              }

              let tacho3string = tach3msbint + tach3lsbint

              //console.log(tacho3string);                   
              this.fanspeed3 = (((90000*60)/parseInt(tacho3string, 16))/2).toFixed(0);
              console.log('Tacho 3 fanspeed3 -> ', this.fanspeed3);
            }


            if(obj.hasOwnProperty('Tacho2_MSB')) { 

              if(obj.Tacho2_MSB.length == 2) {
                tach2msbint = obj.Tacho2_MSB;
              } else {
                tach2msbint = "0" + obj.Tacho2_MSB;
              }

              if(obj.Tacho2_LSB.length == 2) {
                tach2lsbint = obj.Tacho2_LSB;
              } else {
                tach2lsbint = "0" + obj.Tacho2_LSB;
              }

              let tacho2string = tach2msbint + tach2lsbint

              //console.log(tacho2string);                   
              this.fanspeed2 = (((90000*60)/parseInt(tacho2string, 16))/2).toFixed(0);
              console.log('Tacho 2 fanspeed2 -> ', this.fanspeed2);
            }


            if(obj.hasOwnProperty('Tacho1_MSB')) { 

              if(obj.Tacho1_MSB.length == 2) {
                tach1msbint = obj.Tacho1_MSB;
              } else {
                tach1msbint = "0" + obj.Tacho1_MSB;
              }

              if(obj.Tacho1_LSB.length == 2) {
                tach1lsbint = obj.Tacho1_LSB;
              } else {
                tach1lsbint = "0" + obj.Tacho1_LSB;
              }

              let tacho1string = tach1msbint + tach1lsbint

              //console.log(tacho1string);
              this.fanspeed1 = (((90000*60)/parseInt(tacho1string, 16))/2).toFixed(0);
              console.log('Tacho 1 fanspeed1 -> ', this.fanspeed1);
            }
                if(this.finalqelmtype == "Bob") {
                if(obj.hasOwnProperty('FCM_TEMP12')) { 
                      
                  this.systemtemp = obj.FCM_TEMP12;
                  console.log('Bob systemtemp -> ', this.systemtemp);
                }
              }
              else if(this.finalqelmtype == "Alice") {
                if(obj.hasOwnProperty('FCM_TEMP1')) { 
                    
                  this.systemtemp = obj.FCM_TEMP1
                  console.log('Alice systemtemp -> ', this.systemtemp);
              }
            }
          }
          catch (Error)
          {
            console.log(Error.message)
          }



          } else {
            console.log("Not JSON", temparray[i]);
          }
        }
        callback(0);
      },
        () => callback(0)
      );
    });
  }




  /*runforgraph() {
    console.log(this.parametertype);

    this.qelmalllogsreal = [];
    //this.authprovider.getqelmlogs(this.graphlogfilesize).subscribe((res) => {

      let localqber = [];
      let localqbertstamp = [];
      let localclickrawtimestamp = [];
      let localrawtstamp = [];
      let localfilttscount = [];
      let localfilttststamp = [];

      let key_bits = 0;
      let keyratetemp = "";
      let keyratetstemp = "";
      let temprand = [];
      let temprandts = [];


        for (let i = 0; i<4; i++) {
          localqber.push(this.randomInRange(4, 12));
          localqbertstamp.push(i)
        }

        for (let j = 0; j<4; j++) {
          localclickrawtimestamp.push(this.randomInRange(40000, 75000));
          localrawtstamp.push(j)
        }



      keyratetemp = this.randomInRange(1.4, 3.2);

      if(this.keyrate.length < 3) {
        this.keyrate.push(keyratetemp);
        this.keyratetstamp.push(keyratetstemp);

      } else {
        temprand = this.keyrate.slice(0, 1); 
        temprand.push(keyratetemp);
        temprandts = this.keyratetstamp.slice(0,1);
        temprandts.push(keyratetstemp);

        this.keyrate = temprand;
        this.keyratetstamp = temprandts;
      }


      this.qber = localqber;
      this.qbertstamp = localqbertstamp;
      this.clickrawtimestamp = localclickrawtimestamp;
      this.rawtstamp = localrawtstamp;

      if(this.parametertype == 0) {
        this.renderlinechart(this.clickrawtimestamp, this.rawtstamp, 100, 95000, "Raw Timestamp Count");
      } else if(this.parametertype == 1) {
        this.renderlinechart(this.qber, this.qbertstamp, 1, 50, "Quantum Bit Error rate");
      } else if(this.parametertype == 2) {
        this.renderlinechart(this.keyrate, this.keyratetstamp, 0, 10, "Key rate");
      } 
      console.log(this.qber);
      console.log(this.qbertstamp)
    //});

  }*/


randomInRange(min, max) {
  return Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
}

  expandGraph() {
    this.expandGraphEnable = true;
    var elem = document.getElementById('canvasLineChartDiv');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  renderlinechart(data, label, min, max, yaxistext, yAxisId) {

    console.log('finalqelmtype renderlinechart -> ', this.finalqelmtype);
    if(this.finalqelmtype == 'Alice') {
      for(let sa=0; sa<this.selectedArray.length; sa++) {
        if(this.selectedArray[sa].id == 0) {
          console.log('sa 0');
          data = this.average_signal_qber;
          label = this.qbertstamp;
          min = 1;
          max = 50;
          yaxistext = "Quantum Bit Error rate";
          yAxisId = "Qber";
        }
        if(this.selectedArray[sa].id == 1) {
          console.log('sa 1')
          data = this.keyrate;
          label = this.keyratetstamp;
          min = 0;
          max = 50;
          yaxistext = "Key rate (kbps)";
          yAxisId = "KeyRate";
        }
      }
    } else if(this.finalqelmtype == 'Bob') {
      for(let sa=0; sa<this.selectedArray.length; sa++) {
        if(this.selectedArray[sa].id == 0) {
          console.log('sa 0');
          data = this.ccount1;
          label = this.ccounttstamp;
          min = 0;
          max = 7000;
          yaxistext = "Click Count SPD 1";
          yAxisId = "ClickCount1";
        }
        if(this.selectedArray[sa].id == 1) {
          console.log('sa 1');
          data = this.average_signal_qber;
          label = this.qbertstamp;
          min = 1;
          max = 50;
          yaxistext = "Quantum Bit Error rate";
          yAxisId = "Qber";
        }
        if(this.selectedArray[sa].id == 2) {
          console.log('sa 2')
          data = this.keyrate;
          label = this.keyratetstamp;
          min = 0;
          max = 50;
          yaxistext = "Key rate (kbps)";
          yAxisId = "KeyRate";
        }
        if(this.selectedArray[sa].id == 3) {
          console.log('sa 3')
          data = this.ccount2;
          label = this.ccounttstamp;
          min = 0;
          max = 7000;
          yaxistext = "Click Count SPD 2";
          yAxisId = "ClickCount2";
        }
      }
    }
    
    if(this.finalqelmtype == 'Alice') {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.qbertstamp,
          datasets: [{
            label: 'Qber',
            yAxisID: 'A',
            borderColor: '#91cf96',
            backgroundColor: '#91cf96',
            data: this.average_signal_qber,
            fill: false,
            hidden: true
          }, {
            label: 'Key rate',
            yAxisID: 'B',
            borderColor: '#c881d2',
            backgroundColor: '#c881d2',
            data: this.keyrate,
            fill: false,
            hidden: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            mode: 'nearest'
          },
          scales: {
            // xAxes: [{
            //   id: 'X',
            //   type: 'linear',
            //   position: 'bottom',
            //   ticks: {
            //     // min: 0,
            //     // max: 50,
            //     // stepSize: 5,
            //     fontColor: '#91cf96',
            //   },
            //   display: true,
            // }],
            yAxes: [{
              id: 'A',
              type: 'linear',
              position: 'left',
              ticks: {
                min: 0,
                max: 50,
                stepSize: 5,
                fontColor: '#91cf96',
              },
              scaleLabel: {
                display: true,
                labelString: 'Quantum Bit Error rate',
                fontColor: '#91cf96',
              },
              display: false
            }, {
              id: 'B',
              type: 'linear',
              position: 'right',
              ticks: {
                min: 0,
                max: 50,
                stepSize: 5,
                fontColor: '#c881d2',
              },
              scaleLabel: {
                display: true,
                labelString: 'Key rate (kbps)',
                fontColor: '#c881d2',
              },
              display: false
            }]
          },
          elements: {
            line: {
              tension: 0, // disables bezier curves
            },
            point: {
              radius: 4,
              borderWidth: 2,
              pointStyle: 'circle'
            }
          }
    
        }
      });
    } else if(this.finalqelmtype == 'Bob') {
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: this.qbertstamp,
          datasets: [{
            label: 'Click Count 1',
            yAxisID: 'A',
            borderColor: '#ffbaa2',
            backgroundColor: '#ffbaa2',
            data: this.ccount1,
            fill: false,
            hidden: true
          }, {
            label: 'Qber',
            yAxisID: 'B',
            borderColor: '#91cf96',
            backgroundColor: '#91cf96',
            data: this.average_signal_qber,
            fill: false,
            hidden: true
          }, {
            label: 'Key rate',
            yAxisID: 'C',
            borderColor: '#c881d2',
            backgroundColor: '#c881d2',
            data: this.keyrate,
            fill: false,
            hidden: true
          }, {
            label: 'Click Count 2',
            yAxisID: 'D',
            borderColor: '#29b6f6',
            backgroundColor: '#29b6f6',
            data: this.ccount2,
            fill: false,
            hidden: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            mode: 'nearest'
          },
          scales: {
            // xAxes: [{
            //   id: 'X',
            //   type: 'linear',
            //   position: 'bottom',
            //   ticks: {
            //     min: 0,
            //     max: 50,
            //     stepSize: 5,
            //     fontColor: '#91cf96',
            //   },
            //   display: true,
            // }],
            yAxes: [{
              id: 'A',
              type: 'linear',
              position: 'left',
              ticks: {
                min: 0,
                max: 7000,
                stepSize: 500,
                fontColor: '#ffbaa2',
              },
              scaleLabel: {
                display: true,
                labelString: 'Click Count SPD 1',
                fontColor: '#ffbaa2',
              },
              display: false
            }, {
              id: 'B',
              type: 'linear',
              position: 'right',
              ticks: {
                min: 0,
                max: 50,
                stepSize: 5,
                fontColor: '#91cf96',
              },
              scaleLabel: {
                display: true,
                labelString: 'Quantum Bit Error rate',
                fontColor: '#91cf96',
              },
              display: false
            }, {
              id: 'C',
              type: 'linear',
              position: 'right',
              ticks: {
                min: 0,
                max: 50,
                stepSize: 5,
                fontColor: '#c881d2',
              },
              scaleLabel: {
                display: true,
                labelString: 'Key rate (kbps)',
                fontColor: '#c881d2',
              },
              display: false
            }, {
              id: 'D',
              type: 'linear',
              position: 'right',
              ticks: {
                min: 0,
                max: 7000,
                stepSize: 500,
                fontColor: '#29b6f6',
              },
              scaleLabel: {
                display: true,
                labelString: 'Click Count SPD 2',
                fontColor: '#29b6f6',
              },
              display: false
            }]
          },
          elements: {
            line: {
              tension: 0, // disables bezier curves
            },
            point: {
              radius: 4,
              borderWidth: 2,
              pointStyle: 'circle'
            }
          }
    
        }
      });
    }
  

    this.selectedArray.forEach(selectedVal => {
      console.log('selectedVal.name ->>> ', selectedVal.name);
      const getItemsWithSelectedVal = (arr = []) => {
        arr.reduce((acc, obj) => {
          let found = false;
          for (let i = 0; i < acc.length; i++) {
            if (acc[i].id === obj.id) {
              found = true;
                acc[i].count++;
              };
          }
          if(obj.name === selectedVal.name) {
            var selectedParam;
            console.log('obj equal')
            if (!found) {
              obj.count = 1;
              this.lineChart.data.datasets.find(e => {
                if(e.label == obj.name) {
                  selectedParam = e.label;
                  e.hidden = false;
                }
              });
              this.lineChart.options.scales.yAxes.find(y => {
                if(y.scaleLabel.labelString == selectedVal.yaxistext) {
                  y.display = true;
                }
              });
              acc.push(obj);
            } else {
              console.log('obj found')
            }
          }
          return acc;
        }, []);
        return arr;
      };
      const objItems = getItemsWithSelectedVal(this.selectedArray);
      console.log('objItems ->>> ', objItems);
      
    })
    this.lineChart.update();
  }


  addpsk() {
    if(this.checkpskstrength(this.newpsk)) {
      this.authprovider.apppresharedkey(this.newpsk).subscribe((res) => {
        this.resultfromqkd = res;
        this.psk = this.newpsk;
        this.newpsk = "";

        this.authprovider.getkeycount().subscribe((res) => {
          this.pskreal = res;
          this.numofselfkeysavailable = this.pskreal.self_key_count
          this.credentialsloadover = 1;
          this.presentSuccess("Pre-Shared key successfully saved");
        }); 
      })
    } else {
      this.authprovider.getkeycount().subscribe((res) => {
        this.pskreal = res;
        this.numofselfkeysavailable = this.pskreal.self_key_count
        this.numoframkeysavailable = this.pskreal.ram_key_count
        this.credentialsloadover = 1;
        this.presentAlert("Pre-Shared Key should be of atleast 2176 characters long");
      }); 
    }
  }

  addbackupkey() {
/*
    const alert = await this.alertController.create({
      header: 'System STATUS!',
      message: 'System not in bootup state, cannot use this functionality...',
    });
  
    await alert.present(); */
   // if(this.systemstatus=="System-Bootup-State"){
      
    if(this.checkpskstrength(this.backupkey)) {
      this.authprovider.addbackupkey(this.backupkey).subscribe((res) => {
        this.resultfromqkd = res;
        if(this.resultfromqkd.Status=="Success")
        {
          this.presentSuccess("Backup key successfully saved");
        }
        else{
          this.presentAlert(this.resultfromqkd.Status + " " + this.resultfromqkd.Reason);
        }
        // this.psk = this.newpsk;
        // this.backupkey = "";

        // this.authprovider.getkeycount().subscribe((res) => {
        //   this.pskreal = res;
        //   this.numofselfkeysavailable = this.pskreal.self_key_count
        //   this.credentialsloadover = 1;
        //   this.presentSuccess("Pre-Shared key successfully saved");
        // }); 
      })
    } else {

        this.presentAlert("Backup Key should be of atleast 2176 characters long");
    }
  // }else{
  //   this.presentAlert("System not in boot up state");
  // }
   }

secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

editcarpinfo(serverip, nodename) {

}



}
