import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class GetAuthProvider {

  constructor(
    public http: HttpClient
  ) {

  }

  public getuserauth(username, password){
    let localUrl = "http://192.168.10.155:9191/api/v1/auth"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Username: "admin",
        Password: "qunu123"
    };
    // return {"Status":"SUCCESS","UserRole":"admin","Userid":"admin","Passhash":"71365baada94bf4324e6bdd2429b420b46e3accbfb5718e05f8325ccc1b83d733fad89c21b13642443249af1f259d46fb78acad940c0bc19e7026f39094b1c50","BootTime":1650221999,"LocalTime":1650278653}
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

  public getnodeinfo(){
    let localUrl = "http://192.168.10.155:9191/api/v1/nodes"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Node: "1234",
        Qelement: "1234"
    };
    return this.http.get(localUrl, {headers: headers});
  }

  public getAllPaths(){
    let localUrl = "http://192.168.10.155:9191/api/v1/getallpaths"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Node: "1234",
        Qelement: "1234"
    };
    return this.http.get(localUrl, {headers: headers});
  }

  public getKeycountTnode(nodeCount, nodeList){
    let localUrl = "http://192.168.10.155:9191/api/v1/getkeycount_tnode";
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let nodeinfo = {
      "command": "getkeycount_tnode",
      "node_count": nodeCount,
      "node_list": nodeList
    };
    return this.http.post(localUrl, JSON.stringify(nodeinfo), {headers: headers});
  }

  public getqelminfo(){
    let localUrl = "http://192.168.10.155:9191/api/v1/qelms"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Node: "1234",
        Qelement: "1234"
    };
    return this.http.get(localUrl, {headers: headers});
  }

  public sendnodeinfo(nodeid, nodename, nodeintipv4, nodeintfipv4, nodeclidevicesubnetmask, nodeclidevicegatewayaddress){
    let localUrl = "http://192.168.10.155:9191/api/v1/nodes"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let nodeinfo = {
        Command: "editnode",
        NodeId: nodeid,
        NodeName: nodename,
        NodeIntIpv4: nodeintipv4,
        NodeIntfIpv4: nodeintfipv4,
        subnet_mask:nodeclidevicesubnetmask,
        gateway_addr:nodeclidevicegatewayaddress
    };
    return this.http.post(localUrl, JSON.stringify(nodeinfo), {headers: headers});
  }

  public sendqelminfo(qelmid, qelmtype, qelmintipv4, qelmpairipv4, qelmremoteipv4){
    let localUrl = "http://192.168.10.155:9191/api/v1/qelms"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let qelminfo = {
        Command: "editqelm",
        QelmId: qelmid,
        QelmType: qelmtype,
        QelmIntIpv4: qelmintipv4,
        QelmPairIpv4: qelmpairipv4,
        QelmRemoteIpv4: qelmremoteipv4
    };
    return this.http.post(localUrl, JSON.stringify(qelminfo), {headers: headers});
  }

public set_network_info(isDHCP, elem_sel,clidevicegatewayaddress, clidevicesubnetmask, clideviceIP,  clidevicename){

  let localUrl = "http://192.168.10.155:9191/api/v1/editnetwork"
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');


  let networkinfo = {
      Command: "editnetwork",
      isDHCP: isDHCP,
      element_identity: elem_sel,
      interface_name: clidevicename,
      ip_address: clideviceIP,
      subnet_mask: clidevicesubnetmask,
      gateway_addr:clidevicegatewayaddress,
  };
  console.log(networkinfo)
  return this.http.post(localUrl, JSON.stringify(networkinfo), {headers: headers});
}


