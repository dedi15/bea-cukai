import "./newProduct.css";
import { Grid } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Select from 'react-select';

export default function NewProduct() {
  const [npwp, setNpwp] = useState('');
  const [nama, setNama] = useState('');
  const [transaksi, setTransaksi] = useState('');
  const [negaratujuan, setNegaraTujuan] = useState('');
  const [pelabuhantujuan, setPelabuhanTujuan] = useState('');
  const [hscode, setHsCode] = useState('');
  const [uraianhscode, setUraianHsCode] = useState('');
  const [subheaderhscode, setSubHeaderHsCode] = useState('');
  const [jumlah, setJumlahBarang] = useState('');
  const [harga, setHargaBarang] = useState('');
  const [tarif, setTarif] = useState('');
  const [tarifppn, setTarifPpn] = useState('');
  const [totalharga, setTotalHarga] = useState('');
  const [ppnbk, setPpnBk] = useState('');
  const [bk, setBk] = useState(''); 
  const [optnegaratujuan, setOptNegaraTujuan] = useState([]);
  const [optpelabuhantujuan, setOptPelabuhanTujuan] = useState([]);


  const options = [
    {value: 'Ekspor', label: 'Ekspor'},
    {value: 'Impor', label: 'Impor'}
  ]

  const options2 = [
    {value: '-', label: '-'},
    {value: '22030091', label: '22030091'},
    {value: '22030092', label: '22030092'}
  ]


  const doGetHsCode = async function (code) {
    console.log(code)
    let url = 'https://insw-dev.ilcs.co.id/n/barang?hs_code='+code
    let res = await axios.get(url)
    let data = res.data.data[0]
    console.log(data)
    setUraianHsCode(data.uraian_id)
    setSubHeaderHsCode(data.sub_header)
  }

  const setTrans = (trans) => {
    setTransaksi(trans)
    if(trans == 'Ekspor'){
      setNegaraTujuan('INDONESIA')
      doGetPelTujuanIm()
    } else {
      setNegaraTujuan('INDIA')
      doGetPelTujuanEx()
    }
  }

  const doGetNegara = async function () {
    let url = 'https://insw-dev.ilcs.co.id/n/negara?ur_negara=IND'
    let res = await axios.get(url)
    let data = res.data.data
    let opt = []
    data.map((item) => {
      opt.push({
        value: item.kd_negara,
        label: item.ur_negara
      })
    })
    setOptNegaraTujuan(opt)
  }

  const doGetPelTujuanEx = async function () {
    let url = 'https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=IN'
    let res = await axios.get(url)
    let data = res.data.data
    let opt = []
    data.map((item) => {
      opt.push({
        value: item.kd_pelabuhan,
        label: item.ur_pelabuhan
      })
    })
    setOptPelabuhanTujuan(opt)
  }

  const doGetPelTujuanIm = async function () {
    let url = 'https://insw-dev.ilcs.co.id/n/pelabuhan?kd_negara=ID'
    let res = await axios.get(url)
    let data = res.data.data
    let opt = []
    data.map((item) => {
      opt.push({
        value: item.kd_pelabuhan,
        label: item.ur_pelabuhan
      })
    })
    setOptPelabuhanTujuan(opt)
  }

  const [info, setInfo] = useState({
    title: '',
    msg: '',
    bg: 'Primary',
    show: false
  });

  const doSave = async function () {
    try {
      let item = JSON.stringify({
        npwp,
        nama,
        transaksi,
        negaratujuan,
        pelabuhantujuan,
        hscode,
        jumlah,
        harga,
        ppnbk,
        bk,
        totalharga});
      console.log(item);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: item,
        redirect: 'follow'
      };
      let result = await axios.post("https://insw-dev.ilcs.co.id/n/simpan", item)
      console.warn("result", result);
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // doGetHsCode()
    doGetNegara()
    doGetPelTujuanEx()
    doGetPelTujuanIm()
  }, [])

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
        <Grid container spacing={2} >
        <Grid container item xs={4} direction="column" >
          <label>NPWP</label>
          <input type="text" value={npwp} onChange={(e)=>setNpwp(e.target.value)} className="form-control" placeholder="" />
          <label>NAMA</label>
          <input type="text" value={nama} onChange={(e)=>setNama(e.target.value)} className="form-control" placeholder="" />
          <label>TRANSAKSI</label>
          <Select
            name="active" 
            id="active"
            placeholder="Select Transaksi"
            options={options}
            onChange={(val) => setTrans(val.value)}
            defaultValue={transaksi}/>
          <label>NEGARA TUJUAN</label>
          <input type="text" value={negaratujuan} onChange={(e)=>setNegaraTujuan(e.target.value)} className="form-control" placeholder="" disabled />
          <label>PELABUHAN TUJUAN</label>
          <Select
            name="active" 
            id="active"
            placeholder="Select Pelabuhan Tujuan"
            options={optpelabuhantujuan}
            onChange={(val) => setPelabuhanTujuan(val.value)}
            defaultValue={pelabuhantujuan}/>
          <label>HS CODE</label>
          <Select
            name="active" 
            id="active"
            placeholder="Select Hs Code"
            options={options2}
            onChange={(val) => doGetHsCode(val.value)}
            defaultValue={hscode}/>
          <label>JUMLAH BARANG</label>
          <input type="text" value={jumlah} onChange={(e)=>setJumlahBarang(e.target.value)} className="form-control" placeholder="" />
          <label>TARIF</label>
          <input type="text" value={bk} onChange={(e)=>setBk(e.target.value)} className="form-control" placeholder="" />
          <label>TOTAL HARGA</label>
          <input type="text" value={totalharga} onChange={(e)=>setTotalHarga(e.target.value)} className="form-control" placeholder="" />
        </Grid>
        
        <Grid container item xs={4} direction="column" >
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <label>URAIAN CODE</label>
          <input type="text" placeholder="" disabled="true" value={uraianhscode}/>
          <label>HARGA BARANG</label>
          <input type="text" value={harga} onChange={(e)=>setHargaBarang(e.target.value)} className="form-control" placeholder="" />
          <label>TARIF PPN</label>
          <input type="text" value={ppnbk} onChange={(e)=>setPpnBk(e.target.value)} className="form-control" placeholder="" />
        </Grid>
        <Grid container item xs={4} direction="column" >
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <label>SUB HEADER HS CODE</label>
          <input type="text" placeholder="" disabled="true" value={subheaderhscode}/>
        </Grid>
        </Grid>
        <br />
        <button variant="primary" onClick={doSave}>Save</button>
    </div>


  );
}