public get_network_info(elem_sel){

  let localUrl = "http://192.168.10.155:9191/api/v1/getnetworkinfo"
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');


  let networkinfo = {
      Command: "getnetworkinfo",
      element_identity: elem_sel,
  };
  console.log(networkinfo)
  return this.http.post(localUrl, JSON.stringify(networkinfo), {headers: headers});
}

  public getpsk(){
    let localUrl = "http://192.168.10.155:9191/api/v1/psks"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Node: "1234",
        Qelement: "1234"
    };
    return this.http.get(localUrl, {headers: headers});
  }

  public checkforalerts(){
    let localUrl = "http://192.168.10.155:9191/api/v1/assertedqkdevents"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(localUrl, {headers: headers});
  }

   public apppskinfo(psk){
    let localUrl = "http://192.168.10.155:9191/api/v1/psks"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let qelminfo = {
        Command: "editpsk",
        Psk: psk
    };
    return this.http.post(localUrl, JSON.stringify(qelminfo), {headers: headers});
  }

   public getnodelogs(filesize){
    let localUrl = "http://192.168.10.155:9191/api/v1/nodelogs"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Filesize: filesize
    };
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

  public getqelmlogs(filesize){
    let localUrl = "http://192.168.10.155:9191/api/v1/qelmlogs"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Filesize: filesize
    };
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

  public uploadpathconfiguration(formdata){
    let localUrl = "http://192.168.10.155:9191/api/v1/uploadpathconfig"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');


    return this.http.post(localUrl, formdata, {headers: headers});
  }

  public uploadipconfiguration(formdata){
    let localUrl = "http://192.168.10.155:9191/api/v1/uploadipconfig"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');


    return this.http.post(localUrl, formdata, {headers: headers});
  }
  public uploadcertificate(formdata){
    let localUrl = "http://192.168.10.155:9191/api/v1/uploadcertificates"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');


    return this.http.post(localUrl, formdata, {headers: headers});
  }

  public bulkuploadpsk(formdata){
    let localUrl = "http://192.168.10.155:9191/api/v1/uploadpsk"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');


    return this.http.post(localUrl, formdata, {headers: headers});
  }


  public eavesdrop(){
    console.log("reached eavesdrop in getauth")
    let localUrl = "http://192.168.10.155:9191/api/v1/eaves"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log("reached above return eavesdrop in getauth")
    return this.http.get(localUrl, {headers: headers});
  }

  public spdtemp2(){
    console.log("reached eavesdrop in getauth")
    let localUrl = "http://192.168.10.155:9191/api/v1/temp2"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log("reached above return eavesdrop in getauth")
    return this.http.get(localUrl, {headers: headers});
  }

  public getsitaraqelmlogs(filesize){
    let localUrl = "http://192.168.10.155:9191/api/v1/sitaramon"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Filesize: filesize
    };
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

  public sendnewauth(username, oldpassword, newpassword, role){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/newauth"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: 'changeauth',
        Username: username,
        OldPassword: oldpassword,
        NewPassword: newpassword,
        Role: role,
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

  public sendnewauthforuser(userid, newpasshash, role){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/newuserauth"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: 'changeuserauth',
        Username: userid,
        OldPassword: "",
        NewPassword: newpasshash,
        Role: role,
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

   public getsysteminfo(){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/getsystemsettings"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Node: "1234",
        Qelement: "1234"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

   public getallnodelogs(){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/allnodelogs"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Node: "1234",
        Qelement: "1234"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
    //return this.http.get(localUrl, {headers: headers});
  }

   public getallqelmlogs(){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/allqelmlogs"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Node: "1234",
        Qelement: "1234"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
    //return this.http.get(localUrl, {headers: headers});
  }

   public getallqelmlogsnew(){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/allqelmlogsnew"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Node: "1234",
        Qelement: "1234"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
    //return this.http.get(localUrl, {headers: headers});
  }

   public dointernalcheck(){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/internalcheck"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "checkinternalcommunication",
        data: "1234567890"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

    public doexternaclheck(){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/externalcheck"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "checkexternalcommunication",
        data: "1234567890"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

 public doexternalconnectcheck(nodeid){
  //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
  let localUrl = "http://192.168.10.155:9191/api/v1/externalconnect"
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');

  let credentials_dest_id = {
      Command: "checkexternalconnection",
      Dest_id : nodeid,
  };
 

  return this.http.post(localUrl, JSON.stringify(credentials_dest_id), {headers: headers});
}

public doexternalconnectcheckall(nodeid){
  //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
  let localUrl = "http://192.168.10.155:9191/api/v1/externalconnect"
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');

  let credentials_dest_id = {
      Command: "checkexternalconnection",
      Dest_id : "ALL",
      data: "1234567890"
  };
 

  return this.http.post(localUrl, JSON.stringify(credentials_dest_id), {headers: headers});
}

public dostartkeymigration(nodeid,Pathoption){
  //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
  let localUrl = "http://192.168.10.155:9191/api/v1/keymigrationstart"
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  console.log("Pathoption")
  console.log(Pathoption)
  let credentials_dest_id = {
      Command: "startkeymigration",
      Pathoption: Pathoption,
      Dest_id : nodeid,
  };
 

  return this.http.post(localUrl, JSON.stringify(credentials_dest_id), {headers: headers});
}
public dostartkeymigrationall(){
  //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
  let localUrl = "http://192.168.10.155:9191/api/v1/keymigrationstart"
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');

  let credentials_dest_id = {
      Command: "startkeymigartion",
      Dest_id : "ALL",
  };
 

  return this.http.post(localUrl, JSON.stringify(credentials_dest_id), {headers: headers});
}
public dostopkeymigration(nodeid,Pathoption){
  //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
  let localUrl = "http://192.168.10.155:9191/api/v1/keymigrationstop"
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');

  let credentials_dest_id = {
      Command: "stopkeymigration",
      Pathoption: Pathoption,
      Dest_id : nodeid,
  };
 

  return this.http.post(localUrl, JSON.stringify(credentials_dest_id), {headers: headers});
}
public dostopkeymigrationall(){
  //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
  let localUrl = "http://192.168.10.155:9191/api/v1/keymigrationstop"
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');

  let credentials_dest_id = {
      Command: "stopkeymigration",
      Dest_id : "ALL",
  };
 

  return this.http.post(localUrl, JSON.stringify(credentials_dest_id), {headers: headers});
}


  public dosyncchanheck(){
    let localUrl = "http://192.168.10.155:9191/api/v1/synccheck"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "synccheck",
        data: "1234567890"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

   public doaemon(){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/aemon"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "aemturnon",
        data: "1234567890"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }


   public doaemoff(){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/aemoff"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "aemturnoff",
        data: "1234567890"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

   public dobemon(){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/bemon"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "bemturnon",
        data: "1234567890"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

    public dobemoff(){
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/bemoff"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "benturnoff",
        data: "1234567890"
    };


    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

  public getinitstatus() {
    //let localUrl = "http://192.168.10.155:9191/assets/data/creds.json"
    let localUrl = "http://192.168.10.155:9191/api/v1/getinitstatus"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Node: "1234",
        Qelement: "1234"
    };


    //return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
    return this.http.get(localUrl, {headers: headers});  
  }


  public setmode(mode, datatype){
    let localUrl = "http://192.168.10.155:9191/api/v1/modeset"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "qkdrunmode",
        Runmode: mode,
        Tuneenable: datatype,
        Filescount:"15",
        Saveoption:"63"
    };
    console.log(credentials)
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }


  public setsetup(tstreshold, qberthreshold, mode){
    let localUrl = "http://192.168.10.155:9191/api/v1/setupset"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "qkdsetup",
        TsThreshold: tstreshold,
        QberThreshold: qberthreshold,
        Mode: mode
    };
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }


  public apppresharedkey(psk){
    let localUrl = "http://192.168.10.155:9191/api/v1/presharedkey"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let qelminfo = {
        Command: "addpresharedkey",
        Psk: psk
    };
    return this.http.post(localUrl, JSON.stringify(qelminfo), {headers: headers});
  }

  public addbackupkey(psk){
    let localUrl = "http://192.168.10.155:9191/api/v1/backupkey"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log(psk)

    let qelminfo = {
        Command: "editbackupkey",
        backupkey: psk
    };
    return this.http.post(localUrl, JSON.stringify(qelminfo), {headers: headers});
  }


  public getkeycount() {
    let localUrl = "http://192.168.10.155:9191/api/v1/keycount"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(localUrl, {headers: headers});  
  }

  public getqkdstatus() {
    let localUrl = "http://192.168.10.155:9191/api/v1/qkdstatus"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(localUrl, {headers: headers});  
  }

   public getsysmonlogs(filesize){
    let localUrl = "http://192.168.10.155:9191/api/v1/sysmonlogs"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Filesize: filesize
    };
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

  public gettimeinfo(){
    let localUrl = "http://192.168.10.155:9191/api/v1/time"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(localUrl, {headers: headers});
  }

  public getmodeinfo(){
    let localUrl = "http://192.168.10.155:9191/api/v1/modeinfo"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(localUrl, {headers: headers});
  }

  public gettsholdinfo(){
    let localUrl = "http://192.168.10.155:9191/api/v1/tshold";
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(localUrl, {headers: headers});
  }

  public gettuneinfo(){
    let localUrl = "http://192.168.10.155:9191/api/v1/gettune"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(localUrl, {headers: headers});
  }

  public getvoa(){
    let localUrl = "http://192.168.10.155:9191/api/v1/getaemdata"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log("aem data called")
    return this.http.get(localUrl, {headers: headers});
  }

  public getvoathreshold(){
    let localUrl = "http://192.168.10.155:9191/api/v1/getvoathreshold"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log("voa threshold called")
    return this.http.get(localUrl, {headers: headers});
  }

 

  public settingorange(){
    let localUrl = "http://192.168.10.155:9191/api/v1/getorange"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(localUrl, {headers: headers});
  }

  public qkdmode_savestatus(){
    let localUrl = "http://192.168.10.155:9191/api/v1/savestatus"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(localUrl, {headers: headers});
  }

  public gethostnameinfo(){
    let localUrl = "http://192.168.10.155:9191/api/v1/hostname"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(localUrl, {headers: headers});
  }


  public flushselfkeys(){
    let localUrl = "http://192.168.10.155:9191/api/v1/flushselfkeys"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(localUrl, {headers: headers});
  }

  public flushramkeys(){
    let localUrl = "http://192.168.10.155:9191/api/v1/flushramkeys"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.get(localUrl, {headers: headers});
  }

  public flushramkeys_tnode(flush_dest_id){
    let localUrl = "http://192.168.10.155:9191/api/v1/flushramkeys_tnode"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let credentials_dest_id = {
      Command: "flushramkeys",
      Dest_id : flush_dest_id,
  };
 
    return this.http.post(localUrl, JSON.stringify(credentials_dest_id), {headers: headers});
  }

  public flushramkeys_tnodeall(nodeCount, nodeList){
    let localUrl = "http://192.168.10.155:9191/api/v1/flushramkeys_tnode"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let nodeinfo = {
      "command": "flushramkeys_tnode",
      "node_count": nodeCount,
      "node_list" : nodeList,
  };
 
    return this.http.post(localUrl, JSON.stringify(nodeinfo), {headers: headers});
  }

  public sendvoainfo(nodevoaset){   //--------------------------------------------------------------------------------------
    let localUrl = "http://192.168.10.155:9191/api/v1/setvoa"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
      Command: "setvoa1",
      voa: nodevoaset
    };
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }



  public sendvoainfo2(nodevoaset){   //--------------------------------------------------------------------------------------
    let localUrl = "http://192.168.10.155:9191/api/v1/setvoa"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
      Command: "setvoa2",
      voa: nodevoaset
    };
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

  public editpacomp(pacomp){
    let localUrl = "http://192.168.10.155:9191/api/v1/pacomp"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
      Command: "setpa",
      PA: pacomp
    };
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});

  }

  public setorange  (orangeval){
    let localUrl = "http://192.168.10.155:9191/api/v1/setorange"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "setorange",
        Orange: orangeval
    };
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }

  /*public settune (tuneset){
    let localUrl = "http://192.168.10.155:9191/api/v1/settune"
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let credentials = {
        Command: "settune",
        Orange: tuneset
    };
    return this.http.post(localUrl, JSON.stringify(credentials), {headers: headers});
  }*/

}




