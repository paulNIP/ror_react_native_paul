import React, { useState, useEffect, useRef } from 'react';
import { Text, View,Image,ImageBackground,StyleSheet,TouchableOpacity,ScrollView,ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput,HelperText } from 'react-native-paper';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneInput from "react-native-phone-number-input";
import {Dropdown} from 'sharingan-rn-modal-dropdown';
import { useNetInfo } from "@react-native-community/netinfo";
import Strings from '../../constants/Strings';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import SnackBar from 'react-native-snackbar-component';
import { DatabaseConnection } from '../../database/database-connection';
import { NetworkInfo } from "react-native-network-info";
import * as RNLocalize from "react-native-localize";
import { getContinentCode, getContinentName } from '@brixtol/country-continent';
import DeviceInfo from 'react-native-device-info';


const userDB = DatabaseConnection.getuserDB();


const  RegistrationPage=({ route, navigation })=>  {

  const { type, isConnected } = useNetInfo();

  const phoneInput = useRef(null);
  const [countryCode, setCountryCode] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [internetCheck, setInternetCheck] = useState(false);
  const [regError, setRegError] = useState(false);
  const [regMessage, setRegMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState("");



  const zones = [
    {
        value: "abavz",
        label: "Aba  Zone"
    },
    {
        value: "abeakutamc",
        label: "Ministry Center Abeokuta"
    },
    {
        value: "abujamc",
        label: "Ministry Center Abuja"
    },
    {
        value: "abujavz",
        label: "Abuja  Zone"
    },
    {
        value: "accraz",
        label: "Accra Zone"
    },
    {
        value: "australia",
        label: "Australia \/South  Pacific"
    },
    {
        value: "beninvz2",
        label: "Benin Zone 2"
    },
    {
        value: "beninz1",
        label: "Benin Zone 1"
    },
    {
        value: "blwchurchzone",
        label: "BLW CHURCH ZONE"
    },
    {
        value: "blwnec",
        label: "BLW GHANA SUB-ZONE C"
    },
    {
        value: "blwned",
        label: "BLW  GHANA SUB ZONE D"
    },
    {
        value: "blwnee",
        label: "BLW GHANA SUB-ZONE E"
    },
    {
        value: "blwnef",
        label: "BLW GHANA SUB-ZONE F"
    },
    {
        value: "blwoup22",
        label: "BLW WALES GROUP"
    },
    {
        value: "blwugandaz",
        label: "BLW Uganda Zone"
    },
    {
        value: "capne1",
        label: "Cape Town Zone 1"
    },
    {
        value: "capne2",
        label: "Cape Town Zone 2"
    },
    {
        value: "ceadsp",
        label: "CE Amsterdam-DSP"
    },
    {
        value: "cechad",
        label: "CE Chad"
    },
    {
        value: "ceidia45",
        label: "CE India Zone"
    },
    {
        value: "cgm",
        label: "CHURCH GROWTH INTL"
    },
    {
        value: "dscsz",
        label: "DSC Sub- Zone"
    },
    {
        value: "durone",
        label: "Durban Zone"
    },
    {
        value: "easterneuropevr",
        label: "Eastern Europe Region"
    },
    {
        value: "edonorthcentralvz",
        label: "Edo North & Central Zone"
    },
    {
        value: "ewce3b",
        label: "EWCA ZONE 3 B"
    },
    {
        value: "ewcvz1",
        label: "EWC Zone 1 "
    },
    {
        value: "ewcvz2",
        label: "EWC Zone 2 "
    },
    {
        value: "ewcvz3",
        label: "EWC Zone 3"
    },
    {
        value: "ewcvz4",
        label: "EWC Zone 4 "
    },
    {
        value: "ewcvz5",
        label: "EWC Zone 5 "
    },
    {
        value: "ewcvz6",
        label: "EWC Zone 6"
    },
    {
        value: "ibz1",
        label: "Ibadan Zone 1"
    },
    {
        value: "intate24",
        label: "International Missons for South East Asia\u00a0Directorate"
    },
    {
        value: "Islt",
        label: "ISLT"
    },
    {
        value: "ism",
        label: "ISM"
    },
    {
        value: "ismuganda",
        label: "ISM UGANDA"
    },
    {
        value: "itlice",
        label: "ITL OFFICE"
    },
    {
        value: "kenyaz",
        label: "Kenya Zone"
    },
    {
        value: "lcm",
        label: "LW CELL MINISTRY"
    },
    {
        value: "lovoup11",
        label: "Loveworld Ethiopia Group"
    },
    {
        value: "lovoup19",
        label: "Loveworld  Namibia Group"
    },
    {
        value: "lovoup55",
        label: "Loveworld Ireland Group"
    },
    {
        value: "lovoup57",
        label: "Loveworld Canada Group"
    },
    {
        value: "lsza",
        label: "Lagos Sub Zone A"
    },
    {
        value: "lszb",
        label: "Lagos Sub Zone B"
    },
    {
        value: "lszc",
        label: "Lagos Sub Zone C"
    },
    {
        value: "lvz",
        label: "CELVZ"
    },
    {
        value: "lwcg1",
        label: "BLW Cameroon Sub-Group 1"
    },
    {
        value: "lwcg2",
        label: "BLW CAMEROON SUB-GROUP 2"
    },
    {
        value: "lwcg3",
        label: "BLW Cameroon Sub-Group 3"
    },
    {
        value: "lwghanaza",
        label: "Loveworld  Ghana Zone A"
    },
    {
        value: "lwghanazb",
        label: "Loveworld Ghana Zone B"
    },
    {
        value: "lwgradnet",
        label: "LW GRADUATE NETWORK"
    },
    {
        value: "lwiers52",
        label: "LW International Chapters"
    },
    {
        value: "lwkenyaz",
        label: "Loveworld  Kenya Zone"
    },
    {
        value: "lwkids",
        label: "CHILDREN\\'S CHURCH"
    },
    {
        value: "lwnrus",
        label: "LW North Cyprus"
    },
    {
        value: "lwrdio42",
        label: "LW RADIO"
    },
    {
        value: "lwsaza",
        label: "Loveworld SA Zone A"
    },
    {
        value: "lwsazb",
        label: "Loveworld SA Zone B"
    },
    {
        value: "lwsazc",
        label: "Loveworld SA Zone C"
    },
    {
        value: "lwsazd",
        label: "Loveworld SA Zone D"
    },
    {
        value: "lwsaze",
        label: "Loveworld SA Zone E"
    },
    {
        value: "lwttry90",
        label: "LW TELEVISION MINISTRY"
    },
    {
        value: "lwukza",
        label: "Loveworld UK Zone A"
    },
    {
        value: "lwukzb",
        label: "Loveworld UK Zone B"
    },
    {
        value: "lwusag4",
        label: "LW USA Group 4"
    },
    {
        value: "lwusagrp1",
        label: "LW USA GROUP 1"
    },
    {
        value: "lwusagrp2",
        label: "LW USA GROUP 2"
    },
    {
        value: "lwusagrp3",
        label: "LW USA GROUP 3"
    },
    {
        value: "lwza",
        label: "Loveworld Zone A"
    },
    {
        value: "lwzb",
        label: "Loveworld  Zone B"
    },
    {
        value: "lwzc",
        label: "Loveworld  Zone C"
    },
    {
        value: "lwzd",
        label: "Loveworld Zone D"
    },
    {
        value: "lwze",
        label: "Loveworld Zone E"
    },
    {
        value: "lwzf",
        label: "Loveworld Zone F"
    },
    {
        value: "lwzg",
        label: "Loveworld Zone G"
    },
    {
        value: "lwzh",
        label: "Loveworld Zone H"
    },
    {
        value: "lwzi",
        label: "Loveworld  Zone I"
    },
    {
        value: "lwzj",
        label: "Loveworld  Zone J"
    },
    {
        value: "lwzk",
        label: "Loveworld  Zone K"
    },
    {
        value: "lwzl",
        label: "Loveworld  zone L"
    },
    {
        value: "lz1",
        label: "Lagos Zone 1"
    },
    {
        value: "lz2",
        label: "Lagos Zone 2"
    },
    {
        value: "lz3",
        label: "Lagos Zone 3"
    },
    {
        value: "lz4",
        label: "Lagos Zone 4"
    },
    {
        value: "lz5",
        label: "Lagos Zone 5"
    },
    {
        value: "lz6",
        label: "Lagos Zone 6"
    },
    {
        value: "mcc",
        label: "Ministry Center Calabar"
    },
    {
        value: "middleeast",
        label: "Middle East  & South East Asia Region"
    },
    {
        value: "midwestz",
        label: "Mid West Zone "
    },
    {
        value: "newdia43",
        label: "New Media"
    },
    {
        value: "newia144",
        label: "New Media1"
    },
    {
        value: "nncvz1",
        label: "NC Zone 1"
    },
    {
        value: "nncvz2",
        label: "NC Zone 2"
    },
    {
        value: "nnevz1",
        label: "NE Zone 1"
    },
    {
        value: "nnwvz2",
        label: "NW Zone 2"
    },
    {
        value: "nsevz1",
        label: "SE Zone 1"
    },
    {
        value: "nsevz2",
        label: "SS ZONE 3"
    },
    {
        value: "nssvz1",
        label: "SS Zone 1"
    },
    {
        value: "nssvz2",
        label: "SS Zone 2"
    },
    {
        value: "nswvirualz3",
        label: "SW Zone 3"
    },
    {
        value: "nswvz1",
        label: "SW Zone 1"
    },
    {
        value: "nswvz2",
        label: "SW Zone 2"
    },
    {
        value: "nwz1",
        label: "NW Zone 1"
    },
    {
        value: "offial69",
        label: "OFFICIAL"
    },
    {
        value: "onitshaz",
        label: "Onitsha Zone"
    },
    {
        value: "ottz",
        label: "Ottawa Zone"
    },
    {
        value: "pcdl",
        label: "PCDL"
    },
    {
        value: "phz1",
        label: "Port Harcourt Zone 1"
    },
    {
        value: "phz2",
        label: "Port Harcourt Zone 2"
    },
    {
        value: "phz3",
        label: "Port Harcourt Zone 3"
    },
    {
        value: "qubators",
        label: "QUBATORS"
    },
    {
        value: "quebecvz",
        label: "Quebec Zone"
    },
    {
        value: "reon",
        label: "REON"
    },
    {
        value: "rin",
        label: "RIN"
    },
    {
        value: "rorion",
        label: "ROR Global Production"
    },
    {
        value: "sales",
        label: "sales"
    },
    {
        value: "savz2",
        label: "SA Zone 2"
    },
    {
        value: "savz3",
        label: "SA Zone 3"
    },
    {
        value: "savz4",
        label: "SA Zone 4"
    },
    {
        value: "saz1",
        label: "SA Zone 1"
    },
    {
        value: "saz5",
        label: "SA Zone 5"
    },
    {
        value: "sez3",
        label: "SE Zone 3"
    },
    {
        value: "som",
        label: "LoveWorld SOM"
    },
    {
        value: "southamericavr",
        label: "South America Region"
    },
    {
        value: "swzne4",
        label: "SW Zone 4"
    },
    {
        value: "swzne5",
        label: "SW Zone 5"
    },
    {
        value: "teens",
        label: "TEENS MINISTRY"
    },
    {
        value: "texasz1",
        label: "USA Region 3"
    },
    {
        value: "texasz2",
        label: "Dallas Zone"
    },
    {
        value: "tni",
        label: "TNI"
    },
    {
        value: "torz",
        label: "Toronto Zone"
    },
    {
        value: "ukszonec",
        label: "BLW UK SUB-ZONE C"
    },
    {
        value: "ukvz1",
        label: "UK Zone 1 (UK Region 2)"
    },
    {
        value: "ukvz3",
        label: "UK Zone 3 (UK Region 2)"
    },
    {
        value: "ukvz4",
        label: "UK Zone 4 (Region 1)"
    },
    {
        value: "ukz1",
        label: "UK Zone 1 (UK Region 1)"
    },
    {
        value: "ukz2",
        label: "UK Zone 2 (UK Region 1)"
    },
    {
        value: "ukz3",
        label: "UK Zone 3 (UK Region 1)"
    },
    {
        value: "ukz4",
        label: "UK Zone 4 (UK Region 2)"
    },
    {
        value: "ukz4dspr1",
        label: "UKzone4 DSP region 1"
    },
    {
        value: "usaregion3",
        label: "USA REGION 3"
    },
    {
        value: "usavz1",
        label: "USA Zone 1 ( Region 1)"
    },
    {
        value: "usavz2",
        label: "USA Zone 2 ( Region 1)"
    },
    {
        value: "usaz1r2",
        label: "USA Zone 1 (Region 2)"
    },
    {
        value: "warrimc",
        label: "Ministry Center Warri"
    },
    {
        value: "wevz1",
        label: "Western Europe Zone 1"
    },
    {
        value: "wevz2",
        label: "Western Europe Zone 2"
    },
    {
        value: "wevz3",
        label: "Western Europe Zone 3"
    },
    {
        value: "wevz4",
        label: "Western Europe Zone 4"
    },
    {
        value: "xtreme",
        label: "Xtreme"
    },
    {
        value: "yolnda",
        label: "YOLANDA1"
    }
];
  const groups = [
    {
        zone_id: "phz3",
        value: "zion",
        label: "zion"
    },
    {
        zone_id: "lvz",
        value: "lcachurch1",
        label: "LCA Church 1"
    },
    {
        zone_id: "accraz",
        value: "accraghana",
        label: "Accra Ghana"
    },
    {
        zone_id: "saz1",
        value: "testinggroup",
        label: "testinggroup"
    },
    {
        zone_id: "lvz",
        value: "lcachurch2",
        label: "LCA Church 2"
    },
    {
        zone_id: "lvz",
        value: "lcachurch3",
        label: "LCA Church 3"
    },
    {
        zone_id: "lvz",
        value: "lcachurch4",
        label: "LCA Church 4"
    },
    {
        zone_id: "lvz",
        value: "lcachurch5",
        label: "LCA Church 5"
    },
    {
        zone_id: "lvz",
        value: "lcachurch6",
        label: "LCA Church 6"
    },
    {
        zone_id: "lvz",
        value: "lcachurch7",
        label: "LCA Church 7"
    },
    {
        zone_id: "lvz",
        value: "lcachurch8",
        label: "LCA Church 8"
    },
    {
        zone_id: "lvz",
        value: "lcachurch9",
        label: "LCA Church 9"
    },
    {
        zone_id: "lvz",
        value: "lcachurch10",
        label: "LCA Church 10"
    },
    {
        zone_id: "lvz",
        value: "lcachurch11",
        label: "LCA Church 11"
    },
    {
        zone_id: "lvz",
        value: "lvzmissions",
        label: "LVZ Missions"
    },
    {
        zone_id: "lvz",
        value: "celvzteenschurch",
        label: "CELVZ Teens Church"
    },
    {
        zone_id: "phz3",
        value: "celimitless",
        label: "CE LIMITLESS"
    },
    {
        zone_id: "phz3",
        value: "ceccone",
        label: "CE CC ONE"
    },
    {
        zone_id: "phz3",
        value: "cecctwo",
        label: "CE CC TWO"
    },
    {
        zone_id: "phz3",
        value: "ceccthree",
        label: "CE CC THREE"
    },
    {
        zone_id: "phz3",
        value: "cegreaterph",
        label: "CE GREATER PH"
    },
    {
        zone_id: "phz3",
        value: "cezonalgroup",
        label: "CE ZONAL GROUP"
    },
    {
        zone_id: "phz3",
        value: "cegloriousgroup",
        label: "CE GLORIOUS GROUP"
    },
    {
        zone_id: "phz3",
        value: "ceadageorge",
        label: "CE ADA GEORGE"
    },
    {
        zone_id: "phz3",
        value: "cephilippines",
        label: "CE PHILIPPINES"
    },
    {
        zone_id: "phz3",
        value: "ceoasisgroup",
        label: "CE OASIS GROUP"
    },
    {
        zone_id: "phz3",
        value: "cetransamadigroup",
        label: "CE TRANSAMADI GROUP"
    },
    {
        zone_id: "rinrin",
        value: "ukregion",
        label: "UK Region"
    },
    {
        zone_id: "rinrin",
        value: "europe",
        label: "Europe"
    },
    {
        zone_id: "rinrin",
        value: "westafrica",
        label: "West Africa"
    },
    {
        zone_id: "rinrin",
        value: "southafrica",
        label: "South Africa"
    },
    {
        zone_id: "rinrin",
        value: "nigeriateama",
        label: "Nigeria Team A"
    },
    {
        zone_id: "rinrin",
        value: "nigeriateamb",
        label: "Nigeria Team B"
    },
    {
        zone_id: "rinrin",
        value: "nigeriateamc",
        label: "Nigeria Team C"
    },
    {
        zone_id: "rinrin",
        value: "eastafrica",
        label: "East Africa"
    },
    {
        zone_id: "rinrin",
        value: "engagement",
        label: "Engagement"
    },
    {
        zone_id: "torz",
        value: "calgarygroup",
        label: "Calgary Group"
    },
    {
        zone_id: "lvz",
        value: "youthchurch",
        label: "youthchurch"
    },
    {
        zone_id: "lvz",
        value: "phenomchurch",
        label: "phenomchurch"
    },
    {
        zone_id: "lvz",
        value: "lvzconnect",
        label: "LVZ CONNECT"
    },
    {
        zone_id: "lvz",
        value: "children'schurch",
        label: "CHILDREN'S CHURCH"
    },
    {
        zone_id: "ewcvz3",
        value: "gabagroup",
        label: "Gaba Group"
    },
    {
        zone_id: "saz1",
        value: "randburggroup",
        label: "Randburg Group"
    },
    {
        zone_id: "ewcvz3",
        value: "mainchurchgroupa",
        label: "Main Church Group A"
    },
    {
        zone_id: "ewcvz3",
        value: "ndeebasub-group",
        label: "Ndeeba Sub-Group"
    },
    {
        zone_id: "ewcvz3",
        value: "haikuwaitsub-group",
        label: "Haikuwait Sub - Group"
    },
    {
        zone_id: "ewcvz3",
        value: "lologosub-group",
        label: "Lologo Sub - Group"
    },
    {
        zone_id: "ewcvz3",
        value: "northernug.sub-group",
        label: "Northern UG. Sub - Group"
    },
    {
        zone_id: "rinrin",
        value: "asia",
        label: "Asia"
    },
    {
        zone_id: "ewcvz3",
        value: "mbalegroup",
        label: "Mbale  Group"
    },
    {
        zone_id: "ewcvz3",
        value: "mainchurchgroupb",
        label: "Main Church Group B"
    },
    {
        zone_id: "ewcvz3",
        value: "sorotisub-group",
        label: "Soroti Sub - Group"
    },
    {
        zone_id: "ewcvz3",
        value: "mukonogroup",
        label: "Mukono Group"
    },
    {
        zone_id: "ewcvz3",
        value: "wandegeyagroup",
        label: "Wandegeya Group"
    },
    {
        zone_id: "ewcvz3",
        value: "luziragroup",
        label: "Luzira Group"
    },
    {
        zone_id: "ewcvz3",
        value: "entebbegroup",
        label: "Entebbe Group"
    },
    {
        zone_id: "ewcvz3",
        value: "aruagroup",
        label: "Arua Group"
    },
    {
        zone_id: "ewcvz3",
        value: "jinjagroup",
        label: "Jinja Group"
    },
    {
        zone_id: "ewcvz3",
        value: "kirekagroup",
        label: "Kireka Group"
    },
    {
        zone_id: "ewcvz3",
        value: "rwandagroup",
        label: "Rwanda Group"
    },
    {
        zone_id: "ewcvz3",
        value: "juba1group",
        label: "Juba 1 Group"
    },
    {
        zone_id: "ewcvz3",
        value: "airportroadgroup",
        label: "Airport Road Group"
    },
    {
        zone_id: "ewcvz3",
        value: "seychellesgroup",
        label: "Seychelles Group"
    },
    {
        zone_id: "ewcvz3",
        value: "surinamegroup",
        label: "Suriname Group"
    },
    {
        zone_id: "ewcvz3",
        value: "dominicanrepublicgroup",
        label: "Dominican Republic Group"
    },
    {
        zone_id: "ewcvz3",
        value: "nyanamagroup",
        label: "Nyanama Group"
    },
    {
        zone_id: "ewcvz3",
        value: "northernugsub-group",
        label: "Northern Ug Sub - Group"
    },
    {
        zone_id: "accraz",
        value: "avenorgroup",
        label: "AVENOR GROUP"
    },
    {
        zone_id: "accraz",
        value: "laagroup",
        label: "LAA GROUP"
    },
    {
        zone_id: "accraz",
        value: "kumasi1group",
        label: "KUMASI 1 GROUP"
    },
    {
        zone_id: "accraz",
        value: "kumasi2group",
        label: "KUMASI 2 GROUP"
    },
    {
        zone_id: "accraz",
        value: "kumasi3group",
        label: "KUMASI 3 GROUP"
    },
    {
        zone_id: "accraz",
        value: "spintexgroup",
        label: "SPINTEX GROUP"
    },
    {
        zone_id: "accraz",
        value: "teens\/youthchurches",
        label: "TEENS\/YOUTH CHURCHES"
    },
    {
        zone_id: "accraz",
        value: "achimotagroup",
        label: "ACHIMOTA GROUP"
    },
    {
        zone_id: "accraz",
        value: "adentagroup",
        label: "ADENTA GROUP"
    },
    {
        zone_id: "accraz",
        value: "aflaogroup",
        label: "AFLAO GROUP"
    },
    {
        zone_id: "accraz",
        value: "agbozumegroup",
        label: "AGBOZUME GROUP"
    },
    {
        zone_id: "accraz",
        value: "akimodagroup",
        label: "AKIM ODA GROUP"
    },
    {
        zone_id: "accraz",
        value: "berekumgroup",
        label: "BEREKUM GROUP"
    },
    {
        zone_id: "accraz",
        value: "capecoastgroup",
        label: "CAPECOAST GROUP"
    },
    {
        zone_id: "accraz",
        value: "domegroup",
        label: "DOME GROUP"
    },
    {
        zone_id: "accraz",
        value: "hogroup",
        label: "HO GROUP"
    },
    {
        zone_id: "accraz",
        value: "kasoagroup",
        label: "KASOA GROUP"
    },
    {
        zone_id: "accraz",
        value: "ketagroup",
        label: "KETA GROUP"
    },
    {
        zone_id: "accraz",
        value: "koforiduagroup",
        label: "KOFORIDUA GROUP"
    },
    {
        zone_id: "accraz",
        value: "korlebugroiup",
        label: "KORLE BU GROIUP"
    },
    {
        zone_id: "accraz",
        value: "legon2group",
        label: "LEGON 2 GROUP"
    },
    {
        zone_id: "accraz",
        value: "madinagroup",
        label: "MADINA GROUP"
    },
    {
        zone_id: "accraz",
        value: "matahekogroup",
        label: "MATAHEKO GROUP"
    },
    {
        zone_id: "accraz",
        value: "oldweijagroup",
        label: "OLD WEIJA GROUP"
    },
    {
        zone_id: "accraz",
        value: "osugroup",
        label: "OSU GROUP"
    },
    {
        zone_id: "accraz",
        value: "taifagroup",
        label: "TAIFA GROUP"
    },
    {
        zone_id: "accraz",
        value: "takoradi1group",
        label: "TAKORADI 1 GROUP"
    },
    {
        zone_id: "accraz",
        value: "takoradi2group",
        label: "TAKORADI 2 GROUP"
    },
    {
        zone_id: "accraz",
        value: "tamalegroup",
        label: "TAMALE GROUP"
    },
    {
        zone_id: "accraz",
        value: "tarkwagroup",
        label: "TARKWA GROUP"
    },
    {
        zone_id: "accraz",
        value: "weijagroup",
        label: "WEIJA GROUP"
    },
    {
        zone_id: "accraz",
        value: "westlegongroup",
        label: "WEST LEGON GROUP"
    },
    {
        zone_id: "accraz",
        value: "atomicgroup",
        label: "ATOMIC GROUP"
    },
    {
        zone_id: "usaz1r2",
        value: "dallasgroup",
        label: "DALLAS GROUP"
    },
    {
        zone_id: "usaz1r2",
        value: "atlantagroup",
        label: "ATLANTA GROUP"
    },
    {
        zone_id: "usaz1r2",
        value: "zone1",
        label: "ZONE 1"
    },
    {
        zone_id: "savz2",
        value: "cesunninghillgroup",
        label: "CE SUNNINGHILL GROUP"
    },
    {
        zone_id: "savz2",
        value: "cesouthgroup",
        label: "CE SOUTH GROUP"
    },
    {
        zone_id: "ottz",
        value: "ottawagroup",
        label: "Ottawa Group"
    },
    {
        zone_id: "lwsaza",
        value: "johannesburgcentral",
        label: "Johannesburg Central"
    },
    {
        zone_id: "lwsaza",
        value: "pretoriaeast",
        label: "Pretoria East"
    },
    {
        zone_id: "lwsaza",
        value: "johannesburgnorth",
        label: "Johannesburg North"
    },
    {
        zone_id: "lwsaza",
        value: "johannesburgsouth",
        label: "Johannesburg South"
    },
    {
        zone_id: "lwsaza",
        value: "pretorianorth",
        label: "Pretoria North"
    },
    {
        zone_id: "lwsaza",
        value: "pretoriawest",
        label: "Pretoria West"
    },
    {
        zone_id: "lwsaza",
        value: "turfloop",
        label: "Turfloop"
    },
    {
        zone_id: "lwsaza",
        value: "venda",
        label: "Venda"
    },
    {
        zone_id: "lwsaza",
        value: "northwest",
        label: "North West"
    },
    {
        zone_id: "lwsaza",
        value: "mpumalanga",
        label: "Mpumalanga"
    },
    {
        zone_id: "lwsaza",
        value: "vaal",
        label: "Vaal"
    },
    {
        zone_id: "ukz1",
        value: "ballymungroup",
        label: "Ballymun Group"
    },
    {
        zone_id: "lsza",
        value: "lwpeaceville",
        label: "LW Peaceville"
    },
    {
        zone_id: "lsza",
        value: "ladilak",
        label: "LADILAK"
    },
    {
        zone_id: "lsza",
        value: "bariga",
        label: "BARIGA"
    },
    {
        zone_id: "lsza",
        value: "ogudu",
        label: "OGUDU"
    },
    {
        zone_id: "lsza",
        value: "orioke",
        label: "ORIOKE"
    },
    {
        zone_id: "lsza",
        value: "soluyi",
        label: "SOLUYI"
    },
    {
        zone_id: "lsza",
        value: "oworo",
        label: "OWORO"
    },
    {
        zone_id: "accraz",
        value: "youthchurchesgroup",
        label: "youth churches group"
    },
    {
        zone_id: "sez3",
        value: "ceenugu1",
        label: "CE ENUGU 1"
    },
    {
        zone_id: "sez3",
        value: "ceabakaliki1",
        label: "CE ABAKALIKI 1"
    },
    {
        zone_id: "sez3",
        value: "ceenugu2",
        label: "CE ENUGU 2"
    },
    {
        zone_id: "sez3",
        value: "ceabakaliki2",
        label: "CE ABAKALIKI 2"
    },
    {
        zone_id: "accraz",
        value: "akimoda1group",
        label: "akimoda1group"
    },
    {
        zone_id: "abujamc",
        value: "virtuousgroup",
        label: "VIRTUOUS GROUP"
    },
    {
        zone_id: "abujamc",
        value: "auxanogroup",
        label: "AUXANO GROUP"
    },
    {
        zone_id: "abujamc",
        value: "pleromagroup",
        label: "PLEROMA GROUP"
    },
    {
        zone_id: "abujamc",
        value: "mimshachgroup",
        label: "MIMSHACH GROUP"
    },
    {
        zone_id: "abujamc",
        value: "cbdgroup",
        label: "CBD GROUP"
    },
    {
        zone_id: "abujamc",
        value: "modelgroup",
        label: "MODEL GROUP"
    },
    {
        zone_id: "abujamc",
        value: "lokogomagroup",
        label: "LOKOGOMA GROUP"
    },
    {
        zone_id: "abujamc",
        value: "mcaairportroadgroup",
        label: "MCA AIRPORT ROAD GROUP"
    },
    {
        zone_id: "abujamc",
        value: "karugroup",
        label: "KARU GROUP"
    },
    {
        zone_id: "abujamc",
        value: "korodumagroup",
        label: "KORODUMA GROUP"
    },
    {
        zone_id: "abujamc",
        value: "garkigroup",
        label: "GARKI GROUP"
    },
    {
        zone_id: "abujamc",
        value: "asokorogroup",
        label: "ASOKORO GROUP"
    },
    {
        zone_id: "abujamc",
        value: "wusegroup",
        label: "WUSE GROUP"
    },
    {
        zone_id: "abujamc",
        value: "silverbirdgroup",
        label: "SILVERBIRD GROUP"
    },
    {
        zone_id: "abujamc",
        value: "nyanyagroup",
        label: "NYANYA GROUP"
    },
    {
        zone_id: "lz2",
        value: "zonalgroup",
        label: "zonalgroup"
    },
    {
        zone_id: "wevz3",
        value: "cethun",
        label: "CE THUN"
    },
    {
        zone_id: "lz5",
        value: "ikoyigroup",
        label: "Ikoyi Group"
    },
    {
        zone_id: "lz5",
        value: "epegroup",
        label: "Epe group"
    },
    {
        zone_id: "lz2",
        value: "isolo1group",
        label: "Isolo1group"
    },
    {
        zone_id: "lz2",
        value: "festacgroup",
        label: "festacgroup"
    },
    {
        zone_id: "lz2",
        value: "dopemugroup",
        label: "dopemugroup"
    },
    {
        zone_id: "lz2",
        value: "ipajagroup",
        label: "ipajagroup"
    },
    {
        zone_id: "lz2",
        value: "badagry",
        label: "badagry"
    },
    {
        zone_id: "lz2",
        value: "badagrygroup",
        label: "badagrygroup"
    },
    {
        zone_id: "lz2",
        value: "estategroup",
        label: "estategroup"
    },
    {
        zone_id: "lz2",
        value: "isolo2group",
        label: "isolo2group"
    },
    {
        zone_id: "lz2",
        value: "ibaijanikingroup",
        label: "ibaijanikingroup"
    },
    {
        zone_id: "lz2",
        value: "newojogroup",
        label: "New Ojo Group"
    },
    {
        zone_id: "lz2",
        value: "abaranje1group",
        label: "abaranje1group"
    },
    {
        zone_id: "lz2",
        value: "isherigroup",
        label: "isherigroup"
    },
    {
        zone_id: "lz2",
        value: "egbegroup",
        label: "Egbegroup"
    },
    {
        zone_id: "lz2",
        value: "ikotun",
        label: "ikotun"
    },
    {
        zone_id: "lz2",
        value: "afromedia",
        label: "afromedia"
    },
    {
        zone_id: "lz2",
        value: "ejigbogroup",
        label: "ejigbogroup"
    },
    {
        zone_id: "lz2",
        value: "ajangbadigroup",
        label: "ajangbadigroup"
    },
    {
        zone_id: "lz2",
        value: "okokogroup",
        label: "okokogroup"
    },
    {
        zone_id: "ewcvz2",
        value: "cetogo1",
        label: "CETOGO1"
    },
    {
        zone_id: "ewcvz2",
        value: "cetogo2",
        label: "CETOGO2"
    },
    {
        zone_id: "ewcvz2",
        value: "cecotedivoire",
        label: "CECOTEDIVOIRE"
    },
    {
        zone_id: "ewcvz2",
        value: "ceguinea",
        label: "CEGUINEA"
    },
    {
        zone_id: "ewcvz2",
        value: "cebenin",
        label: "CEBENIN"
    },
    {
        zone_id: "ewcvz2",
        value: "ceteens",
        label: "CETEENS"
    },
    {
        zone_id: "ewcvz2",
        value: "cesenegal",
        label: "CESENEGAL"
    },
    {
        zone_id: "ewcvz2",
        value: "ceburkina",
        label: "CEBURKINA"
    },
    {
        zone_id: "ewcvz2",
        value: "ceniger",
        label: "CENIGER"
    },
    {
        zone_id: "ewcvz2",
        value: "cemali",
        label: "CEMALI"
    },
    {
        zone_id: "beninz1",
        value: "erediauwagroup",
        label: "EREDIAUWA GROUP"
    },
    {
        zone_id: "beninz1",
        value: "centralchurchgroup",
        label: "CENTRAL CHURCH GROUP"
    },
    {
        zone_id: "beninz1",
        value: "centralmissions1",
        label: "CENTRAL MISSIONS 1"
    },
    {
        zone_id: "beninz1",
        value: "centralmissions2",
        label: "CENTRAL MISSIONS 2"
    },
    {
        zone_id: "beninz1",
        value: "missions1",
        label: "MISSIONS 1"
    },
    {
        zone_id: "beninz1",
        value: "missions2",
        label: "MISSIONS 2"
    },
    {
        zone_id: "beninz1",
        value: "missions3",
        label: "MISSIONS 3"
    },
    {
        zone_id: "beninz1",
        value: "missions4",
        label: "MISSIONS 4"
    },
    {
        zone_id: "beninz1",
        value: "missions5",
        label: "MISSIONS 5"
    },
    {
        zone_id: "beninz1",
        value: "missions6",
        label: "MISSIONS 6"
    },
    {
        zone_id: "reoeon",
        value: "westafricareongroups",
        label: "West Africa REON groups"
    },
    {
        zone_id: "ewcvz2",
        value: "cecireon",
        label: "CECIREON"
    },
    {
        zone_id: "ewcvz2",
        value: "ceciext",
        label: "CECIEXT"
    },
    {
        zone_id: "ukvz3",
        value: "perivalegroup",
        label: "PERIVALE GROUP"
    },
    {
        zone_id: "ukvz3",
        value: "watfordgroup",
        label: "WATFORD GROUP"
    },
    {
        zone_id: "ukvz3",
        value: "hillingdongroup",
        label: "HILLINGDON GROUP"
    },
    {
        zone_id: "ukvz3",
        value: "streathamgroup",
        label: "STREATHAM GROUP"
    },
    {
        zone_id: "reoeon",
        value: "northafricareongroups",
        label: "North Africa REON groups"
    },
    {
        zone_id: "reoeon",
        value: "southafricagroups",
        label: "South Africa Groups"
    },
    {
        zone_id: "reoeon",
        value: "eastafricareongroups",
        label: "East Africa REON groups"
    },
    {
        zone_id: "reoeon",
        value: "centralafricareongroups",
        label: "Central Africa REON groups"
    },
    {
        zone_id: "reoeon",
        value: "oceaniareongroups",
        label: "Oceania REON groups"
    },
    {
        zone_id: "reoeon",
        value: "ukandeuropereongroups",
        label: "UK and Europe REON groups"
    },
    {
        zone_id: "reoeon",
        value: "southamericareongroups",
        label: "South America  REON groups"
    },
    {
        zone_id: "reoeon",
        value: "northamericareongroups",
        label: "North America REON groups"
    },
    {
        zone_id: "reoeon",
        value: "asiareongroups",
        label: "Asia REON Groups "
    },
    {
        zone_id: "lsza",
        value: "gbagadasubgroup",
        label: "Gbagada Subgroup"
    },
    {
        zone_id: "ibz1",
        value: "ceakobogroup",
        label: "CE AKOBO GROUP"
    },
    {
        zone_id: "ewcvz2",
        value: "ceflw",
        label: "CEFLW"
    },
    {
        zone_id: "rinrin",
        value: "africa",
        label: "Africa"
    },
    {
        zone_id: "ibz1",
        value: "ajibodejunctiongroup",
        label: "AJIBODE JUNCTION GROUP"
    },
    {
        zone_id: "ibz1",
        value: "ceeleyelegroup",
        label: "CE ELEYELE GROUP"
    },
    {
        zone_id: "ibz1",
        value: "samondagroup",
        label: "SAMONDA GROUP"
    },
    {
        zone_id: "lszb",
        value: "lcc2group",
        label: "LCC 2 GROUP"
    },
    {
        zone_id: "lszb",
        value: "ceomolegroup",
        label: "CE OMOLE GROUP"
    },
    {
        zone_id: "lszb",
        value: "celighthousegroup",
        label: "CE LIGHT HOUSE GROUP"
    },
    {
        zone_id: "ibz1",
        value: "samondagroup",
        label: "SAMONDA GROUP"
    },
    {
        zone_id: "lvz",
        value: "childrenschurch",
        label: "CHILDRENS CHURCH"
    },
    {
        zone_id: "ewcvz5",
        value: "cenunguagroup",
        label: "CE NUNGUA GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "ashaimangroup",
        label: "ASHAIMAN GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "temagroup",
        label: "TEMA GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "lashibigroup",
        label: "LASHIBI GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "michelnationgroup",
        label: "MICHEL NATION GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "twichurchgroup",
        label: "TWI CHURCH GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "triumphantgroup",
        label: "TRIUMPHANT GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "teshiegroup",
        label: "TESHIE GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "denugroup",
        label: "DENU GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "dansomangroup",
        label: "DANSOMAN GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "paynesvillegroup",
        label: "PAYNESVILLE GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "gambiagroup",
        label: "GAMBIA GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "bogroup",
        label: " BO GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "monroviagroup",
        label: "MONROVIA GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "somaliadrivegroup",
        label: "SOMALIA DRIVE GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "eastlegongroup",
        label: "East Legon Group"
    },
    {
        zone_id: "ewcvz5",
        value: "adentagroupz5",
        label: "ADENTA GROUPZ5"
    },
    {
        zone_id: "ewcvz5",
        value: "kissygroup",
        label: "KISSY GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "makenigroup",
        label: "MAKENI GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "waterloogroup",
        label: "WATERLOO GROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "seirraleonecentralgroup",
        label: "SEIRRA LEONE CENTRALGROUP"
    },
    {
        zone_id: "ewcvz5",
        value: "congocrossgroup",
        label: "CONGO CROSS GROUP"
    },
    {
        zone_id: "ibz1",
        value: "bodijagroup",
        label: "BODIJA GROUP"
    },
    {
        zone_id: "phz1",
        value: "ceboundlessgracegroup",
        label: "CE BOUNDLESS GRACE GROUP"
    },
    {
        zone_id: "phz1",
        value: "ceboundlessgrace2group",
        label: "CE BOUNDLESS GRACE 2 GROUP"
    },
    {
        zone_id: "phz1",
        value: "cedoagroup",
        label: "CE DOA GROUP"
    },
    {
        zone_id: "phz1",
        value: "cegphgroup",
        label: "CE GPH GROUP"
    },
    {
        zone_id: "phz1",
        value: "cetriumphantgroup",
        label: "CE TRIUMPHANT GROUP"
    },
    {
        zone_id: "phz1",
        value: "ceofggroup",
        label: "CE OFG GROUP"
    },
    {
        zone_id: "phz1",
        value: "cecitycentergroup",
        label: "CE CITY CENTER GROUP"
    },
    {
        zone_id: "phz1",
        value: "celivingspringgroup",
        label: "CE LIVING SPRING GROUP"
    },
    {
        zone_id: "phz1",
        value: "ceoyigbogroup",
        label: "CE OYIGBO GROUP"
    },
    {
        zone_id: "phz1",
        value: "cerumoghorlugroup",
        label: "CE RUMOGHORLU GROUP"
    },
    {
        zone_id: "phz1",
        value: "cemimishacksubgroup",
        label: "CE MIMISHACK SUB GROUP"
    },
    {
        zone_id: "phz1",
        value: "cefbsubgroup",
        label: "CE FB SUB GROUP"
    },
    {
        zone_id: "phz1",
        value: "ceexcellentgroup",
        label: "CE EXCELLENT GROUP"
    },
    {
        zone_id: "phz1",
        value: "cegreaterlightsubgroup",
        label: "CE GREATER LIGHT SUB GROUP"
    },
    {
        zone_id: "phz1",
        value: "ceenekasubgroup",
        label: "CE ENEKA SUB GROUP"
    },
    {
        zone_id: "phz1",
        value: "cegracepointsubgroup",
        label: "CE GRACE POINT SUB GROUP"
    },
    {
        zone_id: "phz1",
        value: "bgonlinegroup",
        label: "BG ONLINE GROUP"
    },
    {
        zone_id: "lz2",
        value: "lafiagroup",
        label: "lafiagroup"
    },
    {
        zone_id: "lz2",
        value: "intlmissionsgroup",
        label: "Intlmissionsgroup"
    },
    {
        zone_id: "saz1",
        value: "sandtongroup",
        label: "Sandton Group"
    },
    {
        zone_id: "saz1",
        value: "portelizabethgroup",
        label: "Port Elizabeth Group"
    },
    {
        zone_id: "saz1",
        value: "rusternburggroup",
        label: "Rusternburg Group"
    },
    {
        zone_id: "saz1",
        value: "eastlondongroup",
        label: "East London Group"
    },
    {
        zone_id: "saz1",
        value: "polokwanegroup",
        label: "Polokwane Group"
    },
    {
        zone_id: "saz1",
        value: "newlandsgroup",
        label: "Newlands Group"
    },
    {
        zone_id: "phz1",
        value: "coegroup",
        label: "COE GROUP"
    },
    {
        zone_id: "phz1",
        value: "cephzone1teen",
        label: "CEPHZONE1 TEEN"
    },
    {
        zone_id: "qubebs",
        value: "qubwebs1",
        label: "QUBWEBS1"
    },
    {
        zone_id: "qubebs",
        value: "qubwebs2",
        label: "QUBWEBS2"
    },
    {
        zone_id: "midwestz",
        value: "ceekpan-realgroup",
        label: "CE Ekpan-Real Group"
    },
    {
        zone_id: "midwestz",
        value: "cebowengroup",
        label: "CE Bowen Group"
    },
    {
        zone_id: "midwestz",
        value: "ceugbowogroup",
        label: "CE Ugbowo Group"
    },
    {
        zone_id: "midwestz",
        value: "cesiluko",
        label: "CE SILUKO"
    },
    {
        zone_id: "midwestz",
        value: "ceurhobo",
        label: "CE Urhobo"
    },
    {
        zone_id: "midwestz",
        value: "cesilukomodelgroup",
        label: "CE Siluko Model Group"
    },
    {
        zone_id: "midwestz",
        value: "ceolukugroup",
        label: "CE Oluku Group"
    },
    {
        zone_id: "midwestz",
        value: "ceiguosagroup",
        label: "CE Iguosa Group"
    },
    {
        zone_id: "midwestz",
        value: "ceokadagroup",
        label: "CE Okada Group"
    },
    {
        zone_id: "midwestz",
        value: "cenewbeningroup",
        label: "CE New Benin Group"
    },
    {
        zone_id: "midwestz",
        value: "cetextilemillgroup",
        label: "CE Textile Mill Group"
    },
    {
        zone_id: "midwestz",
        value: "ceogidagroup",
        label: "CE Ogida Group"
    },
    {
        zone_id: "midwestz",
        value: "cemegagroup",
        label: "CE Mega Group"
    },
    {
        zone_id: "ewcvz3",
        value: "teamz",
        label: "TeamZ"
    },
    {
        zone_id: "texasz2",
        value: "irvinggroup",
        label: "IRVING GROUP"
    },
    {
        zone_id: "texasz2",
        value: "arlingtongroup",
        label: "ARLINGTON GROUP"
    },
    {
        zone_id: "texasz2",
        value: "northshoregroup",
        label: "NORTHSHORE GROUP"
    },
    {
        zone_id: "texasz2",
        value: "cypressgroup",
        label: "CYPRESS GROUP"
    },
    {
        zone_id: "texasz2",
        value: "ohiogroup",
        label: "OHIO GROUP"
    },
    {
        zone_id: "texasz2",
        value: "alvingroup",
        label: "ALVIN GROUP"
    },
    {
        zone_id: "texasz2",
        value: "lwychurch",
        label: "LWY Church"
    },
    {
        zone_id: "savz2",
        value: "kemptonparkgroup",
        label: "KEMPTON PARK GROUP"
    },
    {
        zone_id: "savz2",
        value: "cekemptonparkgroup",
        label: "CE KEMPTON PARK GROUP"
    },
    {
        zone_id: "lz5",
        value: "celekki",
        label: " CE LEKKI"
    },
    {
        zone_id: "lz5",
        value: "ceajahgroup",
        label: "CE AJAH GROUP"
    },
    {
        zone_id: "lz5",
        value: "cechevrongroup",
        label: "CE CHEVRON GROUP"
    },
    {
        zone_id: "lz5",
        value: "cebrazilgroup",
        label: "CE BRAZIL GROUP"
    },
    {
        zone_id: "lz5",
        value: "ceabijo-tedogroup",
        label: "CE ABIJO-TEDO GROUP"
    },
    {
        zone_id: "lz5",
        value: "cekajolagroup",
        label: "CE KAJOLA GROUP"
    },
    {
        zone_id: "lz5",
        value: "celekkiphase1group",
        label: "CE LEKKI PHASE 1 GROUP"
    },
    {
        zone_id: "lz5",
        value: "cefreetradezonegroup",
        label: "CE FREE TRADE ZONE GROUP"
    },
    {
        zone_id: "lz5",
        value: "celagosislandgroup",
        label: "CE LAGOS ISLAND GROUP"
    },
    {
        zone_id: "lwza",
        value: "blwekpomagroup",
        label: "Blw Ekpoma Group"
    },
    {
        zone_id: "lwza",
        value: "blwabrakagroup",
        label: "Blw Abraka Group"
    },
    {
        zone_id: "lwza",
        value: "blwkogigroup",
        label: "BLW Kogi Group"
    },
    {
        zone_id: "lwza",
        value: "blwauchigroup",
        label: "Blw Auchi Group"
    },
    {
        zone_id: "lwzb",
        value: "naugroup",
        label: "NAU Group"
    },
    {
        zone_id: "lwzb",
        value: "enugugroup",
        label: "Enugu Group"
    },
    {
        zone_id: "lwzb",
        value: "ebonyigroup",
        label: "Ebonyi Group"
    },
    {
        zone_id: "lwzb",
        value: "uligroup",
        label: "Uli Group"
    },
    {
        zone_id: "lwzb",
        value: "igbariamgroup",
        label: "Igbariam Group"
    },
    {
        zone_id: "savz2",
        value: "cepretoriagroup",
        label: "CE PRETORIA GROUP"
    },
    {
        zone_id: "savz2",
        value: "cegerminstongroup",
        label: "CE GERMINSTON GROUP"
    },
    {
        zone_id: "savz2",
        value: "cedurbangroup",
        label: "CE DURBAN GROUP"
    },
    {
        zone_id: "savz2",
        value: "cekimberleygroup",
        label: "CE KIMBERLEY GROUP"
    },
    {
        zone_id: "savz2",
        value: "cenamibiagroup",
        label: "CE NAMIBIA GROUP"
    },
    {
        zone_id: "savz2",
        value: "ceangolagroup",
        label: "CE ANGOLA GROUP"
    },
    {
        zone_id: "savz2",
        value: "cekensingtongroup",
        label: "CE KENSINGTON GROUP"
    },
    {
        zone_id: "savz2",
        value: "ceyoevillegroup",
        label: "CE YOEVILLE GROUP"
    },
    {
        zone_id: "lwzb",
        value: "unwana",
        label: "UNWANA"
    },
    {
        zone_id: "nncvz1",
        value: "rukubagroup",
        label: "RUKUBA GROUP"
    },
    {
        zone_id: "lz5",
        value: "cevigroup",
        label: "CE VI GROUP"
    },
    {
        zone_id: "lwcg2",
        value: "blwcameroongroup2",
        label: "BLW CAMEROON GROUP 2"
    },
    {
        zone_id: "lwzg",
        value: "aauagroup",
        label: "Aaua Group"
    },
    {
        zone_id: "lwzg",
        value: "futagroup",
        label: "Futa Group"
    },
    {
        zone_id: "lwzg",
        value: "eksugroup",
        label: "Eksu Group"
    },
    {
        zone_id: "lvz",
        value: "lvzturkey",
        label: "LVZ TURKEY"
    },
    {
        zone_id: "lwukzb",
        value: "londongroup1",
        label: "London Group 1"
    },
    {
        zone_id: "itlice",
        value: "externalpartnership",
        label: "External Partnership"
    },
    {
        zone_id: "itlice",
        value: "agcc",
        label: "AGCC"
    },
    {
        zone_id: "accraz",
        value: "westafricareongroup",
        label: "westafricareongroup"
    },
    {
        zone_id: "lz1",
        value: "strategicgroup1",
        label: "STRATEGIC GROUP 1"
    },
    {
        zone_id: "beninz1",
        value: "comforter",
        label: "comforter"
    },
    {
        zone_id: "beninz1",
        value: "comforters",
        label: "COMFORTERS"
    },
    {
        zone_id: "beninz1",
        value: "amazing",
        label: "AMAZING"
    },
    {
        zone_id: "beninz1",
        value: "pillars",
        label: "PILLARS"
    },
    {
        zone_id: "beninz1",
        value: "modern",
        label: "MODERN"
    },
    {
        zone_id: "beninz1",
        value: "supernatural",
        label: "SUPERNATURAL"
    },
    {
        zone_id: "beninz1",
        value: "pillarscentral",
        label: "PILLARSCENTRAL"
    },
    {
        zone_id: "beninz1",
        value: "greaterlights",
        label: "GREATERLIGHTS"
    },
    {
        zone_id: "beninz1",
        value: "achievers",
        label: "ACHIEVERS"
    },
    {
        zone_id: "beninz1",
        value: "flourishing",
        label: "FLOURISHING"
    },
    {
        zone_id: "middleeast",
        value: "middleeast",
        label: "Middle East"
    },
    {
        zone_id: "ukz4",
        value: "bristolgroup",
        label: "BRISTOL GROUP"
    },
    {
        zone_id: "ukz4",
        value: "barkinggroup",
        label: "BARKING GROUP"
    },
    {
        zone_id: "ukz4",
        value: "harlowgroup",
        label: "HARLOW GROUP"
    },
    {
        zone_id: "ukz4",
        value: "docklandsgroup",
        label: "DOCKLANDS GROUP"
    },
    {
        zone_id: "beninz1",
        value: "wm1",
        label: "WM1"
    },
    {
        zone_id: "beninz1",
        value: "wm2",
        label: "WM2"
    },
    {
        zone_id: "beninz1",
        value: "wm6",
        label: "WM6"
    },
    {
        zone_id: "beninz1",
        value: "rm3",
        label: "RM3"
    },
    {
        zone_id: "beninz1",
        value: "wm5",
        label: "WM5"
    },
    {
        zone_id: "beninz1",
        value: "rm4",
        label: "RM4"
    },
    {
        zone_id: "beninz1",
        value: "rcm1",
        label: "RCM1"
    },
    {
        zone_id: "beninz1",
        value: "rcm2",
        label: "RCM2"
    },
    {
        zone_id: "beninz1",
        value: "model",
        label: "MODEL"
    },
    {
        zone_id: "beninz1",
        value: "greaterlight",
        label: "GREATERLIGHT"
    },
    {
        zone_id: "lwzl",
        value: "blwunicalgroup",
        label: "BLW UNICAL GROUP"
    },
    {
        zone_id: "lwzl",
        value: "blwcrutechgroup",
        label: "BLW CRUTECH GROUP"
    },
    {
        zone_id: "lwzl",
        value: "blwuniuyogroup",
        label: "BLW UNIUYO GROUP"
    },
    {
        zone_id: "nwz1",
        value: "cezariagroup",
        label: "CEZARIAGROUP"
    },
    {
        zone_id: "lz1",
        value: "strategicgroup2",
        label: "STRATEGIC GROUP 2"
    },
    {
        zone_id: "lz1",
        value: "ketugroup",
        label: "KETU GROUP"
    },
    {
        zone_id: "lz1",
        value: "lovearenagroup",
        label: "LOVE ARENA GROUP"
    },
    {
        zone_id: "nwz1",
        value: "cesokotogroup",
        label: "CESOKOTOGROUP"
    },
    {
        zone_id: "lz1",
        value: "youth&teensgroup",
        label: "YOUTH & TEENS GROUP"
    },
    {
        zone_id: "nwz1",
        value: "cekadunagroup",
        label: "CEKADUNAGROUP"
    },
    {
        zone_id: "lz1",
        value: "environs2group",
        label: "ENVIRONS 2 GROUP"
    },
    {
        zone_id: "lz1",
        value: "agegegroup",
        label: "AGEGE GROUP"
    },
    {
        zone_id: "nwz1",
        value: "cezamfaragroup",
        label: "CEZAMFARAGROUP"
    },
    {
        zone_id: "lz1",
        value: "akutegroup",
        label: "AKUTE GROUP"
    },
    {
        zone_id: "nwz1",
        value: "cekebbigroup",
        label: "CEKEBBIGROUP"
    },
    {
        zone_id: "lz1",
        value: "ifakoijugroup",
        label: "IFAKO IJU GROUP"
    },
    {
        zone_id: "lz1",
        value: "abuleegbagroup1",
        label: "ABULE EGBA GROUP 1"
    },
    {
        zone_id: "lz1",
        value: "abuleegbagroup2",
        label: "ABULE EGBA GROUP 2"
    },
    {
        zone_id: "lz1",
        value: "greatmainlandgroup",
        label: "GREAT MAINLAND GROUP"
    },
    {
        zone_id: "lz1",
        value: "mainland2group",
        label: "MAINLAND 2 GROUP"
    },
    {
        zone_id: "lz1",
        value: "marylandgroup",
        label: "MARYLAND GROUP"
    },
    {
        zone_id: "lz1",
        value: "isherimagodogroup",
        label: "ISHERI MAGODO GROUP"
    },
    {
        zone_id: "lz1",
        value: "agbadoholdinggroup",
        label: "AGBADO HOLDING GROUP"
    },
    {
        zone_id: "lz1",
        value: "ikoroducentralgroup",
        label: "IKORODU CENTRAL GROUP"
    },
    {
        zone_id: "lz1",
        value: "ikoroduwestgroup",
        label: "IKORODU WEST GROUP"
    },
    {
        zone_id: "lz1",
        value: "ikorodueastgroup",
        label: "IKORODU EAST GROUP"
    },
    {
        zone_id: "lz1",
        value: "ikorodunorthgroup",
        label: "IKORODU NORTH GROUP"
    },
    {
        zone_id: "lz1",
        value: "ojodugroup",
        label: "OJODU GROUP"
    },
    {
        zone_id: "lz1",
        value: "aviationgroup",
        label: "AVIATION GROUP"
    },
    {
        zone_id: "lz1",
        value: "mafolukugroup",
        label: "MAFOLUKU GROUP"
    },
    {
        zone_id: "lz1",
        value: "internaltionalmissionsgroup",
        label: "INTERNALTIONAL MISSIONS GROUP"
    },
    {
        zone_id: "usaz1r2",
        value: "rhapsodyadministrators",
        label: "Rhapsody Administrators"
    },
    {
        zone_id: "lw2ndtierz",
        value: "lwchurchgroup1",
        label: "LW CHURCH GROUP 1"
    },
    {
        zone_id: "lw2ndtierz",
        value: "lwchurchgroup2",
        label: "LW CHURCH GROUP 2"
    },
    {
        zone_id: "lw2ndtierz",
        value: "lwchurchgroup3",
        label: "LW CHURCH GROUP 3"
    },
    {
        zone_id: "lw2ndtierz",
        value: "lwchurchgroup4",
        label: "LW CHURCH GROUP 4"
    },
    {
        zone_id: "lw2ndtierz",
        value: "lwchurchgroup5",
        label: "LW CHURCH GROUP 5"
    },
    {
        zone_id: "lw2ndtierz",
        value: "lwchurchgroup6",
        label: "LW CHURCH GROUP 6"
    },
    {
        zone_id: "lw2ndtierz",
        value: "lwchurchsubgroup1",
        label: "LW CHURCH SUB GROUP 1"
    },
    {
        zone_id: "lw2ndtierz",
        value: "lwchurchgroup7",
        label: "LW CHURCH GROUP 7"
    },
    {
        zone_id: "lw2ndtierz",
        value: "lwchurchsubgroup2",
        label: "LW CHURCH SUB GROUP 2"
    },
    {
        zone_id: "lw2ndtierz",
        value: "zonalchurch",
        label: "ZONAL CHURCH"
    },
    {
        zone_id: "itlice",
        value: "ext",
        label: "EXT"
    },
    {
        zone_id: "lz1",
        value: "youthteensgroup",
        label: "YOUTHTEENS GROUP"
    },
    {
        zone_id: "abeakutamc",
        value: "lighthousegroup",
        label: "LIGHTHOUSE GROUP"
    },
    {
        zone_id: "abeakutamc",
        value: "lovechurchgroup",
        label: "LOVECHURCH GROUP"
    },
    {
        zone_id: "abeakutamc",
        value: "aserogroup",
        label: "ASERO GROUP"
    },
    {
        zone_id: "abeakutamc",
        value: "globalconnect",
        label: "GLOBAL CONNECT"
    },
    {
        zone_id: "itlice",
        value: "rim",
        label: "RIM"
    },
    {
        zone_id: "lz5",
        value: "ceikoyi2",
        label: "CE IKOYI 2"
    },
    {
        zone_id: "nnevz1",
        value: "christembassybauchi",
        label: "CHRIST EMBASSY BAUCHI"
    },
    {
        zone_id: "lz6",
        value: "citychurchgroup",
        label: "CITY CHURCH GROUP"
    },
    {
        zone_id: "lz6",
        value: "apapagroup",
        label: "APAPA GROUP"
    },
    {
        zone_id: "lz6",
        value: "ajegunlegroup",
        label: "AJEGUNLE GROUP"
    },
    {
        zone_id: "lz6",
        value: "ijorabadiagroup",
        label: "IJORA BADIA GROUP"
    },
    {
        zone_id: "lz6",
        value: "championsgroup",
        label: "CHAMPIONS GROUP"
    },
    {
        zone_id: "nnevz1",
        value: "cejalingo",
        label: "CE Jalingo"
    },
    {
        zone_id: "nsevz2",
        value: "ceagbor",
        label: "CEAgbor"
    },
    {
        zone_id: "nsevz2",
        value: "ceasaba",
        label: "CEAsaba"
    },
    {
        zone_id: "nsevz2",
        value: "cennewi",
        label: "CENnewi"
    },
    {
        zone_id: "nsevz2",
        value: "ceawka",
        label: "CEAwka"
    },
    {
        zone_id: "lz4",
        value: "alakukogroup",
        label: "ALAKUKO GROUP"
    },
    {
        zone_id: "lz4",
        value: "egbedagroup",
        label: "EGBEDA GROUP"
    },
    {
        zone_id: "lz4",
        value: "otagroup",
        label: "OTA GROUP"
    },
    {
        zone_id: "lz4",
        value: "ijokogroup",
        label: "IJOKO GROUP"
    },
    {
        zone_id: "lz4",
        value: "centralgroup",
        label: "CENTRAL GROUP"
    },
    {
        zone_id: "lz4",
        value: "iyanaipajagroup",
        label: "IYANA IPAJA GROUP"
    },
    {
        zone_id: "lz4",
        value: "uturngroup",
        label: "U TURN GROUP"
    },
    {
        zone_id: "lwusagrp3",
        value: "oasischurchsilverspring",
        label: "Oasis Church Silver Spring "
    },
    {
        zone_id: "lwusagrp3",
        value: "oasischurchbaltimore",
        label: "Oasis Church Baltimore"
    },
    {
        zone_id: "lwusagrp3",
        value: "oasischurchnewyork",
        label: "Oasis Church New York"
    },
    {
        zone_id: "lwusagrp3",
        value: "oasischurchnewjersey",
        label: "Oasis Church New Jersey "
    },
    {
        zone_id: "lwusagrp3",
        value: "oasischurchatlanta",
        label: "Oasis Church Atlanta "
    },
    {
        zone_id: "lwusagrp3",
        value: "oasischurchboston",
        label: "Oasis Church Boston"
    },
    {
        zone_id: "nsevz2",
        value: "cecooperative",
        label: "CE COOPERATIVE"
    },
    {
        zone_id: "nswvz2",
        value: "ceekiti",
        label: "CE EKITI"
    },
    {
        zone_id: "nswvz2",
        value: "ceile-ife",
        label: " CE ILE-IFE"
    },
    {
        zone_id: "nwz1",
        value: "cebnwsubgroup",
        label: "CE BNW SUB GROUP"
    },
    {
        zone_id: "nwz1",
        value: "kakurisubgroup",
        label: "KAKURISUBGROUP"
    },
    {
        zone_id: "nwz1",
        value: "kdnorthsubgroup",
        label: "KDNORTHSUBGROUP"
    },
    {
        zone_id: "nwz1",
        value: "sabosubgroup",
        label: "SABO SUB GROUP"
    },
    {
        zone_id: "nwz1",
        value: "kdzonalchurch",
        label: "KDZONALCHURCH"
    },
    {
        zone_id: "ewcvz4",
        value: "bamendagroup",
        label: "Bamenda Group"
    },
    {
        zone_id: "ewcvz4",
        value: "yaoundegroup2",
        label: "Yaounde Group2"
    },
    {
        zone_id: "ewcvz6",
        value: "cetanzania",
        label: "CE TANZANIA"
    },
    {
        zone_id: "onitshaz",
        value: "fhe",
        label: "FHE"
    },
    {
        zone_id: "onitshaz",
        value: "33mega",
        label: "33 MEGA"
    },
    {
        zone_id: "onitshaz",
        value: "gra",
        label: "GRA"
    },
    {
        zone_id: "onitshaz",
        value: "awada1",
        label: "AWADA1"
    },
    {
        zone_id: "onitshaz",
        value: "vennroad",
        label: "VENN ROAD"
    },
    {
        zone_id: "onitshaz",
        value: "awada2",
        label: "AWADA 2"
    },
    {
        zone_id: "onitshaz",
        value: "omagba",
        label: "OMAGBA"
    },
    {
        zone_id: "onitshaz",
        value: "awkaroad",
        label: "AWKA ROAD"
    },
    {
        zone_id: "onitshaz",
        value: "alphagroup",
        label: "ALPHA GROUP"
    },
    {
        zone_id: "onitshaz",
        value: "omeife",
        label: "OMEIFE"
    },
    {
        zone_id: "onitshaz",
        value: "otuocha",
        label: "OTUOCHA"
    },
    {
        zone_id: "onitshaz",
        value: "oyi",
        label: "OYI"
    },
    {
        zone_id: "onitshaz",
        value: "fegge",
        label: "FEGGE"
    },
    {
        zone_id: "onitshaz",
        value: "svg",
        label: "SVG"
    },
    {
        zone_id: "onitshaz",
        value: "everincreasingprosperity",
        label: "EVER INCREASING PROSPERITY"
    },
    {
        zone_id: "onitshaz",
        value: "divineprosperity",
        label: "DIVINE PROSPERITY"
    },
    {
        zone_id: "onitshaz",
        value: "trueprosperity",
        label: "TRUE PROSPERITY"
    },
    {
        zone_id: "onitshaz",
        value: "godsgrace",
        label: "GODS GRACE"
    },
    {
        zone_id: "onitshaz",
        value: "extravagantgrace",
        label: "EXTRAVAGANT GRACE"
    },
    {
        zone_id: "onitshaz",
        value: "overflowinggrace",
        label: "OVERFLOWING GRACE"
    },
    {
        zone_id: "ewcvz6",
        value: "ceburundi",
        label: "CE BURUNDI"
    },
    {
        zone_id: "savz3",
        value: "zambiagroup",
        label: "Zambia Group"
    },
    {
        zone_id: "savz3",
        value: "botswanagroup",
        label: "Botswana Group"
    },
    {
        zone_id: "savz3",
        value: "malawinorthgroup",
        label: "Malawi North Group"
    },
    {
        zone_id: "savz3",
        value: "mozambiquegroup",
        label: "Mozambique Group"
    },
    {
        zone_id: "savz3",
        value: "eswatinigroup",
        label: "Eswatini Group"
    },
    {
        zone_id: "savz3",
        value: "lesothogroup",
        label: "Lesotho Group"
    },
    {
        zone_id: "savz3",
        value: "malawisouthgroup",
        label: "Malawi South Group"
    },
    {
        zone_id: "australia",
        value: "brisbanegroup",
        label: "Brisbane Group"
    },
    {
        zone_id: "australia",
        value: "perthgroup",
        label: "Perth Group"
    },
    {
        zone_id: "australia",
        value: "sydneygroup",
        label: "Sydney Group"
    },
    {
        zone_id: "australia",
        value: "pacificgroup",
        label: "Pacific Group"
    },
    {
        zone_id: "lz5",
        value: "cemobilsubgroup",
        label: "CE MOBIL SUB GROUP"
    },
    {
        zone_id: "beninz1",
        value: "tce",
        label: "TCE"
    },
    {
        zone_id: "beninvz2",
        value: "centralgroup1",
        label: "CENTRAL GROUP 1"
    },
    {
        zone_id: "beninvz2",
        value: "centralgroup2",
        label: "CENTRAL GROUP 2"
    },
    {
        zone_id: "beninvz2",
        value: "centralgroup3",
        label: "CENTRAL GROUP 3"
    },
    {
        zone_id: "beninvz2",
        value: "okagroup",
        label: "OKA GROUP"
    },
    {
        zone_id: "beninvz2",
        value: "sakponbagroup",
        label: "SAKPONBA GROUP"
    },
    {
        zone_id: "beninvz2",
        value: "extensiongroup",
        label: "EXTENSION GROUP"
    },
    {
        zone_id: "beninvz2",
        value: "agborroadgroup",
        label: "AGBOR ROAD GROUP"
    },
    {
        zone_id: "wevz4",
        value: "ceberlingroup",
        label: "CE Berlin Group"
    },
    {
        zone_id: "wevz4",
        value: "cefrankfurtgroup",
        label: "CE Frankfurt Group"
    },
    {
        zone_id: "wevz4",
        value: "cebremengroup",
        label: "CE Bremen Group"
    },
    {
        zone_id: "wevz4",
        value: "ceoffenbachsubgroup",
        label: "CE Offenbach Subgroup"
    },
    {
        zone_id: "wevz4",
        value: "ceabundantgracesubgroup",
        label: "CE Abundant Grace Subgroup"
    },
    {
        zone_id: "wevz4",
        value: "cedusseldorfsubgroup",
        label: "CE Dusseldorf Subgroup"
    },
    {
        zone_id: "ukz2",
        value: "norwoodgroup",
        label: "NORWOOD GROUP"
    },
    {
        zone_id: "ukz2",
        value: "hounslowgroup",
        label: "HOUNSLOW GROUP"
    },
    {
        zone_id: "ukz2",
        value: "essexgroup",
        label: "ESSEX GROUP"
    },
    {
        zone_id: "ukz2",
        value: "elitegroup",
        label: "ELITE GROUP"
    },
    {
        zone_id: "ukz2",
        value: "northamptongroup",
        label: "NORTHAMPTON GROUP"
    },
    {
        zone_id: "ukz2",
        value: "lisbongroup",
        label: "LISBON GROUP"
    },
    {
        zone_id: "lwzf",
        value: "futogroup",
        label: "FUTO GROUP"
    },
    {
        zone_id: "lwzf",
        value: "mouaugroup",
        label: "MOUAU GROUP"
    },
    {
        zone_id: "lwzf",
        value: "imsugroup",
        label: "IMSU GROUP"
    },
    {
        zone_id: "lwzf",
        value: "imopolygroup",
        label: "IMO POLY GROUP"
    },
    {
        zone_id: "lwzf",
        value: "abagroup",
        label: "ABA GROUP"
    },
    {
        zone_id: "lwzf",
        value: "blwabsugroup",
        label: "BLW ABSU GROUP"
    },
    {
        zone_id: "nwz1",
        value: "kafachan",
        label: "KAFACHAN"
    },
    {
        zone_id: "nwz1",
        value: "clwnwz1",
        label: "CLWNWZ1"
    },
    {
        zone_id: "nwz1",
        value: "thehavenzc18",
        label: "THEHAVENZC18"
    },
    {
        zone_id: "lwzc",
        value: "zonecgroup1",
        label: "ZONE C GROUP 1"
    },
    {
        zone_id: "lwzc",
        value: "blwzonecgroup2",
        label: "BLW ZONE C GROUP 2"
    },
    {
        zone_id: "lwzc",
        value: "blwzonecgroup3",
        label: "BLW ZONE C GROUP 3"
    },
    {
        zone_id: "lwzc",
        value: "blwzonecgroup4",
        label: "BLW ZONE C GROUP 4"
    },
    {
        zone_id: "lwzc",
        value: "blwzonecgroup5",
        label: "BLW ZONE C GROUP 5"
    },
    {
        zone_id: "lwzc",
        value: "fgcc",
        label: "FGCC "
    },
    {
        zone_id: "lwusagrp1",
        value: "usagroup1",
        label: "USA Group 1"
    },
    {
        zone_id: "torz",
        value: "edmontongroup",
        label: "EDMONTON GROUP"
    },
    {
        zone_id: "torz",
        value: "scaboroughgroup",
        label: "SCABOROUGH GROUP"
    },
    {
        zone_id: "torz",
        value: "miltongroup",
        label: "MILTON GROUP"
    },
    {
        zone_id: "torz",
        value: "torontogroup",
        label: "TORONTO GROUP"
    },
    {
        zone_id: "blwugandaz",
        value: "blwugandagroup",
        label: "BLW UGANDA GROUP"
    },
    {
        zone_id: "lwghanaza",
        value: "uccgroup",
        label: "UCC GROUP"
    },
    {
        zone_id: "lwghanaza",
        value: "legongroup",
        label: "LEGON GROUP"
    },
    {
        zone_id: "lwghanaza",
        value: "cugroup",
        label: "CU GROUP"
    },
    {
        zone_id: "lwghanaza",
        value: "ashesi",
        label: "ASHESI"
    },
    {
        zone_id: "lwghanaza",
        value: "upsagroup",
        label: "UPSA GROUP"
    },
    {
        zone_id: "lwghanaza",
        value: "rmugroup",
        label: "RMU GROUP"
    },
    {
        zone_id: "lwghanaza",
        value: "burkinafasogroup",
        label: "BURKINA FASO GROUP"
    },
    {
        zone_id: "nnevz1",
        value: "cebarracksroadgroup",
        label: "CE Barracks Road Group"
    },
    {
        zone_id: "nnevz1",
        value: "cenumangroup",
        label: "CE Numan Group"
    },
    {
        zone_id: "nnevz1",
        value: "cefederalhousingestategroup",
        label: "CE Federal Housing Estate Group"
    },
    {
        zone_id: "nnevz1",
        value: "cewukarigroup",
        label: "CE Wukari Group"
    },
    {
        zone_id: "nnevz1",
        value: "cemubigroup",
        label: "CE Mubi Group"
    },
    {
        zone_id: "nnevz1",
        value: "cezonalchurch",
        label: "CE Zonal Church"
    },
    {
        zone_id: "lwzh",
        value: "oasisofgrace",
        label: "OASIS OF GRACE "
    },
    {
        zone_id: "lwzh",
        value: "churchministry",
        label: "CHURCH MINISTRY"
    },
    {
        zone_id: "lwzh",
        value: "flourishinggroup",
        label: "FLOURISHING GROUP"
    },
    {
        zone_id: "lwzh",
        value: "sonsofconsolation",
        label: "SONS OF CONSOLATION"
    },
    {
        zone_id: "lwzh",
        value: "boundlessgrace",
        label: "BOUNDLESS GRACE"
    },
    {
        zone_id: "texasz1",
        value: "christembassykatygroup",
        label: "Christ Embassy Katy Group"
    },
    {
        zone_id: "texasz1",
        value: "cerosenberg",
        label: "CERosenberg"
    },
    {
        zone_id: "texasz1",
        value: "cemissouricity",
        label: "CE Missouri City"
    },
    {
        zone_id: "texasz1",
        value: "cetvc",
        label: "CETVC"
    },
    {
        zone_id: "texasz1",
        value: "cehouston",
        label: "CE Houston"
    },
    {
        zone_id: "lwze",
        value: "universityofibadangroup",
        label: "University of Ibadan group"
    },
    {
        zone_id: "lwze",
        value: "kwaragroup",
        label: "Kwara group"
    },
    {
        zone_id: "lwze",
        value: "osungroup",
        label: "Osun group"
    },
    {
        zone_id: "lwzd",
        value: "blwabuchapter",
        label: "BLW ABU CHAPTER"
    },
    {
        zone_id: "phz3",
        value: "ceacceleratedgracegroup",
        label: "CE ACCELERATED GRACE GROUP"
    },
    {
        zone_id: "phz3",
        value: "cevictoriousgroup",
        label: "CE VICTORIOUS GROUP"
    },
    {
        zone_id: "phz3",
        value: "cegragroup",
        label: "CE GRA GROUP"
    },
    {
        zone_id: "lwzj",
        value: "blwzonejgroupa",
        label: "BLW ZONE J GROUP A"
    },
    {
        zone_id: "lwzj",
        value: "blwzonejgroupb",
        label: "BLW  ZONE J GROUP B"
    },
    {
        zone_id: "lwzj",
        value: "blwzonejgroupc",
        label: "BLW ZONE J GROUP C"
    },
    {
        zone_id: "lwzj",
        value: "blwzonejgroupd",
        label: "BLW ZONE J GROUP D"
    },
    {
        zone_id: "lwzj",
        value: "blwzonejgroupe",
        label: "BLW ZONE J GROUP E"
    },
    {
        zone_id: "lwzj",
        value: "blwzonejgroupf",
        label: "BLW ZONE J GROUP F"
    },
    {
        zone_id: "lwzj",
        value: "blwzonejgroupg",
        label: "BLW ZONE J GROUP G"
    },
    {
        zone_id: "ewce3b",
        value: "ndeebagroup",
        label: "NDEEBA GROUP"
    },
    {
        zone_id: "ewce3b",
        value: "ndeebagroup2",
        label: "NDEEBA GROUP 2"
    },
    {
        zone_id: "ewce3b",
        value: "gulugroup2",
        label: "GULU GROUP2"
    },
    {
        zone_id: "ewce3b",
        value: "luziragroup2",
        label: "LUZIRA GROUP 2"
    },
    {
        zone_id: "ewce3b",
        value: "mbalegroup2",
        label: "MBALE GROUP 2"
    },
    {
        zone_id: "ukvz1",
        value: "cecatfordgroup",
        label: "CE CATFORD GROUP"
    },
    {
        zone_id: "lsza",
        value: "reonnetworks",
        label: "REON NETWORKS"
    },
    {
        zone_id: "yolnda",
        value: "y1",
        label: "y1"
    },
    {
        zone_id: "yolnda",
        value: "y2",
        label: "y2"
    },
    {
        zone_id: "yolnda",
        value: "y3",
        label: "y3"
    },
    {
        zone_id: "lz2",
        value: "lz2",
        label: "LZ2"
    },
    {
        zone_id: "abeakutamc",
        value: "abeokutagroup",
        label: "ABEOKUTA GROUP"
    },
    {
        zone_id: "ewcvz2",
        value: "cemauritania",
        label: "CEMAURITANIA"
    },
    {
        zone_id: "ewcvz2",
        value: "cemorocco",
        label: "CEMOROCCO"
    },
    {
        zone_id: "ewcvz2",
        value: "cealgeria",
        label: "CEALGERIA"
    },
    {
        zone_id: "usavz2",
        value: "megalopolisgroup1",
        label: "Megalopolis Group 1"
    },
    {
        zone_id: "usavz2",
        value: "megalopolisgroup2",
        label: "Megalopolis Group 2"
    },
    {
        zone_id: "usavz2",
        value: "megalopolispacificgroup",
        label: "Megalopolis Pacific Group"
    },
    {
        zone_id: "phz3",
        value: "advantagegroup",
        label: "advantagegroup"
    },
    {
        zone_id: "phz3",
        value: "ceadvantagegroup",
        label: "CE ADVANTAGE GROUP"
    },
    {
        zone_id: "offial69",
        value: "siskaro",
        label: "SIS KARO"
    },
    {
        zone_id: "abavz",
        value: "testgroupa",
        label: "Test Group A"
    },
    {
        zone_id: "texasz1",
        value: "cekg",
        label: "CEKG"
    },
    {
        zone_id: "wevz3",
        value: "cegeneva",
        label: "CE GENEVA"
    },
    {
        zone_id: "wevz3",
        value: "cemilan1",
        label: "CE MILAN 1"
    },
    {
        zone_id: "wevz3",
        value: "cemilan2",
        label: "CE MILAN 2"
    },
    {
        zone_id: "wevz3",
        value: "cebologna",
        label: "CE BOLOGNA"
    },
    {
        zone_id: "wevz3",
        value: "cebergamo",
        label: "CE BERGAMO"
    },
    {
        zone_id: "wevz3",
        value: "cenapoli",
        label: "CE NAPOLI"
    },
    {
        zone_id: "wevz3",
        value: "brescia",
        label: "BRESCIA"
    },
    {
        zone_id: "texasz1",
        value: "ceag",
        label: "CEAG"
    },
    {
        zone_id: "texasz1",
        value: "cyg",
        label: "CYG"
    },
    {
        zone_id: "texasz1",
        value: "lusacalg",
        label: "LUSACALG"
    },
    {
        zone_id: "lsza",
        value: "ojota",
        label: "OJOTA"
    },
    {
        zone_id: "lsza",
        value: "cityofgrace",
        label: "CITY OF GRACE"
    },
    {
        zone_id: "lz1",
        value: "lcc6group",
        label: "LCC6 GROUP"
    },
    {
        zone_id: "lszb",
        value: "prolificgroup",
        label: "PROLIFIC GROUP"
    },
    {
        zone_id: "texasz1",
        value: "cehoustonvc",
        label: "cehoustonvc"
    },
    {
        zone_id: "lz3",
        value: "rfc",
        label: "RFC"
    },
    {
        zone_id: "blwchurchzone",
        value: "loveworldchurchgroup7",
        label: "LOVEWORLD CHURCH GROUP 7"
    },
    {
        zone_id: "lz2",
        value: "ceago",
        label: "CEAGO"
    },
    {
        zone_id: "blwchurchzone",
        value: "loveworldchurchgroup2",
        label: "LOVEWORLD CHURCH GROUP 2"
    },
    {
        zone_id: "abavz",
        value: "testgroupone",
        label: "test Group One"
    },
    {
        zone_id: "abavz",
        value: "testgrouptwo",
        label: "Test Group Two"
    },
    {
        zone_id: "abavz",
        value: "testgroupfour",
        label: "Test Group Four"
    },
    {
        zone_id: "nsevz2",
        value: "cesapelegroup",
        label: "CE Sapele Group"
    },
    {
        zone_id: "nsevz2",
        value: "theprolificgroup",
        label: "The Prolific Group"
    },
    {
        zone_id: "lz2",
        value: "okota",
        label: "OKOTA"
    },
    {
        zone_id: "ewcvz4",
        value: "doualagroup",
        label: "DOUALA Group"
    },
    {
        zone_id: "ewcvz4",
        value: "gabongroup",
        label: "GABON Group"
    },
    {
        zone_id: "lwsaza",
        value: "wits",
        label: "Wits"
    },
    {
        zone_id: "lwsaza",
        value: "apk",
        label: "APK"
    },
    {
        zone_id: "yolnda",
        value: "xyzgroup",
        label: "XYZ GROUP"
    },
    {
        zone_id: "nswvz1",
        value: "ceboundlessgracechurch",
        label: "CE BOUNDLESS GRACE CHURCH"
    },
    {
        zone_id: "nswvz1",
        value: "ceibadansouthgroup",
        label: "CE IBADAN SOUTH GROUP"
    },
    {
        zone_id: "nswvz1",
        value: "ceibadaneastgroup",
        label: "CE IBADAN EAST GROUP"
    },
    {
        zone_id: "nswvz1",
        value: "ceokeadogroup",
        label: "CE OKE ADO GROUP"
    },
    {
        zone_id: "nswvz1",
        value: "cenortheastgroup",
        label: "CE NORTH EAST GROUP"
    },
    {
        zone_id: "nswvz1",
        value: "cemegachurchgroup,apata",
        label: "CE MEGA CHURCH GROUP, APATA"
    },
    {
        zone_id: "nswvz1",
        value: "ceiworoadgroup",
        label: "CE IWO ROAD GROUP"
    },
    {
        zone_id: "ewcvz3",
        value: "anonymous",
        label: "anonymous"
    },
    {
        zone_id: "ewcvz3",
        value: "tttttttttt",
        label: "tttttttttt"
    },
    {
        zone_id: "warrimc",
        value: "centralchurch1",
        label: "Central Church 1"
    },
    {
        zone_id: "warrimc",
        value: "lwcity2",
        label: "LW City 2"
    },
    {
        zone_id: "warrimc",
        value: "lwcity3",
        label: "LW City 3"
    },
    {
        zone_id: "warrimc",
        value: "lwcity4",
        label: "LW City 4"
    },
    {
        zone_id: "warrimc",
        value: "lwcity5",
        label: "LW City 5"
    },
    {
        zone_id: "warrimc",
        value: "languagech.",
        label: "Language Ch."
    },
    {
        zone_id: "warrimc",
        value: "linguachurch",
        label: "Lingua church"
    },
    {
        zone_id: "warrimc",
        value: "agbarhogroup",
        label: "Agbarho Group"
    },
    {
        zone_id: "warrimc",
        value: "edjebagroup",
        label: "Edjeba Group"
    },
    {
        zone_id: "warrimc",
        value: "effurungroup",
        label: "Effurun Group"
    },
    {
        zone_id: "warrimc",
        value: "enerhengroup",
        label: "Enerhen Group"
    },
    {
        zone_id: "warrimc",
        value: "ebrumedegroup",
        label: "Ebrumede Group"
    },
    {
        zone_id: "warrimc",
        value: "jakpagroup",
        label: "Jakpa Group"
    },
    {
        zone_id: "warrimc",
        value: "okumagbagroup",
        label: "Okumagba Group"
    },
    {
        zone_id: "warrimc",
        value: "gwarrigroup",
        label: "G Warri Group"
    },
    {
        zone_id: "warrimc",
        value: "udugroup",
        label: "Udu Group"
    },
    {
        zone_id: "warrimc",
        value: "zenithgroup",
        label: "Zenith Group"
    },
    {
        zone_id: "warrimc",
        value: "jeddomodel",
        label: "Jeddo Model"
    },
    {
        zone_id: "warrimc",
        value: "ubejimodel",
        label: "Ubeji Model"
    },
    {
        zone_id: "warrimc",
        value: "megethosmodel",
        label: "Megethos Model"
    },
    {
        zone_id: "warrimc",
        value: "blossomexpmodel",
        label: "Blossom Exp Model"
    },
    {
        zone_id: "warrimc",
        value: "nembemodel",
        label: "Nembe Model"
    },
    {
        zone_id: "warrimc",
        value: "okuokokomodel",
        label: "Okuokoko Model"
    },
    {
        zone_id: "warrimc",
        value: "tsalachmodel",
        label: "Tsalach Model"
    },
    {
        zone_id: "warrimc",
        value: "teensminmcw",
        label: "Teens Min MCW"
    },
    {
        zone_id: "warrimc",
        value: "youthminmcw",
        label: "Youth Min MCW"
    },
    {
        zone_id: "lvz",
        value: "testwilly",
        label: "TestWilly"
    },
    {
        zone_id: "blwchurchzone",
        value: "loveworldchurchgroup5",
        label: "LOVEWORLD CHURCH GROUP 5"
    },
    {
        zone_id: "blwchurchzone",
        value: "loveworldchurchgroup4",
        label: "LOVEWORLD CHURCH GROUP 4"
    },
    {
        zone_id: "lvz",
        value: "testwi",
        label: "TestWi"
    },
    {
        zone_id: "lvz",
        value: "testwil",
        label: "TestWil"
    },
    {
        zone_id: "nsevz1",
        value: "wccgroup",
        label: "WCC GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "arochukwugroup",
        label: "AROCHUKWU GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "okigwegroup",
        label: "OKIGWE GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "ubakalagroup",
        label: "UBAKALA GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "worldbankgroup",
        label: "WORLD BANK GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "orjigroup",
        label: "ORJI GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "egbugroup",
        label: "EGBU GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "mccroadgroup",
        label: "MCC ROAD GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "ogutagroup",
        label: "OGUTA GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "akachigroup",
        label: "AKACHI GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "okigweroadgroup",
        label: "OKIGWE ROAD GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "orlugroup",
        label: "ORLU GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "ceworldbankgroup",
        label: "CE WORLD BANK GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "ceowerri1",
        label: "CE OWERRI 1"
    },
    {
        zone_id: "nsevz1",
        value: "ceowerri2",
        label: "CE OWERRI 2"
    },
    {
        zone_id: "nsevz1",
        value: "mbaisesubgroup",
        label: "MBAISE SUB GROUP"
    },
    {
        zone_id: "nsevz1",
        value: "worldbanksubgroup1",
        label: "WORLD BANK SUB GROUP 1"
    },
    {
        zone_id: "nsevz1",
        value: "worldbanksubgroup2",
        label: "WORLD BANK SUB GROUP 2"
    },
    {
        zone_id: "ottz",
        value: "ceottawawalkleygroup",
        label: "ce ottawa walkley group"
    },
    {
        zone_id: "ottz",
        value: "ceottawawesterngroup",
        label: "CE OTTAWA WESTERN GROUP"
    },
    {
        zone_id: "ottz",
        value: "ceottawasoutheastgroup",
        label: "CE Ottawa South East Group"
    },
    {
        zone_id: "ottz",
        value: "ceottawamidwestgroup",
        label: "CE Ottawa Midwest Group"
    },
    {
        zone_id: "ottz",
        value: "ceottawamaingroup",
        label: "CE Ottawa Main Group"
    },
    {
        zone_id: "mcc",
        value: "statehousing",
        label: "statehousing"
    },
    {
        zone_id: "mcc",
        value: "anantigha",
        label: "anantigha"
    },
    {
        zone_id: "mcc",
        value: "asarieso",
        label: "asarieso"
    },
    {
        zone_id: "ewcvz3",
        value: "mbararagroup",
        label: "Mbarara Group"
    },
    {
        zone_id: "lz1",
        value: "okeiragroup",
        label: "okeiragroup"
    },
    {
        zone_id: "lz1",
        value: "shangisha",
        label: "shangisha"
    },
    {
        zone_id: "lz1",
        value: "ogbagroup",
        label: "OGBA GROUP"
    },
    {
        zone_id: "lwsaza",
        value: "uj",
        label: "UJ "
    },
    {
        zone_id: "nsevz1",
        value: "valiantyouthchurchumuahia",
        label: "valiant youth church umuahia"
    },
    {
        zone_id: "abavz",
        value: "testgroupb",
        label: "Test Group B"
    },
    {
        zone_id: "lvz",
        value: "testgroupowor",
        label: "TestgroupOwor"
    },
    {
        zone_id: "kenyaz",
        value: "nairobigroup",
        label: "Nairobi Group"
    },
    {
        zone_id: "kenyaz",
        value: "nairobinorth",
        label: "nairobinorth"
    },
    {
        zone_id: "kenyaz",
        value: "westlands",
        label: "westlands"
    },
    {
        zone_id: "kenyaz",
        value: "karen",
        label: "Karen"
    },
    {
        zone_id: "kenyaz",
        value: "lavington",
        label: "Lavington"
    },
    {
        zone_id: "kenyaz",
        value: "donholm",
        label: "Donholm"
    },
    {
        zone_id: "kenyaz",
        value: "airportcity",
        label: "airportcity"
    },
    {
        zone_id: "kenyaz",
        value: "coastal",
        label: "coastal"
    },
    {
        zone_id: "kenyaz",
        value: "western",
        label: "western"
    },
    {
        zone_id: "kenyaz",
        value: "thika",
        label: "Thika"
    },
    {
        zone_id: "kenyaz",
        value: "tym",
        label: "TYM"
    },
    {
        zone_id: "kenyaz",
        value: "eastlands",
        label: "Eastlands"
    },
    {
        zone_id: "kenyaz",
        value: "nanyuki",
        label: "Nanyuki"
    },
    {
        zone_id: "kenyaz",
        value: "nakuru",
        label: "Nakuru"
    },
    {
        zone_id: "kenyaz",
        value: "gachie",
        label: "Gachie"
    },
    {
        zone_id: "kenyaz",
        value: "parklands",
        label: "Parklands"
    },
    {
        zone_id: "kenyaz",
        value: "mikindani",
        label: "Mikindani"
    },
    {
        zone_id: "kenyaz",
        value: "bondo",
        label: "Bondo"
    },
    {
        zone_id: "sez3",
        value: "ceawkansez3",
        label: "CE AWKA NSEZ3"
    },
    {
        zone_id: "sez3",
        value: "cennewinsez3",
        label: "CE NNEWI NSEZ3"
    },
    {
        zone_id: "lvz",
        value: "agapeh",
        label: "AGAPE H"
    },
    {
        zone_id: "lvz",
        value: "benchmarkh",
        label: "Benchmark H"
    },
    {
        zone_id: "nncvz2",
        value: "celokoja",
        label: "CE LOKOJA"
    },
    {
        zone_id: "nncvz2",
        value: "cemakurdienvirons",
        label: "CE MAKURDI ENVIRONS"
    },
    {
        zone_id: "nncvz2",
        value: "cemakurdioutstations",
        label: "CE MAKURDI OUTSTATIONS"
    },
    {
        zone_id: "nncvz2",
        value: "cemakurdicentral",
        label: "CE MAKURDI CENTRAL"
    },
    {
        zone_id: "torz",
        value: "torontogroup6",
        label: "TORONTO GROUP 6"
    },
    {
        zone_id: "torz",
        value: "torontogroup1",
        label: "TORONTO GROUP 1"
    },
    {
        zone_id: "torz",
        value: "torontogroup2",
        label: "TORONTO GROUP 2"
    },
    {
        zone_id: "torz",
        value: "torontogroup3",
        label: "TORONTO GROUP 3"
    },
    {
        zone_id: "torz",
        value: "torontogroup4",
        label: "TORONTO GROUP 4"
    },
    {
        zone_id: "torz",
        value: "torontogroup5",
        label: "TORONTO GROUP 5"
    },
    {
        zone_id: "torz",
        value: "torontogroup7",
        label: "TORONTO GROUP 7"
    },
    {
        zone_id: "torz",
        value: "torontogroup8",
        label: "TORONTO GROUP 8"
    },
    {
        zone_id: "nswvz1",
        value: "cemechurchapata",
        label: "CE MECHURCHAPATA"
    },
    {
        zone_id: "warrimc",
        value: "ceugboroke",
        label: "CE Ugboroke"
    },
    {
        zone_id: "capne2",
        value: "capetownnorthgroup",
        label: "Cape Town North Group"
    },
    {
        zone_id: "capne2",
        value: "stellenboschgroup",
        label: "Stellenbosch Group"
    },
    {
        zone_id: "saz5",
        value: "belvederegroup",
        label: "Belvedere Group"
    },
    {
        zone_id: "saz5",
        value: "mutaregroup",
        label: "Mutare Group"
    },
    {
        zone_id: "tesone66",
        value: "group1",
        label: "Group 1"
    },
    {
        zone_id: "tesone66",
        value: "group2",
        label: "Group 2"
    },
    {
        zone_id: "mcc",
        value: "henshawtown",
        label: "henshawtown"
    },
    {
        zone_id: "mcc",
        value: "ekpoabasi",
        label: "ekpoabasi"
    },
    {
        zone_id: "mcc",
        value: "ugep",
        label: "ugep"
    },
    {
        zone_id: "mcc",
        value: "highway",
        label: "highway"
    },
    {
        zone_id: "tesone66",
        value: "group3",
        label: "Group 3"
    },
    {
        zone_id: "mcc",
        value: "ikom",
        label: "ikom"
    },
    {
        zone_id: "mcc",
        value: "ogoja",
        label: "ogoja"
    },
    {
        zone_id: "mcc",
        value: "akim",
        label: "akim"
    },
    {
        zone_id: "mcc",
        value: "central",
        label: "central"
    },
    {
        zone_id: "ewcvz6",
        value: "cedrcongo",
        label: "CE DR CONGO"
    },
    {
        zone_id: "ewcvz6",
        value: "cemauritius",
        label: " CE MAURITIUS"
    },
    {
        zone_id: "beninz1",
        value: "celebrityteens\/youthchurch",
        label: "CELEBRITY TEENS\/YOUTH CHURCH"
    },
    {
        zone_id: "beninz1",
        value: "missions7",
        label: "Missions 7"
    },
    {
        zone_id: "beninz1",
        value: "missions8",
        label: "Missions 8"
    },
    {
        zone_id: "blwchurchzone",
        value: "loveworldchurchgroup1",
        label: "LOVEWORLD CHURCH GROUP 1"
    },
    {
        zone_id: "blwchurchzone",
        value: "loveworldchurchgroup3",
        label: "LOVEWORLD CHURCH GROUP 3"
    },
    {
        zone_id: "blwchurchzone",
        value: "loveworldchurchgroup6",
        label: "LOVEWORLD CHURCH GROUP 6"
    },
    {
        zone_id: "blwchurchzone",
        value: "lwsubgroup1",
        label: "LW SUB GROUP 1"
    },
    {
        zone_id: "blwchurchzone",
        value: "lwsubgroup2",
        label: "LW SUB GROUP 2"
    },
    {
        zone_id: "blwchurchzone",
        value: "lwsubgroup3",
        label: "LW SUB GROUP 3"
    },
    {
        zone_id: "ewcvz3",
        value: "ismuganda",
        label: "ISM UGANDA"
    },
    {
        zone_id: "lvz",
        value: "bankersisd",
        label: "BANKERS ISD"
    },
    {
        zone_id: "lvz",
        value: "blissh",
        label: "BLISS H"
    },
    {
        zone_id: "lvz",
        value: "charish",
        label: "Charis H"
    },
    {
        zone_id: "lvz",
        value: "epignosish",
        label: "Epignosis H"
    },
    {
        zone_id: "lvz",
        value: "flourishinga",
        label: "Flourishing A"
    },
    {
        zone_id: "lvz",
        value: "fruitfulfield",
        label: "Fruitful Field"
    },
    {
        zone_id: "lvz",
        value: "gloriousfield",
        label: "Glorious Field"
    },
    {
        zone_id: "lvz",
        value: "photizoh",
        label: "Photizo H"
    },
    {
        zone_id: "blwoup22",
        value: "blwwalesgroup",
        label: "BLW Wales Group"
    },
    {
        zone_id: "lvz",
        value: "platinumgh",
        label: "PLATINUM GH"
    },
    {
        zone_id: "lvz",
        value: "victoryh",
        label: "Victory H"
    },
    {
        zone_id: "lvz",
        value: "charis-rabah",
        label: "CHARIS-RABAH"
    },
    {
        zone_id: "lvz",
        value: "hephizibah",
        label: "HEPHIZIBAH"
    },
    {
        zone_id: "lvz",
        value: "perfectiongl",
        label: "PERFECTION GL"
    },
    {
        zone_id: "lvz",
        value: "professional",
        label: "Professional"
    },
    {
        zone_id: "lvz",
        value: "rhema",
        label: "Rhema"
    },
    {
        zone_id: "lvz",
        value: "teamissachar",
        label: "Team Issachar"
    },
    {
        zone_id: "lvz",
        value: "zoe",
        label: "Zoe"
    },
    {
        zone_id: "lvz",
        value: "excel-9",
        label: "EXCEL-9"
    },
    {
        zone_id: "lvz",
        value: "glory",
        label: "Glory"
    },
    {
        zone_id: "lvz",
        value: "language",
        label: "Language"
    },
    {
        zone_id: "beninz1",
        value: "celebrityteens&youthchurch1",
        label: "Celebrity Teens & Youth Church 1"
    },
    {
        zone_id: "beninz1",
        value: "teensandyouthchurch",
        label: "Teens and Youth Church"
    },
    {
        zone_id: "lz3",
        value: "loveworldplacegroup",
        label: "Loveworld Place Group"
    },
    {
        zone_id: "lz3",
        value: "aguda2group",
        label: "Aguda 2 Group"
    },
    {
        zone_id: "lz3",
        value: "mashagroup",
        label: "Masha Group"
    },
    {
        zone_id: "lz3",
        value: "shomolugroup",
        label: "Shomolu Group"
    },
    {
        zone_id: "lz3",
        value: "ikategroup",
        label: "Ikate Group"
    },
    {
        zone_id: "lz3",
        value: "orilegroup",
        label: "Orile Group"
    },
    {
        zone_id: "lz3",
        value: "aguda1group",
        label: "Aguda 1 Group "
    },
    {
        zone_id: "lz3",
        value: "lawansongroup",
        label: "Lawanson Group"
    },
    {
        zone_id: "lz3",
        value: "ebutemettagroup",
        label: "Ebute Metta Group"
    },
    {
        zone_id: "lz3",
        value: "ijeshagroup",
        label: "Ijesha Group"
    },
    {
        zone_id: "lz3",
        value: "palmgroovegroup",
        label: "Palmgroove Group"
    },
    {
        zone_id: "lz3",
        value: "ericmooregroup",
        label: "Ericmoore Group"
    },
    {
        zone_id: "lz3",
        value: "ojuelegbagroup",
        label: "Ojuelegba Group"
    },
    {
        zone_id: "lz3",
        value: "surulere2group",
        label: "Surulere 2 Group"
    },
    {
        zone_id: "lz3",
        value: "mushingroup",
        label: "Mushin Group"
    },
    {
        zone_id: "lz3",
        value: "surulere1group",
        label: "Surulere 1 Group"
    },
    {
        zone_id: "lz3",
        value: "southamericagroup",
        label: "South America Group"
    },
    {
        zone_id: "lz3",
        value: "pakistangroup",
        label: "Pakistan Group"
    },
    {
        zone_id: "yolnda",
        value: "yolandagroup5",
        label: "yolanda group 5"
    },
    {
        zone_id: "lz2",
        value: "yabagroup",
        label: "Yaba group"
    },
    {
        zone_id: "lvz",
        value: "beamingg",
        label: "BEAMING G"
    },
    {
        zone_id: "lvz",
        value: "decisionmakers",
        label: "Decision Makers"
    },
    {
        zone_id: "lvz",
        value: "firstclass",
        label: "First Class"
    },
    {
        zone_id: "lvz",
        value: "grandeur",
        label: "Grandeur"
    },
    {
        zone_id: "lvz",
        value: "gratiainfinitia",
        label: "Gratia Infinitia"
    },
    {
        zone_id: "lvz",
        value: "hispresence",
        label: "His Presence"
    },
    {
        zone_id: "lvz",
        value: "loveculture",
        label: "Love Culture"
    },
    {
        zone_id: "lvz",
        value: "messengerso",
        label: "Messengers O"
    },
    {
        zone_id: "lvz",
        value: "preciousstone",
        label: "Precious Stone"
    },
    {
        zone_id: "lvz",
        value: "splendorm",
        label: "Splendor M"
    },
    {
        zone_id: "lvz",
        value: "supremepraisedy",
        label: "Supreme Praise Dy"
    },
    {
        zone_id: "lvz",
        value: "champions1",
        label: "Champions 1"
    },
    {
        zone_id: "lvz",
        value: "everincreasing",
        label: "EVER INCREASING"
    },
    {
        zone_id: "lvz",
        value: "everincreasingglory",
        label: "Ever Increasing Glory"
    },
    {
        zone_id: "lvz",
        value: "lvz4cfruition",
        label: "Lvz4C Fruition"
    },
    {
        zone_id: "lvz",
        value: "lvz4dsupernatural",
        label: "Lvz4D Supernatural "
    },
    {
        zone_id: "lvz",
        value: "lvz4eexcel",
        label: "Lvz4E Excel"
    },
    {
        zone_id: "lvz",
        value: "lvz4fspreading",
        label: "Lvz4F Spreading"
    },
    {
        zone_id: "lvz",
        value: "lvz4fspreading",
        label: "Lvz4F Spreading"
    },
    {
        zone_id: "lvz",
        value: "lvz4gflourishing",
        label: "Lvz4G Flourishing"
    },
    {
        zone_id: "lvz",
        value: "lvz4iilluminators",
        label: "Lvz4I Illuminators"
    },
    {
        zone_id: "lvz",
        value: "lvz4jluxuriant",
        label: "Lvz4J Luxuriant"
    },
    {
        zone_id: "lvz",
        value: "oasis",
        label: "Oasis"
    },
    {
        zone_id: "lvz",
        value: "ambassadors",
        label: "Ambassadors"
    },
    {
        zone_id: "lvz",
        value: "autekia",
        label: "Autekia"
    },
    {
        zone_id: "lvz",
        value: "champion",
        label: "Champion"
    },
    {
        zone_id: "lvz",
        value: "divine",
        label: "Divine"
    },
    {
        zone_id: "lvz",
        value: "exousia",
        label: "EXOUSIA"
    },
    {
        zone_id: "lvz",
        value: "expansion",
        label: "Expansion"
    },
    {
        zone_id: "lvz",
        value: "heritage",
        label: "Heritage"
    },
    {
        zone_id: "lvz",
        value: "livelystone",
        label: "Lively Stone"
    },
    {
        zone_id: "lvz",
        value: "agape",
        label: "Agape"
    },
    {
        zone_id: "lvz",
        value: "beacons",
        label: "BEACONS"
    },
    {
        zone_id: "lvz",
        value: "charis",
        label: "Charis"
    },
    {
        zone_id: "lvz",
        value: "epignosis",
        label: "Epignosis"
    },
    {
        zone_id: "lvz",
        value: "excel-3",
        label: "EXCEL-3"
    },
    {
        zone_id: "tesone66",
        value: "group4",
        label: "Group 4"
    },
    {
        zone_id: "lwzc",
        value: "blwzonecgroup6",
        label: "BLW ZONE C GROUP 6"
    },
    {
        zone_id: "ukz3",
        value: "brentwoodgroup",
        label: "Brentwood Group"
    },
    {
        zone_id: "lwzk",
        value: "abuja",
        label: "ABUJA "
    },
    {
        zone_id: "lwzk",
        value: "nassarawa",
        label: "NASSARAWA "
    },
    {
        zone_id: "lwzk",
        value: "niger",
        label: "NIGER"
    },
    {
        zone_id: "lwzk",
        value: "benue",
        label: "BENUE"
    },
    {
        zone_id: "intate24",
        value: "christembassyphilippines",
        label: "ChristembassyPhilippines"
    },
    {
        zone_id: "ukz3",
        value: "cambridgegroup",
        label: "Cambridge Group"
    },
    {
        zone_id: "ukz3",
        value: "readinggroup",
        label: "Reading Group"
    },
    {
        zone_id: "ukz3",
        value: "dagenhamgroup",
        label: "Dagenham Group"
    },
    {
        zone_id: "ukz3",
        value: "croydongroup",
        label: "Croydon Group"
    },
    {
        zone_id: "ukz3",
        value: "sloughgroup",
        label: "Slough Group"
    },
    {
        zone_id: "ukz3",
        value: "peckhamgroup",
        label: "Peckham Group"
    },
    {
        zone_id: "lz1",
        value: "indian2",
        label: "INDIAN2"
    },
    {
        zone_id: "lz1",
        value: "pune",
        label: "PUNE"
    },
    {
        zone_id: "ismuganda",
        value: "ugandaismchurches",
        label: "UGANDA ISM CHURCHES"
    },
    {
        zone_id: "ismuganda",
        value: "ugandachurches",
        label: "UGANDA CHURCHES"
    },
    {
        zone_id: "ismuganda",
        value: "otherchurches",
        label: "OTHER CHURCHES"
    },
    {
        zone_id: "reon",
        value: "reonnorthamerica",
        label: "REON NORTH AMERICA"
    },
    {
        zone_id: "ukz1",
        value: "thamesmeadgroup",
        label: "Thamesmead Group"
    },
    {
        zone_id: "usaz1r2",
        value: "dallasgroup2",
        label: "Dallas Group 2"
    },
    {
        zone_id: "lwnrus",
        value: "northcyprusgroup",
        label: "NORTH CYPRUS GROUP"
    },
    {
        zone_id: "ukz1",
        value: "nottinghamgroup",
        label: "Nottingham Group"
    },
    {
        zone_id: "savz2",
        value: "cenortherncapegroup",
        label: "CE NORTHERN CAPE GROUP"
    },
    {
        zone_id: "nsevz2",
        value: "gplo",
        label: "gplo"
    },
    {
        zone_id: "reon",
        value: "reoneastafrica",
        label: "REON EAST AFRICA "
    },
    {
        zone_id: "reon",
        value: "reonwestafrica",
        label: "REON WEST AFRICA"
    },
    {
        zone_id: "reon",
        value: "reoncentralafrica",
        label: "REON CENTRAL AFRICA"
    },
    {
        zone_id: "reon",
        value: "reonnorthafrica",
        label: "REON NORTH AFRICA"
    },
    {
        zone_id: "reon",
        value: "reonsouthernafrica",
        label: "REON SOUTHERN AFRICA"
    },
    {
        zone_id: "reon",
        value: "reonoceania",
        label: "REON OCEANIA"
    },
    {
        zone_id: "reon",
        value: "reonsouthamerica",
        label: "REON SOUTH AMERICA"
    },
    {
        zone_id: "reon",
        value: "reonasia",
        label: "REON ASIA"
    },
    {
        zone_id: "reon",
        value: "reoneurope",
        label: "REON EUROPE"
    },
    {
        zone_id: "abujavz",
        value: "kubwagroup",
        label: "KUBWA GROUP"
    },
    {
        zone_id: "abujavz",
        value: "zcgroup1",
        label: "ZC GROUP 1"
    },
    {
        zone_id: "abujavz",
        value: "zcgroup2",
        label: "ZC GROUP2"
    },
    {
        zone_id: "abujavz",
        value: "jabigroup",
        label: "JABIGROUP"
    },
    {
        zone_id: "abujavz",
        value: "wuyegroup",
        label: "WUYE GROUP"
    },
    {
        zone_id: "abujavz",
        value: "kadogroup",
        label: "KADO GROUP"
    },
    {
        zone_id: "abujavz",
        value: "suburbancitygroup",
        label: "SUBURBANCITY GROUP"
    },
    {
        zone_id: "abujavz",
        value: "centralareagroup",
        label: "CENTRAL AREA GROUP"
    },
    {
        zone_id: "abujavz",
        value: "kubwa2group",
        label: "KUBWA 2 GROUP"
    },
    {
        zone_id: "abujavz",
        value: "gwarinpagroup",
        label: "GWARINPA GROUP"
    },
    {
        zone_id: "abujavz",
        value: "boundlessgracegroup",
        label: "BOUNDLESS GRACE GROUP"
    },
    {
        zone_id: "abujavz",
        value: "deideigroup",
        label: "DEI DEI GROUP"
    },
    {
        zone_id: "abujavz",
        value: "bwarigroup",
        label: "BWARI GROUP"
    },
    {
        zone_id: "abujavz",
        value: "newhorizongroup",
        label: "NEW HORIZON GROUP"
    },
    {
        zone_id: "abujavz",
        value: "sulejagroup",
        label: "SULEJA GROUP"
    },
    {
        zone_id: "abujavz",
        value: "zubagroup",
        label: "ZUBA GROUP"
    },
    {
        zone_id: "abujavz",
        value: "glorygroup",
        label: "GLORY GROUP"
    },
    {
        zone_id: "abujavz",
        value: "maitamagroup",
        label: "MAITAMA GROUP"
    },
    {
        zone_id: "lvz",
        value: "championsinternational",
        label: "champions international"
    },
    {
        zone_id: "ukz1",
        value: "dublingroup",
        label: "Dublin Group"
    },
    {
        zone_id: "abujavz",
        value: "teenschurches",
        label: "TEENS CHURCHES"
    },
    {
        zone_id: "abujavz",
        value: "ceazteenschurches",
        label: "CEAZ TEENS CHURCHES"
    },
    {
        zone_id: "abujavz",
        value: "ceazyouthchurches",
        label: "CEAZ YOUTH CHURCHES"
    },
    {
        zone_id: "quebecvz",
        value: "ndggroup",
        label: "NDG GROUP "
    },
    {
        zone_id: "lvz",
        value: "grouppastorsliaisonoffice",
        label: "Group Pastors liaison Office"
    },
    {
        zone_id: "ukvz4",
        value: "greatermanchestergroup",
        label: "Greater Manchester Group"
    },
    {
        zone_id: "ukvz4",
        value: "centralmanchestergroup",
        label: "Central Manchester Group"
    },
    {
        zone_id: "ukvz4",
        value: "chesterfieldgroup",
        label: "Chesterfield Group"
    },
    {
        zone_id: "ukvz4",
        value: "boltongroup",
        label: "Bolton Group"
    },
    {
        zone_id: "ukvz4",
        value: "coventrygroup",
        label: "Coventry Group"
    },
    {
        zone_id: "lvz",
        value: "zd'steam",
        label: "ZD's  Team"
    },
    {
        zone_id: "lvz",
        value: "zdsquard",
        label: "ZD Squard"
    },
    {
        zone_id: "nsevz2",
        value: "nitel",
        label: "Nitel"
    },
    {
        zone_id: "nsevz2",
        value: "nitelgrp",
        label: "nitelgrp"
    },
    {
        zone_id: "nsevz2",
        value: "summitgrp",
        label: "summitgrp"
    },
    {
        zone_id: "phz2",
        value: "ceconventiongroundgroup",
        label: "CE Convention Ground Group"
    },
    {
        zone_id: "phz2",
        value: "celoveworldcentergroup",
        label: "CE Loveworld Center Group"
    },
    {
        zone_id: "phz2",
        value: "celoveworldarenagroup",
        label: "CE Loveworld Arena Group"
    },
    {
        zone_id: "phz2",
        value: "cebonnygroup",
        label: "CE Bonny Group"
    },
    {
        zone_id: "phz2",
        value: "ceeastwestroadgroup",
        label: "CE East West Road Group"
    },
    {
        zone_id: "phz2",
        value: "ceairportroadgroup",
        label: "CE Airport Road Group"
    },
    {
        zone_id: "phz2",
        value: "cefinimagroup",
        label: "CE Finima Group"
    },
    {
        zone_id: "phz2",
        value: "ceexcellenttgroup",
        label: "CE Excellent T Group"
    },
    {
        zone_id: "phz2",
        value: "ceabundantgracegroup",
        label: "CE Abundant Grace Group"
    },
    {
        zone_id: "phz2",
        value: "cecitygroup",
        label: "CE City Group"
    },
    {
        zone_id: "phz2",
        value: "cemetrogroup",
        label: "CE Metro Group"
    },
    {
        zone_id: "phz2",
        value: "cegreatgarrisongroup",
        label: "CE Great Garrison Group"
    },
    {
        zone_id: "phz2",
        value: "ceomokugroup",
        label: "CE Omoku Group"
    },
    {
        zone_id: "phz2",
        value: "ceroyalplacegroup",
        label: "CE Royal Place Group"
    },
    {
        zone_id: "phz2",
        value: "cemgboubagroup",
        label: "CE Mgbouba Group"
    },
    {
        zone_id: "phz2",
        value: "cedunamisgroup",
        label: "CE Dunamis Group"
    },
    {
        zone_id: "phz2",
        value: "ceoroigwemodel",
        label: "CE Oroigwe Model"
    },
    {
        zone_id: "phz2",
        value: "cerumuodomayamodel",
        label: "CE Rumuodomaya Model"
    },
    {
        zone_id: "phz2",
        value: "cedelightgroup",
        label: "CE Delight Group"
    },
    {
        zone_id: "beninvz2",
        value: "ceyouth\/teenschurch",
        label: "CE YOUTH\/TEENS CHURCH"
    },
    {
        zone_id: "nnevz1",
        value: "cegombe",
        label: "CE Gombe"
    },
    {
        zone_id: "nnevz1",
        value: "cemaiduguri",
        label: "CE Maiduguri"
    },
    {
        zone_id: "ewcvz5",
        value: "cegloryland",
        label: "CE GLORY LAND"
    }
];
  const churches = [
    {
        zone_id: "phz3",
        group_id: "zion",
        value: "sion",
        label: "sion"
    },
    {
        zone_id: "lvz",
        group_id: "lcachurch1",
        value: "cetesting",
        label: "CE testing"
    },
    {
        zone_id: "accraz",
        group_id: "accraghana",
        value: "ceavenue",
        label: "CE Avenue"
    },
    {
        zone_id: "saz1",
        group_id: "testinggroup",
        value: "testchurch",
        label: "testchurch"
    },
    {
        zone_id: "ewcvz3",
        group_id: "gabagroup",
        value: "gabachurch",
        label: "Gaba Church"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cemainchurchsingles",
        label: "CE MAIN CHURCH SINGLES"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cemainchurchhaven",
        label: "CE MAIN CHURCH HAVEN"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cemainchurchprofessionals",
        label: "CE MAIN CHURCH PROFESSIONALS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cemainchurchlordsandkings",
        label: "CE MAIN CHURCH LORDS AND KINGS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cemainchurchcharisfellowship",
        label: "CE MAIN CHURCH CHARIS FELLOWSHIP"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cemainchurchswanfellowship",
        label: "CE MAIN CHURCH SWAN FELLOWSHIP"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cesherikati",
        label: "CE SHERIKATI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cenaalyateenschurch",
        label: "CE NAALYA TEENS CHURCH"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cenaalyayouthchurch",
        label: "CE NAALYA YOUTH CHURCH"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cemasaka",
        label: "CE MASAKA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cemukono1",
        label: "CE MUKONO 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cehoima",
        label: "CE HOIMA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cemukono3",
        label: "CE MUKONO 3"
    },
    {
        zone_id: "ewcvz3",
        group_id: "nyanamagroup",
        value: "cenyanama",
        label: "CE Nyanama"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ndeebasub-group",
        value: "cendeeba",
        label: "CE Ndeeba"
    },
    {
        zone_id: "lvz",
        group_id: "lcachurch1",
        value: "thefavouredhaven",
        label: "THE FAVOURED HAVEN"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ndeebasub-group",
        value: "cemutungo",
        label: "CE Mutungo"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ndeebasub-group",
        value: "cenaalyasudanesechurch",
        label: "CE NAALYA SUDANESE CHURCH"
    },
    {
        zone_id: "lvz",
        group_id: "lcachurch1",
        value: "thebenchmarkhaven",
        label: "THE BENCHMARK HAVEN"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ndeebasub-group",
        value: "cebukoto",
        label: "CE BUKOTO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "aruagroup",
        value: "cearua",
        label: "CE ARUA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "jinjagroup",
        value: "cejinja",
        label: "CE JINJA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cepaliisa",
        label: "CE Paliisa"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "haven",
        label: "Haven"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cerwandahaven",
        label: "CE Rwanda Haven"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cerwandaprofessionals",
        label: "CE Rwanda Professionals"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cerwandasingles",
        label: "CE Rwanda Singles"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cerwandayouth",
        label: "CE Rwanda Youth"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cerwandamen",
        label: "CE Rwanda Men"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cerwandawomen",
        label: "CE Rwanda Women"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cemukonobajo",
        label: "CE MUKONO BAJO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cemukonoseeta",
        label: "CE MUKONO SEETA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cemukono2",
        label: "CE MUKONO 2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ndeebasub-group",
        value: "cembuya1",
        label: "CE MBUYA 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "cembarara",
        label: "CE MBARARA"
    },
    {
        zone_id: "usaz1r2",
        group_id: "atlantagroup",
        value: "christembassyatlanta",
        label: "Christ Embassy Atlanta"
    },
    {
        zone_id: "usaz1r2",
        group_id: "atlantagroup",
        value: "christembassymarietta",
        label: "Christ Embassy Marietta"
    },
    {
        zone_id: "usaz1r2",
        group_id: "atlantagroup",
        value: "christembassyduluth",
        label: "Christ Embassy Duluth"
    },
    {
        zone_id: "usaz1r2",
        group_id: "atlantagroup",
        value: "christembassydecatur",
        label: "Christ Embassy Decatur"
    },
    {
        zone_id: "usaz1r2",
        group_id: "atlantagroup",
        value: "christembassydunwoody",
        label: "Christ Embassy Dunwoody"
    },
    {
        zone_id: "usaz1r2",
        group_id: "atlantagroup",
        value: "christembassygainesville",
        label: "Christ Embassy Gainesville"
    },
    {
        zone_id: "usaz1r2",
        group_id: "atlantagroup",
        value: "christembassymassachusetts",
        label: "Christ Embassy Massachusetts"
    },
    {
        zone_id: "usaz1r2",
        group_id: "atlantagroup",
        value: "christembassyhamptonroads",
        label: "Christ Embassy Hampton Roads"
    },
    {
        zone_id: "usaz1r2",
        group_id: "atlantagroup",
        value: "christembassystonemountain",
        label: "Christ Embassy Stone Mountain"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup",
        value: "christembassydallas",
        label: "Christ Embassy Dallas"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup",
        value: "christembassydallascentral",
        label: "Christ Embassy Dallas Central"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup",
        value: "christembassynorthdallas",
        label: "Christ Embassy North Dallas"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup",
        value: "christembassytravis",
        label: "Christ Embassy Travis"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup",
        value: "christembassysanantonio",
        label: "Christ Embassy San Antonio"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup",
        value: "christembassykilleen",
        label: "Christ Embassy Killeen"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup",
        value: "christembassypflugerville",
        label: "Christ Embassy Pflugerville"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassychicago",
        label: "Christ Embassy Chicago"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassychicagosouth",
        label: "Christ Embassy Chicago South"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassycharlotte",
        label: "Christ Embassy Charlotte"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassymilwaukee",
        label: "Christ Embassy Milwaukee"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassycolumbus",
        label: "Christ Embassy Columbus"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassyindianapolis",
        label: "Christ Embassy Indianapolis"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassywaukesha",
        label: "Christ Embassy Waukesha"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassyschaumburg",
        label: "Christ Embassy Schaumburg"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassycarmel",
        label: "Christ Embassy Carmel"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassymadison",
        label: "Christ Embassy Madison"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassyphiladelphia",
        label: "Christ Embassy Philadelphia"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassymichigan",
        label: "Christ Embassy Michigan"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassyflorida",
        label: "Christ Embassy Florida"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassyaurora",
        label: "Christ Embassy Aurora"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassydurham",
        label: "Christ Embassy Durham"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassyraleigh",
        label: "Christ Embassy Raleigh"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassyreading",
        label: "Christ Embassy Reading"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassyupperdarby",
        label: "Christ Embassy Upper Darby"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassydelaware",
        label: "Christ Embassy Delaware"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassylaurel",
        label: "Christ Embassy Laurel"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassycolumbia",
        label: "Christ Embassy Columbia"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassyfortwashington",
        label: "Christ Embassy Fort Washington"
    },
    {
        zone_id: "usaz1r2",
        group_id: "zone1",
        value: "christembassyrockhill",
        label: "Christ Embassy Rockhill"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cewalkley",
        label: "CE Walkley"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cebarrhaven",
        label: "CE Barrhaven"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "ceottawaeast",
        label: "CE Ottawa East"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cegatineau",
        label: "CE Gatineau"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "ce\ud835\udc06\ud835\udc0b\ud835\udc0e\ud835\udc14\ud835\udc02\ud835\udc04\ud835\udc12\ud835\udc13\ud835\udc04\ud835\udc11",
        label: "CE \ud835\udc06\ud835\udc0b\ud835\udc0e\ud835\udc14\ud835\udc02\ud835\udc04\ud835\udc12\ud835\udc13\ud835\udc04\ud835\udc11"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "ce\ud835\udc15\ud835\udc00\ud835\udc0d\ud835\udc08\ud835\udc04\ud835\udc11",
        label: "CE \ud835\udc15\ud835\udc00\ud835\udc0d\ud835\udc08\ud835\udc04\ud835\udc11"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cebayshore",
        label: "CE BayShore"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "ceorleans",
        label: "CE Orleans"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cecornwall",
        label: "CE Cornwall"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cegreatgraceyouthchurch",
        label: "CE Great Grace Youth Church"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "advantageoutreachfellowship",
        label: "Advantage Outreach Fellowship"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "ceregina",
        label: "CE REGINA"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cesaskatoon",
        label: "CE SASKATOON"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cehalifax",
        label: "CE Halifax"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "celayibi",
        label: "CE LAYIBI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "ceyouthchurchgulu",
        label: "CE YOUTH CHURCH GULU"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "cebweyale",
        label: "CE BWEYALE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "cekoro",
        label: "CE KORO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "celira",
        label: "CE LIRA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "airportroadgroup",
        value: "cekhartoum1",
        label: "CE KHARTOUM 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "airportroadgroup",
        value: "ceairportroadmain",
        label: "CE AIRPORT ROAD MAIN"
    },
    {
        zone_id: "ewcvz3",
        group_id: "airportroadgroup",
        value: "ceatlabara",
        label: "CE ATLABARA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "airportroadgroup",
        value: "cemiasaba",
        label: "CE MIA SABA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "airportroadgroup",
        value: "cejuba2youthchurch",
        label: "CE JUBA 2 YOUTH CHURCH"
    },
    {
        zone_id: "lwsaza",
        group_id: "johannesburgcentral",
        value: "universityofwitswatersrand",
        label: "University of Witswatersrand"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "cemadina",
        label: "CE MADINA"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "celapaz1",
        label: "CE LAPAZ 1"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi1group",
        value: "cetakoradi1",
        label: "CE TAKORADI 1"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "ceakosombo",
        label: "CE AKOSOMBO"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi1group",
        value: "cekojokrom",
        label: "CE KOJOKROM"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi1group",
        value: "ceagonankwanta1",
        label: "CE AGONA NKWANTA 1"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi1group",
        value: "ceagonankwanta2",
        label: "CE AGONA NKWANTA 2"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi1group",
        value: "ceapollo",
        label: "CE APOLLO"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi1group",
        value: "cenkrofultown",
        label: "CE NKROFUL TOWN"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi1group",
        value: "cesekondicentral",
        label: "CE SEKONDI CENTRAL"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi1group",
        value: "ceesiama",
        label: "CE ESIAMA"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "higherlife",
        label: "HIGHER LIFE"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "achievers",
        label: "Achievers"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "ambassadors",
        label: "Ambassadors"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "charis",
        label: "Charis"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "excel",
        label: "Excel"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "treasures",
        label: "Treasures"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "wisdom",
        label: "Wisdom"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "joy",
        label: "Joy"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "chosen",
        label: "Chosen"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "enigma",
        label: "Enigma"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "supernatural",
        label: "Supernatural"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "mimshack",
        label: "Mimshack"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "extravagantgrace",
        label: "Extravagant Grace"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "fruitful",
        label: "Fruitful"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "lordsandkings",
        label: "Lords and Kings"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "mightymen",
        label: "Mighty Men"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "wisemen",
        label: "Wise men"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "reigningmen",
        label: "Reigning men"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "auxano",
        label: "AUXANO"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "overtakers",
        label: "OVERTAKERS"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "zoe",
        label: "ZOE"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "dunamis",
        label: "DUNAMIS"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "magnificent",
        label: "MAGNIFICENT"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "exceptionalmen",
        label: "Exceptional men"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "preciouswomen",
        label: "Precious women"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "flourish",
        label: "FLOURISH"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "exousiawomen",
        label: "Exousia women"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "phronesiswomen",
        label: "Phronesis women"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "distinction",
        label: "DISTINCTION"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "blossomwomen",
        label: "Blossom women"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "gloriouswomen",
        label: "Glorious women"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "haven1",
        label: "Haven 1"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "haven9",
        label: "Haven 9"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "bsg",
        label: "BSG"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "theexecutives",
        label: "The Executives"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "accomplisseur",
        label: "Accomplisseur"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "enterprenuer",
        label: "Enterprenuer"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "clw",
        label: "CLW"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "northkaneshie",
        label: "North Kaneshie"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "shalom",
        label: "SHALOM"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "highclass",
        label: "HIGHCLASS"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "kingsklass",
        label: "KINGSKLASS"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "masterpiece",
        label: "MASTERPIECE"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "blissfulwomen",
        label: "BLISSFUL WOMEN"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "prestigemen",
        label: "PRESTIGE MEN"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "prosperousmen",
        label: "PROSPEROUS MEN"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "extraordinarymen1",
        label: "EXTRAORDINARY MEN 1"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "prestigewomen1",
        label: "PRESTIGE WOMEN 1"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "queens1",
        label: "QUEENS 1"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "insightformen",
        label: "INSIGHT FOR MEN"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "raregems",
        label: "RARE GEMS"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "coupleselite",
        label: "COUPLES ELITE"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "haven2",
        label: "HAVEN 2"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "haven3",
        label: "HAVEN 3"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "haven4",
        label: "HAVEN 4"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "haven5",
        label: "HAVEN 5"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "haven6",
        label: "HAVEN 6"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "haven7",
        label: "HAVEN 7"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "haven8",
        label: "HAVEN 8"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "thesage",
        label: "THE SAGE"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "bsglaa",
        label: "BSG LAA"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "executiveslaa",
        label: "EXECUTIVES LAA"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "militaryof",
        label: "MILITARY OF"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "hairstylistof",
        label: "HAIRSTYLIST OF"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "creativeartsof",
        label: "CREATIVE ARTS OF"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "cefortportal",
        label: "CE FORT PORTAL"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "soldiersforchrist",
        label: "SOLDIERS FOR CHRIST"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "legonof",
        label: "LEGON OF"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "securityof",
        label: "SECURITY OF"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "cenamayingo",
        label: "CE NAMAYINGO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "cekabong",
        label: "CE KABONG"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "cekalerwe",
        label: "CE KALERWE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "cemoroto1",
        label: "CE MOROTO 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "cekabale",
        label: "CE KABALE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "cekotido",
        label: "CE KOTIDO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "cebombo",
        label: "CE BOMBO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "cepader",
        label: "CE PADER"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "cemoroto2",
        label: "CE MOROTO 2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "celuzirateens",
        label: "CE LUZIRA TEENS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ndeebasub-group",
        value: "cebanda",
        label: "CE BANDA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ndeebasub-group",
        value: "cekiira1",
        label: "CE KIIRA 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "haikuwaitsub-group",
        value: "cehaikuwait1",
        label: "CE HAIKUWAIT 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "haikuwaitsub-group",
        value: "cehaikuwait2",
        label: "CE HAIKUWAIT 2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "haikuwaitsub-group",
        value: "cetongphing",
        label: "CE TONGPHING"
    },
    {
        zone_id: "ewcvz3",
        group_id: "haikuwaitsub-group",
        value: "cenesitu",
        label: "CE NESITU"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cetororo",
        label: "CE TORORO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cembale",
        label: "CE MBALE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cebukedea",
        label: "CE BUKEDEA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cekumi",
        label: "CE KUMI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cekapchorwa",
        label: "CE KAPCHORWA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cemalaba",
        label: "CE MALABA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cebusia",
        label: "CE  BUSIA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cekachumbala",
        label: "CE KACHUMBALA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cenamatala",
        label: "CE NAMATALA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cekwapa",
        label: "CE KWAPA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cebugiri",
        label: "CE BUGIRI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cemukujju",
        label: "CE MUKUJJU"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cenagongera",
        label: "CE NAGONGERA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cembaleteens",
        label: "CE MBALE TEENS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mbalegroup",
        value: "cebulambuli",
        label: "CE BULAMBULI"
    },
    {
        zone_id: "lsza",
        group_id: "lwpeaceville",
        value: "ileoriofe",
        label: "ILE Oriofe"
    },
    {
        zone_id: "lsza",
        group_id: "ladilak",
        value: "gbagada2",
        label: "Gbagada 2"
    },
    {
        zone_id: "lsza",
        group_id: "ladilak",
        value: "gbagada3",
        label: "Gbagada 3"
    },
    {
        zone_id: "lsza",
        group_id: "ladilak",
        value: "gbagada4",
        label: "Gbagada 4"
    },
    {
        zone_id: "lsza",
        group_id: "bariga",
        value: "bariga1",
        label: "Bariga1"
    },
    {
        zone_id: "lsza",
        group_id: "bariga",
        value: "bariga2",
        label: "Bariga 2"
    },
    {
        zone_id: "lsza",
        group_id: "bariga",
        value: "championsplace",
        label: "Champions Place"
    },
    {
        zone_id: "lsza",
        group_id: "bariga",
        value: "bariga3",
        label: "Bariga 3"
    },
    {
        zone_id: "lsza",
        group_id: "bariga",
        value: "excelcenter",
        label: "Excel Center"
    },
    {
        zone_id: "lsza",
        group_id: "ogudu",
        value: "ogudu",
        label: "OGUDU"
    },
    {
        zone_id: "lsza",
        group_id: "orioke",
        value: "ogudurdabt",
        label: "Ogudu rdabt"
    },
    {
        zone_id: "lsza",
        group_id: "orioke",
        value: "orioke",
        label: "Orioke"
    },
    {
        zone_id: "lsza",
        group_id: "orioke",
        value: "wellspring",
        label: "Wellspring"
    },
    {
        zone_id: "lsza",
        group_id: "soluyi",
        value: "powerline",
        label: "Powerline"
    },
    {
        zone_id: "lsza",
        group_id: "soluyi",
        value: "hospitalroad",
        label: "Hospital road"
    },
    {
        zone_id: "lsza",
        group_id: "soluyi",
        value: "sawmill",
        label: "Sawmill"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "ceagapecity",
        label: "CE Agape City"
    },
    {
        zone_id: "accraz",
        group_id: "capecoastgroup",
        value: "cecapecoast",
        label: "CE CAPE COAST"
    },
    {
        zone_id: "accraz",
        group_id: "capecoastgroup",
        value: "ceelmina",
        label: "CE ELMINA"
    },
    {
        zone_id: "accraz",
        group_id: "capecoastgroup",
        value: "ceabura",
        label: "CE ABURA"
    },
    {
        zone_id: "accraz",
        group_id: "matahekogroup",
        value: "cemallam2",
        label: "CE Mallam 2"
    },
    {
        zone_id: "accraz",
        group_id: "capecoastgroup",
        value: "cemoree",
        label: "CE MOREE"
    },
    {
        zone_id: "accraz",
        group_id: "matahekogroup",
        value: "cesowutuom",
        label: "CE Sowutuom"
    },
    {
        zone_id: "accraz",
        group_id: "matahekogroup",
        value: "cevideocity",
        label: "CE Video City"
    },
    {
        zone_id: "accraz",
        group_id: "capecoastgroup",
        value: "cemankesim",
        label: "CE MANKESIM"
    },
    {
        zone_id: "accraz",
        group_id: "matahekogroup",
        value: "celapaz4",
        label: "CE Lapaz 4"
    },
    {
        zone_id: "accraz",
        group_id: "matahekogroup",
        value: "ceawoshie",
        label: "CE Awoshie"
    },
    {
        zone_id: "accraz",
        group_id: "matahekogroup",
        value: "ceprampram",
        label: "CE Prampram"
    },
    {
        zone_id: "accraz",
        group_id: "capecoastgroup",
        value: "ceassinfosu",
        label: "CE ASSIN FOSU"
    },
    {
        zone_id: "accraz",
        group_id: "capecoastgroup",
        value: "cetwifopraso",
        label: "CE TWIFO PRASO"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi2group",
        value: "cekumasi2",
        label: "CE KUMASI 2 "
    },
    {
        zone_id: "accraz",
        group_id: "kumasi2group",
        value: "cesunyani1",
        label: "CE SUNYANI 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "kirekagroup",
        value: "cekireka",
        label: "CE KIREKA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "kirekagroup",
        value: "cekasese",
        label: "CE KASESE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "kirekagroup",
        value: "cemengo",
        label: "CE MENGO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "kirekagroup",
        value: "cekisaasi",
        label: "CE KISAASI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "kirekagroup",
        value: "cesalaamaroad",
        label: "CE SALAAMA ROAD"
    },
    {
        zone_id: "ewcvz3",
        group_id: "kirekagroup",
        value: "cekulambiro",
        label: "CE KULAMBIRO"
    },
    {
        zone_id: "accraz",
        group_id: "hogroup",
        value: "cehohoe",
        label: "CE Hohoe"
    },
    {
        zone_id: "accraz",
        group_id: "hogroup",
        value: "certc",
        label: "CE RTC"
    },
    {
        zone_id: "accraz",
        group_id: "hogroup",
        value: "ceworldvision",
        label: "CE WORLD VISION"
    },
    {
        zone_id: "accraz",
        group_id: "hogroup",
        value: "cedambai",
        label: "CE DAMBAI"
    },
    {
        zone_id: "accraz",
        group_id: "hogroup",
        value: "ceho2",
        label: "CE HO 2"
    },
    {
        zone_id: "accraz",
        group_id: "hogroup",
        value: "cekpetoe",
        label: "CE KPETOE"
    },
    {
        zone_id: "accraz",
        group_id: "hogroup",
        value: "ceakatsi",
        label: "CE AKATSI"
    },
    {
        zone_id: "accraz",
        group_id: "kasoagroup",
        value: "cekasoa2",
        label: "CE Kasoa 2"
    },
    {
        zone_id: "accraz",
        group_id: "kasoagroup",
        value: "cekasoa3",
        label: "CE KASOA 3"
    },
    {
        zone_id: "accraz",
        group_id: "kasoagroup",
        value: "ceswedru",
        label: "CE SWEDRU"
    },
    {
        zone_id: "accraz",
        group_id: "kasoagroup",
        value: "ceswedru2",
        label: "CE SWEDRU 2"
    },
    {
        zone_id: "accraz",
        group_id: "kasoagroup",
        value: "cebawjiase",
        label: "CE BAWJIASE"
    },
    {
        zone_id: "accraz",
        group_id: "kasoagroup",
        value: "cekasoa4",
        label: "CE KASOA 4"
    },
    {
        zone_id: "accraz",
        group_id: "kasoagroup",
        value: "cekasoapeacetown",
        label: "CE KASOA PEACE TOWN "
    },
    {
        zone_id: "accraz",
        group_id: "kasoagroup",
        value: "cekasoacplaststop",
        label: "CE KASOA CP LAST STOP"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceairportcityyouthchurch",
        label: "CE AIRPORT CITY YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "weijagroup",
        value: "cebroadcasting",
        label: "CE Broadcasting"
    },
    {
        zone_id: "accraz",
        group_id: "weijagroup",
        value: "celapaz3",
        label: "CE LAPAZ 3"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "ceagblezaa",
        label: "CE AGBLEZAA"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "ceashaleybotwe",
        label: "CE ASHALEY BOTWE"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "ceashiyie",
        label: "CE ASHIYIE"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "cefafraha",
        label: "CE FAFRAHA"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "ceoyarifagreenhills",
        label: "CE OYARIFA GREEN HILLS"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "ceashaleybotwe2",
        label: "CE ASHALEY BOTWE 2"
    },
    {
        zone_id: "accraz",
        group_id: "madinagroup",
        value: "ceoldashongman",
        label: "CE OLD ASHONGMAN"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi2group",
        value: "cesunyani2",
        label: "CE SUNYANI 2"
    },
    {
        zone_id: "accraz",
        group_id: "matahekogroup",
        value: "cemataheko",
        label: "CE MATAHEKO"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi2group",
        value: "cetechiman1",
        label: "CE TECHIMAN 1"
    },
    {
        zone_id: "accraz",
        group_id: "taifagroup",
        value: "celapazracecourse",
        label: "CE LAPAZ RACE COURSE"
    },
    {
        zone_id: "accraz",
        group_id: "taifagroup",
        value: "cekisseman",
        label: "CE KISSEMAN"
    },
    {
        zone_id: "accraz",
        group_id: "taifagroup",
        value: "ceawoshie2",
        label: "CE AWOSHIE 2"
    },
    {
        zone_id: "accraz",
        group_id: "taifagroup",
        value: "celapaz5",
        label: "CE LAPAZ 5"
    },
    {
        zone_id: "accraz",
        group_id: "taifagroup",
        value: "cesantamaria",
        label: "CE SANTA MARIA"
    },
    {
        zone_id: "accraz",
        group_id: "taifagroup",
        value: "cetabora",
        label: "CE TABORA"
    },
    {
        zone_id: "accraz",
        group_id: "taifagroup",
        value: "cepokuase",
        label: "CE POKUASE"
    },
    {
        zone_id: "accraz",
        group_id: "taifagroup",
        value: "cetema2",
        label: "CE TEMA 2"
    },
    {
        zone_id: "accraz",
        group_id: "taifagroup",
        value: "ceablekumaparadise",
        label: "CE ABLEKUMA PARADISE "
    },
    {
        zone_id: "accraz",
        group_id: "kumasi2group",
        value: "cetechiman2",
        label: "CE TECHIMAN 2"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi2group",
        value: "cekenyasi",
        label: "CE KENYASI"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi2group",
        value: "cekintampo",
        label: "CE KINTAMPO"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi2group",
        value: "cechiraa",
        label: "CE CHIRAA"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi2group",
        value: "cebolebamboi",
        label: "CE BOLE BAMBOI"
    },
    {
        zone_id: "accraz",
        group_id: "tarkwagroup",
        value: "tark23",
        label: "tark23"
    },
    {
        zone_id: "accraz",
        group_id: "tarkwagroup",
        value: "cetarkwa",
        label: "CE TARKWA"
    },
    {
        zone_id: "accraz",
        group_id: "tarkwagroup",
        value: "cebogoso",
        label: "CE BOGOSO"
    },
    {
        zone_id: "accraz",
        group_id: "tarkwagroup",
        value: "cedaboase",
        label: "CE DABOASE"
    },
    {
        zone_id: "accraz",
        group_id: "tarkwagroup",
        value: "cebakayekyire",
        label: "CE BAKAYEKYIRE"
    },
    {
        zone_id: "accraz",
        group_id: "tarkwagroup",
        value: "ceanaji",
        label: "CE ANAJI"
    },
    {
        zone_id: "accraz",
        group_id: "tarkwagroup",
        value: "ceinchaban",
        label: "CE INCHABAN"
    },
    {
        zone_id: "accraz",
        group_id: "tarkwagroup",
        value: "cedarman",
        label: "CE DARMAN"
    },
    {
        zone_id: "accraz",
        group_id: "taifagroup",
        value: "cetaifa",
        label: "CE TAIFA"
    },
    {
        zone_id: "accraz",
        group_id: "agbozumegroup",
        value: "ceagbozume",
        label: "CE AGBOZUME"
    },
    {
        zone_id: "accraz",
        group_id: "agbozumegroup",
        value: "cekadjabi",
        label: "CE KADJABI"
    },
    {
        zone_id: "accraz",
        group_id: "agbozumegroup",
        value: "ceatimpoku",
        label: "CE ATIMPOKU"
    },
    {
        zone_id: "accraz",
        group_id: "agbozumegroup",
        value: "cekpong",
        label: "CE KPONG"
    },
    {
        zone_id: "accraz",
        group_id: "tamalegroup",
        value: "cetamale",
        label: "CE TAMALE"
    },
    {
        zone_id: "accraz",
        group_id: "tamalegroup",
        value: "cetamale2",
        label: "CE TAMALE 2"
    },
    {
        zone_id: "accraz",
        group_id: "tamalegroup",
        value: "cetamale4",
        label: "CE TAMALE 4"
    },
    {
        zone_id: "accraz",
        group_id: "tamalegroup",
        value: "cesaboba",
        label: "CE SABOBA"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi2group",
        value: "cesekondi",
        label: "CE SEKONDI"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi2group",
        value: "cedormeabra",
        label: "CE DORMEABRA"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi2group",
        value: "ceapowa",
        label: "CE APOWA"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi2group",
        value: "cewinneba",
        label: "CE WINNEBA"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi2group",
        value: "cesankofa",
        label: "CE SANKOFA"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi2group",
        value: "ceapam",
        label: "CE APAM"
    },
    {
        zone_id: "accraz",
        group_id: "tamalegroup",
        value: "ceadom",
        label: "CE ADOM"
    },
    {
        zone_id: "accraz",
        group_id: "tamalegroup",
        value: "cekabiti",
        label: "CE KABITI"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi2group",
        value: "cewaterworks",
        label: "CE WATER WORKS"
    },
    {
        zone_id: "accraz",
        group_id: "tamalegroup",
        value: "cetumu",
        label: "CE TUMU"
    },
    {
        zone_id: "accraz",
        group_id: "tamalegroup",
        value: "cejirapa",
        label: "CE JIRAPA"
    },
    {
        zone_id: "accraz",
        group_id: "tamalegroup",
        value: "cewa",
        label: "CE WA"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi2group",
        value: "cetakoradi2",
        label: "CE TAKORADI 2"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "ceketa",
        label: "CE KETA"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "cedzodze",
        label: "CE DZODZE"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "cejuapong",
        label: "CE JUAPONG "
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "tegbi",
        label: "TEGBI"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "cesogakope",
        label: "CE SOGAKOPE"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "cedabala",
        label: "CE DABALA"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "ceafabeng",
        label: "CE AFABENG"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "ceabutsiakope",
        label: "CE ABUTSIAKOPE"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "cekedzi",
        label: "CE KEDZI"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "cexekpa",
        label: "CE XEKPA"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "ceangola",
        label: "CE ANGOLA"
    },
    {
        zone_id: "accraz",
        group_id: "ketagroup",
        value: "ceblekusu",
        label: "CE BLEKUSU"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "cembuya2",
        label: "CE MBUYA 2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "ceagenda",
        label: "CE AGENDA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "cewakiso",
        label: "CE WAKISO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "cekira3",
        label: "CE KIRA 3"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "cebwaise",
        label: "CE BWAISE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "cekawala",
        label: "CE KAWALA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "cekira2",
        label: "CE KIRA 2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "sorotisub-group",
        value: "cesoroti1",
        label: "CE SOROTI 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "sorotisub-group",
        value: "cesoroti2",
        label: "CE SOROTI 2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "sorotisub-group",
        value: "cekaberamaido",
        label: "CE KABERAMAIDO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "sorotisub-group",
        value: "ceamuria",
        label: "CE AMURIA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "sorotisub-group",
        value: "ceotuboi",
        label: "CE OTUBOI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "sorotisub-group",
        value: "cekatakwi",
        label: "CE KATAKWI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "sorotisub-group",
        value: "cesorotiteens",
        label: "CE SOROTI TEENS"
    },
    {
        zone_id: "accraz",
        group_id: "berekumgroup",
        value: "ceberekum",
        label: "CE BEREKUM"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cemukono4",
        label: "CE MUKONO 4"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cemityana",
        label: "CE MITYANA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cekyengera",
        label: "CE KYENGERA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cemukonoteens",
        label: "CE MUKONO TEENS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "wandegeyagroup",
        value: "cewandegeya",
        label: "CE WANDEGEYA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "wandegeyagroup",
        value: "cefortportal1",
        label: "CE FORT PORTAL 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "wandegeyagroup",
        value: "cemuyenga",
        label: "CE MUYENGA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "wandegeyagroup",
        value: "celugazi",
        label: "CE LUGAZI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "wandegeyagroup",
        value: "cekyebando",
        label: "CE KYEBANDO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "wandegeyagroup",
        value: "cegayaza",
        label: "CE GAYAZA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "wandegeyagroup",
        value: "cenakawa",
        label: "CE NAKAWA"
    },
    {
        zone_id: "accraz",
        group_id: "berekumgroup",
        value: "cedrobo",
        label: "CE DROBO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "entebbegroup",
        value: "ceentebbe1",
        label: "CE ENTEBBE 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "entebbegroup",
        value: "ceentebbe2",
        label: "CE ENTEBBE 2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "entebbegroup",
        value: "ceentebbe3",
        label: "CE ENTEBBE 3"
    },
    {
        zone_id: "ewcvz3",
        group_id: "entebbegroup",
        value: "ceentebbe4",
        label: "CE ENTEBBE 4"
    },
    {
        zone_id: "ewcvz3",
        group_id: "entebbegroup",
        value: "ceentebbe5",
        label: "CE ENTEBBE 5"
    },
    {
        zone_id: "ewcvz3",
        group_id: "entebbegroup",
        value: "ceentebbe6",
        label: "CE ENTEBBE 6"
    },
    {
        zone_id: "ewcvz3",
        group_id: "entebbegroup",
        value: "ceentebbe7",
        label: "CE ENTEBBE 7"
    },
    {
        zone_id: "ewcvz3",
        group_id: "entebbegroup",
        value: "ceentebbeteens",
        label: "CE ENTEBBE  TEENS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "aruagroup",
        value: "cekoboko",
        label: "CE KOBOKO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "aruagroup",
        value: "cenebbi",
        label: "CE NEBBI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "aruagroup",
        value: "ceadjumani",
        label: "CE ADJUMANI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "jinjagroup",
        value: "cejinjalusoga",
        label: "CE JINJA LUSOGA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "jinjagroup",
        value: "cenjeru1",
        label: "CE NJERU 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "jinjagroup",
        value: "cenjeru2",
        label: "CE NJERU 2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "jinjagroup",
        value: "ceiganga1",
        label: "CE IGANGA 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "jinjagroup",
        value: "ceiganga2",
        label: "CE IGANGA 2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "jinjagroup",
        value: "cekamuli",
        label: "CE KAMULI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "jinjagroup",
        value: "cebugembe",
        label: "CE BUGEMBE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cerwandateens",
        label: "CE RWANDA TEENS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "jinjagroup",
        value: "cemayuge",
        label: "CE MAYUGE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "juba1group",
        value: "cejuba1rockcity",
        label: "CE JUBA 1 ROCK CITY"
    },
    {
        zone_id: "ewcvz3",
        group_id: "juba1group",
        value: "cegudele",
        label: "CE GUDELE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "juba1group",
        value: "cegudeleteens",
        label: "CE GUDELE TEENS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "juba1group",
        value: "ceuppernile-makaal",
        label: "CE UPPER NILE- MAKAAL"
    },
    {
        zone_id: "ewcvz3",
        group_id: "juba1group",
        value: "cenimule",
        label: "CE NIMULE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "seychellesgroup",
        value: "ceseycelles1",
        label: "CE SEYCELLES 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "seychellesgroup",
        value: "ceseychelles2",
        label: "CE SEYCHELLES 2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "seychellesgroup",
        value: "ceanseroyale",
        label: "CE ANSE ROYALE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "seychellesgroup",
        value: "ceseychellesteens",
        label: "CE SEYCHELLES TEENS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "surinamegroup",
        value: "cesuriname",
        label: "CE SURINAME"
    },
    {
        zone_id: "ewcvz3",
        group_id: "dominicanrepublicgroup",
        value: "cedominicanrepublic",
        label: "CE DOMINICAN REPUBLIC"
    },
    {
        zone_id: "ewcvz3",
        group_id: "nyanamagroup",
        value: "cecitycentre",
        label: "CE CITY CENTRE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "nyanamagroup",
        value: "cenansana",
        label: "CE NANSANA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "nyanamagroup",
        value: "cekawempe",
        label: " CE KAWEMPE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "nyanamagroup",
        value: "cemulago",
        label: "CE MULAGO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "nyanamagroup",
        value: "cempererwe",
        label: "CE MPERERWE"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "cearena",
        label: "CE ARENA"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "cete\/annex",
        label: "CE TE\/ANNEX"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cepresidential",
        label: "CE PRESIDENTIAL"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "censukka",
        label: "CE NSUKKA"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "cepresidentialgroup",
        label: "CE PRESIDENTIAL GROUP"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceensukka",
        label: "CEE NSUKKA "
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceabakpa",
        label: "CE ABAKPA"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "cetransekulu1",
        label: "CE TRANSEKULU 1"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ce9thmile",
        label: "CE 9TH MILE"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceagbani",
        label: "CE AGBANI"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceairportroad1",
        label: "CE AIRPORT ROAD 1"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceairportroad2",
        label: "CE AIRPORT ROAD 2"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "cethinkerscorner",
        label: "CE THINKERS CORNER"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "cegra",
        label: "CE GRA"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceindependencelayout",
        label: "CE INDEPENDENCE LAYOUT"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "cetransekulu2",
        label: "CE TRANSEKULU 2"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceabakpa3",
        label: "CE ABAKPA 3"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceabakpa4",
        label: "CE ABAKPA 4"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceabakpa5",
        label: "CE ABAKPA 5"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceugbene2",
        label: "CE UGBENE 2"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceugwuaji",
        label: "CE UGWUAJI"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceeke",
        label: "CE EKE"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceobolloafor",
        label: "CE OBOLLO AFOR"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceorji",
        label: "CE ORJI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "luziragroup",
        value: "celuzira",
        label: "CE LUZIRA"
    },
    {
        zone_id: "accraz",
        group_id: "legon2group",
        value: "cetabora1",
        label: "CE TABORA 1"
    },
    {
        zone_id: "accraz",
        group_id: "legon2group",
        value: "celaterbiokoshie",
        label: "CE LATERBIOKOSHIE"
    },
    {
        zone_id: "accraz",
        group_id: "hogroup",
        value: "ceho",
        label: "CE HO "
    },
    {
        zone_id: "accraz",
        group_id: "legon2group",
        value: "celegon",
        label: "CE LEGON "
    },
    {
        zone_id: "accraz",
        group_id: "legon2group",
        value: "ceeastairport",
        label: "CE EAST AIRPORT"
    },
    {
        zone_id: "accraz",
        group_id: "legon2group",
        value: "ceteshie2",
        label: "CE TESHIE 2"
    },
    {
        zone_id: "accraz",
        group_id: "legon2group",
        value: "ceagbleza2",
        label: "CE AGBLEZA 2"
    },
    {
        zone_id: "accraz",
        group_id: "kasoagroup",
        value: "cekasoa1",
        label: "CE KASOA 1"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "ceosudankwa",
        label: "CE OSU DANKWA"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "celabadi",
        label: "CE LABADI"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "cetradefair",
        label: "CE TRADEFAIR"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "cearena1",
        label: "CE ARENA 1"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "cedansoman3",
        label: "CE DANSOMAN 3"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "cedansomanagege",
        label: "CE DANSOMAN AGEGE"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "cebubuashie",
        label: "CE BUBUASHIE"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "cedakuman",
        label: "CE DAKUMAN"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "ceaccrasoko",
        label: "CE ACCRA SOKO"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "cetudu",
        label: "CE TUDU"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "cenima",
        label: "CE NIMA"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "cematheko2",
        label: "CE MATHEKO2"
    },
    {
        zone_id: "accraz",
        group_id: "koforiduagroup",
        value: "cesomanya",
        label: "CE SOMANYA"
    },
    {
        zone_id: "accraz",
        group_id: "koforiduagroup",
        value: "cenkawkaw",
        label: "CE  NKAWKAW"
    },
    {
        zone_id: "accraz",
        group_id: "koforiduagroup",
        value: "censawam",
        label: "CE NSAWAM"
    },
    {
        zone_id: "accraz",
        group_id: "koforiduagroup",
        value: "cenkawkawnsuta",
        label: "CE NKAWKAW NSUTA"
    },
    {
        zone_id: "accraz",
        group_id: "achimotagroup",
        value: "cemallammacathy",
        label: "CE MALLAM MACATHY"
    },
    {
        zone_id: "accraz",
        group_id: "achimotagroup",
        value: "cenyamekye",
        label: "CE NYAMEKYE"
    },
    {
        zone_id: "accraz",
        group_id: "achimotagroup",
        value: "cetetegu",
        label: "CE TETEGU"
    },
    {
        zone_id: "accraz",
        group_id: "achimotagroup",
        value: "cedakumanot",
        label: "CE DAKUMAN OT"
    },
    {
        zone_id: "accraz",
        group_id: "osugroup",
        value: "cekaneshie",
        label: "CE KANESHIE"
    },
    {
        zone_id: "accraz",
        group_id: "osugroup",
        value: "cemanthesman",
        label: "CE MANTHESMAN"
    },
    {
        zone_id: "accraz",
        group_id: "osugroup",
        value: "cekotobabi",
        label: "CE KOTOBABI"
    },
    {
        zone_id: "accraz",
        group_id: "osugroup",
        value: "cejamestown",
        label: "CE JAMES TOWN"
    },
    {
        zone_id: "accraz",
        group_id: "osugroup",
        value: "cenewtown",
        label: "CE NEW TOWN"
    },
    {
        zone_id: "accraz",
        group_id: "osugroup",
        value: "cetseado",
        label: "CE TSE ADO"
    },
    {
        zone_id: "accraz",
        group_id: "aflaogroup",
        value: "ceada",
        label: "CE ADA"
    },
    {
        zone_id: "accraz",
        group_id: "aflaogroup",
        value: "ceafife",
        label: "CE AFIFE"
    },
    {
        zone_id: "accraz",
        group_id: "aflaogroup",
        value: "ceangloga",
        label: "CE ANGLOGA"
    },
    {
        zone_id: "accraz",
        group_id: "aflaogroup",
        value: "cegologwati",
        label: "CE GOLOGWATI"
    },
    {
        zone_id: "accraz",
        group_id: "aflaogroup",
        value: "cekpando",
        label: "CE KPANDO"
    },
    {
        zone_id: "accraz",
        group_id: "aflaogroup",
        value: "ceadafoah",
        label: "CE ADA FOAH"
    },
    {
        zone_id: "accraz",
        group_id: "adentagroup",
        value: "ceadoagiri",
        label: "CE ADOAGIRI"
    },
    {
        zone_id: "accraz",
        group_id: "adentagroup",
        value: "ceairportshila",
        label: "CE AIRPORT SHILA"
    },
    {
        zone_id: "accraz",
        group_id: "adentagroup",
        value: "ceairport2",
        label: "CE AIRPORT 2"
    },
    {
        zone_id: "accraz",
        group_id: "adentagroup",
        value: "ceoyarifa1",
        label: "CE OYARIFA 1"
    },
    {
        zone_id: "accraz",
        group_id: "adentagroup",
        value: "cebotwe3rdgate",
        label: "CE BOTWE 3RD GATE"
    },
    {
        zone_id: "accraz",
        group_id: "adentagroup",
        value: "ceoyarifa2",
        label: "CE OYARIFA 2"
    },
    {
        zone_id: "accraz",
        group_id: "adentagroup",
        value: "ceoyarifa3",
        label: "CE OYARIFA3"
    },
    {
        zone_id: "accraz",
        group_id: "adentagroup",
        value: "cedodowa",
        label: "CE DODOWA"
    },
    {
        zone_id: "accraz",
        group_id: "adentagroup",
        value: "ceadentabarrier",
        label: "CE ADENTA BARRIER"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceabakaliki1",
        label: "CE ABAKALIKI 1"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cennaliki",
        label: "CE NNALIKI"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceazugwu",
        label: "CE AZUGWU"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceishiagu",
        label: "CE ISHIAGU"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cepresco",
        label: "CE PRESCO"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cenewlayout",
        label: "CE NEW LAYOUT"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceedda",
        label: "CE EDDA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceikwo",
        label: "CE IKWO"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cemodelchurch",
        label: "CE MODEL CHURCH"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceumuagara",
        label: "CE UMUAGARA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceonueke",
        label: "CE ONUEKE"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceenyibichiri",
        label: "CE ENYIBICHIRI"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cenwaezenyi",
        label: "CE NWAEZENYI"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cenkwagu",
        label: "CE NKWAGU"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cenwanbara",
        label: "CE NWANBARA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceozziza",
        label: "CE OZZIZA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceuburu",
        label: "CE UBURU"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceonuebonyi",
        label: "CE ONUEBONYI"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceezzamgbo",
        label: "CE EZZAMGBO"
    },
    {
        zone_id: "accraz",
        group_id: "weijagroup",
        value: "ceweija",
        label: "CE WEIJA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceishieke",
        label: "CE ISHIEKE"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceonnodo",
        label: "CE ONNODO"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceagubia",
        label: "CE AGUBIA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceamasiri",
        label: "CE AMASIRI"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceokposi",
        label: "CE OKPOSI"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "ceakaeze",
        label: "CE AKAEZE"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cehausaqtrs",
        label: "CE HAUSA QTRS"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cepolicejunc",
        label: "CE POLICE JUNC"
    },
    {
        zone_id: "accraz",
        group_id: "achimotagroup",
        value: "ceachimota",
        label: "CE ACHIMOTA"
    },
    {
        zone_id: "accraz",
        group_id: "adentagroup",
        value: "ceadenta1",
        label: "CE ADENTA 1"
    },
    {
        zone_id: "accraz",
        group_id: "aflaogroup",
        value: "ceaflao",
        label: "CE AFLAO"
    },
    {
        zone_id: "accraz",
        group_id: "koforiduagroup",
        value: "cekoforidua",
        label: "CE KOFORIDUA"
    },
    {
        zone_id: "accraz",
        group_id: "legon2group",
        value: "celegon2",
        label: "CE LEGON 2"
    },
    {
        zone_id: "accraz",
        group_id: "korlebugroiup",
        value: "cekolebu",
        label: "CE KOLEBU "
    },
    {
        zone_id: "accraz",
        group_id: "osugroup",
        value: "ceosu",
        label: "CE OSU"
    },
    {
        zone_id: "accraz",
        group_id: "berekumgroup",
        value: "censoatre",
        label: "CE NSOATRE"
    },
    {
        zone_id: "accraz",
        group_id: "berekumgroup",
        value: "cedormaa",
        label: "CE DORMAA"
    },
    {
        zone_id: "accraz",
        group_id: "berekumgroup",
        value: "cenkoranza",
        label: "CE NKORANZA"
    },
    {
        zone_id: "accraz",
        group_id: "berekumgroup",
        value: "cejinijini",
        label: "CE JINIJINI"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "avenorstaff",
        label: "Avenor staff"
    },
    {
        zone_id: "lwsaza",
        group_id: "pretorianorth",
        value: "blwsefakomakgathohealthsciencesuniversity",
        label: "BLW Sefako Makgatho Health Sciences University"
    },
    {
        zone_id: "lwsaza",
        group_id: "pretorianorth",
        value: "blwtshwaneuniversityoftechnologygarankuwa",
        label: "BLW Tshwane University of Technology GaRankuwa"
    },
    {
        zone_id: "accraz",
        group_id: "akimodagroup",
        value: "ceakimoda",
        label: "CE AKIM ODA"
    },
    {
        zone_id: "accraz",
        group_id: "akimodagroup",
        value: "ceakropong",
        label: "CE AKROPONG"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cegloucester",
        label: "CE Gloucester"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cevanier",
        label: "CE Vanier"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "laagroupstaff",
        label: "LAA GROUP STAFF"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mukonogroup",
        value: "cemukonodominion",
        label: "CE  MUKONO DOMINION"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "cespintex",
        label: "CE SPINTEX"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "cetema",
        label: "CE TEMA"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "ceeastlegon",
        label: "CE EAST LEGON"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "ceteshienungua",
        label: "CE TESHIE NUNGUA"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "celegon3",
        label: "CE LEGON 3"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "celegon4",
        label: "CE LEGON 4"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "celegon5",
        label: "CE LEGON 5"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "celegon6",
        label: "CE LEGON 6"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "cemamobi",
        label: "CE MAMOBI"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "ceeastcantonements",
        label: "CE EAST CANTONEMENTS"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "ceagonakwanyako",
        label: "CE AGONA KWANYAKO"
    },
    {
        zone_id: "accraz",
        group_id: "spintexgroup",
        value: "cenunguakatamanso",
        label: "CE NUNGUA KATAMANSO"
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "cedome",
        label: "CE DOME "
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "cenewtown1",
        label: "CE NEW TOWN 1"
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "ceachimotagulfhills",
        label: "CE ACHIMOTA GULF HILLS"
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "celakeside",
        label: "CE LAKESIDE"
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "cebaahyard",
        label: "CE BAAH YARD"
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "ceantieku",
        label: "CE ANTIEKU"
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "cedzorwulu",
        label: "CE DZORWULU"
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "cedome2",
        label: "CE DOME 2"
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "ceofankor",
        label: "CE OFANKOR"
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "cemallam1",
        label: "CE MALLAM 1"
    },
    {
        zone_id: "accraz",
        group_id: "oldweijagroup",
        value: "ceoldweija",
        label: "CE OLD WEIJA"
    },
    {
        zone_id: "accraz",
        group_id: "oldweijagroup",
        value: "cedansoman1",
        label: "CE DANSOMAN1"
    },
    {
        zone_id: "accraz",
        group_id: "oldweijagroup",
        value: "cedansoman2",
        label: "CE DANSOMAN 2"
    },
    {
        zone_id: "accraz",
        group_id: "oldweijagroup",
        value: "cegalilea",
        label: "CE GALILEA"
    },
    {
        zone_id: "accraz",
        group_id: "oldweijagroup",
        value: "cedansomancontrol",
        label: "CE DANSOMAN CONTROL"
    },
    {
        zone_id: "accraz",
        group_id: "oldweijagroup",
        value: "cedansomanlaststop",
        label: "CE DANSOMAN LAST STOP"
    },
    {
        zone_id: "accraz",
        group_id: "oldweijagroup",
        value: "cetopbasegbawe",
        label: "CE TOPBASE GBAWE"
    },
    {
        zone_id: "accraz",
        group_id: "oldweijagroup",
        value: "ceagape",
        label: "CE AGAPE"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cekumasi1",
        label: "CE KUMASI 1"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cetech",
        label: "CE TECH"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cekath",
        label: "CE KATH "
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cemawuli",
        label: "CE MAWULI"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cekonongo",
        label: "CE KONONGO"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cekumasi4",
        label: "CE KUMASI 4"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cebibiani",
        label: "CE BIBIANI"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cebolgatanga",
        label: "CE BOLGATANGA"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cebawku1",
        label: "CE BAWKU 1"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "ceyikene",
        label: "CE YIKENE"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cekumbusco",
        label: "CE KUMBUSCO"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cekwadaso",
        label: "CE KWADASO"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "ceagona",
        label: "CE AGONA"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cetutuka",
        label: "CE TUTUKA"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi1group",
        value: "cebole",
        label: "CE BOLE"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "cecentralchurch",
        label: "CE CENTRAL CHURCH"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "cegraceland",
        label: "CE GRACELAND"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "cefaitharena",
        label: "CE FAITH ARENA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "ceagulu",
        label: "CE AGULU"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki1",
        value: "cenkpoghoro",
        label: "CE NKPOGHORO"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "ceunwana",
        label: "CE UNWANA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "cericemill",
        label: "CE RICE MILL"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "ceenoha",
        label: "CE ENOHA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "ceabaomege",
        label: "CE ABAOMEGE"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "cenewsite",
        label: "CE NEWSITE"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "ceosoedda",
        label: "CE OSO EDDA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "ceamaiza",
        label: "CE AMAIZA"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu2",
        value: "ceenugu2",
        label: "CE ENUGU 2"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cezonalchurch",
        label: "cezonalchurch"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "cegulu1",
        label: "CE GULU 1"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "celacor",
        label: "CE LACOR"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "cekitgum",
        label: "CE KITGUM"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "cepece",
        label: "CE PECE"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "ceguluteens",
        label: "CE GULU TEENS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "ceunyama",
        label: "CE UNYAMA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "ceamach",
        label: "CE AMACH"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "cepabbo",
        label: "CE PABBO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "ceyouthchurch",
        label: "CE YOUTH CHURCH"
    },
    {
        zone_id: "ewcvz3",
        group_id: "northernugsub-group",
        value: "ceanaka",
        label: "CE ANAKA"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "ceenkpoghoro",
        label: "CEE NKPOGHORO"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "ceamaizu",
        label: "CE AMAIZU"
    },
    {
        zone_id: "sez3",
        group_id: "ceabakaliki2",
        value: "ceindepencelayout",
        label: "CE INDEPENCE LAYOUT "
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu2",
        value: "ceamechi2",
        label: "CE AMECHI  2"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu2",
        value: "ceacharalayout",
        label: "CE ACHARA LAYOUT"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu2",
        value: "cemaryland",
        label: "CE MARYLAND"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu2",
        value: "cemount",
        label: "CE MOUNT "
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "cekamwenge",
        label: "CE KAMWENGE"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "ceamaechi",
        label: "CE AMAECHI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cenamuwongo",
        label: "CE  NAMUWONGO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cekansangati",
        label: "CE KANSANGATI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cenakifuma",
        label: "CE NAKIFUMA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cezombo",
        label: "CE ZOMBO"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupa",
        value: "cenaalyateens",
        label: "CE NAALYA TEENS"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "cemasindi",
        label: "CE MASINDI"
    },
    {
        zone_id: "ewcvz3",
        group_id: "mainchurchgroupb",
        value: "celugala",
        label: "CE LUGALA"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu1",
        value: "cetransekuluannex",
        label: "CE TRANSEKULU ANNEX"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "cemacory",
        label: "CE MACORY"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "ceyoupogon1",
        label: "CE YOUPOGON1"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "ceabidjan",
        label: "CE ABIDJAN"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "ceyoupogon2",
        label: "CE YOUPOGON2"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "ceriveria",
        label: "CE RIVERIA"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "ceyamossokro",
        label: "CE YAMOSSOKRO"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "ceportbuet",
        label: "CE PORT BUET"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "cekoumassi",
        label: "CE KOUMASSI"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "ceagboville",
        label: "CE AGBOVILLE"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "cesanpedro",
        label: "CE SAN PEDRO"
    },
    {
        zone_id: "beninz1",
        group_id: "erediauwagroup",
        value: "ceamazing",
        label: "CE AMAZING "
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "avenordeaconry",
        label: "avenordeaconry"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "virtuouswomen",
        label: "virtuous women"
    },
    {
        zone_id: "lsza",
        group_id: "lwpeaceville",
        value: "youthchurch",
        label: "Youth Church"
    },
    {
        zone_id: "accraz",
        group_id: "westlegongroup",
        value: "cewestlegon",
        label: "CE WEST LEGON"
    },
    {
        zone_id: "accraz",
        group_id: "westlegongroup",
        value: "cealajo",
        label: "CE ALAJO"
    },
    {
        zone_id: "accraz",
        group_id: "westlegongroup",
        value: "ceracecourse",
        label: "CE RACE COURSE"
    },
    {
        zone_id: "accraz",
        group_id: "westlegongroup",
        value: "ceabeka",
        label: "CE ABEKA"
    },
    {
        zone_id: "accraz",
        group_id: "westlegongroup",
        value: "cebananainn",
        label: "CE BANANA INN"
    },
    {
        zone_id: "accraz",
        group_id: "westlegongroup",
        value: "celekma",
        label: "CE LEKMA"
    },
    {
        zone_id: "accraz",
        group_id: "westlegongroup",
        value: "ceashaiman",
        label: "CE ASHAIMAN"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi3group",
        value: "cekumasi3",
        label: "CE KUMASI 3"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi3group",
        value: "ceatonsu",
        label: "CE ATONSU"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi3group",
        value: "ceoffinso",
        label: "CE OFFINSO"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi3group",
        value: "cekotwi",
        label: "CE KOTWI"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi3group",
        value: "cenkawie",
        label: "CE NKAWIE"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi3group",
        value: "ceejisu",
        label: "CE EJISU"
    },
    {
        zone_id: "accraz",
        group_id: "kumasi3group",
        value: "cesouthsuntreso",
        label: "CE SOUTH SUNTRESO"
    },
    {
        zone_id: "sez3",
        group_id: "ceenugu2",
        value: "ceindepencelayout2",
        label: "CE INDEPENCE LAYOUT  2"
    },
    {
        zone_id: "ibz1",
        group_id: "ceakobogroup",
        value: "airport",
        label: "AIRPORT"
    },
    {
        zone_id: "ibz1",
        group_id: "ceakobogroup",
        value: "ceakobo1",
        label: "CE AKOBO 1"
    },
    {
        zone_id: "ibz1",
        group_id: "ceakobogroup",
        value: "ceakobo2",
        label: "CE AKOBO 2"
    },
    {
        zone_id: "ibz1",
        group_id: "ceakobogroup",
        value: "cealakia",
        label: "CE ALAKIA"
    },
    {
        zone_id: "ibz1",
        group_id: "ceakobogroup",
        value: "cemonatan",
        label: "CE MONATAN"
    },
    {
        zone_id: "ibz1",
        group_id: "ceakobogroup",
        value: "ceairport",
        label: "CE AIRPORT"
    },
    {
        zone_id: "ibz1",
        group_id: "ceakobogroup",
        value: "ceolodo",
        label: "CE OLODO"
    },
    {
        zone_id: "ibz1",
        group_id: "ceakobogroup",
        value: "ceiworoad",
        label: "CE IWO ROAD"
    },
    {
        zone_id: "ibz1",
        group_id: "ajibodejunctiongroup",
        value: "ceajibodejunction",
        label: "CE AJIBODE JUNCTION"
    },
    {
        zone_id: "ibz1",
        group_id: "ajibodejunctiongroup",
        value: "ceajibode",
        label: "CE Ajibode"
    },
    {
        zone_id: "ibz1",
        group_id: "ajibodejunctiongroup",
        value: "cearulogun",
        label: "CE ARULOGUN"
    },
    {
        zone_id: "ibz1",
        group_id: "ajibodejunctiongroup",
        value: "ceapete",
        label: "CE APETE"
    },
    {
        zone_id: "ibz1",
        group_id: "ajibodejunctiongroup",
        value: "cemoniya",
        label: "CE MONIYA"
    },
    {
        zone_id: "ibz1",
        group_id: "ajibodejunctiongroup",
        value: "ceakinyele",
        label: "CE AKINYELE"
    },
    {
        zone_id: "ibz1",
        group_id: "ceeleyelegroup",
        value: "ceeleyele1",
        label: "CE ELEYELE 1"
    },
    {
        zone_id: "ibz1",
        group_id: "ajibodejunctiongroup",
        value: "ceeleyele2",
        label: "CE ELEYELE 2"
    },
    {
        zone_id: "ibz1",
        group_id: "ajibodejunctiongroup",
        value: "ceogr",
        label: "CE OGR"
    },
    {
        zone_id: "ibz1",
        group_id: "ajibodejunctiongroup",
        value: "ceokeitunu",
        label: "CE OKE ITUNU"
    },
    {
        zone_id: "ibz1",
        group_id: "samondagroup",
        value: "cesamonda",
        label: "CE SAMONDA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cerwandaauxano",
        label: "CE Rwanda Auxano"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cerwandazenith",
        label: "CE Rwanda Zenith"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceokoafo",
        label: "CE Okoafo"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "ceisolo",
        label: "CE Isolo"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cefestaclinkbridge",
        label: "CE Festac Link Bridge"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cesofuye",
        label: "CE Sofuye"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cecommunity",
        label: "CE Community"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "ceokota",
        label: "CE Okota"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cepromiseland",
        label: "CE Promise Land"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "ceapata",
        label: "CE Apata"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "ceokota2",
        label: "CE Okota 2"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "ceokota3",
        label: "CE Okota 3"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "ceboundlessgrace",
        label: "CE Boundless Grace"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceajao",
        label: "CE Ajao"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cecanalclose",
        label: "CE Canal Close"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceairportroad",
        label: "CE Airport Road"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceroyalville1",
        label: "CE Royalville 1"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "ceamuwogra",
        label: "CE Amuwo GRA"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceakinmateola",
        label: "CE Akin Mateola"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceappleestate1",
        label: "CE Apple Estate 1"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cemileext.2",
        label: "CE Mile Ext. 2"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceireakari",
        label: "CE Ire Akari"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceholysaviours",
        label: "CE Holysaviours"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cegodmon1",
        label: "CE Godmon 1"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cegodmon2",
        label: "CE Godmon 2"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceroyalville2",
        label: "CE Royalville 2"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceireakari2",
        label: "CE Ire Akari 2"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cetripolilibya",
        label: "CE Tripoli Libya"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceajao2",
        label: "CE Ajao2"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceappleestate2",
        label: "CE Apple Estate 2"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceamuwogra2",
        label: "CE Amuwo GRA 2"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceaswani",
        label: "CE Aswani "
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceademulegun",
        label: "CE Ademulegun"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceexcelcentre",
        label: "CE Excel Centre"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceokunola2",
        label: "CE Okunola 2"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceaboru1",
        label: "CE Aboru 1"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "ceaboru2",
        label: "CE Aboru 2"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "cesantos",
        label: "CE Santos"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceokunola",
        label: "CE Okunola"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "cefakoya",
        label: "CE Fakoya"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "ceakowonjo",
        label: "CE Akowonjo"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cesantos2",
        label: "CE Santos 2"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceexcelcentre2",
        label: "CE Excel Centre 2"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cebashoru",
        label: "CE Bashoru"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cedopemu3",
        label: "CE Dopemu 3"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceshasha",
        label: "CE Shasha"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cebameke",
        label: "CE Bameke"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceaboru2church",
        label: "CE Aboru 2 Church"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "cesantoschurch",
        label: "CE Santos Church"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "cebamekechurch",
        label: "CE Bameke Church"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "cedopemu3church",
        label: "CE Dopemu 3 Church"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceshasha2",
        label: "CE Shasha 2"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceorisunbare1",
        label: "CE Orisunbare 1"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceorisunbare2",
        label: "CE Orisunbare 2"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceorisunbare3",
        label: "CE Orisunbare 3"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceatan",
        label: "CE Atan"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceifelodun",
        label: "CE Ifelodun"
    },
    {
        zone_id: "lz2",
        group_id: "festacgroup",
        value: "ce112road",
        label: "CE 112 Road"
    },
    {
        zone_id: "lz2",
        group_id: "festacgroup",
        value: "cefestac1",
        label: "CE FESTAC 1"
    },
    {
        zone_id: "lz2",
        group_id: "festacgroup",
        value: "ce322road",
        label: "CE 322 ROAD"
    },
    {
        zone_id: "lz2",
        group_id: "festacgroup",
        value: "ce3rdavenue",
        label: "CE 3rd Avenue"
    },
    {
        zone_id: "lz2",
        group_id: "festacgroup",
        value: "ce6thavenue",
        label: "CE 6th Avenue"
    },
    {
        zone_id: "lz2",
        group_id: "festacgroup",
        value: "ce2ndavenue",
        label: "CE 2nd Avenue"
    },
    {
        zone_id: "lz2",
        group_id: "festacgroup",
        value: "ce512road",
        label: "CE 512 Road"
    },
    {
        zone_id: "lz2",
        group_id: "festacgroup",
        value: "ce721road",
        label: "CE 721 Road"
    },
    {
        zone_id: "lz2",
        group_id: "festacgroup",
        value: "cegracechurch",
        label: "CE Grace Church"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceipaja",
        label: "CE Ipaja"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceaiyetoro",
        label: "CE Aiyetoro"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceokeodo2",
        label: "CE Okeodo 2"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ce11road",
        label: "CE 11 Road"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "cealimosho",
        label: "CE Alimosho"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceikola",
        label: "CE Ikola"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceajasa",
        label: "CE Ajasa"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceiyanaipaja",
        label: "CE Iyanaipaja"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceshagari",
        label: "CE Shagari"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceshagari2",
        label: "CE Shagari2"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "celafenwa",
        label: "CE Lafenwa"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceokeodo",
        label: "CE Okeodo"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "cemosan",
        label: "CE Mosan"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceshagari3",
        label: "CE Shagari3"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "celafenwa2",
        label: "CE Lafenwa2"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "cegowon",
        label: "CE Gowon"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "cegowon2",
        label: "CE Gowon2"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "cecommand",
        label: "CE Command"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceabesan",
        label: "CE Abesan"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceikola2",
        label: "CE Ikola2"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceaboruchurch",
        label: "CE Aboru church"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "ceolojede",
        label: "CE Olojede"
    },
    {
        zone_id: "ibz1",
        group_id: "bodijagroup",
        value: "cebodija",
        label: "CE BODIJA"
    },
    {
        zone_id: "ibz1",
        group_id: "bodijagroup",
        value: "cebodijayouthchurch",
        label: "CE BODIJA YOUTH CHURCH"
    },
    {
        zone_id: "ibz1",
        group_id: "bodijagroup",
        value: "cebodijayorubachurch",
        label: "CE BODIJA YORUBA CHURCH"
    },
    {
        zone_id: "ibz1",
        group_id: "bodijagroup",
        value: "cesango",
        label: "CE SANGO "
    },
    {
        zone_id: "ibz1",
        group_id: "bodijagroup",
        value: "cemapo",
        label: "CE MAPO"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "ceejigbo1",
        label: "ceejigbo1"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "ceejigbo2",
        label: "ceejigbo2"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "cebucknor",
        label: "cebucknor"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "ceorilowo",
        label: "ceorilowo"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "ceilepo",
        label: "ceilepo"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "ceoboye",
        label: "ceoboye"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "ceomiyale",
        label: "ceomiyale"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "ceokeafa",
        label: "ceokeafa"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "cejakande",
        label: "cejakande"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "cejakande2",
        label: "cejakande2"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "cennpc",
        label: "cennpc"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "ceapata2",
        label: "ceapata2"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "ceflourishing",
        label: "ceflourishing"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "ceashaimancommunity22",
        label: "CE ASHAIMAN COMMUNITY  22"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cemodelch",
        label: "cemodelch"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "ceapataejigbo",
        label: "ceapataejigbo"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "celafenwaejigbo",
        label: "celafenwaejigbo"
    },
    {
        zone_id: "lz2",
        group_id: "estategroup",
        value: "ce7thavenue",
        label: "ce7thavenue"
    },
    {
        zone_id: "lz2",
        group_id: "estategroup",
        value: "ce22road",
        label: "ce22road"
    },
    {
        zone_id: "lz2",
        group_id: "estategroup",
        value: "ce4thavenue",
        label: "ce4thavenue"
    },
    {
        zone_id: "lz2",
        group_id: "estategroup",
        value: "cecavera",
        label: "cecavera"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceajangbadi1",
        label: "ceajangbadi1"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceilufe",
        label: "ceilufe"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceilogbo",
        label: "ceilogbo"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceajakandeajangbadi",
        label: "ceajakandeajangbadi"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceilogb02",
        label: "ceilogb02"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceayetoro",
        label: "ceayetoro"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceitire",
        label: "ceitire"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceshibiri",
        label: "ceshibiri"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceimude",
        label: "ceimude"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceokeagbo",
        label: "ceokeagbo"
    },
    {
        zone_id: "lz2",
        group_id: "ajangbadigroup",
        value: "ceigbede",
        label: "ceigbede"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "ceabaranjegroup",
        label: "ceabaranjegroup"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "ceabaranje2",
        label: "ceabaranje2"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "ceshalomshalom",
        label: "ceshalomshalom"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "cenewigando",
        label: "cenewigando"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "ceatanabaranje",
        label: "ceatanabaranje"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "ceabundancegrace",
        label: "ceabundancegrace"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "cebetterlife",
        label: "cebetterlife"
    },
    {
        zone_id: "lz2",
        group_id: "afromedia",
        value: "ceafromedia",
        label: "ceafromedia"
    },
    {
        zone_id: "lz2",
        group_id: "afromedia",
        value: "ceera1",
        label: "ceera1"
    },
    {
        zone_id: "lz2",
        group_id: "afromedia",
        value: "ceera2",
        label: "ceera2"
    },
    {
        zone_id: "lz2",
        group_id: "afromedia",
        value: "cemorogbo",
        label: "cemorogbo"
    },
    {
        zone_id: "lz2",
        group_id: "afromedia",
        value: "ceagbara",
        label: "ceagbara"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cemodel-church",
        label: "CE Model-church"
    },
    {
        zone_id: "lz2",
        group_id: "afromedia",
        value: "celusada",
        label: "celusada"
    },
    {
        zone_id: "lz2",
        group_id: "afromedia",
        value: "ceadaloko",
        label: "ceadaloko"
    },
    {
        zone_id: "lz2",
        group_id: "afromedia",
        value: "cealemu",
        label: "cealemu"
    },
    {
        zone_id: "lz2",
        group_id: "afromedia",
        value: "ceroyalestate",
        label: "ceroyalestate"
    },
    {
        zone_id: "lz2",
        group_id: "afromedia",
        value: "ceelegba",
        label: "ceelegba"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cecanalestate",
        label: "CE Canal estate"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cegodmon3",
        label: "CE Godmon3"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceisheri1",
        label: "ceisheri1"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceisheri2",
        label: "ceisheri2"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "celanre",
        label: "celanre"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceisheri4",
        label: "ceisheri4"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "cepipeline1a",
        label: "cepipeline1a"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "cepipeline1b",
        label: "cepipeline1b"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "cepipeline3",
        label: "cepipeline3"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "cegracearena",
        label: "cegracearena"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "cepipeline2",
        label: "cepipeline2"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceidimu1",
        label: "ceidimu1"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceidimu3",
        label: "ceidimu3"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceegbeda",
        label: "ceegbeda"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "cefortress",
        label: "cefortress"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceigando",
        label: "ceigando"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceigando2",
        label: "ceigando2"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceigando3",
        label: "ceigando3"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceigando5",
        label: "ceigando5"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceigando6",
        label: "ceigando6"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceflourisharena",
        label: "ceflourisharena"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "cegraceville1",
        label: "cegraceville1"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "cegraceville2",
        label: "cegraceville2"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceolowonla",
        label: "ceolowonla"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "cegloryland1",
        label: "cegloryland1"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "cegloryland2",
        label: "cegloryland2"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceorisunbarecentral",
        label: "ceorisunbarecentral"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "cemiraclecenter",
        label: "cemiraclecenter"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "cerhemacenter",
        label: "cerhemacenter"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceegbe3",
        label: "ceegbe3"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceisherioluwa",
        label: "ceisherioluwa"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceauxanocenter",
        label: "ceauxanocenter"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "cespringcenter",
        label: "cespringcenter"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceegbe1",
        label: "ceegbe1"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "celiasuroad",
        label: "celiasuroad"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceegbe5",
        label: "ceegbe5"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "cefirejunction",
        label: "cefirejunction"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceijedodo1",
        label: "ceijedodo1"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceijedodo2",
        label: "ceijedodo2"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceijedodo3",
        label: "ceijedodo3"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceegbe2",
        label: "ceegbe2"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceabundancegraceegbe",
        label: "ceabundancegraceegbe"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceflourishingegbe",
        label: "ceflourishingegbe"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "ceijagemo1",
        label: "ceijagemo1"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceijagemo1egbe",
        label: "ceijagemo1egbe"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "ceijagemo2",
        label: "ceijagemo2"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceikotun",
        label: "ceikotun"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cecouncilenvirons",
        label: "cecouncilenvirons"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceayanwale",
        label: "ceayanwale"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceforetaste",
        label: "ceforetaste"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceegan1",
        label: "ceegan1"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceigandoikotun",
        label: "ceigandoikotun"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceolorunfemi",
        label: "ceolorunfemi"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cesuccessarena",
        label: "cesuccessarena"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceikotun2",
        label: "ceikotun2"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceijegun",
        label: "ceijegun"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cecentral",
        label: "cecentral"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceisutiroad",
        label: "ceisutiroad"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cefagbile",
        label: "cefagbile"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cewhitehouse",
        label: "cewhitehouse"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceoja",
        label: "ceoja"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cetijani",
        label: "cetijani"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cegovernorroad",
        label: "cegovernorroad"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cegracelandikotun",
        label: "cegracelandikotun"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cehigherlife",
        label: "cehigherlife"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cecustom",
        label: "cecustom"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cealake",
        label: "cealake"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ce12acres",
        label: "ce12acres"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "ceradiance",
        label: "ceradiance"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cevictoryland",
        label: "cevictoryland"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceijanikin",
        label: "ceijanikin"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceiba1",
        label: "ceiba1"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceobadore",
        label: "ceobadore"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceakesan",
        label: "ceakesan"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceararomi",
        label: "ceararomi"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceararomiibaijanikin",
        label: "ceararomiibaijanikin"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "cemebamu1",
        label: "cemebamu1"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceketu",
        label: "ceketu"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceiba2",
        label: "ceiba2"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceisashi1",
        label: "ceisashi1"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceisashi2",
        label: "ceisashi2"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceibatown",
        label: "ceibatown"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceibaestate",
        label: "ceibaestate"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceiba3",
        label: "ceiba3"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "cejoyhill",
        label: "cejoyhill"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "cegraceful",
        label: "cegraceful"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "cejoyspring",
        label: "cejoyspring"
    },
    {
        zone_id: "lz2",
        group_id: "ibaijanikingroup",
        value: "ceadolf",
        label: "ceadolf"
    },
    {
        zone_id: "lz2",
        group_id: "isolo2group",
        value: "cebelloroad",
        label: "cebelloroad"
    },
    {
        zone_id: "lz2",
        group_id: "isolo2group",
        value: "ceajose",
        label: "ceajose"
    },
    {
        zone_id: "lz2",
        group_id: "isolo2group",
        value: "ceokomala",
        label: "ceokomala"
    },
    {
        zone_id: "lz2",
        group_id: "isolo2group",
        value: "ceararomiisolo2",
        label: "ceararomiisolo2"
    },
    {
        zone_id: "lz2",
        group_id: "isolo2group",
        value: "cebelloroadext2",
        label: "cebelloroadext2"
    },
    {
        zone_id: "lz2",
        group_id: "isolo2group",
        value: "ceamazingville",
        label: "ceamazingville"
    },
    {
        zone_id: "lz2",
        group_id: "okokogroup",
        value: "ceokoko",
        label: "ceokoko"
    },
    {
        zone_id: "lz2",
        group_id: "okokogroup",
        value: "cekembiri",
        label: "cekembiri"
    },
    {
        zone_id: "lz2",
        group_id: "okokogroup",
        value: "ceigboelerin",
        label: "ceigboelerin"
    },
    {
        zone_id: "lz2",
        group_id: "okokogroup",
        value: "cefirstgate",
        label: "cefirstgate"
    },
    {
        zone_id: "lz2",
        group_id: "okokogroup",
        value: "cecassidy",
        label: "cecassidy"
    },
    {
        zone_id: "lz2",
        group_id: "okokogroup",
        value: "ceexpress",
        label: "ceexpress"
    },
    {
        zone_id: "lz2",
        group_id: "okokogroup",
        value: "celivingwaters",
        label: "celivingwaters"
    },
    {
        zone_id: "lz2",
        group_id: "okokogroup",
        value: "ceokanran",
        label: "ceokanran"
    },
    {
        zone_id: "lz2",
        group_id: "okokogroup",
        value: "ceashake",
        label: "ceashake"
    },
    {
        zone_id: "lz2",
        group_id: "newojogroup",
        value: "ceojobarracks",
        label: "ceojobarracks"
    },
    {
        zone_id: "lz2",
        group_id: "newojogroup",
        value: "ceojoalaba1",
        label: "ceojoalaba1"
    },
    {
        zone_id: "lz2",
        group_id: "newojogroup",
        value: "cevolks",
        label: "cevolks"
    },
    {
        zone_id: "lz2",
        group_id: "newojogroup",
        value: "ceojoalaba2",
        label: "ceojoalaba2"
    },
    {
        zone_id: "lz2",
        group_id: "newojogroup",
        value: "cesunnyvillealaba",
        label: "cesunnyvillealaba"
    },
    {
        zone_id: "lz2",
        group_id: "newojogroup",
        value: "ceararomialaba",
        label: "ceararomialaba"
    },
    {
        zone_id: "lz2",
        group_id: "newojogroup",
        value: "cevolks2",
        label: "cevolks2"
    },
    {
        zone_id: "lz2",
        group_id: "newojogroup",
        value: "cetedi",
        label: "cetedi"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cefestaclink2",
        label: "cefestaclink2"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cedivineestate",
        label: "cedivineestate"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "celakeview",
        label: "celakeview"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cevictoryhill",
        label: "cevictoryhill"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cegreenfield",
        label: "cegreenfield"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cecentury",
        label: "cecentury"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cetaredroad",
        label: "cetaredroad"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cecommunity2",
        label: "cecommunity2"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "ceokota4",
        label: "ceokota4"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "ceokota5",
        label: "ceokota5"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cebadagry",
        label: "cebadagry"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceigborosun",
        label: "ceigborosun"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cemagbon1",
        label: "cemagbon1"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceroyale",
        label: "ceroyale"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cetopo",
        label: "cetopo"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cedelight",
        label: "cedelight"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceshinninglight",
        label: "ceshinninglight"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cegloryland",
        label: "cegloryland"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cefaithcenter",
        label: "cefaithcenter"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "celifefoundation",
        label: "celifefoundation"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cewisdomville",
        label: "cewisdomville"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cebrighterlight",
        label: "cebrighterlight"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceimpactcenter",
        label: "ceimpactcenter"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cepeculiarcenter",
        label: "cepeculiarcenter"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceambassador",
        label: "ceambassador"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceprogressive",
        label: "ceprogressive"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceexcellencecenter",
        label: "ceexcellencecenter"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cecentralchurch2",
        label: "cecentralchurch2"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cefrenchvillage",
        label: "cefrenchvillage"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cegracecentre",
        label: "cegracecentre"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "cecentralchurch1",
        label: "cecentralchurch1"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceegunlanguagechurch",
        label: "ceegunlanguagechurch"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceatekun",
        label: "ceatekun"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceagunmo",
        label: "ceagunmo"
    },
    {
        zone_id: "phz1",
        group_id: "ceexcellentgroup",
        value: "ceblossomchurch",
        label: "CE Blossom Church"
    },
    {
        zone_id: "phz1",
        group_id: "ceexcellentgroup",
        value: "ceglorychurch",
        label: "CE Glory Church"
    },
    {
        zone_id: "phz1",
        group_id: "ceexcellentgroup",
        value: "cevictoryplace",
        label: "CE Victory Place"
    },
    {
        zone_id: "phz1",
        group_id: "ceexcellentgroup",
        value: "celighthouse",
        label: "CE Light House"
    },
    {
        zone_id: "phz1",
        group_id: "ceexcellentgroup",
        value: "cegracearenaeg",
        label: "CE Grace Arena EG"
    },
    {
        zone_id: "phz1",
        group_id: "ceexcellentgroup",
        value: "cemagnificentchurch",
        label: "CE Magnificent Church"
    },
    {
        zone_id: "phz1",
        group_id: "ceexcellentgroup",
        value: "cepeaceplace",
        label: "CE Peace Place"
    },
    {
        zone_id: "accraz",
        group_id: "laagroup",
        value: "ceaccraonlinechurch",
        label: "ceaccraonlinechurch"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "celafia",
        label: "celafia"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "ceakwanga",
        label: "ceakwanga"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "ceuacroad",
        label: "ceuacroad"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "cedoma",
        label: "cedoma"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "cekeffi",
        label: "cekeffi"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "cenatlsupply",
        label: "cenatlsupply"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "ceombi2",
        label: "ceombi2"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "cenass",
        label: "cenass"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "cebukansidi",
        label: "cebukansidi"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "ceshinge",
        label: "ceshinge"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cekingston",
        label: "cekingston"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cenewkingston",
        label: "cenewkingston"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "ceharkershall",
        label: "ceharkershall"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cecuracao1",
        label: "cecuracao1"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cestkittsandnevis",
        label: "cestkittsandnevis"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cetrinidadandtobago",
        label: "cetrinidadandtobago"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cehaiti",
        label: "cehaiti"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cegrenada",
        label: "cegrenada"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cebelize",
        label: "cebelize"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cebahamas",
        label: "cebahamas"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cemontegobay",
        label: "cemontegobay"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cesangre",
        label: "cesangre"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cecouva",
        label: "cecouva"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cediegomartin",
        label: "cediegomartin"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cearouca",
        label: "cearouca"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "celibya",
        label: "celibya"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cesanrafael",
        label: "cesanrafael"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cesantacruz",
        label: "cesantacruz"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cearouca2",
        label: "cearouca2"
    },
    {
        zone_id: "lz2",
        group_id: "intlmissionsgroup",
        value: "cecuba1",
        label: "cecuba1"
    },
    {
        zone_id: "phz1",
        group_id: "cecitycentergroup",
        value: "cevictoriousplace",
        label: "CE VICTORIOUS PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cecitycentergroup",
        value: "cegloriousplace",
        label: "CE GLORIOUS PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cegphgroup",
        value: "cefavourhouse",
        label: "CE Favour house"
    },
    {
        zone_id: "phz1",
        group_id: "cegphgroup",
        value: "cesupernaturalplace",
        label: "CE Supernatural place"
    },
    {
        zone_id: "phz1",
        group_id: "cegphgroup",
        value: "cearmyrange",
        label: "CE Armyrange"
    },
    {
        zone_id: "phz1",
        group_id: "cegphgroup",
        value: "celighthouseetche",
        label: "CE Light house etche"
    },
    {
        zone_id: "phz1",
        group_id: "cegphgroup",
        value: "ceperfectplace",
        label: "CE Perfect place"
    },
    {
        zone_id: "phz1",
        group_id: "cegphgroup",
        value: "cefruitfulplace",
        label: "CE Fruitful place"
    },
    {
        zone_id: "phz1",
        group_id: "cecitycentergroup",
        value: "ceprevailingplace",
        label: "CE PREVAILING PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cegphgroup",
        value: "cetransformationplace",
        label: "CE Transformation place"
    },
    {
        zone_id: "phz1",
        group_id: "cegphgroup",
        value: "ceomarelu",
        label: "CE Omarelu"
    },
    {
        zone_id: "phz1",
        group_id: "cecitycentergroup",
        value: "cekingingplace",
        label: "CE KINGING PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cecitycentergroup",
        value: "cegreatgraceplace",
        label: "CE GREAT  GRACE PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cecitycentergroup",
        value: "ceprefectplace",
        label: "CE PREFECT PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "cemercycentre",
        label: "CE MERCY CENTRE"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "cethronehouse",
        label: "CE THRONEHOUSE"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "celivingfountain",
        label: "CE LIVINGFOUNTAIN"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "cetestimonyhouse",
        label: "CE TESTIMONYHOUSE"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "cephotizo",
        label: "CE PHOTIZO"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "cealeto",
        label: "CE ALETO"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "ceamazinggrace",
        label: "CE AMAZINGGRACE"
    },
    {
        zone_id: "phz1",
        group_id: "cetriumphantgroup",
        value: "ceroyalplace",
        label: "CE ROYAL PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cedoagroup",
        value: "ceclassicplace",
        label: "CE CLASSIC PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cetriumphantgroup",
        value: "cedominionplace",
        label: "CE DOMINION PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cedoagroup",
        value: "cebeautifulplace",
        label: "CE BEAUTIFUL PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cegreaterlightsubgroup",
        value: "cegreaterlight",
        label: "CE GREATER LIGHT"
    },
    {
        zone_id: "phz1",
        group_id: "cegreaterlightsubgroup",
        value: "ceglorypalace",
        label: "CE GLORY PALACE"
    },
    {
        zone_id: "phz1",
        group_id: "cegreaterlightsubgroup",
        value: "cephronesis",
        label: "CE PHRONESIS"
    },
    {
        zone_id: "phz1",
        group_id: "cedoagroup",
        value: "cepreparationplace",
        label: "CE PREPARATION PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cegreaterlightsubgroup",
        value: "cevictoryarena",
        label: "CE VICTORY ARENA"
    },
    {
        zone_id: "phz1",
        group_id: "cegreaterlightsubgroup",
        value: "cekingspalace",
        label: "CE KINGS PALACE"
    },
    {
        zone_id: "phz1",
        group_id: "cedoagroup",
        value: "cemegaplace",
        label: "CE MEGA PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cetriumphantgroup",
        value: "cegracedplace",
        label: "CE GRACED PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cedoagroup",
        value: "ceextravagantgraceplace",
        label: "CE EXTRAVAGANT GRACE PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "cegracearenabg",
        label: "CE GRACE ARENA BG"
    },
    {
        zone_id: "phz1",
        group_id: "cegreaterlightsubgroup",
        value: "ceperfectionplace",
        label: "CE PERFECTION PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cegreaterlightsubgroup",
        value: "celights",
        label: "CE LIGHTS"
    },
    {
        zone_id: "phz1",
        group_id: "cecitycentergroup",
        value: "cewealthyplace",
        label: "CE WEALTHY PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "cegloryhouse",
        label: "CE GLORY HOUSE"
    },
    {
        zone_id: "phz1",
        group_id: "cedoagroup",
        value: "cezoeplace",
        label: "CE ZOE PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "pastoramaechiudeaku",
        label: "PASTOR AMAECHI UDEAKU"
    },
    {
        zone_id: "phz1",
        group_id: "cetriumphantgroup",
        value: "ceagapeplace",
        label: "CE AGAPE PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "cecedarchurch",
        label: "CE CEDAR CHURCH"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "cezoechurch",
        label: "CE ZOE CHURCH"
    },
    {
        zone_id: "phz1",
        group_id: "cetriumphantgroup",
        value: "cetriumphantplace",
        label: "CE TRIUMPHANT PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "ceauxano",
        label: "CE AUXANO"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "ceteens\/youthchurch",
        label: "CE TEENS\/YOUTH CHURCH"
    },
    {
        zone_id: "phz1",
        group_id: "cetriumphantgroup",
        value: "cekingingplacetg",
        label: "CE KINGING PLACE TG"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "superchurch",
        label: "SUPER CHURCH"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "ceabundantchurch",
        label: "CE ABUNDANT CHURCH"
    },
    {
        zone_id: "phz1",
        group_id: "cetriumphantgroup",
        value: "cerhemaplace",
        label: "CE RHEMA PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "cedoagroup",
        value: "cefruitfulvine",
        label: "CE FRUITFUL VINE"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "cebgalimini",
        label: "CE BG ALIMINI"
    },
    {
        zone_id: "phz1",
        group_id: "cedoagroup",
        value: "cedoxachurch",
        label: "CE DOXA CHURCH"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "ceelite",
        label: "CE ELITE"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "cephenomenalplace",
        label: "CE PHENOMENAL PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgracegroup",
        value: "cebgx",
        label: "CE BGX"
    },
    {
        zone_id: "phz1",
        group_id: "cedoagroup",
        value: "ceyouthaflame",
        label: "CE YOUTH AFLAME"
    },
    {
        zone_id: "phz1",
        group_id: "ceoyigbogroup",
        value: "cecelebration",
        label: "CE CELEBRATION"
    },
    {
        zone_id: "phz1",
        group_id: "ceoyigbogroup",
        value: "cezion",
        label: "CE ZION"
    },
    {
        zone_id: "phz1",
        group_id: "ceoyigbogroup",
        value: "ceoyigbomodel",
        label: "CE OYIGBO MODEL"
    },
    {
        zone_id: "phz1",
        group_id: "ceoyigbogroup",
        value: "cegracearenaoyigbo",
        label: "CE GRACE ARENA OYIGBO"
    },
    {
        zone_id: "phz1",
        group_id: "ceoyigbogroup",
        value: "cefaitharenaoyigbo",
        label: "CE FAITH ARENA OYIGBO"
    },
    {
        zone_id: "phz1",
        group_id: "ceoyigbogroup",
        value: "cesuper",
        label: "CE SUPER"
    },
    {
        zone_id: "phz1",
        group_id: "ceoyigbogroup",
        value: "ceheritageplace",
        label: "CE HERITAGE PLACE"
    },
    {
        zone_id: "phz1",
        group_id: "ceoyigbogroup",
        value: "ceroyalplaceoyigbo",
        label: "CE ROYAL PLACE OYIGBO"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "cegod'slove",
        label: "CE GOD'SLOVE"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgrace2group",
        value: "ceevergreen",
        label: "CE Evergreen"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgrace2group",
        value: "cekinging",
        label: "CE KINGING "
    },
    {
        zone_id: "lwsaza",
        group_id: "johannesburgcentral",
        value: "blwuniversityofjohannesburgapb",
        label: "BLW University of Johannesburg APB"
    },
    {
        zone_id: "lwsaza",
        group_id: "johannesburgcentral",
        value: "blwuniversityofjohannesburgdfc",
        label: "BLW University of Johannesburg DFC"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgrace2group",
        value: "cealuu",
        label: "CE Aluu"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgrace2group",
        value: "ceetech",
        label: "CE Etech"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgrace2group",
        value: "ceetche",
        label: "CE Etche"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgrace2group",
        value: "cekinging2",
        label: "CE Kinging 2"
    },
    {
        zone_id: "phz1",
        group_id: "ceboundlessgrace2group",
        value: "cechoba",
        label: "CE Choba"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "ceupperroom",
        label: "CE UPPER ROOM"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "ceexponetialgrace",
        label: "CE EXPONETIAL GRACE"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "ceillumination",
        label: "CE ILLUMINATION"
    },
    {
        zone_id: "ewcvz5",
        group_id: "temagroup",
        value: "ceelitechurch",
        label: "CE ELITE CHURCH"
    },
    {
        zone_id: "ewcvz5",
        group_id: "cenunguagroup",
        value: "cekingstownchurch",
        label: "Ce Kingstown church"
    },
    {
        zone_id: "ewcvz5",
        group_id: "cenunguagroup",
        value: "temanewtown",
        label: "Tema New Town"
    },
    {
        zone_id: "ewcvz5",
        group_id: "eastlegongroup",
        value: "cebaatsonachurch",
        label: "CE Baatsona church"
    },
    {
        zone_id: "ewcvz5",
        group_id: "triumphantgroup",
        value: "cetechiman.",
        label: "CE TECHIMAN."
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "cesaltpond",
        label: "cesaltpond"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "ceafienya",
        label: "CE afienya"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "cetamale1",
        label: "CE TAMALE1"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "cetamalez2",
        label: "CE TAMALEZ2"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "ceashaimannewtown",
        label: "CE Ashaiman Newtown"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceheidelberg",
        label: "CE Heidelberg"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cechiawelo",
        label: "CE Chiawelo"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceedenvale",
        label: "CE Edenvale"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cerivonia",
        label: "CE Rivonia"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cedobsonville",
        label: "CE Dobsonville"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cerabieridge",
        label: "CE Rabie Ridge"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceivorypark",
        label: "CE Ivory Park"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceprimrose",
        label: "CE Primrose"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceelandsfontein",
        label: "CE Elandsfontein"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceembelehle",
        label: "CE Embelehle"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cesandtoncity",
        label: "CE Sandton City"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cevereeninging",
        label: "CE Vereeninging"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cesangiro",
        label: "CE Sangiro"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cemidrandgc",
        label: "CE Midrand  GC"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cediepsloot",
        label: "CE Diepsloot"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cewindsor",
        label: "CE Windsor"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cejoburgcbd",
        label: "CE Joburg CBD"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cecosmocitycentral",
        label: "CE Cosmo City Central"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cehoneydew",
        label: "CE Honey Dew"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceermelo",
        label: "CE Ermelo"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceruimsig",
        label: "CE Ruimsig"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cejabulani",
        label: "CE Jabulani"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cealex",
        label: "CE Alex"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cecosmocity",
        label: "CE Cosmo City"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "ceashaimancity",
        label: "CE Ashaiman city"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "cemiddleeast",
        label: "CE Middle East"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "ceattadeka",
        label: "CE Attadeka"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cesouth",
        label: "CE SOUTH"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "cesege",
        label: "CESege"
    },
    {
        zone_id: "phz1",
        group_id: "ceofggroup",
        value: "ceoverflowinggraceplace",
        label: "CE OVERFLOWING GRACE PLACE"
    },
    {
        zone_id: "torz",
        group_id: "calgarygroup",
        value: "ceairdrie",
        label: "CE AIRDRIE"
    },
    {
        zone_id: "torz",
        group_id: "calgarygroup",
        value: "cecalgarynw",
        label: "CE CALGARY NW"
    },
    {
        zone_id: "torz",
        group_id: "calgarygroup",
        value: "cecalgaryse",
        label: "CE CALGARY SE"
    },
    {
        zone_id: "torz",
        group_id: "calgarygroup",
        value: "cecochraine",
        label: "CE COCHRAINE"
    },
    {
        zone_id: "lz2",
        group_id: "isolo1group",
        value: "cemile2ext2",
        label: "cemile2ext2"
    },
    {
        zone_id: "phz1",
        group_id: "cemimishacksubgroup",
        value: "cerichchurch",
        label: "CE Rich Church"
    },
    {
        zone_id: "phz1",
        group_id: "cemimishacksubgroup",
        value: "cegracecenterbori",
        label: "CE Grace Center Bori"
    },
    {
        zone_id: "phz1",
        group_id: "cemimishacksubgroup",
        value: "cegracelandbeeri",
        label: "CE Grace Land Beeri"
    },
    {
        zone_id: "phz1",
        group_id: "cemimishacksubgroup",
        value: "cepraisearenaseme",
        label: "CE Praise Arena Seme"
    },
    {
        zone_id: "phz1",
        group_id: "cemimishacksubgroup",
        value: "ceglorylandbodo",
        label: "CE Gloryland Bodo"
    },
    {
        zone_id: "accraz",
        group_id: "akimodagroup",
        value: "cemampong",
        label: "CE MAMPONG"
    },
    {
        zone_id: "accraz",
        group_id: "akimodagroup",
        value: "ceasikuma",
        label: "CE ASIKUMA"
    },
    {
        zone_id: "accraz",
        group_id: "akimodagroup",
        value: "ceoldtown",
        label: "CE OLD TOWN"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "ceportelizabeth1",
        label: "CE Port Elizabeth 1"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "ceportelizabeth2",
        label: "CE Port Elizabeth 2"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cenewbrighton1",
        label: "CE New Brighton 1"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cenewbrighton2",
        label: "CE New Brighton 2"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cewellsestate",
        label: "CE Wells Estate"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cemotherwell1",
        label: "CE Motherwell 1"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cemotherwell2",
        label: "CE Motherwell 2"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cemotherwell3",
        label: "CE Motherwell 3"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cejeffreysbay",
        label: "CE Jeffreys Bay"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cekorsten",
        label: "CE Korsten"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "ceuitenhage1",
        label: "CE Uitenhage 1"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "ceuitenhage2",
        label: "CE Uitenhage 2"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cecradock",
        label: "CE Cradock"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cegrahamstown",
        label: "CE Grahamstown"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "ceportalfred",
        label: "CE Port Alfred"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cekwazakhele",
        label: "CE Kwazakhele"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cewalmer",
        label: "CE Walmer"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cekwadwesi",
        label: "CE Kwadwesi"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cefairview",
        label: "CE Fairview"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cedespatch",
        label: "CE Despatch"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cemosselbay",
        label: "CE Mossel Bay"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cealexandria",
        label: "CE Alexandria"
    },
    {
        zone_id: "qubebs",
        group_id: "qubwebs1",
        value: "sub1",
        label: "SUB1"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "christembassyairportcityyouthchurch2",
        label: "CHRIST EMBASSY AIRPORT CITY YOUTH CHURCH 2"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceembassyloveyouthchurch",
        label: "CE EMBASSY LOVE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "celoveyouthchurch",
        label: "CE LOVE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cemodelyouthchurch3",
        label: "CE MODEL YOUTH CHURCH 3"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceaccracentralyouthchurch",
        label: "CE ACCRA CENTRAL YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cemegayouthchurch",
        label: "CE MEGA YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cearcyouthchurch",
        label: "CE ARC YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "celegonyouthchurch",
        label: "CE LEGON YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceapexyouthchurch",
        label: "CE APEX YOUTH CHURCH"
    },
    {
        zone_id: "midwestz",
        group_id: "ceekpan-realgroup",
        value: "ceekpanreal",
        label: "CE Ekpan Real"
    },
    {
        zone_id: "midwestz",
        group_id: "ceekpan-realgroup",
        value: "cenewlayoutchurch",
        label: "CE New Layout Church"
    },
    {
        zone_id: "midwestz",
        group_id: "ceekpan-realgroup",
        value: "cedeco",
        label: "CE Deco"
    },
    {
        zone_id: "midwestz",
        group_id: "ceekpan-realgroup",
        value: "ceekpan2",
        label: "CE Ekpan2"
    },
    {
        zone_id: "midwestz",
        group_id: "ceekpan-realgroup",
        value: "cedunamiscity",
        label: "CE Dunamis City"
    },
    {
        zone_id: "midwestz",
        group_id: "ceekpan-realgroup",
        value: "ceestate",
        label: "CE Estate"
    },
    {
        zone_id: "midwestz",
        group_id: "ceekpan-realgroup",
        value: "cebarracks",
        label: "CE Barracks"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cejoyfulyouthchurch",
        label: "CE JOYFUL YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceabelemkpeyouthchurch",
        label: "CE ABELEMKPE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceroyaltiesyouthchurch",
        label: "CE ROYALTIES YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceeastlegonyouthchurch",
        label: "CE EAST LEGON YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cezoeyouthchurch",
        label: "CE ZOE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cemodelyouthchurch2",
        label: "CE MODEL YOUTH CHURCH 2"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cecharisyouthchurch",
        label: "CE CHARIS YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cestarsyouthchurch",
        label: "CE STARS YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "celapazyouthchurch",
        label: "CE LAPAZ YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceempoweringyouthchurch",
        label: "CE EMPOWERING YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "celapazmegayouthchurch",
        label: "CE LAPAZ MEGA YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceconsummateyouthchurch",
        label: "CE  CONSUMMATE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cedansomanyouthchurch",
        label: "CE DANSOMAN YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceelevateyouthchurch",
        label: "CE ELEVATE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cenewcreationyouthchurch",
        label: "CE NEW CREATION YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceashongmanestateyouthchurch",
        label: "CE ASHONGMAN ESTATE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cemarvelyouthchurch",
        label: "CE MARVEL YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceroyaltieskumasiyouthchurch",
        label: "CE ROYALTIES KUMASI YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cegracestationyouthchurch",
        label: "CE GRACE STATION YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cekingklassyouthchurch",
        label: "CE KINGKLASS YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceosueliteyouthchurch",
        label: "CE OSU ELITE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cedoxayouthchurch",
        label: "CE DOXA YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "celabadicantonmentyouthchurch",
        label: "CE LABADI CANTONMENT YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cehaatsoyouthchurch",
        label: "CE HAATSO YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cegraceyouthchurch",
        label: "CE GRACE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceexecutiveyouthchurch",
        label: "CE EXECUTIVE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "celightcityyouthchurch",
        label: "CE LIGHT CITY YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cemathaekoyouthchurch",
        label: "CE MATHAEKO YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cegreatlightyouthchurch",
        label: "CE GREAT LIGHT YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceakatsiyouthchurch",
        label: "CE AKATSI YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cekibiyouthchurch",
        label: "CE KIBI YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceimpactyouthchurch",
        label: "CE IMPACT YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "celakesideyouthchurch",
        label: "CE LAKESIDE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "ceashaimanyouthchurch",
        label: "CE ASHAIMAN YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cekorlegonnoyouthchurch",
        label: "CE KORLE GONNO YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cegyineaseyouthchurch",
        label: "CE GYINEASE YOUTH CHURCH"
    },
    {
        zone_id: "accraz",
        group_id: "youthchurchesgroup",
        value: "cehigherlifeyouthchurch",
        label: "CE HIGHER LIFE YOUTH CHURCH"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "cebashorun",
        label: "cebashorun"
    },
    {
        zone_id: "midwestz",
        group_id: "cebowengroup",
        value: "cebowen",
        label: "CE Bowen"
    },
    {
        zone_id: "midwestz",
        group_id: "cebowengroup",
        value: "ceitsekiri",
        label: "CE Itsekiri"
    },
    {
        zone_id: "midwestz",
        group_id: "cebowengroup",
        value: "ceavenuemodel",
        label: "CE Avenue Model"
    },
    {
        zone_id: "midwestz",
        group_id: "cebowengroup",
        value: "cegrachurch",
        label: "CE GRA Church"
    },
    {
        zone_id: "midwestz",
        group_id: "cebowengroup",
        value: "cemarinequarters",
        label: "CE Marine Quarters"
    },
    {
        zone_id: "midwestz",
        group_id: "cebowengroup",
        value: "ceokereoki",
        label: "CE Okere Oki"
    },
    {
        zone_id: "midwestz",
        group_id: "cebowengroup",
        value: "ceugbuwangue",
        label: "CE Ugbuwangue"
    },
    {
        zone_id: "midwestz",
        group_id: "cesiluko",
        value: "cesiluko1",
        label: "CE Siluko 1"
    },
    {
        zone_id: "midwestz",
        group_id: "cesiluko",
        value: "cesiluko2",
        label: "CE Siluko 2"
    },
    {
        zone_id: "midwestz",
        group_id: "cesiluko",
        value: "ceiceroad",
        label: "CE Ice Road"
    },
    {
        zone_id: "midwestz",
        group_id: "cesiluko",
        value: "ceuppermission1",
        label: "CE Upper Mission 1"
    },
    {
        zone_id: "midwestz",
        group_id: "cesiluko",
        value: "ceagho",
        label: "CE Agho"
    },
    {
        zone_id: "midwestz",
        group_id: "cesiluko",
        value: "ceuwaifo",
        label: "CE Uwaifo"
    },
    {
        zone_id: "midwestz",
        group_id: "cesiluko",
        value: "cewireroad",
        label: "CE Wire Road"
    },
    {
        zone_id: "midwestz",
        group_id: "cesiluko",
        value: "ceewahroad",
        label: "CE Ewah Road"
    },
    {
        zone_id: "midwestz",
        group_id: "cesiluko",
        value: "ceogheghe",
        label: "CE Ogheghe"
    },
    {
        zone_id: "midwestz",
        group_id: "cesiluko",
        value: "ceihogbe",
        label: "CE Ihogbe"
    },
    {
        zone_id: "midwestz",
        group_id: "cesilukomodelgroup",
        value: "cesilukomodel",
        label: "CE Siluko Model"
    },
    {
        zone_id: "midwestz",
        group_id: "cesilukomodelgroup",
        value: "ceoguola",
        label: "CE Oguola"
    },
    {
        zone_id: "midwestz",
        group_id: "cesilukomodelgroup",
        value: "ceakugbe",
        label: "CE Akugbe"
    },
    {
        zone_id: "midwestz",
        group_id: "cesilukomodelgroup",
        value: "ceoliha",
        label: "CE Oliha"
    },
    {
        zone_id: "midwestz",
        group_id: "cesilukomodelgroup",
        value: "ceerhunmwunse",
        label: "CE Erhunmwunse"
    },
    {
        zone_id: "midwestz",
        group_id: "cesilukomodelgroup",
        value: "ceore-oghene",
        label: "CE Ore-Oghene"
    },
    {
        zone_id: "midwestz",
        group_id: "cesilukomodelgroup",
        value: "ceehenede",
        label: "CE Ehenede"
    },
    {
        zone_id: "midwestz",
        group_id: "cesilukomodelgroup",
        value: "ceuzebu",
        label: "CE Uzebu"
    },
    {
        zone_id: "midwestz",
        group_id: "cesilukomodelgroup",
        value: "ceuseh2",
        label: "CE Useh 2"
    },
    {
        zone_id: "midwestz",
        group_id: "ceugbowogroup",
        value: "ceugbowo1",
        label: "CE Ugbowo 1"
    },
    {
        zone_id: "midwestz",
        group_id: "ceugbowogroup",
        value: "ceugbowo2",
        label: "CE Ugbowo 2"
    },
    {
        zone_id: "midwestz",
        group_id: "ceugbowogroup",
        value: "ceedaiken",
        label: "CE Edaiken"
    },
    {
        zone_id: "midwestz",
        group_id: "ceugbowogroup",
        value: "ceosasogie",
        label: "CE Osasogie"
    },
    {
        zone_id: "midwestz",
        group_id: "ceugbowogroup",
        value: "ceatoe",
        label: "CE Atoe"
    },
    {
        zone_id: "midwestz",
        group_id: "ceugbowogroup",
        value: "ceuselu_ubth",
        label: "CE Uselu_UBTH"
    },
    {
        zone_id: "midwestz",
        group_id: "ceugbowogroup",
        value: "ceuselu_shell",
        label: "CE Uselu_Shell"
    },
    {
        zone_id: "midwestz",
        group_id: "ceolukugroup",
        value: "ceflourishingchurch",
        label: "CE Flourishing Church"
    },
    {
        zone_id: "midwestz",
        group_id: "ceolukugroup",
        value: "ceoluku",
        label: "CE Oluku"
    },
    {
        zone_id: "midwestz",
        group_id: "ceolukugroup",
        value: "ceokhokhuo",
        label: "CE Okhokhuo"
    },
    {
        zone_id: "midwestz",
        group_id: "ceiguosagroup",
        value: "ceiguosa",
        label: "CE Iguosa"
    },
    {
        zone_id: "midwestz",
        group_id: "ceiguosagroup",
        value: "ceevbuomore",
        label: "CE Evbuomore"
    },
    {
        zone_id: "midwestz",
        group_id: "ceiguosagroup",
        value: "cenifor",
        label: "CE NIFOR"
    },
    {
        zone_id: "midwestz",
        group_id: "ceiguosagroup",
        value: "ceisiohor",
        label: "CE Isiohor"
    },
    {
        zone_id: "midwestz",
        group_id: "ceiguosagroup",
        value: "ceiyowa",
        label: "CE Iyowa"
    },
    {
        zone_id: "midwestz",
        group_id: "ceiguosagroup",
        value: "ceazuwa",
        label: "CE Azuwa"
    },
    {
        zone_id: "midwestz",
        group_id: "ceokadagroup",
        value: "ceokada1",
        label: "CE Okada 1"
    },
    {
        zone_id: "midwestz",
        group_id: "ceokadagroup",
        value: "ceokada2",
        label: "CE Okada 2"
    },
    {
        zone_id: "midwestz",
        group_id: "ceokadagroup",
        value: "ceokada3",
        label: "CE Okada 3"
    },
    {
        zone_id: "midwestz",
        group_id: "cenewbeningroup",
        value: "cenewbenin",
        label: "CE New Benin"
    },
    {
        zone_id: "midwestz",
        group_id: "cenewbeningroup",
        value: "ceokhoro",
        label: "CE Okhoro"
    },
    {
        zone_id: "midwestz",
        group_id: "cenewbeningroup",
        value: "celagosstreet",
        label: "CE Lagos Street"
    },
    {
        zone_id: "midwestz",
        group_id: "cenewbeningroup",
        value: "ceuniversal",
        label: "CE Universal"
    },
    {
        zone_id: "midwestz",
        group_id: "cenewbeningroup",
        value: "cemodelupperlawan",
        label: "CE Model Upper Lawan"
    },
    {
        zone_id: "midwestz",
        group_id: "cenewbeningroup",
        value: "ceuppermission2",
        label: "CE Upper Mission 2"
    },
    {
        zone_id: "midwestz",
        group_id: "cetextilemillgroup",
        value: "ceevbareke1",
        label: "CE Evbareke 1"
    },
    {
        zone_id: "midwestz",
        group_id: "cetextilemillgroup",
        value: "ceglee",
        label: "CE Glee"
    },
    {
        zone_id: "midwestz",
        group_id: "cetextilemillgroup",
        value: "ceuwelu1",
        label: "CE Uwelu 1"
    },
    {
        zone_id: "midwestz",
        group_id: "cetextilemillgroup",
        value: "ceiguobazuwa",
        label: "CE Iguobazuwa"
    },
    {
        zone_id: "midwestz",
        group_id: "cetextilemillgroup",
        value: "ceegbaen",
        label: "CE Egbaen"
    },
    {
        zone_id: "midwestz",
        group_id: "cetextilemillgroup",
        value: "ceotote",
        label: "CE Otote"
    },
    {
        zone_id: "midwestz",
        group_id: "cetextilemillgroup",
        value: "ceugo",
        label: "CE Ugo"
    },
    {
        zone_id: "midwestz",
        group_id: "cetextilemillgroup",
        value: "ceokomu",
        label: "CE Okomu"
    },
    {
        zone_id: "midwestz",
        group_id: "cetextilemillgroup",
        value: "ceomomua",
        label: "CE Omomua"
    },
    {
        zone_id: "midwestz",
        group_id: "cetextilemillgroup",
        value: "ceuwelu2",
        label: "CE Uwelu 2"
    },
    {
        zone_id: "midwestz",
        group_id: "ceogidagroup",
        value: "ceegor",
        label: "CE Egor"
    },
    {
        zone_id: "midwestz",
        group_id: "ceogidagroup",
        value: "ceogida1",
        label: "CE Ogida 1"
    },
    {
        zone_id: "midwestz",
        group_id: "ceogidagroup",
        value: "ceuseh",
        label: "CE Useh"
    },
    {
        zone_id: "midwestz",
        group_id: "ceogidagroup",
        value: "ceogida2",
        label: "CE Ogida 2"
    },
    {
        zone_id: "midwestz",
        group_id: "ceogidagroup",
        value: "ceoromiyan",
        label: "CE Oromiyan"
    },
    {
        zone_id: "midwestz",
        group_id: "cemegagroup",
        value: "cemodelchurch_mwz",
        label: "CE Model Church_MWZ"
    },
    {
        zone_id: "midwestz",
        group_id: "cemegagroup",
        value: "cetvroad",
        label: "CE TV Road"
    },
    {
        zone_id: "midwestz",
        group_id: "cemegagroup",
        value: "cekingssquare",
        label: "CE KIngs Square"
    },
    {
        zone_id: "ukvz3",
        group_id: "watfordgroup",
        value: "ceselsdon",
        label: "CE SELSDON"
    },
    {
        zone_id: "ukvz3",
        group_id: "watfordgroup",
        value: "cehastings",
        label: "CE HASTINGS"
    },
    {
        zone_id: "ukvz3",
        group_id: "watfordgroup",
        value: "cewatford",
        label: "CE WATFORD"
    },
    {
        zone_id: "texasz2",
        group_id: "arlingtongroup",
        value: "cearlington1",
        label: "CE Arlington 1"
    },
    {
        zone_id: "texasz2",
        group_id: "arlingtongroup",
        value: "cearlington2",
        label: "CE Arlington 2"
    },
    {
        zone_id: "texasz2",
        group_id: "ohiogroup",
        value: "cecolumbus",
        label: "CE Columbus"
    },
    {
        zone_id: "texasz2",
        group_id: "ohiogroup",
        value: "ceakron",
        label: "CE Akron"
    },
    {
        zone_id: "texasz2",
        group_id: "ohiogroup",
        value: "cecincinnati",
        label: "CE Cincinnati"
    },
    {
        zone_id: "texasz2",
        group_id: "ohiogroup",
        value: "ceoregon",
        label: "CE Oregon"
    },
    {
        zone_id: "texasz2",
        group_id: "ohiogroup",
        value: "cepittsburgh",
        label: "CE Pittsburgh"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "cewhitesand",
        label: "CE Whitesand"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "cekudehinbu",
        label: "CE Kudehinbu"
    },
    {
        zone_id: "lz2",
        group_id: "egbegroup",
        value: "cecommunityroad",
        label: "CE CommunityRoad"
    },
    {
        zone_id: "ewcvz5",
        group_id: "temagroup",
        value: "cetema1",
        label: "CE Tema 1"
    },
    {
        zone_id: "ewcvz5",
        group_id: "temagroup",
        value: "cetemaz52",
        label: "CE Tema Z5 2"
    },
    {
        zone_id: "ewcvz5",
        group_id: "temagroup",
        value: "cetema3",
        label: "CE Tema 3"
    },
    {
        zone_id: "ewcvz5",
        group_id: "temagroup",
        value: "cekpone",
        label: "CE Kpone "
    },
    {
        zone_id: "ewcvz5",
        group_id: "temagroup",
        value: "cerhemaland",
        label: "CE Rhema Land "
    },
    {
        zone_id: "ewcvz5",
        group_id: "eastlegongroup",
        value: "cebaatsona1",
        label: "CE Baatsona 1"
    },
    {
        zone_id: "ewcvz5",
        group_id: "eastlegongroup",
        value: "ceodumse",
        label: "CE Odumse"
    },
    {
        zone_id: "ewcvz5",
        group_id: "eastlegongroup",
        value: "ceaxim",
        label: "CE Axim"
    },
    {
        zone_id: "ewcvz5",
        group_id: "eastlegongroup",
        value: "cekatamanso",
        label: "CE Katamanso"
    },
    {
        zone_id: "ewcvz5",
        group_id: "michelnationgroup",
        value: "cemichelcamp",
        label: "CE Michel Camp"
    },
    {
        zone_id: "ewcvz5",
        group_id: "bogroup",
        value: "cegbetsile",
        label: "CE Gbetsile"
    },
    {
        zone_id: "ewcvz5",
        group_id: "michelnationgroup",
        value: "cedodowaz5",
        label: "CE Dodowa Z5"
    },
    {
        zone_id: "ewcvz5",
        group_id: "michelnationgroup",
        value: "cegbetsilez5",
        label: "CE Gbetsile Z5"
    },
    {
        zone_id: "ewcvz5",
        group_id: "lashibigroup",
        value: "celashibi",
        label: "CE Lashibi "
    },
    {
        zone_id: "ewcvz5",
        group_id: "lashibigroup",
        value: "ceklagon",
        label: "CE Klagon"
    },
    {
        zone_id: "ewcvz5",
        group_id: "adentagroupz5",
        value: "ceadenta2",
        label: "CE Adenta 2"
    },
    {
        zone_id: "ewcvz5",
        group_id: "adentagroupz5",
        value: "cemadinaz5",
        label: "CE Madina Z5"
    },
    {
        zone_id: "ewcvz5",
        group_id: "adentagroupz5",
        value: "ceadenta",
        label: "CE Adenta"
    },
    {
        zone_id: "ewcvz5",
        group_id: "adentagroupz5",
        value: "ceabokobi",
        label: "CE Abokobi"
    },
    {
        zone_id: "ewcvz5",
        group_id: "adentagroupz5",
        value: "cedanfa-adoteiman",
        label: "CE Danfa-Adoteiman"
    },
    {
        zone_id: "ewcvz5",
        group_id: "adentagroupz5",
        value: "ceoyibi",
        label: "CE Oyibi"
    },
    {
        zone_id: "ewcvz5",
        group_id: "dansomangroup",
        value: "cedansoman",
        label: "CE Dansoman"
    },
    {
        zone_id: "ewcvz5",
        group_id: "dansomangroup",
        value: "cecomm22anex",
        label: "CE Comm 22 Anex"
    },
    {
        zone_id: "ewcvz5",
        group_id: "dansomangroup",
        value: "cenkwanta",
        label: "CE Nkwanta"
    },
    {
        zone_id: "ewcvz5",
        group_id: "dansomangroup",
        value: "cenkwantaz5",
        label: "CE Nkwanta z5"
    },
    {
        zone_id: "ewcvz5",
        group_id: "dansomangroup",
        value: "cejordan",
        label: "CE Jordan"
    },
    {
        zone_id: "ewcvz5",
        group_id: "triumphantgroup",
        value: "ceakuse",
        label: "CE Akuse"
    },
    {
        zone_id: "ewcvz5",
        group_id: "triumphantgroup",
        value: "cedunkwa",
        label: "CE Dunkwa"
    },
    {
        zone_id: "ewcvz5",
        group_id: "triumphantgroup",
        value: "cetriumphant",
        label: "CE Triumphant"
    },
    {
        zone_id: "ewcvz5",
        group_id: "triumphantgroup",
        value: "cegoaso",
        label: "CE Goaso"
    },
    {
        zone_id: "ewcvz5",
        group_id: "triumphantgroup",
        value: "cepenkwase",
        label: "CE Penkwase"
    },
    {
        zone_id: "ewcvz5",
        group_id: "triumphantgroup",
        value: "celapaz",
        label: "CE Lapaz"
    },
    {
        zone_id: "ewcvz5",
        group_id: "triumphantgroup",
        value: "cepeaceland",
        label: "CE Peace Land"
    },
    {
        zone_id: "ewcvz5",
        group_id: "denugroup",
        value: "cehalf-assini",
        label: "CE Half -Assini"
    },
    {
        zone_id: "ewcvz5",
        group_id: "denugroup",
        value: "ceadidome",
        label: "CE Adidome"
    },
    {
        zone_id: "ewcvz5",
        group_id: "teshiegroup",
        value: "cenungua2",
        label: "CE Nungua 2"
    },
    {
        zone_id: "ewcvz5",
        group_id: "teshiegroup",
        value: "cecamp2",
        label: "CE Camp 2"
    },
    {
        zone_id: "ewcvz5",
        group_id: "teshiegroup",
        value: "cegachurch",
        label: "CE Ga church"
    },
    {
        zone_id: "ewcvz5",
        group_id: "teshiegroup",
        value: "ceteshiegredaestate",
        label: "CE Teshie Greda Estate"
    },
    {
        zone_id: "ewcvz5",
        group_id: "seirraleonecentralgroup",
        value: "cebendebum",
        label: "CE Bendebum"
    },
    {
        zone_id: "ewcvz5",
        group_id: "seirraleonecentralgroup",
        value: "cekendah",
        label: "CE Kendah"
    },
    {
        zone_id: "ewcvz5",
        group_id: "seirraleonecentralgroup",
        value: "cemagbruka",
        label: "CE Magbruka"
    },
    {
        zone_id: "ewcvz5",
        group_id: "seirraleonecentralgroup",
        value: "ceaberdeen",
        label: "CE  aberdeen"
    },
    {
        zone_id: "ewcvz5",
        group_id: "kissygroup",
        value: "cegoderich",
        label: "CE  goderich"
    },
    {
        zone_id: "ewcvz5",
        group_id: "kissygroup",
        value: "cekossohtown",
        label: "CE kossoh town"
    },
    {
        zone_id: "ewcvz5",
        group_id: "kissygroup",
        value: "cehillstation",
        label: "CE hill station"
    },
    {
        zone_id: "ewcvz5",
        group_id: "kissygroup",
        value: "cekono",
        label: "CE kono"
    },
    {
        zone_id: "ewcvz5",
        group_id: "makenigroup",
        value: "cemakenicentralchurch",
        label: "CE Makeni central church"
    },
    {
        zone_id: "ewcvz5",
        group_id: "makenigroup",
        value: "cemagburaka",
        label: "CE Magburaka"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "ceolievenhout",
        label: "CE Olievenhout"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cesandtonbusinessconnect",
        label: "CE Sandton Business Connect"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cebloubosrand",
        label: "CE Bloubosrand"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cematholesville",
        label: "CE Matholesville"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cemidrand",
        label: "CE Midrand"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cekrugersdorp",
        label: "CE Krugersdorp"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "ceivorysouth",
        label: "CE Ivory South"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cemayibuye",
        label: "CE Mayibuye"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cemunsieville",
        label: "CE Munsieville"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "ceklipfontein",
        label: "CE Klipfontein"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "ceivorysouthext7",
        label: "CE Ivory South Ext 7"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cemegalisberg",
        label: "CE Megalisberg"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "ceclayville",
        label: "CE Clayville"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cetembisa",
        label: "CE Tembisa"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "ceedenvale.",
        label: "CE Edenvale."
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cethokoza",
        label: "CE Thokoza"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cevosloorus",
        label: "CE Vosloorus"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cemailula",
        label: "CE Mailula"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cegreenfeilds",
        label: "CE Greenfeilds"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "ceduduza",
        label: "CE Duduza"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cemayibuyewest",
        label: "CE Mayibuye West"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cemdantsanenu1",
        label: "CE Mdantsane NU1"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "ceamalinda",
        label: "CE Amalinda"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "ceportalfred1",
        label: "CE Port Alfred1"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cekingwilliam'stown",
        label: "CE King William's Town"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cebutterworth",
        label: "CE Butterworth"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "ceidutywa",
        label: "CE Idutywa"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cengqamakhwe",
        label: "CE Ngqamakhwe"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "ceengcobo",
        label: "CE Engcobo"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cealice",
        label: "CE Alice"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cecentane",
        label: "CE Centane"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cemthatha2",
        label: "CE Mthatha2"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cexhora",
        label: "CE Xhora"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cemqanduli",
        label: "CE Mqanduli"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cequeenstown",
        label: "CE Queenstown"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "ceezibeleni",
        label: "CE Ezibeleni"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "ceeastlondon",
        label: "CE East London"
    },
    {
        zone_id: "ottz",
        group_id: "ottawagroup",
        value: "cerhema",
        label: "CE Rhema"
    },
    {
        zone_id: "texasz2",
        group_id: "arlingtongroup",
        value: "richardson",
        label: "Richardson"
    },
    {
        zone_id: "texasz2",
        group_id: "arlingtongroup",
        value: "mansfield",
        label: "Mansfield"
    },
    {
        zone_id: "texasz2",
        group_id: "northshoregroup",
        value: "indiana",
        label: "Indiana"
    },
    {
        zone_id: "lz2",
        group_id: "ikotun",
        value: "cehigherlifeikotun",
        label: "CE Higherlifeikotun"
    },
    {
        zone_id: "texasz2",
        group_id: "northshoregroup",
        value: "ceindiana",
        label: "CE Indiana"
    },
    {
        zone_id: "texasz2",
        group_id: "northshoregroup",
        value: "ceminissota",
        label: "CE Minissota"
    },
    {
        zone_id: "texasz2",
        group_id: "arlingtongroup",
        value: "ceduncanville",
        label: "CE Duncanville"
    },
    {
        zone_id: "texasz2",
        group_id: "alvingroup",
        value: "cebroadway",
        label: "CE Broadway"
    },
    {
        zone_id: "lwza",
        group_id: "blwekpomagroup",
        value: "blwaautownfellowship",
        label: "Blw AAU Town Fellowship"
    },
    {
        zone_id: "lwza",
        group_id: "blwekpomagroup",
        value: "blwaaudeltachurch",
        label: "Blw AAU Delta Church"
    },
    {
        zone_id: "lwza",
        group_id: "blwekpomagroup",
        value: "blwaaucampusfellowship",
        label: "BLW AAU Campus Fellowship"
    },
    {
        zone_id: "lwza",
        group_id: "blwekpomagroup",
        value: "blwaauujemenfellowship",
        label: "BLW AAU Ujemen fellowship"
    },
    {
        zone_id: "lwza",
        group_id: "blwekpomagroup",
        value: "blwaauemadofellowship",
        label: "BLW AAU Emado fellowship "
    },
    {
        zone_id: "lwza",
        group_id: "blwekpomagroup",
        value: "blwaauirruafellowship",
        label: "BLW AAU Irrua Fellowship"
    },
    {
        zone_id: "lwza",
        group_id: "blwauchigroup",
        value: "blwfedpolyauchi",
        label: "BLW Fed Poly Auchi "
    },
    {
        zone_id: "lwza",
        group_id: "blwauchigroup",
        value: "blwfcoeokene",
        label: "Blw FCOE Okene"
    },
    {
        zone_id: "lwza",
        group_id: "blwauchigroup",
        value: "blwedouniversity",
        label: "BLW Edo University"
    },
    {
        zone_id: "lwza",
        group_id: "blwauchigroup",
        value: "blwkspseabobo",
        label: "Blw KSPSE ABOBO"
    },
    {
        zone_id: "lwza",
        group_id: "blwabrakagroup",
        value: "blwdelsuabraka",
        label: "Blw Delsu Abraka"
    },
    {
        zone_id: "lwza",
        group_id: "blwabrakagroup",
        value: "blwozoro",
        label: "BLW Ozoro "
    },
    {
        zone_id: "lwza",
        group_id: "blwabrakagroup",
        value: "blwdespolyogwashi-uku",
        label: "Blw DesPoly Ogwashi-uku"
    },
    {
        zone_id: "lwza",
        group_id: "blwabrakagroup",
        value: "blwnovenauniversity",
        label: "BLW Novena University"
    },
    {
        zone_id: "lwza",
        group_id: "blwabrakagroup",
        value: "blwcoeagbor",
        label: "Blw COE Agbor"
    },
    {
        zone_id: "lwza",
        group_id: "blwabrakagroup",
        value: "blwfcoeasaba",
        label: "BLW FCOE Asaba"
    },
    {
        zone_id: "lwza",
        group_id: "blwabrakagroup",
        value: "blwdennisosadebe",
        label: "BLW Dennis Osadebe"
    },
    {
        zone_id: "lwza",
        group_id: "blwabrakagroup",
        value: "blwunideltaowa-oyibo",
        label: "BLW Uni Delta Owa-oyibo"
    },
    {
        zone_id: "lwza",
        group_id: "blwkogigroup",
        value: "blwksu",
        label: "BLW KSU "
    },
    {
        zone_id: "lwza",
        group_id: "blwkogigroup",
        value: "blwfedpolyidah",
        label: "BLW Fed Poly Idah"
    },
    {
        zone_id: "lwza",
        group_id: "blwkogigroup",
        value: "blwfedunilokoja",
        label: "BLW Fed Uni Lokoja"
    },
    {
        zone_id: "lwza",
        group_id: "blwkogigroup",
        value: "blwcoeankpa",
        label: "BLW COE ANKPA"
    },
    {
        zone_id: "lwza",
        group_id: "blwkogigroup",
        value: "blwksplokoja",
        label: "Blw KSP Lokoja"
    },
    {
        zone_id: "lwza",
        group_id: "blwkogigroup",
        value: "blwitobe",
        label: "Blw ITOBE"
    },
    {
        zone_id: "lwzb",
        group_id: "enugugroup",
        value: "blwunn",
        label: "BLW UNN"
    },
    {
        zone_id: "lwzb",
        group_id: "naugroup",
        value: "blwnau",
        label: "BLW NAU"
    },
    {
        zone_id: "lwzb",
        group_id: "ebonyigroup",
        value: "blwebsu",
        label: "BLW EBSU"
    },
    {
        zone_id: "lwzb",
        group_id: "ebonyigroup",
        value: "blwfunai",
        label: "BLW FUNAI"
    },
    {
        zone_id: "lwzb",
        group_id: "enugugroup",
        value: "blwunec",
        label: "BLW UNEC"
    },
    {
        zone_id: "lwzb",
        group_id: "enugugroup",
        value: "blwesut",
        label: "BLW ESUT"
    },
    {
        zone_id: "lwzb",
        group_id: "ebonyigroup",
        value: "blwimt",
        label: "BLW IMT"
    },
    {
        zone_id: "lwzb",
        group_id: "enugugroup",
        value: "blwescet",
        label: "BLW ESCET"
    },
    {
        zone_id: "lwzb",
        group_id: "enugugroup",
        value: "blwparklane",
        label: "BLW PARKLANE"
    },
    {
        zone_id: "lwzb",
        group_id: "enugugroup",
        value: "blwdental",
        label: "BLW DENTAL"
    },
    {
        zone_id: "lwzb",
        group_id: "enugugroup",
        value: "blwgou",
        label: "BLW GOU"
    },
    {
        zone_id: "lwzb",
        group_id: "ebonyigroup",
        value: "blwpresco",
        label: "BLW PRESCO"
    },
    {
        zone_id: "lwzb",
        group_id: "ebonyigroup",
        value: "blwcas",
        label: "BLW CAS"
    },
    {
        zone_id: "lwzb",
        group_id: "ebonyigroup",
        value: "blwebscoei",
        label: "BLW EBSCOEI"
    },
    {
        zone_id: "lwzb",
        group_id: "uligroup",
        value: "blwatani",
        label: "BLW ATANI"
    },
    {
        zone_id: "lwzb",
        group_id: "uligroup",
        value: "blwuli",
        label: "BLW ULI"
    },
    {
        zone_id: "lwzb",
        group_id: "uligroup",
        value: "blwlegacy",
        label: "BLW LEGACY"
    },
    {
        zone_id: "lwzb",
        group_id: "uligroup",
        value: "blwwima",
        label: "BLW WIMA"
    },
    {
        zone_id: "lwzb",
        group_id: "igbariamgroup",
        value: "blwigbariam",
        label: "BLW IGBARIAM"
    },
    {
        zone_id: "lwzb",
        group_id: "naugroup",
        value: "blwoko",
        label: "BLW OKO"
    },
    {
        zone_id: "savz2",
        group_id: "cekemptonparkgroup",
        value: "cekemptonparkchurch",
        label: "CE Kempton Park Church"
    },
    {
        zone_id: "savz2",
        group_id: "cekemptonparkgroup",
        value: "cenorkempark",
        label: "CE Norkem Park"
    },
    {
        zone_id: "savz2",
        group_id: "cekemptonparkgroup",
        value: "celyttleton",
        label: "CE Lyttleton"
    },
    {
        zone_id: "savz2",
        group_id: "cekemptonparkgroup",
        value: "ceboksburg",
        label: "CE Boksburg"
    },
    {
        zone_id: "savz2",
        group_id: "cekemptonparkgroup",
        value: "cealberton",
        label: "CE Alberton"
    },
    {
        zone_id: "savz2",
        group_id: "cekemptonparkgroup",
        value: "cedelmas",
        label: "CE Delmas"
    },
    {
        zone_id: "savz2",
        group_id: "cekemptonparkgroup",
        value: "cesasolburg",
        label: "CE Sasolburg"
    },
    {
        zone_id: "savz2",
        group_id: "cekemptonparkgroup",
        value: "cezamdela",
        label: "CE Zamdela"
    },
    {
        zone_id: "savz2",
        group_id: "cekemptonparkgroup",
        value: "ceboksburgnorth",
        label: "CE Boksburg North"
    },
    {
        zone_id: "savz2",
        group_id: "cekemptonparkgroup",
        value: "cenigel",
        label: "CE Nigel"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cepretoriacentral",
        label: "CE Pretoria Central"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cemenlyn",
        label: "CE Menlyn"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cepretoriawest",
        label: "CE Pretoria West"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cepretorianorth",
        label: "CE Pretoria North"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cewitbank",
        label: "CE Witbank"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cehammanskraal",
        label: "CE Hammanskraal"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "ceattridgeville",
        label: "CE Attridgeville"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cebloed",
        label: "CE Bloed"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cesilverton",
        label: "CE Silverton"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cenelmaphius",
        label: "CE Nelmaphius"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cesoshanguve",
        label: "CE Soshanguve"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cemabopane",
        label: "CE Mabopane"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cecenturion",
        label: "CE Centurion"
    },
    {
        zone_id: "lz2",
        group_id: "ejigbogroup",
        value: "cepottershouse",
        label: "CE Pottershouse"
    },
    {
        zone_id: "lz2",
        group_id: "ipajagroup",
        value: "cebaruwa",
        label: "CE Baruwa"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cerandburg",
        label: "CE Randburg"
    },
    {
        zone_id: "lwzb",
        group_id: "naugroup",
        value: "blwchs",
        label: "BLW CHS"
    },
    {
        zone_id: "lwzb",
        group_id: "igbariamgroup",
        value: "blwtansian",
        label: "BLW TANSIAN"
    },
    {
        zone_id: "lwzb",
        group_id: "igbariamgroup",
        value: "blwtansianoba",
        label: "BLW TANSIAN OBA"
    },
    {
        zone_id: "lwzb",
        group_id: "unwana",
        value: "blwunwana",
        label: "BLW UNWANA"
    },
    {
        zone_id: "lsza",
        group_id: "lwpeaceville",
        value: "peaceville",
        label: "Peaceville"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "ceakowonjodopemu",
        label: "CE Akowonjodopemu"
    },
    {
        zone_id: "lz5",
        group_id: "ceajahgroup",
        value: "cegreaterlife",
        label: "CE Greater Life"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "universityfobuea",
        label: "UNIVERSITY FO BUEA"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "ndongofellowship",
        label: "NDONGO FELLOWSHIP"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "tikofellowship",
        label: "TIKO FELLOWSHIP"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "bambili",
        label: "BAMBILI"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "polytech",
        label: "POLYTECH"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "agricschool",
        label: "AGRIC SCHOOL"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "douala",
        label: "DOUALA"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "angerafael",
        label: "ANGE RAFAEL"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "gabon",
        label: "GABON"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "universityofbuea",
        label: "UNIVERSITY OF BUEA"
    },
    {
        zone_id: "lwcg2",
        group_id: "blwcameroongroup2",
        value: "foumban",
        label: "FOUMBAN"
    },
    {
        zone_id: "lz2",
        group_id: "abaranje1group",
        value: "celearningpark",
        label: "CE Learningpark"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "celearningparkdopemu",
        label: "CE Learningparkdopemu"
    },
    {
        zone_id: "savz2",
        group_id: "cegerminstongroup",
        value: "cegermiston",
        label: "CE Germiston"
    },
    {
        zone_id: "savz2",
        group_id: "cegerminstongroup",
        value: "cesprings",
        label: "CE Springs"
    },
    {
        zone_id: "savz2",
        group_id: "cegerminstongroup",
        value: "ceelsburg",
        label: "CE Elsburg"
    },
    {
        zone_id: "savz2",
        group_id: "cegerminstongroup",
        value: "cewestonaria",
        label: "CE Westonaria"
    },
    {
        zone_id: "savz2",
        group_id: "cegerminstongroup",
        value: "cekwa-thema",
        label: "CE Kwa-Thema"
    },
    {
        zone_id: "savz2",
        group_id: "cegerminstongroup",
        value: "cebekkersdal",
        label: "CE Bekkersdal"
    },
    {
        zone_id: "savz2",
        group_id: "cegerminstongroup",
        value: "cetsakane",
        label: "CE Tsakane"
    },
    {
        zone_id: "savz2",
        group_id: "cegerminstongroup",
        value: "cewitfield",
        label: "CE Witfield"
    },
    {
        zone_id: "savz2",
        group_id: "cegerminstongroup",
        value: "cealrapark",
        label: "CE Alra Park"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cejohannesburgmain",
        label: "CE Johannesburg Main"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cebenoni",
        label: "CE Benoni"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cebrits",
        label: "CE Brits"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "ceeastlynne",
        label: "CE EASTLYNNE"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cewestrand",
        label: "CE Westrand"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cerandfontein",
        label: "CE Randfontein"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "ceglenridge",
        label: "CE Glenridge"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cesaintdenis",
        label: "CE Saint Denis"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cethailand",
        label: "CE Thailand"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "ceheildelburg",
        label: "CE Heildelburg"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cebalfour",
        label: "CE BALFOUR"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "ceambohiboa",
        label: "CE Ambohiboa"
    },
    {
        zone_id: "texasz2",
        group_id: "northshoregroup",
        value: "cenorthshore",
        label: "CE Northshore"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cekensington",
        label: "CE Kensington"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cevlakfontein",
        label: "CE Vlakfontein"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cekatlehong1",
        label: "CE Katlehong 1"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cekatlehong2",
        label: "CE Katlehong 2"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cepotchefstroom1",
        label: "CE Potchefstroom 1"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cepotchefstroom2",
        label: "CE Potchefstroom 2"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cecarletonville",
        label: "CE Carletonville"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cemalvern",
        label: "CE Malvern"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "ceregentspark",
        label: "CE Regents Park"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cekatlehong3",
        label: "CE Katlehong 3"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cekhutsong",
        label: "CE Khutsong"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cepalmrich",
        label: "CE Palm Rich"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cevoslooruscentral",
        label: "CE Vosloorus Central"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cekagiso",
        label: "CE Kagiso"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "cefochville",
        label: "CE Fochville"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cedurbancentral",
        label: "CE Durban Central"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cechartsworth",
        label: "CE Chartsworth"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cechesterville",
        label: "CE Chesterville"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cedurbannorth",
        label: "CE Durban North"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cepietermaritzburg",
        label: "CE Pietermaritzburg"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "ceumhlanga",
        label: "CE Umhlanga"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cearcadia",
        label: "CE Arcadia"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cekameeldrift",
        label: "CE Kameeldrift"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "miatta",
        label: "Miatta"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "ceezinambeni",
        label: "CE Ezinambeni"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "ceklarinet",
        label: "CE Klarinet"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cepinetown",
        label: "CE Pinetown"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cequeensburg",
        label: "CE Queensburg"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "agcc1",
        label: "AGCC1"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cemoneyfarm",
        label: "CE Money Farm"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cerosettenville",
        label: "CE Rosettenville"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cevanderbijlpark",
        label: "CE Vanderbijl Park"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cesoweto",
        label: "CE Soweto"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cekiblerpark",
        label: "CE Kibler Park"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cemortoon",
        label: "CE Mortoon"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "cetownchurch",
        label: "CE Town Church"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "celafrenz",
        label: "CE Lafrenz"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "cekeetmanshoop",
        label: "CE KEETMANSHOOP"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "celuderitz",
        label: "CE Luderitz"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "cemariental",
        label: "CE MARIENTAL"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "cearandis",
        label: "CE ARANDIS"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "cewalvisbay",
        label: "CE WALVIS BAY"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "ceswakopmund",
        label: "CE SWAKOPMUND"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "ceokahandja",
        label: "CE OKAHANDJA"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "ceojiwarongo",
        label: "CE OJIWARONGO"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "cerehoboth",
        label: "CE REHOBOTH"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "cerundu",
        label: "CE RUNDU"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "cetsumeb",
        label: "CE TSUMEB"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "ceoshakati",
        label: "CE OSHAKATI"
    },
    {
        zone_id: "savz2",
        group_id: "cenamibiagroup",
        value: "cekatutura",
        label: "CE KATUTURA"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "ceedendale",
        label: "CE Edendale"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "ceeshowe",
        label: "CE Eshowe"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cethornwood",
        label: "CE Thornwood"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cenorthdale",
        label: "CE Northdale"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cemandeni",
        label: "CE Mandeni"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "ceempangeni",
        label: "CE Empangeni"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "ceverulam",
        label: "CE Verulam"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cenewcastle",
        label: "CE Newcastle"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "ceportshepstone",
        label: "CE Portshepstone"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cemargate",
        label: "CE Margate"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cerichardsbay",
        label: "CE Richardsbay"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "celadysmith",
        label: "CE Ladysmith"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "ceberea",
        label: "CE BEREA"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "cebetrams",
        label: "CE Betrams"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "cewelkom",
        label: "CE Welkom"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "cepritchard",
        label: "CE Pritchard"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "cebotshabelo",
        label: "CE Botshabelo"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "cehillbrow",
        label: "CE Hillbrow"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "ceodendaalrust",
        label: "CE Odendaalrust"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "cethaba-nchu",
        label: "CE Thaba-Nchu"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "ceallenridge",
        label: "CE Allenridge"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "cebloem2",
        label: "CE Bloem2"
    },
    {
        zone_id: "ukvz3",
        group_id: "hillingdongroup",
        value: "cemongolia",
        label: "CE MONGOLIA"
    },
    {
        zone_id: "ukvz3",
        group_id: "streathamgroup",
        value: "cedartford",
        label: "CE DARTFORD"
    },
    {
        zone_id: "ukvz3",
        group_id: "streathamgroup",
        value: "ceeastkent",
        label: "CE EASTKENT"
    },
    {
        zone_id: "ukvz3",
        group_id: "perivalegroup",
        value: "ceharrow",
        label: "CE HARROW"
    },
    {
        zone_id: "ukvz3",
        group_id: "hillingdongroup",
        value: "cestandrewsgrenada",
        label: "CE ST ANDREWS GRENADA"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cehowick",
        label: "CE Howick"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cegroutville",
        label: "CE Groutville"
    },
    {
        zone_id: "ukvz3",
        group_id: "streathamgroup",
        value: "cestreatham",
        label: "CE Streatham"
    },
    {
        zone_id: "ukvz3",
        group_id: "hillingdongroup",
        value: "cehillingdon",
        label: "CE Hillingdon"
    },
    {
        zone_id: "savz2",
        group_id: "ceangolagroup",
        value: "cecassenda",
        label: "CE Cassenda"
    },
    {
        zone_id: "savz2",
        group_id: "ceangolagroup",
        value: "cevereeniging",
        label: "CE Vereeniging"
    },
    {
        zone_id: "savz2",
        group_id: "ceangolagroup",
        value: "cezango",
        label: "CE Zango"
    },
    {
        zone_id: "savz2",
        group_id: "ceangolagroup",
        value: "celubango1",
        label: "CE Lubango 1"
    },
    {
        zone_id: "savz2",
        group_id: "ceangolagroup",
        value: "cecunene",
        label: "CE Cunene"
    },
    {
        zone_id: "savz2",
        group_id: "ceangolagroup",
        value: "cecamama",
        label: "CE Camama"
    },
    {
        zone_id: "savz2",
        group_id: "ceangolagroup",
        value: "cebenfica",
        label: "CE Benfica"
    },
    {
        zone_id: "savz2",
        group_id: "ceangolagroup",
        value: "celubango2",
        label: "CE Lubango 2"
    },
    {
        zone_id: "accraz",
        group_id: "avenorgroup",
        value: "couplesclassic",
        label: "couples classic"
    },
    {
        zone_id: "savz2",
        group_id: "ceangolagroup",
        value: "cecabinda",
        label: "CE Cabinda"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "ceklerksdorp",
        label: "CE Klerksdorp"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cewattville",
        label: "CE Wattville"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cedaveyton",
        label: "CE Daveyton"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cereigerpark",
        label: "CE Reiger Park"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "ceetwatwacentral",
        label: "CE Etwatwa Central"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cedrieziek",
        label: "CE Drieziek"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "ceetwatwa2",
        label: "CE Etwatwa 2"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cebrakpan",
        label: "CE Brakpan"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cesharpville",
        label: "CE Sharpville"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cekwathema",
        label: "CE Kwathema"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cesebokeng",
        label: "CE Sebokeng"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cedeaar",
        label: "CE De Aar"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "ceedenvale1",
        label: "CE Edenvale 1"
    },
    {
        zone_id: "savz2",
        group_id: "ceyoevillegroup",
        value: "ceyeovillechurch",
        label: "CE YEOVILLE CHURCH"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceisheri3",
        label: "CE Isheri3"
    },
    {
        zone_id: "lz2",
        group_id: "isherigroup",
        value: "ceforestry",
        label: "CE Forestry"
    },
    {
        zone_id: "savz2",
        group_id: "cekimberleygroup",
        value: "cekimberley",
        label: "CE KIMBERLEY "
    },
    {
        zone_id: "savz2",
        group_id: "cekimberleygroup",
        value: "cekuruman",
        label: "CE KURUMAN"
    },
    {
        zone_id: "ewcvz5",
        group_id: "cenunguagroup",
        value: "cenunguamain",
        label: "CE NUNGUA MAIN"
    },
    {
        zone_id: "savz2",
        group_id: "cekimberleygroup",
        value: "cedelportshoop",
        label: "CE DELPORTSHOOP"
    },
    {
        zone_id: "savz2",
        group_id: "cekimberleygroup",
        value: "ceplatfontein",
        label: "CE PLATFONTEIN"
    },
    {
        zone_id: "savz2",
        group_id: "cekimberleygroup",
        value: "cehopetown",
        label: "CE HOPETOWN"
    },
    {
        zone_id: "savz2",
        group_id: "cekimberleygroup",
        value: "cegreenpoint",
        label: "CE GREENPOINT"
    },
    {
        zone_id: "savz2",
        group_id: "cekimberleygroup",
        value: "ceoliphanthoek",
        label: "CE OLIPHANTHOEK"
    },
    {
        zone_id: "savz2",
        group_id: "cekimberleygroup",
        value: "ceboshof",
        label: "CE BOSHOF"
    },
    {
        zone_id: "savz2",
        group_id: "cekimberleygroup",
        value: "cewarrenton",
        label: "CE WARRENTON"
    },
    {
        zone_id: "savz2",
        group_id: "cekimberleygroup",
        value: "ceritchie",
        label: "CE RITCHIE"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cesharjah",
        label: "CE Sharjah"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "ceabudhabi1",
        label: "CE Abu Dhabi 1"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "ceabudhabi2",
        label: "CE Abu Dhabi 2"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cealain1",
        label: "CE Alain 1"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cealain2",
        label: "CE Alain 2"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cekhalidiya",
        label: "CE Khalidiya"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cefujeirah",
        label: "CE Fujeirah"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cerasalkhaimah",
        label: "CE Ras Al Khaimah"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cedubai2",
        label: "CE Dubai 2"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cedubai1a",
        label: "CE Dubai 1A"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cealmullahplaza",
        label: "CE Al Mullah Plaza"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cealquasis",
        label: "CE Al Quasis"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cedeira",
        label: "CE Deira"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cejabelali",
        label: "CE Jabel Ali"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cegigico",
        label: "CE Gigico"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cealnahda",
        label: "CE Al Nahda"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cealtawuun",
        label: "CE Al Tawuun"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cesunway",
        label: "CE Sunway"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "ceqatar1",
        label: "CE Qatar  1"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "ceqatar2",
        label: "CE Qatar  2"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cebahrain",
        label: "CE Bahrain"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "ceoman",
        label: "CE Oman"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cekualalumpur",
        label: "CE Kuala Lumpur"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "ceindia",
        label: "CE India"
    },
    {
        zone_id: "middleeast",
        group_id: "middleeast",
        value: "cenorthyork",
        label: "CE North York"
    },
    {
        zone_id: "lwzl",
        group_id: "blwunicalgroup",
        value: "blwunical",
        label: "BLw Unical"
    },
    {
        zone_id: "lwzl",
        group_id: "blwunicalgroup",
        value: "blwakamkpa",
        label: "Blw Akamkpa"
    },
    {
        zone_id: "lwzl",
        group_id: "blwunicalgroup",
        value: "blwokuku",
        label: "Blw Okuku"
    },
    {
        zone_id: "lwzl",
        group_id: "blwunicalgroup",
        value: "blwogoja",
        label: "Blw Ogoja"
    },
    {
        zone_id: "lwzl",
        group_id: "blwunicalgroup",
        value: "blwnogak",
        label: "Blw Nogak"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "annexchurch",
        label: "ANNEX CHURCH"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "permsitechurch",
        label: "PERMSITE CHURCH"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "obonguniversitychurch",
        label: "OBONG UNIVERSITY CHURCH"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "towncampuschurch",
        label: "TOWN CAMPUS CHURCH"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "mauridchapter",
        label: "MAURID CHAPTER"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "coechapter",
        label: "COE CHAPTER"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "metropolitanchapter",
        label: "METROPOLITAN CHAPTER"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "ritmanchapter",
        label: "RITMAN CHAPTER"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "schoolofnursingchapter",
        label: "SCHOOL OF NURSING CHAPTER"
    },
    {
        zone_id: "savz2",
        group_id: "cedurbangroup",
        value: "cesavannahpark",
        label: "CE Savannah Park"
    },
    {
        zone_id: "nwz1",
        group_id: "cekadunagroup",
        value: "cekdnorth",
        label: "CE KDNORTH"
    },
    {
        zone_id: "nwz1",
        group_id: "cekadunagroup",
        value: "cebarnawasubgrp",
        label: "CE BARNAWA SUB GRP"
    },
    {
        zone_id: "nwz1",
        group_id: "cekadunagroup",
        value: "cekakurisubgrp",
        label: "CE KAKURI SUBGRP"
    },
    {
        zone_id: "nwz1",
        group_id: "cekadunagroup",
        value: "cesabosubgrp",
        label: "CE SABO SUB GRP"
    },
    {
        zone_id: "nwz1",
        group_id: "cekadunagroup",
        value: "cecentralsubgrp",
        label: "CE CENTRAL SUB GRP"
    },
    {
        zone_id: "lz1",
        group_id: "mainland2group",
        value: "ceakilo",
        label: "CE Akilo"
    },
    {
        zone_id: "lwzl",
        group_id: "blwcrutechgroup",
        value: "blwcrutech",
        label: "BLW Crutech"
    },
    {
        zone_id: "lwzl",
        group_id: "blwcrutechgroup",
        value: "blwakwapoly",
        label: "BLW Akwapoly"
    },
    {
        zone_id: "lwzl",
        group_id: "blwcrutechgroup",
        value: "blwaksumaincampus",
        label: "BLW AKSU main campus"
    },
    {
        zone_id: "lwzl",
        group_id: "blwcrutechgroup",
        value: "blwaksuannex",
        label: "BLW AKSU annex"
    },
    {
        zone_id: "lwzl",
        group_id: "blwcrutechgroup",
        value: "blwcrutechchurchministry",
        label: "BLW Crutech church ministry"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup1",
        value: "lwchurchmagboro",
        label: "LW CHURCH MAGBORO"
    },
    {
        zone_id: "savz2",
        group_id: "cekensingtongroup",
        value: "ceventersdorp",
        label: "CE Ventersdorp"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "ministrycenterwarri",
        label: "Ministry Center Warri"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "zonalchurch",
        value: "lwchurchberger",
        label: "LW CHURCH BERGER"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup1",
        value: "lwchurchikosi",
        label: "LW CHURCH IKOSI"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup1",
        value: "lwchurchoshodi",
        label: "LW CHURCH OSHODI"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup1",
        value: "lwchurchsomolu",
        label: "LW CHURCH SOMOLU"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup1",
        value: "lwchurchyaba",
        label: "LW CHURCH YABA"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup1",
        value: "lwchurchegbeda",
        label: "LW CHURCH EGBEDA"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup1",
        value: "lwchurchikorodu",
        label: "LW CHURCH IKORODU"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup2",
        value: "lwchurchmushin",
        label: "LW CHURCH MUSHIN"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup2",
        value: "lwchurchajah1",
        label: "LW CHURCH AJAH 1"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup2",
        value: "lwchurchajah2",
        label: "LW CHURCH AJAH 2"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup2",
        value: "lwchurchlekki1",
        label: "LW CHURCH LEKKI 1"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup2",
        value: "lwchurchlekki2",
        label: "LW CHURCH LEKKI 2"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup3",
        value: "lwchurchbenin1",
        label: "LW CHURCH BENIN 1"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup3",
        value: "lwchurchore",
        label: "LW CHURCH ORE"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup3",
        value: "lwchurchakure",
        label: "LW CHURCH AKURE"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup3",
        value: "lwchurchasaba",
        label: "LW CHURCH ASABA"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup4",
        value: "lwchurchportharcourt1",
        label: "LW CHURCH PORTHARCOURT1"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup4",
        value: "lwchurchportharcourt2",
        label: "LW CHURCH PORTHARCOURT 2"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup4",
        value: "lwchurchaba",
        label: "LW CHURCH ABA"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup4",
        value: "lwchurchph2",
        label: "LW CHURCH PH 2"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup4",
        value: "lwchurchowerri1",
        label: "LW CHURCH OWERRI 1"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup4",
        value: "lwchurchowerri2",
        label: "LW CHURCH OWERRI 2"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup4",
        value: "lwchurchph3",
        label: "LW CHURCH PH 3"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup5",
        value: "lwchurchph2grp5",
        label: "LW CHURCH PH 2 GRP 5"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup5",
        value: "lwchurchawka",
        label: "LW CHURCH AWKA"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup5",
        value: "lwchurchenugu",
        label: "LW CHURCH ENUGU"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup6",
        value: "lwchurchoshogbo",
        label: "LW CHURCH OSHOGBO"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup6",
        value: "lwchurchibadan",
        label: "LW CHURCH IBADAN"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup7",
        value: "lwchurchojodu",
        label: "LW CHURCH OJODU"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup7",
        value: "lwchurchikeja",
        label: "LW CHURCH IKEJA"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup7",
        value: "lwchurchsurulere",
        label: "LW CHURCH SURULERE"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchsubgroup1",
        value: "lwchurchabuja1",
        label: "LW CHURCH ABUJA 1"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchsubgroup1",
        value: "lwchurchabuja2",
        label: "LW CHURCH ABUJA 2"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchsubgroup1",
        value: "lwchurchabuja3",
        label: "LW CHURCH ABUJA 3"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchsubgroup2",
        value: "lwchurchkano",
        label: "LW CHURCH KANO"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "reonbenin1",
        label: "reonbenin1"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchsubgroup2",
        value: "lwchurchkano2",
        label: "LW CHURCH KANO 2"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchsubgroup2",
        value: "lwchurchzaria",
        label: "LW CHURCH ZARIA"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "reonaccra",
        label: "reonaccra"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "reonph1",
        label: "reonph1"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "reonph3",
        label: "reonph3"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "reonph2",
        label: "reonph2"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "phmc",
        label: "phmc"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "reonmcabj",
        label: "reonmcabj"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "agcc",
        label: "AGCC"
    },
    {
        zone_id: "nwz1",
        group_id: "cesokotogroup",
        value: "danbuwasubgroup",
        label: "DANBUWASUBGROUP"
    },
    {
        zone_id: "lw2ndtierz",
        group_id: "lwchurchgroup4",
        value: "lwchurchcalabar",
        label: "LW CHURCH CALABAR"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "agcc2",
        label: "AGCC2"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "agcc3",
        label: "AGCC3"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "agcc4",
        label: "AGCC4"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "agcc5",
        label: "AGCC5"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "agcc6",
        label: "AGCC6"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "agcc7",
        label: "AGCC7"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "agcc8",
        label: "AGCC8"
    },
    {
        zone_id: "itlice",
        group_id: "agcc",
        value: "agcc9",
        label: "AGCC9"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "churchministry",
        label: "Churchministry"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceibiye",
        label: "CE Ibiye"
    },
    {
        zone_id: "lz2",
        group_id: "badagrygroup",
        value: "ceambassadors",
        label: "CE Ambassadors"
    },
    {
        zone_id: "abeakutamc",
        group_id: "aserogroup",
        value: "celush",
        label: "CE Lush"
    },
    {
        zone_id: "abeakutamc",
        group_id: "aserogroup",
        value: "cefountain",
        label: "CE Fountain"
    },
    {
        zone_id: "abeakutamc",
        group_id: "globalconnect",
        value: "cecedar",
        label: "CE Cedar"
    },
    {
        zone_id: "abeakutamc",
        group_id: "globalconnect",
        value: "cedominion",
        label: "CE Dominion"
    },
    {
        zone_id: "abeakutamc",
        group_id: "globalconnect",
        value: "cegraceville",
        label: "CE Graceville"
    },
    {
        zone_id: "abeakutamc",
        group_id: "globalconnect",
        value: "cegreaterglory",
        label: "CE Greaterglory"
    },
    {
        zone_id: "abeakutamc",
        group_id: "globalconnect",
        value: "cekinging1",
        label: "CE Kinging1"
    },
    {
        zone_id: "abeakutamc",
        group_id: "lighthousegroup",
        value: "celight",
        label: "CE Light"
    },
    {
        zone_id: "abeakutamc",
        group_id: "lighthousegroup",
        value: "ceijoyoruba",
        label: "CE Ijoyoruba"
    },
    {
        zone_id: "abeakutamc",
        group_id: "lighthousegroup",
        value: "ceexcel",
        label: "CE Excel"
    },
    {
        zone_id: "abeakutamc",
        group_id: "lovechurchgroup",
        value: "celove1",
        label: "CE LOVE1"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "ceprampramz5",
        label: "ceprampramz5"
    },
    {
        zone_id: "ewcvz5",
        group_id: "cenunguagroup",
        value: "cekasoamain",
        label: "cekasoamain"
    },
    {
        zone_id: "beninz1",
        group_id: "centralmissions2",
        value: "cegiwaamu",
        label: "CE GIWA AMU"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "reonabjmc",
        label: "reonabjmc"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "reonlzn2",
        label: "reonlzn2"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "reonado1",
        label: "reonado1"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "ceajegunle1",
        label: "CE Ajegunle 1"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "ceajegunle2",
        label: "CE Ajegunle 2"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "ceagohausa",
        label: "CE Ago Hausa"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "cekirikiriindustrial",
        label: "CE Kirikiri Industrial"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "ceugbokwankwo",
        label: "CE Ugbokwankwo"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "cemazamaza",
        label: "CE Mazamaza"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "ceboundary",
        label: "CE Boundary"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "cekirikiritown",
        label: "CE Kirikiri Town"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "ceokoya",
        label: "CE Okoya"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "ceowoyemi",
        label: "CE Owoyemi"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "ceagohausa2",
        label: "CE Ago Hausa 2"
    },
    {
        zone_id: "lz6",
        group_id: "citychurchgroup",
        value: "cecitychurch1",
        label: "CE City Church 1"
    },
    {
        zone_id: "lz6",
        group_id: "citychurchgroup",
        value: "cecitychurch2",
        label: "CE City Church 2"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "cechampionschurch",
        label: "CE Champions Church"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "ceijegun1",
        label: "CE Ijegun1"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "ceijegun3",
        label: "CE Ijegun 3"
    },
    {
        zone_id: "lz6",
        group_id: "ajegunlegroup",
        value: "cemazamazaojo",
        label: "CE Mazamaza Ojo"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "ceijegunchurch3",
        label: "CE Ijegun  Church 3"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "cemazamazachurch",
        label: "CE Mazamaza Church"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "ceadosoba",
        label: "CE Adosoba"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "ceijegunwaterside",
        label: "CE Ijegun Waterside"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "ceagboju",
        label: "CE Agboju"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "cekings",
        label: "CE Kings"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "cegracelandchurch",
        label: "CE GraceLand church"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "cekirikiriojo",
        label: "CE Kirikiri ojo"
    },
    {
        zone_id: "lz6",
        group_id: "championsgroup",
        value: "ceibasa",
        label: "CE Ibasa"
    },
    {
        zone_id: "lz6",
        group_id: "ijorabadiagroup",
        value: "ceijorabadia",
        label: "CE Ijora Badia"
    },
    {
        zone_id: "lz6",
        group_id: "ijorabadiagroup",
        value: "ceijorabadia2",
        label: "CE Ijora Badia 2"
    },
    {
        zone_id: "lz6",
        group_id: "ijorabadiagroup",
        value: "ceijorabadia3",
        label: "CE Ijora Badia 3"
    },
    {
        zone_id: "lz6",
        group_id: "ijorabadiagroup",
        value: "ceijoraolopa",
        label: "CE Ijora Olopa"
    },
    {
        zone_id: "lz6",
        group_id: "ijorabadiagroup",
        value: "ceamukoko",
        label: "CE Amukoko"
    },
    {
        zone_id: "lz6",
        group_id: "ijorabadiagroup",
        value: "cealabaoro",
        label: "CE Alaba Oro"
    },
    {
        zone_id: "lz6",
        group_id: "ijorabadiagroup",
        value: "cedispensary",
        label: "CE Dispensary"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "ceapapa",
        label: "CE Apapa"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "ceadeolu",
        label: "CE Adeolu"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "cenigerdock",
        label: "CE Niger Dock"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "cesagbokoji",
        label: "CE Sagbokoji"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "cewilmer",
        label: "CE Wilmer"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "ceolodi",
        label: "CE Olodi"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "cecoconut",
        label: "CE Coconut"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "ceboundaryapapa",
        label: "CE Boundary apapa"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "ceoluwa",
        label: "CE Oluwa"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "cemarinebeach",
        label: "CE Marine Beach"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "cekirikiritown1",
        label: "CE Kirikiri Town 1"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "cekirikiritown2",
        label: "CE Kirikiri Town 2"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "celightcity",
        label: "CE Light City"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "cevictorouscity",
        label: "CE Victorous City"
    },
    {
        zone_id: "lz6",
        group_id: "apapagroup",
        value: "ceokorogbo",
        label: "CE Okorogbo"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cechristpark",
        label: "CE Christ Park"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceproteaglen",
        label: "CE Protea Glen"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cedube",
        label: "CE Dube"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cealex2",
        label: "CE Alex 2"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cediepkloof",
        label: "CE Diepkloof"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceebony",
        label: "CE Ebony"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cealexlouisbotha",
        label: "CE Alex Louis Botha"
    },
    {
        zone_id: "lwzl",
        group_id: "blwuniuyogroup",
        value: "groupchurch",
        label: "GROUP CHURCH "
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cesummit",
        label: "CE Summit"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cecooperative",
        label: "CE Cooperative"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cenitle1",
        label: "CE Nitle 1"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cekonwea",
        label: "CE Konwea"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceanwai",
        label: "CE Anwai"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceagbor",
        value: "ceokpanam",
        label: "CE Okpanam"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceokpanam1",
        label: "CE Okpanam 1"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceibusa1",
        label: "CE Ibusa 1"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceokwe",
        label: "CE Okwe"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cehilton",
        label: "CE Hilton"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cecable",
        label: "CE Cable"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cekwale",
        label: "CE Kwale"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceogwashi-uku",
        label: "CE Ogwashi-Uku"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cebonsaac",
        label: "CE Bonsaac"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cedla",
        label: "CE Dla"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cechadef",
        label: "CE Chadef"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceisseleazagba",
        label: "CE Issele Azagba"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceissele-uku",
        label: "CE Issele-uku"
    },
    {
        zone_id: "nsevz2",
        group_id: "cecooperative",
        value: "cecooperative1",
        label: "CE Cooperative 1"
    },
    {
        zone_id: "saz1",
        group_id: "eastlondongroup",
        value: "cebraelyn",
        label: "CE Braelyn"
    },
    {
        zone_id: "nwz1",
        group_id: "cebnwsubgroup",
        value: "cegoningora",
        label: "CE GONINGORA"
    },
    {
        zone_id: "nwz1",
        group_id: "cebnwsubgroup",
        value: "cebnw2",
        label: "CE BNW 2 "
    },
    {
        zone_id: "nwz1",
        group_id: "kdnorthsubgroup",
        value: "cekigo",
        label: "CE KIGO"
    },
    {
        zone_id: "nwz1",
        group_id: "kdzonalchurch",
        value: "teensministry",
        label: "TEENSMINISTRY"
    },
    {
        zone_id: "nwz1",
        group_id: "kdzonalchurch",
        value: "church1",
        label: "CHURCH1"
    },
    {
        zone_id: "nwz1",
        group_id: "cebnwsubgroup",
        value: "church2",
        label: "CHURCH2"
    },
    {
        zone_id: "nwz1",
        group_id: "kdzonalchurch",
        value: "central2",
        label: "CENTRAL2"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebueamainchurch",
        label: "CE Buea Main Church"
    },
    {
        zone_id: "ewcvz4",
        group_id: "yaoundegroup2",
        value: "cejouvance",
        label: "CE Jouvance"
    },
    {
        zone_id: "ewcvz5",
        group_id: "ashaimangroup",
        value: "celolonya",
        label: "celolonya"
    },
    {
        zone_id: "lwusagrp3",
        group_id: "oasischurchbaltimore",
        value: "oasischurchbaltimore",
        label: "Oasis Church Baltimore"
    },
    {
        zone_id: "australia",
        group_id: "brisbanegroup",
        value: "christembassybrisbane",
        label: "Christ Embassy Brisbane"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "lusaka1",
        label: "Lusaka 1"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "lusaka2",
        label: "Lusaka 2"
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "cemaseru1",
        label: "CE Maseru 1"
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "cethetsanemegachurch",
        label: "CE Thetsane Mega Church"
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "cebochabela",
        label: "CE Bochabela"
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "cemotimposo",
        label: "CE Motimposo"
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "cematala",
        label: "CE Matala "
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "cehapita",
        label: "CE Ha Pita"
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "celithabaneng",
        label: "CE Lithabaneng"
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "ceabia",
        label: "CE Abia"
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "cequthing",
        label: "CE Quthing"
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "cemaputsoe",
        label: "CE Maputsoe "
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "cety",
        label: "CE TY"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "kabwata",
        label: "Kabwata"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "uptown",
        label: "Uptown"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "chelstone",
        label: "Chelstone"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "kabulonga",
        label: "Kabulonga"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "lusakanorth",
        label: "Lusaka North"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "massmedia",
        label: "Mass Media"
    },
    {
        zone_id: "australia",
        group_id: "perthgroup",
        value: "cemandurah",
        label: "CE Mandurah"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "matero",
        label: "Matero"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "apex",
        label: "Apex"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "livingstone1",
        label: "Livingstone 1"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "chibwe",
        label: "Chibwe"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "ndola",
        label: "Ndola"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "kitwe",
        label: "Kitwe"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "buchi",
        label: "Buchi"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "mufulira",
        label: "Mufulira"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "solwezi1",
        label: "Solwezi 1"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "solwezi2",
        label: "Solwezi 2"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "solwezi3",
        label: "Solwezi 3"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "kasama",
        label: "Kasama "
    },
    {
        zone_id: "savz3",
        group_id: "lesothogroup",
        value: "cehamotloheloa",
        label: "CE Ha Motloheloa"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "kafue1",
        label: "Kafue 1"
    },
    {
        zone_id: "savz3",
        group_id: "zambiagroup",
        value: "kafue3",
        label: "Kafue 3"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebamenda1",
        label: "CE Bamenda 1"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebamenda2",
        label: "CE Bamenda 2"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebamenda3",
        label: "CE Bamenda 3"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cegreatsoppo",
        label: "CE Great Soppo"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebokwaongo",
        label: "CE Bokwaongo"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebueatown",
        label: "CE Buea Town"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cemutengene",
        label: "CE Mutengene"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebomaka",
        label: "CE Bomaka"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cemuyuka",
        label: "CE Muyuka"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cetiko",
        label: "CE Tiko"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cenkambe",
        label: "CE Nkambe"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cenkongsamba",
        label: "CE Nkongsamba"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cekumba",
        label: "CE Kumba"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cetowngreen",
        label: "CE Town Green"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebafoussam",
        label: "CE Bafoussam"
    },
    {
        zone_id: "savz3",
        group_id: "eswatinigroup",
        value: "cemanzini",
        label: "CE MANZINI "
    },
    {
        zone_id: "savz3",
        group_id: "eswatinigroup",
        value: "celgcmbabane",
        label: "CE LGC MBABANE"
    },
    {
        zone_id: "savz3",
        group_id: "eswatinigroup",
        value: "cematsapha1",
        label: "CE MATSAPHA 1"
    },
    {
        zone_id: "savz3",
        group_id: "eswatinigroup",
        value: "cematsapha2",
        label: "CE MATSAPHA 2"
    },
    {
        zone_id: "savz3",
        group_id: "eswatinigroup",
        value: "centondozi",
        label: "CE NTONDOZI"
    },
    {
        zone_id: "savz3",
        group_id: "eswatinigroup",
        value: "cepiggspeak",
        label: "CE PIGGS PEAK"
    },
    {
        zone_id: "savz3",
        group_id: "eswatinigroup",
        value: "cenhlangano",
        label: "CE NHLANGANO "
    },
    {
        zone_id: "savz3",
        group_id: "eswatinigroup",
        value: "cesiphofaneni",
        label: "CE SIPHOFANENI "
    },
    {
        zone_id: "beninz1",
        group_id: "erediauwagroup",
        value: "tce",
        label: "TCE"
    },
    {
        zone_id: "savz2",
        group_id: "cepretoriagroup",
        value: "cesoshanguveblockl",
        label: "CE SOSHANGUVE BLOCK L"
    },
    {
        zone_id: "beninz1",
        group_id: "rm4",
        value: "flourish1",
        label: "FLOURISH1"
    },
    {
        zone_id: "beninz1",
        group_id: "rm4",
        value: "uwa",
        label: "UWA"
    },
    {
        zone_id: "beninz1",
        group_id: "rm4",
        value: "etete",
        label: "ETETE"
    },
    {
        zone_id: "beninz1",
        group_id: "rm4",
        value: "ugbor1",
        label: "UGBOR1"
    },
    {
        zone_id: "beninz1",
        group_id: "rm4",
        value: "amagba",
        label: "AMAGBA"
    },
    {
        zone_id: "beninz1",
        group_id: "rm4",
        value: "magnificent1",
        label: "MAGNIFICENT1"
    },
    {
        zone_id: "beninz1",
        group_id: "rm4",
        value: "abundantgrace",
        label: "ABUNDANTGRACE"
    },
    {
        zone_id: "beninz1",
        group_id: "rm4",
        value: "sapele_road",
        label: "SAPELE_ROAD"
    },
    {
        zone_id: "beninz1",
        group_id: "rm3",
        value: "ologbo",
        label: "OLOGBO"
    },
    {
        zone_id: "beninz1",
        group_id: "rm3",
        value: "lightchurch",
        label: "LIGHTCHURCH"
    },
    {
        zone_id: "beninz1",
        group_id: "rcm2",
        value: "triumphant",
        label: "TRIUMPHANT"
    },
    {
        zone_id: "beninz1",
        group_id: "wm2",
        value: "azchurch",
        label: "AZCHURCH"
    },
    {
        zone_id: "beninz1",
        group_id: "wm2",
        value: "pzchurch",
        label: "PZCHURCH"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cemarblehill",
        label: "CE Marble Hill"
    },
    {
        zone_id: "beninz1",
        group_id: "wm6",
        value: "shinninglightobe",
        label: "SHINNINGLIGHTOBE"
    },
    {
        zone_id: "beninz1",
        group_id: "wm6",
        value: "biu",
        label: "BIU"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceonichaugbo",
        label: "CE Onicha Ugbo"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceugbolu",
        label: "CE Ugbolu"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceibusaroad",
        label: "CE Ibusa road"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceillah",
        label: "CE Illah"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceubuluku",
        label: "CE UBULUKU"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cenitel2",
        label: "CE Nitel 2"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "censukwa",
        label: "CE Nsukwa"
    },
    {
        zone_id: "nsevz2",
        group_id: "cecooperative",
        value: "ceoldanwairoad",
        label: "CE Old Anwai Road"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceibusa2",
        label: "CE Ibusa 2"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceibusa3",
        label: "CE IBUSA 3"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceoldanwairoad1",
        label: "CE Old Anwai Road 1"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebova",
        label: "CE BOVA"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cemuea",
        label: "CE MUEA "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebokwango",
        label: "CE BOKWANGO "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cemunyenge",
        label: "CE Munyenge  "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cengaoundere",
        label: "CE Ngaoundere "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "ceekondotiti",
        label: "CE Ekondo Titi   "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "ceekok",
        label: "CE Ekok "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebangabakundu",
        label: "CE Banga Bakundu"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebandjoun",
        label: " CE Bandjoun"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cetamnja",
        label: "CE Tamnja  "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "celikomba",
        label: "CE Likomba "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebali",
        label: "CE Bali "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cemelong",
        label: " CE Melong   "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebamissing",
        label: " CE Bamissing  "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebesongabang",
        label: "CE Besongabang"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebafut",
        label: "CE Bafut "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cengomgham",
        label: "CE Ngomgham "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cecowstreet",
        label: "CE Cow Street "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebabanki",
        label: " CE Babanki "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cemile1kumba",
        label: "CE Mile 1 Kumba"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cemile16buea",
        label: "CE Mile 16 Buea"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cegaroua2",
        label: "CE Garoua 2 "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cegaroua1",
        label: "CE Garoua 1"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cestation",
        label: " CE Station  "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cefundong",
        label: "CE Fundong "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cembanga",
        label: "CE Mbanga "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cewum",
        label: "CE Wum "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cetombel",
        label: "CE Tombel "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cesanta",
        label: "CE Santa "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cendop",
        label: " CE Ndop "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cemenji",
        label: " CE Menji "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cembengwi",
        label: "CE Mbengwi"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cemamfe",
        label: "CE Mamfe "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cekumbo",
        label: "  CE Kumbo "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "ceekona",
        label: "CE Ekona"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "ceebonji",
        label: "CE Ebonji "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cedschang",
        label: "CE Dschang "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebinka",
        label: "CE Binka "
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebambui",
        label: " CE Bambui  "
    },
    {
        zone_id: "saz1",
        group_id: "newlandsgroup",
        value: "ceaucklandpark",
        label: "CE AUCKLAND PARK"
    },
    {
        zone_id: "saz1",
        group_id: "newlandsgroup",
        value: "roodepoort1",
        label: "ROODEPOORT1"
    },
    {
        zone_id: "saz1",
        group_id: "newlandsgroup",
        value: "roodepoort2",
        label: "ROODEPOORT2"
    },
    {
        zone_id: "saz1",
        group_id: "newlandsgroup",
        value: "princess",
        label: "PRINCESS"
    },
    {
        zone_id: "saz1",
        group_id: "newlandsgroup",
        value: "florida",
        label: "FLORIDA"
    },
    {
        zone_id: "saz1",
        group_id: "newlandsgroup",
        value: "emdeni",
        label: "EMDENI"
    },
    {
        zone_id: "saz1",
        group_id: "newlandsgroup",
        value: "braamfischer",
        label: "BRAAMFISCHER"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cefiango",
        label: "CE Fiango"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cemayorstreet",
        label: "CE Mayor Street"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cesmallsoppo",
        label: "CE Small Soppo"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cetikodoaula",
        label: "CE Tiko Doaula"
    },
    {
        zone_id: "ewcvz4",
        group_id: "bamendagroup",
        value: "cebueayouthchurch",
        label: "CE Buea youth church"
    },
    {
        zone_id: "lwzf",
        group_id: "futogroup",
        value: "blwfuto",
        label: "BLW FUTO"
    },
    {
        zone_id: "lwzf",
        group_id: "imsugroup",
        value: "blwimsu",
        label: "BLW IMSU"
    },
    {
        zone_id: "lwzf",
        group_id: "imsugroup",
        value: "blwimsuth",
        label: "BLW IMSUTH"
    },
    {
        zone_id: "lwzf",
        group_id: "futogroup",
        value: "blwnekede1",
        label: "BLW NEKEDE 1"
    },
    {
        zone_id: "lwzf",
        group_id: "futogroup",
        value: "blwnekede2",
        label: "BLW NEKEDE 2"
    },
    {
        zone_id: "lwzf",
        group_id: "futogroup",
        value: "blwuaes",
        label: "BLW UAES"
    },
    {
        zone_id: "lwzf",
        group_id: "futogroup",
        value: "blwalvan",
        label: "BLW ALVAN"
    },
    {
        zone_id: "lwzf",
        group_id: "futogroup",
        value: "blwimopolyomuma",
        label: "BLW IMOPOLY OMUMA"
    },
    {
        zone_id: "lwzf",
        group_id: "futogroup",
        value: "blwimopolymbano",
        label: "BLW IMOPOLY MBANO"
    },
    {
        zone_id: "wevz4",
        group_id: "ceberlingroup",
        value: "ceberlincentral",
        label: "CE Berlin Central"
    },
    {
        zone_id: "wevz4",
        group_id: "ceberlingroup",
        value: "cedortmund",
        label: "CE Dortmund"
    },
    {
        zone_id: "wevz4",
        group_id: "ceberlingroup",
        value: "ceaachen",
        label: "CE Aachen"
    },
    {
        zone_id: "wevz4",
        group_id: "ceberlingroup",
        value: "cebayern",
        label: "CE Bayern"
    },
    {
        zone_id: "wevz4",
        group_id: "ceberlingroup",
        value: "cemaxvorstadt-munichof",
        label: "CE MaxVorstadt-Munich OF"
    },
    {
        zone_id: "wevz4",
        group_id: "ceberlingroup",
        value: "cenagoldof",
        label: "CE Nagold OF"
    },
    {
        zone_id: "wevz4",
        group_id: "ceberlingroup",
        value: "cefreisingof",
        label: "CE Freising OF"
    },
    {
        zone_id: "wevz4",
        group_id: "cebremengroup",
        value: "cebremen",
        label: "CE Bremen"
    },
    {
        zone_id: "wevz4",
        group_id: "cebremengroup",
        value: "cehannover",
        label: "CE Hannover"
    },
    {
        zone_id: "wevz4",
        group_id: "cebremengroup",
        value: "cehamburg",
        label: "CE Hamburg"
    },
    {
        zone_id: "wevz4",
        group_id: "cebremengroup",
        value: "ceosnabr\u00fcckof",
        label: "CE Osnabr\u00fcck OF"
    },
    {
        zone_id: "wevz4",
        group_id: "cebremengroup",
        value: "cen\u00fcrnburgof",
        label: "CE N\u00fcrnburg OF"
    },
    {
        zone_id: "wevz4",
        group_id: "cebremengroup",
        value: "cekasselof",
        label: "CE Kassel OF"
    },
    {
        zone_id: "wevz4",
        group_id: "cefrankfurtgroup",
        value: "lwfrankfurtplaceofgrace",
        label: "LW Frankfurt Place of Grace"
    },
    {
        zone_id: "wevz4",
        group_id: "cefrankfurtgroup",
        value: "cewiesbaden",
        label: "CE Wiesbaden"
    },
    {
        zone_id: "wevz4",
        group_id: "cefrankfurtgroup",
        value: "cegiessen",
        label: "CE Giessen"
    },
    {
        zone_id: "wevz4",
        group_id: "cefrankfurtgroup",
        value: "cestuttgart",
        label: "CE Stuttgart"
    },
    {
        zone_id: "wevz4",
        group_id: "cefrankfurtgroup",
        value: "cebonn",
        label: "CE Bonn"
    },
    {
        zone_id: "wevz4",
        group_id: "cefrankfurtgroup",
        value: "cecologne",
        label: "CE Cologne"
    },
    {
        zone_id: "wevz4",
        group_id: "cefrankfurtgroup",
        value: "ceaschaffenburgof",
        label: "CE Aschaffenburg OF"
    },
    {
        zone_id: "wevz4",
        group_id: "cefrankfurtgroup",
        value: "ceboundlessgraceof",
        label: "CE Boundless Grace OF"
    },
    {
        zone_id: "wevz4",
        group_id: "ceoffenbachsubgroup",
        value: "ceoffenbach",
        label: "CE Offenbach"
    },
    {
        zone_id: "wevz4",
        group_id: "ceoffenbachsubgroup",
        value: "cehalle",
        label: "CE Halle"
    },
    {
        zone_id: "wevz4",
        group_id: "ceoffenbachsubgroup",
        value: "cebonnrhein-sieg",
        label: "CE Bonn Rhein-Sieg"
    },
    {
        zone_id: "wevz4",
        group_id: "ceoffenbachsubgroup",
        value: "cedarmstadt",
        label: "CE Darmstadt"
    },
    {
        zone_id: "wevz4",
        group_id: "ceabundantgracesubgroup",
        value: "ceabundantgracedortmund",
        label: "CE Abundant Grace Dortmund"
    },
    {
        zone_id: "wevz4",
        group_id: "ceabundantgracesubgroup",
        value: "cefrieburg",
        label: "CE Frieburg"
    },
    {
        zone_id: "wevz4",
        group_id: "ceabundantgracesubgroup",
        value: "ceregensburg",
        label: "CE Regensburg"
    },
    {
        zone_id: "wevz4",
        group_id: "ceabundantgracesubgroup",
        value: "ceamwasserturmof",
        label: "CE Am Wasserturm OF"
    },
    {
        zone_id: "wevz4",
        group_id: "ceabundantgracesubgroup",
        value: "cehornerrehnbahnof",
        label: "CE Hornerrehnbahn OF"
    },
    {
        zone_id: "wevz4",
        group_id: "cedusseldorfsubgroup",
        value: "cedusseldorf",
        label: "CE Dusseldorf"
    },
    {
        zone_id: "wevz4",
        group_id: "cedusseldorfsubgroup",
        value: "ceduisburg",
        label: "CE Duisburg"
    },
    {
        zone_id: "wevz4",
        group_id: "cedusseldorfsubgroup",
        value: "ceoberhausenof",
        label: "CE Oberhausen OF"
    },
    {
        zone_id: "lwzf",
        group_id: "abagroup",
        value: "blwmouau",
        label: "BLW MOUAU"
    },
    {
        zone_id: "lwzf",
        group_id: "abagroup",
        value: "blwacerta",
        label: "BLW ACERTA"
    },
    {
        zone_id: "lwzf",
        group_id: "abagroup",
        value: "blwabsuth",
        label: "BLW ABSUTH"
    },
    {
        zone_id: "lwzf",
        group_id: "abagroup",
        value: "blwabsuumuahia",
        label: "BLW ABSU UMUAHIA"
    },
    {
        zone_id: "lwzf",
        group_id: "imsugroup",
        value: "blwaspoly",
        label: "BLW ASPOLY"
    },
    {
        zone_id: "lwzf",
        group_id: "imsugroup",
        value: "blwkomu",
        label: "BLW KOMU"
    },
    {
        zone_id: "lwzf",
        group_id: "imsugroup",
        value: "blwfecolart",
        label: "BLW FECOLART"
    },
    {
        zone_id: "lwzf",
        group_id: "blwabsugroup",
        value: "blwabsu",
        label: "BLW ABSU"
    },
    {
        zone_id: "lwzf",
        group_id: "blwabsugroup",
        value: "blwguu",
        label: "BLW GUU"
    },
    {
        zone_id: "lwzf",
        group_id: "blwabsugroup",
        value: "blwfecai",
        label: "BLW FECAI"
    },
    {
        zone_id: "nwz1",
        group_id: "kakurisubgroup",
        value: "cekudende",
        label: "CEKUDENDE"
    },
    {
        zone_id: "nwz1",
        group_id: "kdnorthsubgroup",
        value: "cemetro",
        label: "CEMETRO"
    },
    {
        zone_id: "nwz1",
        group_id: "sabosubgroup",
        value: "sabo",
        label: "SABO"
    },
    {
        zone_id: "nwz1",
        group_id: "cebnwsubgroup",
        value: "m\/do",
        label: "M\/DO"
    },
    {
        zone_id: "nwz1",
        group_id: "sabosubgroup",
        value: "marabarido",
        label: "MARABARIDO"
    },
    {
        zone_id: "nwz1",
        group_id: "sabosubgroup",
        value: "mahuta",
        label: "MAHUTA"
    },
    {
        zone_id: "lz5",
        group_id: "celekki",
        value: "lekkipfcc",
        label: "LEKKIPFCC "
    },
    {
        zone_id: "lz5",
        group_id: "ceabijo-tedogroup",
        value: "abijotedopfcc",
        label: "ABIJO TEDO PFCC"
    },
    {
        zone_id: "lz5",
        group_id: "ceajahgroup",
        value: "ajahpfcc",
        label: "AJAHPFCC"
    },
    {
        zone_id: "lz5",
        group_id: "cechevrongroup",
        value: "chevronpfcc",
        label: "CHEVRONPFCC"
    },
    {
        zone_id: "lz5",
        group_id: "ikoyigroup",
        value: "ikoyipfcc",
        label: "IKOYIPFCC"
    },
    {
        zone_id: "lz5",
        group_id: "ceikoyi2",
        value: "ikoyi2pfcc",
        label: "IKOYI2PFCC"
    },
    {
        zone_id: "lwzc",
        group_id: "zonecgroup1",
        value: "blwunilag1",
        label: "BLW UNILAG 1"
    },
    {
        zone_id: "lwzc",
        group_id: "zonecgroup1",
        value: "blwunilag2",
        label: "BLW UNILAG 2"
    },
    {
        zone_id: "lwzc",
        group_id: "zonecgroup1",
        value: "blwf.c.e",
        label: "BLW F.C.E"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup2",
        value: "blwmedilag",
        label: "BLW MEDILAG"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup2",
        value: "blwlasuojo",
        label: "BLW LASU OJO"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup2",
        value: "blwlasuepe",
        label: "BLW LASU EPE"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup2",
        value: "blwlaspotechsurulere",
        label: "BLW LASPOTECH SURULERE"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup2",
        value: "blwyabatechepe",
        label: "BLW YABATECH EPE"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup2",
        value: "blwlasucom",
        label: "BLW LASUCOM"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup4",
        value: "blwoou",
        label: "BLW OOU"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup4",
        value: "blwtasued",
        label: "BLW TASUED"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup4",
        value: "blwconvenantuniversity",
        label: "BLW CONVENANT UNIVERSITY"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup4",
        value: "blwaapoly",
        label: "BLW AA POLY"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup5",
        value: "blwyabatech",
        label: "BLW YABATECH"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup2",
        value: "blwlaspotechisolo",
        label: "BLW LASPOTECH ISOLO"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup5",
        value: "blwlaspotechikorodu",
        label: "BLW LASPOTECH IKORODU"
    },
    {
        zone_id: "lwzc",
        group_id: "blwzonecgroup5",
        value: "gracepolytechnic",
        label: "GRACE POLYTECHNIC"
    },
    {
        zone_id: "lwzc",
        group_id: "fgcc",
        value: "blwbabcock",
        label: "BLW BABCOCK"
    },
    {
        zone_id: "lwusagrp1",
        group_id: "usagroup1",
        value: "lwdallas",
        label: "LW Dallas"
    },
    {
        zone_id: "lwusagrp1",
        group_id: "usagroup1",
        value: "lwflorida1",
        label: "LW Florida 1"
    },
    {
        zone_id: "lwusagrp1",
        group_id: "usagroup1",
        value: "lwflorida2",
        label: "LW Florida 2"
    },
    {
        zone_id: "lwusagrp1",
        group_id: "usagroup1",
        value: "lwunt",
        label: "LW UNT"
    },
    {
        zone_id: "lwusagrp1",
        group_id: "usagroup1",
        value: "lwtwu",
        label: "LW TWU"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "cerustenburg",
        label: "CERustenburg"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "cemafikeng",
        label: "CE Mafikeng"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "cezeerust",
        label: "CE Zeerust"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "ceitsoseng",
        label: "CE Itsoseng"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "cejouberton",
        label: "CE Jouberton"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "ceschweizerreneke",
        label: "CE Schweizerreneke"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "cetaung",
        label: "CE Taung"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "cemmabatho",
        label: "CE Mmabatho"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "cekhuma",
        label: "CE Khuma"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "cekanana",
        label: "CE Kanana"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "cekleksdorp",
        label: "CE Kleksdorp"
    },
    {
        zone_id: "reoeon",
        group_id: "westafricareongroups",
        value: "reonsouthsouth2",
        label: "reonsouthsouth2"
    },
    {
        zone_id: "wevz4",
        group_id: "cebremengroup",
        value: "ceosnabrueckof",
        label: "CE Osnabrueck OF"
    },
    {
        zone_id: "wevz4",
        group_id: "cebremengroup",
        value: "cenuernburgof",
        label: "CE Nuernburg OF"
    },
    {
        zone_id: "torz",
        group_id: "torontogroup",
        value: "cewinnipeg",
        label: "CE WINNIPEG"
    },
    {
        zone_id: "torz",
        group_id: "torontogroup",
        value: "cevaughan",
        label: "CE VAUGHAN"
    },
    {
        zone_id: "torz",
        group_id: "torontogroup",
        value: "cebramptonnorth",
        label: "CE BRAMPTON NORTH"
    },
    {
        zone_id: "torz",
        group_id: "calgarygroup",
        value: "cecalgaryne",
        label: "CE CALGARY NE"
    },
    {
        zone_id: "torz",
        group_id: "torontogroup",
        value: "cemissisaguasubgroup",
        label: "CE MISSISAGUA SUB GROUP"
    },
    {
        zone_id: "torz",
        group_id: "torontogroup",
        value: "cedonvalleysubgroup",
        label: "CE DON VALLEY SUB GROUP"
    },
    {
        zone_id: "torz",
        group_id: "miltongroup",
        value: "ceoakville",
        label: "CE OAKVILLE"
    },
    {
        zone_id: "torz",
        group_id: "miltongroup",
        value: "cestcatherine",
        label: "CE ST CATHERINE"
    },
    {
        zone_id: "torz",
        group_id: "torontogroup",
        value: "cebramptonwest",
        label: "CE BRAMPTON WEST"
    },
    {
        zone_id: "torz",
        group_id: "scaboroughgroup",
        value: "celondon",
        label: "CE LONDON"
    },
    {
        zone_id: "torz",
        group_id: "scaboroughgroup",
        value: "ceoshawa",
        label: "CE OSHAWA"
    },
    {
        zone_id: "torz",
        group_id: "scaboroughgroup",
        value: "ceajax",
        label: "CE AJAX"
    },
    {
        zone_id: "torz",
        group_id: "torontogroup",
        value: "cebramptoneast",
        label: "CE BRAMPTON EAST"
    },
    {
        zone_id: "torz",
        group_id: "torontogroup",
        value: "cehamilton",
        label: "CE HAMILTON"
    },
    {
        zone_id: "blwugandaz",
        group_id: "blwugandagroup",
        value: "blwkiu-wc",
        label: "BLW KIU-WC"
    },
    {
        zone_id: "blwugandaz",
        group_id: "blwugandagroup",
        value: "blwmakerere",
        label: "BLW MAKERERE"
    },
    {
        zone_id: "blwugandaz",
        group_id: "blwugandagroup",
        value: "blwkabale",
        label: "BLW KABALE"
    },
    {
        zone_id: "blwugandaz",
        group_id: "blwugandagroup",
        value: "blwiuea",
        label: "BLW IUEA"
    },
    {
        zone_id: "blwugandaz",
        group_id: "blwugandagroup",
        value: "blwkampalauniversity",
        label: "BLW KAMPALA UNIVERSITY"
    },
    {
        zone_id: "blwugandaz",
        group_id: "blwugandagroup",
        value: "blwkiumain",
        label: "BLW KIU MAIN"
    },
    {
        zone_id: "blwugandaz",
        group_id: "blwugandagroup",
        value: "blwsoroti",
        label: "BLW SOROTI"
    },
    {
        zone_id: "lwzf",
        group_id: "futogroup",
        value: "blwfutogroup1",
        label: "BLW FUTO GROUP 1"
    },
    {
        zone_id: "lwzf",
        group_id: "futogroup",
        value: "blwfutogroup2",
        label: "BLW FUTO GROUP 2"
    },
    {
        zone_id: "lwzf",
        group_id: "futogroup",
        value: "blwfutogroup3",
        label: "BLW FUTO GROUP 3"
    },
    {
        zone_id: "lwghanaza",
        group_id: "legongroup",
        value: "blwuniversityofghana",
        label: "BLW UNIVERSITY OF GHANA"
    },
    {
        zone_id: "lwghanaza",
        group_id: "uccgroup",
        value: "blwucc",
        label: "BLW UCC"
    },
    {
        zone_id: "lwghanaza",
        group_id: "uccgroup",
        value: "blwuew",
        label: "BLW UEW"
    },
    {
        zone_id: "lwghanaza",
        group_id: "ashesi",
        value: "blwktu",
        label: "BLW KTU"
    },
    {
        zone_id: "lwghanaza",
        group_id: "rmugroup",
        value: "blwrmu",
        label: "BLW RMU"
    },
    {
        zone_id: "lwghanaza",
        group_id: "burkinafasogroup",
        value: "blw2iekamboinse",
        label: "BLW 2IE KAMBOINSE"
    },
    {
        zone_id: "lwghanaza",
        group_id: "cugroup",
        value: "blwmuc",
        label: "BLW MUC"
    },
    {
        zone_id: "lwghanaza",
        group_id: "legongroup",
        value: "blwuniversityoflome",
        label: "BLW UNIVERSITY OF LOME"
    },
    {
        zone_id: "lwghanaza",
        group_id: "rmugroup",
        value: "blwatu",
        label: "BLW ATU"
    },
    {
        zone_id: "lwghanaza",
        group_id: "upsagroup",
        value: "blwugcc",
        label: "BLW UGCC"
    },
    {
        zone_id: "lwghanaza",
        group_id: "uccgroup",
        value: "blwumat",
        label: "BLW UMAT"
    },
    {
        zone_id: "lwghanaza",
        group_id: "uccgroup",
        value: "blwcctu",
        label: "BLW CCTU"
    },
    {
        zone_id: "lwghanaza",
        group_id: "uccgroup",
        value: "blwwntc",
        label: "BLW WNTC"
    },
    {
        zone_id: "nnevz1",
        group_id: "cezonalchurch",
        value: "ceyola",
        label: "CE Yola"
    },
    {
        zone_id: "nnevz1",
        group_id: "cezonalchurch",
        value: "ceteenschurch",
        label: "CE Teens Church"
    },
    {
        zone_id: "nnevz1",
        group_id: "cezonalchurch",
        value: "ceyouthchurchyola",
        label: "CE Youth Church Yola"
    },
    {
        zone_id: "nnevz1",
        group_id: "cezonalchurch",
        value: "cebachure",
        label: "CE Bachure"
    },
    {
        zone_id: "nnevz1",
        group_id: "cebarracksroadgroup",
        value: "cebarracksroad",
        label: "CE Barracks Road"
    },
    {
        zone_id: "nnevz1",
        group_id: "cebarracksroadgroup",
        value: "cewaurojabbe",
        label: "CE Wauro Jabbe"
    },
    {
        zone_id: "nnevz1",
        group_id: "cebarracksroadgroup",
        value: "ceyolatown",
        label: "CE Yola Town"
    },
    {
        zone_id: "nnevz1",
        group_id: "cebarracksroadgroup",
        value: "cedemsawo",
        label: "CE Demsawo"
    },
    {
        zone_id: "nnevz1",
        group_id: "cenumangroup",
        value: "cenuman1",
        label: "CE Numan 1"
    },
    {
        zone_id: "nnevz1",
        group_id: "cenumangroup",
        value: "cenuman2",
        label: "CE Numan 2"
    },
    {
        zone_id: "nnevz1",
        group_id: "cenumangroup",
        value: "cedemsa",
        label: "CE Demsa"
    },
    {
        zone_id: "nnevz1",
        group_id: "cefederalhousingestategroup",
        value: "cefederalhousingestate",
        label: "CE Federal Housing Estate"
    },
    {
        zone_id: "nnevz1",
        group_id: "cefederalhousingestategroup",
        value: "cemubiroad",
        label: "CE Mubi Road"
    },
    {
        zone_id: "nnevz1",
        group_id: "cefederalhousingestategroup",
        value: "celande",
        label: "CE Lande"
    },
    {
        zone_id: "nnevz1",
        group_id: "cemubigroup",
        value: "cemubigra",
        label: "CE Mubi GRA"
    },
    {
        zone_id: "nnevz1",
        group_id: "cemubigroup",
        value: "cemubigroupchurch",
        label: "CE Mubi Group Church"
    },
    {
        zone_id: "nnevz1",
        group_id: "cemubigroup",
        value: "cekabang",
        label: "CE Kabang"
    },
    {
        zone_id: "lz2",
        group_id: "zonalgroup",
        value: "cebigchurch",
        label: "CE Bigchurch"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "ceeverton",
        label: "CE Everton"
    },
    {
        zone_id: "saz1",
        group_id: "newlandsgroup",
        value: "honeydew",
        label: "HONEYDEW"
    },
    {
        zone_id: "lwusagrp3",
        group_id: "oasischurchboston",
        value: "oasischurchboston",
        label: "Oasis Church Boston "
    },
    {
        zone_id: "lwusagrp3",
        group_id: "oasischurchatlanta",
        value: "oasischurchatlanta",
        label: "Oasis Church Atlanta"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupa",
        value: "blwuniben",
        label: "BLW UNIBEN"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupc",
        value: "blwbiuheritagecampus",
        label: "BLW BIU HERITAGE CAMPUS"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupb",
        value: "blwbiulegacycampus",
        label: "BLW BIU LEGACY CAMPUS"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupc",
        value: "blwbiulegacy",
        label: "BLW BIU LEGACY "
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupd",
        value: "blwoghara",
        label: "BLW OGHARA"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupd",
        value: "blwdeltastatecollegeofeducation,mosogar",
        label: "BLW DELTA STATE COLLEGE OF EDUCATION, MOSOGAR"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupd",
        value: "blwwesterndeltauniversity,oghara",
        label: "BLW WESTERN DELTA UNIVERSITY, OGHARA"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupe",
        value: "blwfupre",
        label: "BLW FUPRE"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupe",
        value: "blwpti",
        label: "BLW PTI"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupe",
        value: "blwtemplegatepolytechnic",
        label: "BLW TEMPLE GATE POLYTECHNIC"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupf",
        value: "blwoleh",
        label: "BLW OLEH"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupf",
        value: "blwedwinclarkuniversity",
        label: "BLW EDWIN CLARK UNIVERSITY"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupf",
        value: "blwdelscotech",
        label: "BLW DELSCOTECH"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupg",
        value: "blwiuo",
        label: "BLW IUO"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupg",
        value: "blwussenpolytechnic",
        label: "BLW USSEN POLYTECHNIC"
    },
    {
        zone_id: "ewce3b",
        group_id: "luziragroup2",
        value: "mbuya2",
        label: "MBUYA2"
    },
    {
        zone_id: "lwghanaza",
        group_id: "legongroup",
        value: "blwgimpa",
        label: "BLW GIMPA"
    },
    {
        zone_id: "saz1",
        group_id: "rusternburggroup",
        value: "cevryburg",
        label: "CE Vryburg"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "cebexleyheath",
        label: "CE BEXLEYHEATH"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "cebromley",
        label: "CE BROMLEY"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "cecatford",
        label: "CE CATFORD"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "ceeltham",
        label: "CE ELTHAM"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "cecolchester2",
        label: "CE COLCHESTER 2"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "ceoldham",
        label: "CE OLDHAM"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "cecrystalpalace",
        label: "CE CRYSTAL PALACE"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "sidcupoutreachfellowship",
        label: "SIDCUP OUTREACH FELLOWSHIP"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "maidstoneoutreachfellowship",
        label: "MAIDSTONE OUTREACH FELLOWSHIP"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "sydenhamoutreachfellowship",
        label: "SYDENHAM OUTREACH FELLOWSHIP"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "ceorpington",
        label: "CE ORPINGTON"
    },
    {
        zone_id: "lsza",
        group_id: "reonnetworks",
        value: "mercyseat",
        label: "Mercyseat"
    },
    {
        zone_id: "lsza",
        group_id: "reonnetworks",
        value: "zioncity",
        label: "zioncity"
    },
    {
        zone_id: "lwzj",
        group_id: "blwzonejgroupg",
        value: "blwshakapolytechnic",
        label: "BLW SHAKA POLYTECHNIC"
    },
    {
        zone_id: "wevz4",
        group_id: "cebremengroup",
        value: "cehamburg2of",
        label: "CE Hamburg 2 OF"
    },
    {
        zone_id: "lz2",
        group_id: "okokogroup",
        value: "ceokoko2",
        label: "CE Okoko2"
    },
    {
        zone_id: "accraz",
        group_id: "domegroup",
        value: "cepillar2",
        label: "cepillar2"
    },
    {
        zone_id: "accraz",
        group_id: "takoradi1group",
        value: "cetakoradigroupchurch",
        label: "cetakoradigroupchurch"
    },
    {
        zone_id: "accraz",
        group_id: "atomicgroup",
        value: "ceatomic",
        label: "CE ATOMIC"
    },
    {
        zone_id: "accraz",
        group_id: "atomicgroup",
        value: "ceablekumablockfactory",
        label: "CE ABLEKUMABLOCKFACTORY"
    },
    {
        zone_id: "lz2",
        group_id: "dopemugroup",
        value: "lifesaver",
        label: "lifesaver"
    },
    {
        zone_id: "lz2",
        group_id: "lz2",
        value: "lz",
        label: "lz"
    },
    {
        zone_id: "lz2",
        group_id: "lz2",
        value: "lz2",
        label: "lz2"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cepostoffice",
        label: "CE POST OFFICE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cecooperative",
        value: "ceachalibuzor",
        label: "CE ACHALIBUZOR"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cecommisionerhouse",
        label: "CE COMMISIONER HOUSE"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceroadsafety",
        label: "CE ROAD SAFETY"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cedla2",
        label: "CE DLA 2"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cegraasaba",
        label: "CE GRA ASABA"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cearea74",
        label: "CE AREA 74"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cecorearea",
        label: "CE CORE AREA"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceubulukiti",
        label: "CE UBULUKITI"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ibusa4",
        label: "IBUSA 4"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceezenei",
        label: "CE EZENEI"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cekwale2",
        label: "CE KWALE 2"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceslotnnebisiroad",
        label: "CE SLOT NNEBISI ROAD"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceokpanam2",
        label: "CE OKPANAM  2"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceaggsroad",
        label: "CE AGGS ROAD"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceezi",
        label: "CE EZI"
    },
    {
        zone_id: "abeakutamc",
        group_id: "abeokutagroup",
        value: "cemcabkcentral",
        label: "CEmcabkcentral"
    },
    {
        zone_id: "abeakutamc",
        group_id: "abeokutagroup",
        value: "cemcabksouth",
        label: "CEmcabksouth"
    },
    {
        zone_id: "abeakutamc",
        group_id: "abeokutagroup",
        value: "cemcabknorth",
        label: "CEmcabknorth"
    },
    {
        zone_id: "abeakutamc",
        group_id: "abeokutagroup",
        value: "cemcabkyoruba",
        label: "CEmcabkyoruba"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup1",
        value: "manhattan",
        label: "Manhattan"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup1",
        value: "manhattanteenschurch",
        label: "ManhattanTeensChurch"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup1",
        value: "brooklyn",
        label: "Brooklyn"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup1",
        value: "jerseycity",
        label: "JerseyCity"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup1",
        value: "hackensack",
        label: "Hackensack"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup1",
        value: "albany",
        label: "Albany"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "bronx",
        label: "Bronx"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup1",
        value: "union",
        label: "Union"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "ceunion",
        label: "CEUnion"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "hamilton",
        label: "Hamilton"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "easthartford",
        label: "EastHartford"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "queens",
        label: "Queens"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "orange",
        label: "Orange"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "statenisland",
        label: "StatenIsland"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "westchester",
        label: "Westchester"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "acts29youthchurch",
        label: "Acts29YouthChurch"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "northbergen",
        label: "NorthBergen"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolispacificgroup",
        value: "hawaii",
        label: "Hawaii"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolispacificgroup",
        value: "honolulu",
        label: "Honolulu"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolispacificgroup",
        value: "alaska",
        label: "Alaska"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolispacificgroup",
        value: "washingtonstate",
        label: "WashingtonState"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolispacificgroup",
        value: "americansamoa",
        label: "AmericanSamoa"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolispacificgroup",
        value: "lasvegas",
        label: "LasVegas"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolispacificgroup",
        value: "lawton",
        label: "Lawton"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolispacificgroup",
        value: "segeorgia",
        label: "SEGeorgia"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolispacificgroup",
        value: "kaneohe",
        label: "Kaneohe"
    },
    {
        zone_id: "torz",
        group_id: "calgarygroup",
        value: "cewhitecourt",
        label: "CEWHITECOURT"
    },
    {
        zone_id: "abeakutamc",
        group_id: "abeokutagroup",
        value: "cerhapshare",
        label: "CErhapshare"
    },
    {
        zone_id: "abavz",
        group_id: "testgroupa",
        value: "testchurcha",
        label: "TestChurchA"
    },
    {
        zone_id: "wevz3",
        group_id: "cebergamo",
        value: "cebergamo",
        label: "CEBergamo"
    },
    {
        zone_id: "wevz3",
        group_id: "cebergamo",
        value: "ceravenna",
        label: "CERAVENNA"
    },
    {
        zone_id: "wevz3",
        group_id: "cebergamo",
        value: "cevenice",
        label: "CEVENICE"
    },
    {
        zone_id: "wevz3",
        group_id: "cebergamo",
        value: "cevenice2",
        label: "CEVENICE2"
    },
    {
        zone_id: "wevz3",
        group_id: "cebergamo",
        value: "ceportugruaro",
        label: "CEPORTUGRUARO"
    },
    {
        zone_id: "wevz3",
        group_id: "cebergamo",
        value: "cecesena",
        label: "CECESENA"
    },
    {
        zone_id: "wevz3",
        group_id: "cebergamo",
        value: "cetrieste",
        label: "CETRIESTE"
    },
    {
        zone_id: "wevz3",
        group_id: "cebologna",
        value: "cebologna",
        label: "CEBOLOGNA"
    },
    {
        zone_id: "wevz3",
        group_id: "cebologna",
        value: "cemantova",
        label: "CEMANTOVA"
    },
    {
        zone_id: "wevz3",
        group_id: "cebologna",
        value: "cetreviso",
        label: "CETREVISO"
    },
    {
        zone_id: "wevz3",
        group_id: "cebergamo",
        value: "cemodena",
        label: "CEMODENA"
    },
    {
        zone_id: "wevz3",
        group_id: "cebologna",
        value: "cereggioemilia",
        label: "CEREGGIOEMILIA"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan1",
        value: "cemilan1",
        label: "CEMILAN1"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan1",
        value: "cemilan2",
        label: "CEMILAN2"
    },
    {
        zone_id: "wevz3",
        group_id: "cebergamo",
        value: "cetorino",
        label: "CETORINO"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan1",
        value: "ceverona",
        label: "CEVERONA"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan1",
        value: "ceverona2",
        label: "CEVERONA2"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan1",
        value: "cepordenon",
        label: "CEPORDENON"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan1",
        value: "cetrento",
        label: "CETRENTO"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan1",
        value: "cefirenze",
        label: "CEFIRENZE"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan2",
        value: "cepadova",
        label: "CEPADOVA"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan2",
        value: "cerome1",
        label: "CEROME1"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan2",
        value: "cerome2",
        label: "CEROME2"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan2",
        value: "cerome3",
        label: "CEROME3"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan2",
        value: "cevicenza",
        label: "CEVICENZA"
    },
    {
        zone_id: "wevz3",
        group_id: "cemilan2",
        value: "cerovigo",
        label: "CEROVIGO"
    },
    {
        zone_id: "wevz3",
        group_id: "cenapoli",
        value: "cenapoli",
        label: "CENAPOLI"
    },
    {
        zone_id: "wevz3",
        group_id: "cethun",
        value: "cethun",
        label: "CETHUN"
    },
    {
        zone_id: "wevz3",
        group_id: "cethun",
        value: "cebern",
        label: "CEBERN"
    },
    {
        zone_id: "wevz3",
        group_id: "brescia",
        value: "cebrescia",
        label: "CEBRESCIA"
    },
    {
        zone_id: "wevz3",
        group_id: "brescia",
        value: "cecremona",
        label: "CECREMONA"
    },
    {
        zone_id: "wevz3",
        group_id: "brescia",
        value: "ceparma",
        label: "CEPARMA"
    },
    {
        zone_id: "wevz3",
        group_id: "brescia",
        value: "cecomo",
        label: "CECOMO"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "cegeneva",
        label: "CEGENEVA"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "lausanne",
        label: "LAUSANNE"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "cegraceandfaithlausanne",
        label: "CEGRACEANDFAITHLAUSANNE"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "cezurich",
        label: "CEZURICH"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "cezurich2",
        label: "CEZURICH2"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "cewezikon",
        label: "CEWEZIKON"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "cebasel2",
        label: "CEBASEL2"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "ceneuchatel",
        label: "CENEUCHATEL"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "cefinland",
        label: "CEFINLAND"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "cedenmark",
        label: "CEDENMARK"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "ceviennaaustria",
        label: "CEVIENNAAUSTRIA"
    },
    {
        zone_id: "wevz3",
        group_id: "cegeneva",
        value: "cegrazaustria",
        label: "CEGRAZAUSTRIA"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "lifesprings",
        label: "LIFESPRINGS"
    },
    {
        zone_id: "texasz1",
        group_id: "lusacalg",
        value: "celwusaoregon",
        label: "CELWUSAOREGON"
    },
    {
        zone_id: "texasz1",
        group_id: "lusacalg",
        value: "celwusaboston",
        label: "CELWUSABOSTON"
    },
    {
        zone_id: "texasz1",
        group_id: "lusacalg",
        value: "celwusacalifornia",
        label: "CELWUSACALIFORNIA"
    },
    {
        zone_id: "lsza",
        group_id: "bariga",
        value: "ilaje",
        label: "Ilaje"
    },
    {
        zone_id: "lsza",
        group_id: "ojota",
        value: "ojotawest",
        label: "Ojotawest"
    },
    {
        zone_id: "lsza",
        group_id: "ojota",
        value: "ojotawest2",
        label: "Ojotawest2"
    },
    {
        zone_id: "lsza",
        group_id: "cityofgrace",
        value: "cityofgrace",
        label: "Cityofgrace"
    },
    {
        zone_id: "lsza",
        group_id: "cityofgrace",
        value: "rhemaplace",
        label: "RhemaPlace"
    },
    {
        zone_id: "lsza",
        group_id: "cityofgrace",
        value: "millenniumestate",
        label: "MillenniumEstate"
    },
    {
        zone_id: "lsza",
        group_id: "cityofgrace",
        value: "heritageplace",
        label: "HeritagePlace"
    },
    {
        zone_id: "lsza",
        group_id: "cityofgrace",
        value: "kingshipcenter",
        label: "KingshipCenter"
    },
    {
        zone_id: "lsza",
        group_id: "cityofgrace",
        value: "boundlesslove",
        label: "BoundlessLove"
    },
    {
        zone_id: "lsza",
        group_id: "cityofgrace",
        value: "abundantgracee",
        label: "Abundantgracee"
    },
    {
        zone_id: "lsza",
        group_id: "soluyi",
        value: "estaportavenue",
        label: "EstaportAvenue"
    },
    {
        zone_id: "lsza",
        group_id: "soluyi",
        value: "hospitalrd2",
        label: "HospitalRd2"
    },
    {
        zone_id: "lsza",
        group_id: "oworo",
        value: "oworo1",
        label: "Oworo1"
    },
    {
        zone_id: "lsza",
        group_id: "oworo",
        value: "heavenavenue",
        label: "HeavenAvenue"
    },
    {
        zone_id: "lsza",
        group_id: "oworo",
        value: "ferrychurch",
        label: "FerryChurch"
    },
    {
        zone_id: "lsza",
        group_id: "ladilak",
        value: "ifako",
        label: "Ifako"
    },
    {
        zone_id: "lsza",
        group_id: "ladilak",
        value: "gloryland",
        label: "Gloryland"
    },
    {
        zone_id: "lsza",
        group_id: "ladilak",
        value: "oasiscenter",
        label: "Oasiscenter"
    },
    {
        zone_id: "lsza",
        group_id: "ladilak",
        value: "victory",
        label: "Victory"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup7",
        value: "loveworldchurchberger",
        label: "LOVEWORLDCHURCHBERGER"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "bellingham",
        label: "BELLINGHAM"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "beckenham",
        label: "BECKENHAM"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup2",
        value: "loveworldchurchajah1",
        label: "LOVEWORLDCHURCHAJAH1"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup2",
        value: "loveworldchurchajah2",
        label: "loveworldchurchajah2"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup2",
        value: "loveworldchurchlekki1",
        label: "loveworldchurchlekki1"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup2",
        value: "loveworldchurchlekki2",
        label: "loveworldchurchlekki2"
    },
    {
        zone_id: "abavz",
        group_id: "testgroupone",
        value: "testchurchone",
        label: "Test Church One"
    },
    {
        zone_id: "abavz",
        group_id: "testgrouptwo",
        value: "testchurchtwo",
        label: "Test Church Two"
    },
    {
        zone_id: "abavz",
        group_id: "testgroupthree",
        value: "testchurchthree",
        label: "Test Church Three"
    },
    {
        zone_id: "abavz",
        group_id: "testgroupone",
        value: "testchurchfour",
        label: "Test Church Four"
    },
    {
        zone_id: "yolnda",
        group_id: "xyzgroup",
        value: "kkchurch",
        label: "kkchurch"
    },
    {
        zone_id: "nswvz1",
        group_id: "ceibadansouthgroup",
        value: "cechurch1",
        label: "CECHURCH1"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cecalavi",
        label: "cecalavi"
    },
    {
        zone_id: "ewcvz3",
        group_id: "airportroadgroup",
        value: "dfdf",
        label: "dfdf"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup4",
        value: "loveworldchurchcalabar",
        label: "loveworldchurchcalabar"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup5",
        value: "loveworldchurchsomolu",
        label: "loveworldchurchsomolu"
    },
    {
        zone_id: "nswvz1",
        group_id: "ceibadansouthgroup",
        value: "cechurch2",
        label: "CECHURCH2"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ewcvz3",
        value: "kingsklasspcf",
        label: "Kings klass PCF"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ewcvz3",
        value: "rhemapcf",
        label: "Rhema PCF"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ewcvz3",
        value: "cemainchurchkingskclasspcf",
        label: "CE MAIN CHURCH KINGS KCLASS PCF"
    },
    {
        zone_id: "mcc",
        group_id: "mcc",
        value: "centralchurch",
        label: "central church"
    },
    {
        zone_id: "abavz",
        group_id: "testgroupb",
        value: "testchurchb",
        label: "TestChurchB"
    },
    {
        zone_id: "lvz",
        group_id: "lvz",
        value: "testchurchowor",
        label: "TestchurchOwor"
    },
    {
        zone_id: "lvz",
        group_id: "lcachurch10",
        value: "quest111",
        label: "Quest111"
    },
    {
        zone_id: "lvz",
        group_id: "lcachurch10",
        value: "quest112",
        label: "Quest112"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ewcvz3",
        value: "testchurch1",
        label: "testchurch1"
    },
    {
        zone_id: "lvz",
        group_id: "lcachurch10",
        value: "ques1",
        label: "Ques1"
    },
    {
        zone_id: "lvz",
        group_id: "lcachurch11",
        value: "churchtester",
        label: "churchtester"
    },
    {
        zone_id: "saz1",
        group_id: "newlandsgroup",
        value: "cenewlands",
        label: "CE Newlands"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceeldoradopark",
        label: "CE Eldorado Park"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cesikecodji",
        label: "CESIKECODJI"
    },
    {
        zone_id: "nncvz2",
        group_id: "cemakurdicentral",
        value: "ceteens-youth",
        label: "CE TEENS-YOUTH"
    },
    {
        zone_id: "nncvz2",
        group_id: "cemakurdicentral",
        value: "ceoasis",
        label: "CE OASIS"
    },
    {
        zone_id: "nncvz2",
        group_id: "cemakurdicentral",
        value: "cemodel",
        label: "CE MODEL"
    },
    {
        zone_id: "nncvz2",
        group_id: "cemakurdicentral",
        value: "cemcentral",
        label: "CEM CENTRAL"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ewcvz3",
        value: "ceuppernile",
        label: "CE Upper Nile"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ewcvz3",
        value: "cemukono7",
        label: "CE Mukono 7"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ewcvz3",
        value: "centinda",
        label: "CE Ntinda"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ewcvz3",
        value: "cenewglory",
        label: "CE New Glory"
    },
    {
        zone_id: "lszb",
        group_id: "lcc2group",
        value: "cemiracleworking",
        label: "Cemiracleworking"
    },
    {
        zone_id: "lszb",
        group_id: "lcc2group",
        value: "rabahchurch",
        label: "Rabahchurch"
    },
    {
        zone_id: "lszb",
        group_id: "lcc2group",
        value: "cegracearena1",
        label: "Cegracearena1"
    },
    {
        zone_id: "lszb",
        group_id: "lcc2group",
        value: "cefruitfulvine1",
        label: "Cefruitfulvine1"
    },
    {
        zone_id: "lszb",
        group_id: "lcc2group",
        value: "cepraisecenter",
        label: "Cepraisecenter"
    },
    {
        zone_id: "lszb",
        group_id: "ceomolegroup",
        value: "ceomole",
        label: "Ceomole"
    },
    {
        zone_id: "lszb",
        group_id: "ceomolegroup",
        value: "ceomole1",
        label: "Ceomole1"
    },
    {
        zone_id: "lszb",
        group_id: "ceomolegroup",
        value: "cesuperabundantgrace",
        label: "Cesuperabundantgrace"
    },
    {
        zone_id: "lszb",
        group_id: "ceomolegroup",
        value: "ceeverytreeaforest",
        label: "Ceeverytreeaforest"
    },
    {
        zone_id: "lszb",
        group_id: "celighthousegroup",
        value: "cedominioncenter",
        label: "Cedominioncenter"
    },
    {
        zone_id: "lszb",
        group_id: "celighthousegroup",
        value: "celighthouse1",
        label: "Celighthouse1"
    },
    {
        zone_id: "lszb",
        group_id: "celighthousegroup",
        value: "cegracecenter",
        label: "Cegracecenter"
    },
    {
        zone_id: "lszb",
        group_id: "prolificgroup",
        value: "cekingscourt",
        label: "Cekingscourt"
    },
    {
        zone_id: "lszb",
        group_id: "prolificgroup",
        value: "cevictorycenter",
        label: "Cevictorycenter"
    },
    {
        zone_id: "lszb",
        group_id: "prolificgroup",
        value: "cealagbole",
        label: "Cealagbole"
    },
    {
        zone_id: "lszb",
        group_id: "prolificgroup",
        value: "cealagbado",
        label: "Cealagbado"
    },
    {
        zone_id: "lszb",
        group_id: "prolificgroup",
        value: "ceglorycenter",
        label: "Ceglorycenter"
    },
    {
        zone_id: "lszb",
        group_id: "prolificgroup",
        value: "cewisdomcourt",
        label: "Cewisdomcourt"
    },
    {
        zone_id: "lszb",
        group_id: "prolificgroup",
        value: "ceilluminationarena",
        label: "Ceilluminationarena"
    },
    {
        zone_id: "lszb",
        group_id: "prolificgroup",
        value: "cefaitharena1",
        label: "Cefaitharena1"
    },
    {
        zone_id: "lszb",
        group_id: "prolificgroup",
        value: "cegreaterheight",
        label: "Cegreaterheight"
    },
    {
        zone_id: "torz",
        group_id: "torz",
        value: "cemiltonchurch",
        label: "CE MILTON CHURCH"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "ceabattoir",
        label: "CEABATTOIR"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "ceportonovo1",
        label: "CEPORTONOVO1"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "ceportonovo2",
        label: "CEPORTONOVO2"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "ceglazoue",
        label: "CEGLAZOUE"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "ceagbodjedo",
        label: "CEAGBODJEDO"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cedelokpo",
        label: "CEDELOKPO"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "ceparakou",
        label: "CEPARAKOU"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "ceekpe",
        label: "CEEKPE"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "ceamittie",
        label: "CEAMITTIE"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cegodomey",
        label: "CEGODOMEY"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cestcecil",
        label: "CESTCECIL"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "ceclv",
        label: "CECLV"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cegbegamey",
        label: "CEGBEGAMEY"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "ceavotrou",
        label: "CEAVOTROU"
    },
    {
        zone_id: "ottz",
        group_id: "ceottawamaingroup",
        value: "ceycgreatgrace",
        label: "CEYC Great Grace"
    },
    {
        zone_id: "ottz",
        group_id: "ceottawamaingroup",
        value: "ceadvantage",
        label: "CE Advantage"
    },
    {
        zone_id: "ottz",
        group_id: "ceottawamaingroup",
        value: "ceycrhema",
        label: "CEYC Rhema"
    },
    {
        zone_id: "ottz",
        group_id: "ceottawamaingroup",
        value: "cemggatineau",
        label: "CEMG Gatineau"
    },
    {
        zone_id: "ottz",
        group_id: "ceottawamaingroup",
        value: "cemgottawaeast",
        label: "CEMG Ottawa East"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cekicukiro",
        label: "CE Kicukiro"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cekirehe",
        label: "CE Kirehe"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cekanombe",
        label: "CE Kanombe"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cenyarutarama",
        label: "CE Nyarutarama"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cenyamirambo",
        label: "CE Nyamirambo"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cekabuga",
        label: "CE Kabuga"
    },
    {
        zone_id: "ewcvz3",
        group_id: "rwandagroup",
        value: "cerubavu",
        label: "CE Rubavu"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "cesokode",
        label: "CE SOKODE"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "cesanguera",
        label: "CE SANGUERA"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "cekpalime",
        label: "CE KPALIME"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "ceatakpame",
        label: "CE ATAKPAME"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "ceanie",
        label: "CE ANIE"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "cekara",
        label: "CE KARA"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "ceateda",
        label: "CE ATEDA"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "cenotse",
        label: "CE NOTSE"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "cetsevie",
        label: "CE TSEVIE"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "cedapaong",
        label: "CE DAPAONG"
    },
    {
        zone_id: "lszb",
        group_id: "lcc2group",
        value: "celszbpakistan",
        label: "Celszbpakistan"
    },
    {
        zone_id: "lszb",
        group_id: "lcc2group",
        value: "celszbkenya",
        label: "Celszbkenya"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ewcvz3",
        value: "cesemuto",
        label: "CE SEMUTO"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "ceketao",
        label: "CE KETAO"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo2",
        value: "cedongoyo",
        label: "CE DONGOYO"
    },
    {
        zone_id: "tesone66",
        group_id: "group1",
        value: "bwaise",
        label: "Bwaise"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cesenegal",
        value: "cesacrecoeur",
        label: "CESacreCoeur"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cesenegal",
        value: "cegrandyoff",
        label: "CEGrandYoff"
    },
    {
        zone_id: "tesone66",
        group_id: "group1",
        value: "oregun4",
        label: "Oregun 4"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cesenegal",
        value: "ceouakam",
        label: "CEOuakam"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cesenegal",
        value: "ceparcelles",
        label: "CEParcelles"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cesenegal",
        value: "cehannmariste",
        label: "CEHann Mariste"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cesenegal",
        value: "cerufisque",
        label: "CERufisque"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "cecerfer1",
        label: "CECerfer 1"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "cecerfer2",
        label: "CECerfer 2"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "cemivip",
        label: "CEMivip "
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "cekeque",
        label: "CEKeque"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "cegbenyedji",
        label: "CEGbenyedji"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "ceagoelycee",
        label: "CEAgoe Lycee"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "ceagbalepedo",
        label: "CEAgbalepedo"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "cebekpota",
        label: "CEBeKpota"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "ceadidogome",
        label: "CEAdidogome"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "ceagoecentre",
        label: "CEAgoeCentre"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "cebaguida",
        label: "CEBaguida"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "ceyouthchurcht1",
        label: "CEYouthChurchT1"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cetogo1",
        value: "ceewechurcht1",
        label: "CEEweChurchT1"
    },
    {
        zone_id: "ewcvz2",
        group_id: "ceburkina",
        value: "cecissin",
        label: "CE Cissin "
    },
    {
        zone_id: "ewcvz2",
        group_id: "ceburkina",
        value: "cebonheur\/ville",
        label: "CE Bonheur\/ville "
    },
    {
        zone_id: "ewcvz2",
        group_id: "ceburkina",
        value: "ceouagaeast",
        label: " CE Ouaga East "
    },
    {
        zone_id: "ewcvz2",
        group_id: "ceburkina",
        value: "cepo",
        label: " CE Po "
    },
    {
        zone_id: "ewcvz2",
        group_id: "ceburkina",
        value: "cekongoussi",
        label: "CE Kongoussi"
    },
    {
        zone_id: "ewcvz2",
        group_id: "ceguinea",
        value: "ceconakry",
        label: "CECONAKRY"
    },
    {
        zone_id: "ewcvz2",
        group_id: "ceguinea",
        value: "celambayi",
        label: "CELAMBAYI"
    },
    {
        zone_id: "ewcvz2",
        group_id: "ceguinea",
        value: "cesiguiri",
        label: "CESIGUIRI"
    },
    {
        zone_id: "ewcvz2",
        group_id: "ceguinea",
        value: "cebok\u00c9",
        label: "CEBOK\u00c9"
    },
    {
        zone_id: "ewcvz2",
        group_id: "ceguinea",
        value: "cecit\u00c9del'air",
        label: "CECIT\u00c9 DE L'AIR"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cemauritania",
        value: "cenouakchott",
        label: "CENouakchott"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cemali",
        value: "cebamako",
        label: "CE Bamako"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cedjregbe",
        label: "CE Djregbe"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cesodjatinmesud",
        label: " CE Sodjatinme Sud"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cecome",
        label: "CE Come"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cebohicon",
        label: "CE Bohicon"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cefidjirose",
        label: "CE FIDJIROSE"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cesemekpodji",
        label: "CE SEME KPODJI"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "cecocody",
        label: "CE COCODY"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "ceangre",
        label: "CE ANGRE"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup1",
        value: "loveworldchurchmushin",
        label: "loveworldchurchmushin"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup2",
        value: "loveworldchurchmagboro",
        label: "loveworldchurchmagboro"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup3",
        value: "loveworldchurchbenin",
        label: "loveworldchurchbenin"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup3",
        value: "loveworldchurchasaba",
        label: "loveworldchurchasaba"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup4",
        value: "loveworldchurchph1",
        label: "loveworldchurchph1"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup6",
        value: "loveworldchurchibadan",
        label: "loveworldchurchibadan"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "lwsubgroup1",
        value: "loveworldchurchabuja",
        label: "loveworldchurchabuja"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "lwsubgroup2",
        value: "loveworldchurchkano",
        label: "loveworldchurchkano"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "lwsubgroup3",
        value: "loveworldchurchenugu",
        label: "loveworldchurchenugu"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "lwsubgroup3",
        value: "loveworldchurchawka",
        label: "loveworldchurchawka"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "ceketu1",
        label: "CE Ketu 1"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "ceresidentiel",
        label: "CE RESIDENTIEL"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "cesodeci",
        label: "CE SODECI"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceachalaibusa",
        label: "CEAchalaibusa"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "ceachalaibusa1",
        label: "CE Achalaibusa 1"
    },
    {
        zone_id: "nsevz2",
        group_id: "ceasaba",
        value: "cecommissionerhouse",
        label: "CE Commissioner House"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cetriumphantsap",
        label: "CE TRIUMPHANT SAP"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceharvest",
        label: "CE HARVEST "
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceprolific",
        label: "CE PROLIFIC "
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cezenith1",
        label: "CE ZENITH 1"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cecentralchurchsapele",
        label: "CE CENTRAL CHURCH  SAPELE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cezenith2",
        label: "CE ZENITH 2"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceamukpe",
        label: "CE AMUKPE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cenewroad",
        label: "CE NEW ROAD"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cegracecourt",
        label: "CE GRACE COURT"
    },
    {
        zone_id: "blwoup22",
        group_id: "blwwalesgroup",
        value: "blwcardiff",
        label: "BLWCardiff"
    },
    {
        zone_id: "blwoup22",
        group_id: "blwwalesgroup",
        value: "blwswansea",
        label: "BLWSwansea"
    },
    {
        zone_id: "blwoup22",
        group_id: "blwwalesgroup",
        value: "blwsouthwales",
        label: "BLWSouthwales"
    },
    {
        zone_id: "blwoup22",
        group_id: "blwwalesgroup",
        value: "blwbangor",
        label: "BLWBangor"
    },
    {
        zone_id: "usavz2",
        group_id: "usavz2",
        value: "springfieldave",
        label: "Springfield Ave"
    },
    {
        zone_id: "usavz2",
        group_id: "megalopolisgroup2",
        value: "springfieldavenue",
        label: "SpringfieldAvenue"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cetemile",
        label: "CE TEMILE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cegracepalace",
        label: "CE GRACE PALACE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceshellroad",
        label: "CE SHELL ROAD "
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cegoldarena",
        label: "CE GOLD ARENA"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceoton",
        label: "CE OTON"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cesupernatural",
        label: "CE SUPERNATURAL"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cetestimonies",
        label: "CE TESTIMONIES "
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceriversofgrace",
        label: "CE RIVERS OF GRACE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cejesse",
        label: "CE JESSE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cejesse2",
        label: "CE JESSE 2"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceugberikoko",
        label: "CE UGBERIKOKO"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceejenesa",
        label: "CE EJENESA"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ismuganda",
        value: "xyzministries",
        label: "XYZMINISTRIES"
    },
    {
        zone_id: "ewcvz3",
        group_id: "ismuganda",
        value: "aflame",
        label: "AFLAME"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceadeje",
        label: "CE ADEJE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceibadaelume",
        label: "CE IBADA ELUME"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cegana1",
        label: "CE GANA 1"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceokirigwhre",
        label: "CE OKIRIGWHRE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cecitycenter",
        label: "CE CITY CENTER"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cekingcity",
        label: "CE KING CITY "
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cejoycity",
        label: "CE JOY CITY"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cedunamis",
        label: "CE DUNAMIS"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceabigborodu",
        label: "CE ABIGBORODU"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceperfection",
        label: "CE PERFECTION"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceugbeyiyigra",
        label: "CE UGBEYIYI GRA"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cetropical",
        label: "CE TROPICAL"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceoghareki",
        label: "CE OGHAREKI"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceogorode",
        label: "CE OGORODE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceoviorie",
        label: "CE OVIORIE"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceelume",
        label: "CE ELUME"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cefaithland",
        label: "CE FAITH LAND"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "cevictorycentersap",
        label: "CE VICTORY CENTER SAP"
    },
    {
        zone_id: "nsevz2",
        group_id: "cesapelegroup",
        value: "ceteensministry",
        label: "CE TEENS MINISTRY"
    },
    {
        zone_id: "lwsaza",
        group_id: "lwsaza",
        value: "universityoflimpopo",
        label: "University Of Limpopo"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "celoveworldplaceyouthchurch",
        label: "CE Loveworld Place Youth Church"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceaguda1",
        label: "CE Aguda 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cepako",
        label: "CE Pako"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cesavanah",
        label: "CE Savanah"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cebakery",
        label: "CE Bakery "
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cebakeryyouthchurch",
        label: "CE Bakery Youth Church"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceericmoore",
        label: "CE EricMoore "
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceericmooreteens",
        label: "CE EricMoore Teens"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cealaka",
        label: "CE Alaka"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceokitipupa",
        label: "CE Okitipupa"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "celawanson",
        label: "CE Lawanson"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceaiyetorochurch",
        label: "CE Aiyetoro Church"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceiwaya",
        label: "CE Iwaya"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceitirechurch",
        label: "CE Itire Church"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "celawansonyouthchurch",
        label: "CE Lawanson Youth Church"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceshomolu",
        label: "CE Shomolu"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cebariga",
        label: "CE Bariga"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "celadi-lak",
        label: "CE Ladi-Lak"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceilaje",
        label: "CE Ilaje"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceadebiyi",
        label: "CE Adebiyi"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceigbobi",
        label: "CE Igbobi"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cefamous",
        label: "CE Famous"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceoceanview",
        label: "CE OceanView"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceshomoluteens",
        label: "CE Shomolu Teens"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceorile1",
        label: "CE Orile 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cealaba1",
        label: "CE Alaba 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cesalvage",
        label: "CE Salvage"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cesari-iganmu",
        label: "CE Sari-Iganmu"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceorile2",
        label: "CE Orile 2"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cealaba2",
        label: "CE Alaba 2"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceorileyouthchurch",
        label: "CE Orile Youth Church"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cemushin",
        label: "CE Mushin"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceilasa",
        label: "CE Ilasa"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceidi-oro",
        label: "CE Idi-Oro"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cemushinteens",
        label: "CE Mushin Teens"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceodunaike",
        label: "CE Odunaike"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceiyala",
        label: "CE Iyala"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceoluyide",
        label: "CE Oluyide"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceojuelegba1",
        label: "CE Ojuelegba 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceojuelegba2",
        label: "CE Ojuelegba 2"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cegbadamosi",
        label: "CE Gbadamosi"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceidi-araba",
        label: "CE Idi-Araba"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cebaruwachurch",
        label: "CE Baruwa Church"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceolufemi2",
        label: "CE Olufemi 2"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceojuelegbateens",
        label: "CE Ojuelegba Teens"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceolufemi1",
        label: "CE Olufemi 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceobele",
        label: "CE Obele"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cerandle",
        label: "CE Randle"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cebode-well",
        label: "CE Bode-Well"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceolufemiteens",
        label: "CE Olufemi Teens"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceijesha1",
        label: "CE Ijesha 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceijesha2",
        label: "CE Ijesha 2"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceijesha3",
        label: "CE Ijesha 3"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cesanya",
        label: "CE Sanya"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceteniola",
        label: "CE Teniola"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceowodunni",
        label: "CE Owodunni"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cepalmgroove1",
        label: "CE Palmgroove 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cejibowu",
        label: "CE Jibowu"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cepalmgroove2",
        label: "CE Palmgroove 2"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cepedro",
        label: "CE Pedro"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceowodunniteens",
        label: "CE Owodunni Teens"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cepalmgrooveyouthchurch",
        label: "CE Palmgroove Youth Church"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceonipanu",
        label: "CE Onipanu"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cemasha",
        label: "CE Masha"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceadekunlekuye",
        label: "CE Adekunle Kuye"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceadeniranogunsanya",
        label: "CE ADENIRAN OGUNSANYA"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceadisabashua",
        label: "CE Adisa Bashua"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cekilo1",
        label: "CE Kilo 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cekilo2",
        label: "CE Kilo 2"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cemashateens&youthchurch",
        label: "CE Masha Teens & Youth Church"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceadelabu",
        label: "CE Adelabu"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceadelabu1",
        label: "CE Adelabu 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceoniboure",
        label: "CE Oniboure"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "cedynamicgrace",
        label: "CE Dynamic Grace"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceikate",
        label: "CE Ikate "
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceikate1",
        label: "CE Ikate 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceebute-metta1",
        label: "CE Ebute-Metta 1"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceebute-metta2",
        label: "CE Ebute-Metta 2"
    },
    {
        zone_id: "lz3",
        group_id: "lz3",
        value: "ceebute-mettateens",
        label: "CE Ebute-Metta Teens"
    },
    {
        zone_id: "tesone66",
        group_id: "group4",
        value: "kigumba1",
        label: "kigumba1"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cesandtonchurch",
        label: "CE Sandton Church"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cegreenvillage",
        label: "CE Green Village"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cetshepisong",
        label: "CE Tshepisong"
    },
    {
        zone_id: "saz1",
        group_id: "sandtongroup",
        value: "cemohlakeng",
        label: "CE Mohlakeng"
    },
    {
        zone_id: "lz1",
        group_id: "lcc6group",
        value: "cela",
        label: "CELA"
    },
    {
        zone_id: "lz1",
        group_id: "lcc6group",
        value: "celcc6pero",
        label: "CELCC6PERO"
    },
    {
        zone_id: "lz1",
        group_id: "lcc6group",
        value: "celcc6akilo",
        label: "CELCC6AKILO"
    },
    {
        zone_id: "lz1",
        group_id: "lcc6group",
        value: "celcc6olowora",
        label: "CELCC6OLOWORA"
    },
    {
        zone_id: "lz1",
        group_id: "lcc6group",
        value: "celcc6ijaiye",
        label: "CELCC6IJAIYE"
    },
    {
        zone_id: "lz1",
        group_id: "lcc6group",
        value: "celcc6akute",
        label: "CELCC6AKUTE"
    },
    {
        zone_id: "lz1",
        group_id: "lcc6group",
        value: "celcc6ojodu",
        label: "CELCC6OJODU"
    },
    {
        zone_id: "ewcvz4",
        group_id: "doualagroup",
        value: "cedouala",
        label: "CEDouala"
    },
    {
        zone_id: "lwzc",
        group_id: "lwzc",
        value: "blwfpi",
        label: "BLW FPI"
    },
    {
        zone_id: "lwzc",
        group_id: "lwzc",
        value: "blwcaleb",
        label: "BLW CALEB"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "cefaya",
        label: "CE FAYA"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cecotedivoire",
        value: "ceteensabidjan",
        label: "CE TEENS ABIDJAN"
    },
    {
        zone_id: "saz1",
        group_id: "saz1",
        value: "youth\/teenschurch",
        label: "Youth\/Teens Church"
    },
    {
        zone_id: "saz1",
        group_id: "polokwanegroup",
        value: "cepolokwane",
        label: "CE Polokwane"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cebrentwood",
        label: "CE Brentwood"
    },
    {
        zone_id: "blwnec",
        group_id: "blwnec",
        value: "blwuniversityofportsmouth",
        label: "BLW University of Portsmouth"
    },
    {
        zone_id: "blwnec",
        group_id: "blwnec",
        value: "blwuniversityofleicester",
        label: "BLW University of Leicester "
    },
    {
        zone_id: "blwnec",
        group_id: "blwnec",
        value: "blwdemontfortuniversity",
        label: "BLW De Montfort University"
    },
    {
        zone_id: "blwnec",
        group_id: "blwnec",
        value: "blwuniversityofhertfordshire",
        label: "BLW University of Hertfordshire "
    },
    {
        zone_id: "blwnec",
        group_id: "blwnec",
        value: "blwbuckinghamnewuniversity",
        label: "BLW Buckingham New University"
    },
    {
        zone_id: "blwnec",
        group_id: "blwnec",
        value: "blwuniversityofderby",
        label: "BLW University of Derby"
    },
    {
        zone_id: "blwnec",
        group_id: "blwnec",
        value: "blwroyalholloway",
        label: "BLW Royal Holloway "
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cegreatertembisa",
        label: "CE Greater Tembisa"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "celionspark1",
        label: "CE Lions Park1"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "cemaidan",
        label: "CE MAIDAN"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cemsawawa",
        label: "CE Msawawa"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "celionspark2",
        label: "CE Lions Park2"
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwalphachurch1",
        label: "BLW ALPHA CHURCH 1 "
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwalphachurch2",
        label: "BLW ALPHA CHURCH 2 "
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwomegachurch",
        label: "BLW OMEGA CHURCH "
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwomegaoutreach",
        label: "BLW OMEGA OUTREACH "
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwnls",
        label: "BLW NLS"
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwintlmissions",
        label: "BLW INTL MISSIONS "
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwnsuk",
        label: "BLW NSUK "
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwfulafia",
        label: "BLW FULAFIA "
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwfpn",
        label: "BLW FPN"
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwfutminnagk",
        label: "BLW FUTMINNA GK "
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwfutminnabosso",
        label: "BLW FUTMINNA BOSSO "
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwbida",
        label: "BLW BIDA"
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwbsu",
        label: "BLW BSU"
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwuam",
        label: "BLW UAM"
    },
    {
        zone_id: "lwzk",
        group_id: "lwzk",
        value: "blwatkpoly",
        label: "BLW ATK POLY "
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "ceketu3",
        label: "CE Ketu3"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "ceketu2",
        label: "CE KETU2"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "ceikosi",
        label: "CE IKOSI"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "cegloryplace",
        label: "CE GLORYPLACE"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "ceelebiju",
        label: "CE ELEBIJU"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "cedayspring1&2",
        label: "CE DAYSPRING1 &2"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "ceagility",
        label: "CE AGILITY"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "ceprosperitycenter",
        label: "CE PROSPERITY CENTER"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "cegracelandketugroup",
        label: "CE Gracelandketugroup"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "ceajegunle2ketugroup",
        label: "ce ajegunle2ketugroup"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "cegracelightketugroup",
        label: "CE GRACELIGHTKETUGROUP"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cecroydon",
        label: "CE Croydon"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cebeckenham",
        label: "CE Beckenham"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cebrixton",
        label: "CE Brixton"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cecollierswood",
        label: "CE Colliers Wood"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cecoulsdon",
        label: "CE Coulsdon"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cecrawley",
        label: "CE Crawley"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cepurley",
        label: "CE Purley"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cestafford",
        label: "CE Stafford"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cetulsehill",
        label: "CE Tulse Hill"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "cewestcroydon",
        label: "CE West Croydon"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "lwingramstreet",
        label: "LW Ingram Street"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "lwpaisleyroad",
        label: "LW Paisley Road"
    },
    {
        zone_id: "ukz3",
        group_id: "ukz3",
        value: "lwstirling",
        label: "LW Stirling"
    },
    {
        zone_id: "ukvz1",
        group_id: "cecatfordgroup",
        value: "reachoutworld",
        label: "REACHOUTWORLD"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cehevieadovie",
        label: "CE HEVIE ADOVIE"
    },
    {
        zone_id: "ewcvz2",
        group_id: "cebenin",
        value: "cehevie1",
        label: "CE HEVIE  1"
    },
    {
        zone_id: "ismuganda",
        group_id: "ugandaismchurches",
        value: "aflamegospel",
        label: "AFLAMEGOSPEL"
    },
    {
        zone_id: "ismuganda",
        group_id: "ugandaismchurches",
        value: "wot",
        label: "WOT"
    },
    {
        zone_id: "ismuganda",
        group_id: "ugandaismchurches",
        value: "miracle",
        label: "MIRACLE"
    },
    {
        zone_id: "ismuganda",
        group_id: "ugandaismchurches",
        value: "zoelife",
        label: "ZOELIFE"
    },
    {
        zone_id: "ismuganda",
        group_id: "otherchurches",
        value: "rlw",
        label: "RLW"
    },
    {
        zone_id: "ukz1",
        group_id: "thamesmeadgroup",
        value: "lwpontypridd",
        label: "LWPontypridd"
    },
    {
        zone_id: "lz1",
        group_id: "isherimagodogroup",
        value: "cenewmagodo",
        label: "CENewMagodo"
    },
    {
        zone_id: "lz1",
        group_id: "ogbagroup",
        value: "ceogba1",
        label: "Ceogba1"
    },
    {
        zone_id: "lz1",
        group_id: "ogbagroup",
        value: "ceogba2",
        label: "ceogba2"
    },
    {
        zone_id: "lz1",
        group_id: "ogbagroup",
        value: "ceogba3",
        label: "Ceogba3"
    },
    {
        zone_id: "lz1",
        group_id: "ogbagroup",
        value: "ceogba4",
        label: "ceogba4"
    },
    {
        zone_id: "lz1",
        group_id: "ogbagroup",
        value: "cewempco",
        label: "cewempco"
    },
    {
        zone_id: "lz1",
        group_id: "ogbagroup",
        value: "cecoker",
        label: "Cecoker"
    },
    {
        zone_id: "lz1",
        group_id: "ogbagroup",
        value: "ceogbagra",
        label: "ceogbagra"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "cealapere",
        label: "CeAlapere"
    },
    {
        zone_id: "lz1",
        group_id: "ketugroup",
        value: "cecmd",
        label: "cecmd"
    },
    {
        zone_id: "lz1",
        group_id: "isherimagodogroup",
        value: "cemiraclecentre",
        label: "CEMiraclecentre"
    },
    {
        zone_id: "LWNRUS",
        group_id: "LWNRUS",
        value: "lwabs",
        label: "LW ABS"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup",
        value: "cetulsa",
        label: "CETulsa"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup",
        value: "ceoklahomacity",
        label: "CEOklahomaCity"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup2",
        value: "cedallascentral",
        label: "CE Dallas Central"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup2",
        value: "cetulsachurch",
        label: "CE Tulsa Church"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup2",
        value: "ceoklahomacitychurch",
        label: "CE Oklahoma City Church"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup2",
        value: "cenorthdallas",
        label: "CE North Dallas"
    },
    {
        zone_id: "lz1",
        group_id: "mafolukugroup",
        value: "mafoluku2",
        label: "Mafoluku2"
    },
    {
        zone_id: "lz1",
        group_id: "isherimagodogroup",
        value: "kingscourt",
        label: "kingscourt"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "loveworldchurchgroup4",
        value: "loveworldchurchowerri2",
        label: "LoveworldchurchOwerri2"
    },
    {
        zone_id: "blwchurchzone",
        group_id: "lwsubgroup1",
        value: "loveworldchurchabuja3",
        label: "loveworldchurchabuja3"
    },
    {
        zone_id: "texasz1",
        group_id: "ceag",
        value: "cepearland1",
        label: "CE Pearland 1"
    },
    {
        zone_id: "texasz1",
        group_id: "ceag",
        value: "cealvin",
        label: "CE Alvin"
    },
    {
        zone_id: "usaz1r2",
        group_id: "dallasgroup2",
        value: "cenashville",
        label: "CE Nashville"
    },
    {
        zone_id: "ukz1",
        group_id: "thamesmeadgroup",
        value: "lwcardiff",
        label: "LW Cardiff"
    },
    {
        zone_id: "ukz1",
        group_id: "thamesmeadgroup",
        value: "lwswansea",
        label: "LW Swansea"
    },
    {
        zone_id: "ukz1",
        group_id: "thamesmeadgroup",
        value: "lwnewport",
        label: "LW Newport"
    },
    {
        zone_id: "lwnrus",
        group_id: "northcyprusgroup",
        value: "lwciu",
        label: "LW CIU"
    },
    {
        zone_id: "lwnrus",
        group_id: "northcyprusgroup",
        value: "lwemu",
        label: "LW EMU "
    },
    {
        zone_id: "lwnrus",
        group_id: "northcyprusgroup",
        value: "lwgau",
        label: "LW GAU"
    },
    {
        zone_id: "lwnrus",
        group_id: "northcyprusgroup",
        value: "lwneu",
        label: "LW NEU"
    },
    {
        zone_id: "lwnrus",
        group_id: "northcyprusgroup",
        value: "lweul",
        label: "LW EUL"
    },
    {
        zone_id: "lwnrus",
        group_id: "northcyprusgroup",
        value: "lwcwu",
        label: "LW CWU"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "cefourways",
        label: "CE Fourways"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceexternalministers",
        label: "CE ExternalMinisters"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "ceombi1",
        label: "CE Ombi 1"
    },
    {
        zone_id: "lz2",
        group_id: "lafiagroup",
        value: "ceagyaragu",
        label: "CE Agyaragu"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cesowetowhitecity",
        label: "CE SOWETO WHITE CITY"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cebedfordview",
        label: "CE BEDFORDVIEW"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "ceevaton",
        label: "CE EVATON"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cekananapark",
        label: "CE KANANA PARK"
    },
    {
        zone_id: "savz2",
        group_id: "cesouthgroup",
        value: "cesowetocentral",
        label: "CE SOWETO CENTRAL"
    },
    {
        zone_id: "texasz1",
        group_id: "cekg",
        value: "cedairyashford",
        label: "CEDairyAshford"
    },
    {
        zone_id: "ukz1",
        group_id: "thamesmeadgroup",
        value: "thamesmead",
        label: "Thamesmead"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "zonalchurch1",
        label: "zonal church 1"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "zonalchurch2",
        label: "zonal church 2"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "zonalchurch3",
        label: "zonal church 3"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch4",
        label: "zonal church 4"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch5",
        label: "zonal church 5"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch6",
        label: "zonal church 6"
    },
    {
        zone_id: "abujavz",
        group_id: "centralareagroup",
        value: "cbd1",
        label: "cbd 1"
    },
    {
        zone_id: "abujavz",
        group_id: "centralareagroup",
        value: "cbd2",
        label: "cbd 2"
    },
    {
        zone_id: "abujavz",
        group_id: "centralareagroup",
        value: "cbd3",
        label: "cbd 3"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "zonalchurch8",
        label: "zonal church 8"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "zonalchurch13",
        label: "zonal church 13"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "zonalchurch14",
        label: "zonal church 14"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "zonalchurch15",
        label: "zonal church 15"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "cegarki1",
        label: "ce garki 1"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "cegarki2",
        label: "ce garki 2"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "ceprolificgrace",
        label: "ce prolific grace"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch7",
        label: "zonal church 7"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch9",
        label: "zonal church 9"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch10",
        label: "zonal church 10"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch11",
        label: "zonal church 11"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch12",
        label: "zonal church 12"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch16",
        label: "zonal church 16"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch17",
        label: "zonal church 17"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup2",
        value: "zonalchurch18",
        label: "zonal church 18"
    },
    {
        zone_id: "abujavz",
        group_id: "jabigroup",
        value: "cemodelchurchabjz",
        label: "ce model church abjz"
    },
    {
        zone_id: "abujavz",
        group_id: "jabigroup",
        value: "cejiwa1",
        label: "ce jiwa 1"
    },
    {
        zone_id: "abujavz",
        group_id: "jabigroup",
        value: "celifecamp",
        label: "ce life camp"
    },
    {
        zone_id: "abujavz",
        group_id: "jabigroup",
        value: "ceutako",
        label: "ce utako"
    },
    {
        zone_id: "abujavz",
        group_id: "jabigroup",
        value: "ceapo",
        label: "ce apo"
    },
    {
        zone_id: "abujavz",
        group_id: "jabigroup",
        value: "cegwarinpa8",
        label: "ce gwarinpa 8"
    },
    {
        zone_id: "abujavz",
        group_id: "jabigroup",
        value: "cemcjiwa",
        label: "ce mc Jiwa"
    },
    {
        zone_id: "abujavz",
        group_id: "jabigroup",
        value: "cemcgwagwa",
        label: "ce mc gwagwa"
    },
    {
        zone_id: "abujavz",
        group_id: "jabigroup",
        value: "cesabuirimodel",
        label: "ce sabuiri model"
    },
    {
        zone_id: "abujavz",
        group_id: "wuyegroup",
        value: "cewuye",
        label: "ce wuye"
    },
    {
        zone_id: "abujavz",
        group_id: "wuyegroup",
        value: "ceexpressabjz",
        label: "ce express abjz"
    },
    {
        zone_id: "abujavz",
        group_id: "wuyegroup",
        value: "cesuburban",
        label: "ce suburban"
    },
    {
        zone_id: "abujavz",
        group_id: "wuyegroup",
        value: "cekbs",
        label: "ce kbs"
    },
    {
        zone_id: "abujavz",
        group_id: "wuyegroup",
        value: "cecitycentreabjz",
        label: "ce city centre abjz"
    },
    {
        zone_id: "abujavz",
        group_id: "wuyegroup",
        value: "celighthouseabjz",
        label: "ce lighthouse abjz"
    },
    {
        zone_id: "abujavz",
        group_id: "jabigroup",
        value: "celivingsprings",
        label: "ce living springs"
    },
    {
        zone_id: "abujavz",
        group_id: "kadogroup",
        value: "cekado",
        label: "ce kado"
    },
    {
        zone_id: "abujavz",
        group_id: "kadogroup",
        value: "cesolutionarena",
        label: "ce solution arena"
    },
    {
        zone_id: "abujavz",
        group_id: "kadogroup",
        value: "cemabushi",
        label: "ce mabushi"
    },
    {
        zone_id: "abujavz",
        group_id: "kadogroup",
        value: "cejahi",
        label: "ce jahi"
    },
    {
        zone_id: "abujavz",
        group_id: "kadogroup",
        value: "cekado2",
        label: "ce kado 2"
    },
    {
        zone_id: "abujavz",
        group_id: "kadogroup",
        value: "cekado3",
        label: "ce kado 3"
    },
    {
        zone_id: "abujavz",
        group_id: "kadogroup",
        value: "cekado4",
        label: "ce kado 4"
    },
    {
        zone_id: "abujavz",
        group_id: "suburbancitygroup",
        value: "cekarmo",
        label: "ce karmo"
    },
    {
        zone_id: "abujavz",
        group_id: "suburbancitygroup",
        value: "cejabiext",
        label: "ce jabi ext"
    },
    {
        zone_id: "abujavz",
        group_id: "suburbancitygroup",
        value: "cedape",
        label: "ce dape"
    },
    {
        zone_id: "abujavz",
        group_id: "suburbancitygroup",
        value: "cejiwa2",
        label: "ce jiwa 2"
    },
    {
        zone_id: "abujavz",
        group_id: "suburbancitygroup",
        value: "cekarmo2",
        label: "ce karmo 2"
    },
    {
        zone_id: "abujavz",
        group_id: "suburbancitygroup",
        value: "cepaipe",
        label: "ce paipe"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cekubwa1",
        label: "ce kubwa 1"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cekubwa3",
        label: "ce kubwa 3"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cekubwa4",
        label: "ce kubwa 4"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cekubwa5",
        label: "ce kubwa 5"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cekubwa6",
        label: "ce kubwa 6"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cekubwa7",
        label: "ce kubwa 7"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cekubwa8",
        label: "ce kubwa 8"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cekubwa9",
        label: "ce kubwa 9"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cekubwa10",
        label: "ce kubwa 10"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cekukwaba",
        label: "ce kukwaba"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwagroup",
        value: "cempapehills",
        label: "ce mpape hills"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwa2group",
        value: "cekubwa2",
        label: "ce kubwa 2"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwa2group",
        value: "cekubwaext",
        label: "ce kubwa ext"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwa2group",
        value: "cebyazhinacross",
        label: "ce byazhin across"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwa2group",
        value: "cegbazango",
        label: "ce gbazango"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwa2group",
        value: "cemillionairesquarters",
        label: "ce millionaires quarters"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwa2group",
        value: "cechannel8",
        label: "ce channel 8"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwa2group",
        value: "ceobasanjo",
        label: "ce obasanjo"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwa2group",
        value: "cespringtime",
        label: "ce springtime"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwa2group",
        value: "ceguidana",
        label: "ce guidana"
    },
    {
        zone_id: "abujavz",
        group_id: "kubwa2group",
        value: "cekaginimodel",
        label: "ce kagini model"
    },
    {
        zone_id: "abujavz",
        group_id: "gwarinpagroup",
        value: "cegwarinpa1",
        label: "ce gwarinpa 1"
    },
    {
        zone_id: "abujavz",
        group_id: "gwarinpagroup",
        value: "cegwarinpa3",
        label: "ce gwarinpa 3"
    },
    {
        zone_id: "abujavz",
        group_id: "gwarinpagroup",
        value: "cegwarinpaext",
        label: "ce gwarinpa ext"
    },
    {
        zone_id: "abujavz",
        group_id: "gwarinpagroup",
        value: "cegwarinpa5",
        label: "ce gwarinpa 5"
    },
    {
        zone_id: "abujavz",
        group_id: "gwarinpagroup",
        value: "ceroyalty",
        label: "ce royalty"
    },
    {
        zone_id: "abujavz",
        group_id: "gwarinpagroup",
        value: "ceexceptional",
        label: "ce exceptional"
    },
    {
        zone_id: "abujavz",
        group_id: "deideigroup",
        value: "cegwarinpa2",
        label: "ce gwarinpa 2"
    },
    {
        zone_id: "abujavz",
        group_id: "deideigroup",
        value: "cedeidei1",
        label: "ce dei dei 1"
    },
    {
        zone_id: "abujavz",
        group_id: "deideigroup",
        value: "cedeidei2",
        label: "ce dei dei 2"
    },
    {
        zone_id: "abujavz",
        group_id: "deideigroup",
        value: "cedeidei3",
        label: "ce dei dei 3"
    },
    {
        zone_id: "abujavz",
        group_id: "deideigroup",
        value: "cesabuiri1",
        label: "ce sabuiri 1"
    },
    {
        zone_id: "abujavz",
        group_id: "deideigroup",
        value: "cemcwordarena",
        label: "ce mc word arena"
    },
    {
        zone_id: "abujavz",
        group_id: "deideigroup",
        value: "cekoinoniacentre",
        label: "ce koinonia centre"
    },
    {
        zone_id: "abujavz",
        group_id: "deideigroup",
        value: "ceflourish",
        label: "ce flourish"
    },
    {
        zone_id: "abujavz",
        group_id: "boundlessgracegroup",
        value: "cedawaki1",
        label: "ce dawaki 1"
    },
    {
        zone_id: "abujavz",
        group_id: "boundlessgracegroup",
        value: "cedawaki3",
        label: "ce dawaki 3"
    },
    {
        zone_id: "abujavz",
        group_id: "boundlessgracegroup",
        value: "cekatampe",
        label: "ce katampe"
    },
    {
        zone_id: "abujavz",
        group_id: "boundlessgracegroup",
        value: "cejahi2",
        label: "ce jahi 2"
    },
    {
        zone_id: "abujavz",
        group_id: "boundlessgracegroup",
        value: "cekagini",
        label: "ce kagini"
    },
    {
        zone_id: "abujavz",
        group_id: "boundlessgracegroup",
        value: "cedawaki2",
        label: "ce dawaki 2"
    },
    {
        zone_id: "abujavz",
        group_id: "bwarigroup",
        value: "cebwari",
        label: "ce bwari"
    },
    {
        zone_id: "abujavz",
        group_id: "bwarigroup",
        value: "cedutsemkt",
        label: "ce dutse mkt"
    },
    {
        zone_id: "abujavz",
        group_id: "bwarigroup",
        value: "cekuchiko",
        label: "ce kuchiko"
    },
    {
        zone_id: "abujavz",
        group_id: "bwarigroup",
        value: "cekuduru",
        label: "ce kuduru"
    },
    {
        zone_id: "abujavz",
        group_id: "bwarigroup",
        value: "cenewjerusalem",
        label: "ce new jerusalem"
    },
    {
        zone_id: "abujavz",
        group_id: "bwarigroup",
        value: "cepwambara",
        label: "ce pwambara"
    },
    {
        zone_id: "abujavz",
        group_id: "bwarigroup",
        value: "cepeyi",
        label: "ce peyi"
    },
    {
        zone_id: "abujavz",
        group_id: "boundlessgracegroup",
        value: "ceushafa3",
        label: "ce ushafa 3"
    },
    {
        zone_id: "abujavz",
        group_id: "bwarigroup",
        value: "cescc",
        label: "ce scc"
    },
    {
        zone_id: "abujavz",
        group_id: "bwarigroup",
        value: "cedutsemktfo1",
        label: "ce dutse mkt fo1"
    },
    {
        zone_id: "abujavz",
        group_id: "bwarigroup",
        value: "cedutsemktobj",
        label: "ce dutse mkt obj"
    },
    {
        zone_id: "abujavz",
        group_id: "zcgroup1",
        value: "ceado",
        label: "ce ado"
    },
    {
        zone_id: "abujavz",
        group_id: "newhorizongroup",
        value: "ceushafa",
        label: "ce ushafa"
    },
    {
        zone_id: "abujavz",
        group_id: "newhorizongroup",
        value: "cebmuko",
        label: "ce bmuko"
    },
    {
        zone_id: "abujavz",
        group_id: "newhorizongroup",
        value: "cekogo",
        label: "ce kogo"
    },
    {
        zone_id: "abujavz",
        group_id: "newhorizongroup",
        value: "cekogo3",
        label: "ce kogo 3"
    },
    {
        zone_id: "abujavz",
        group_id: "newhorizongroup",
        value: "cedutsezone3",
        label: "ce dutse zone 3"
    },
    {
        zone_id: "abujavz",
        group_id: "newhorizongroup",
        value: "ceguto",
        label: "ce guto"
    },
    {
        zone_id: "abujavz",
        group_id: "newhorizongroup",
        value: "cedutsemodel",
        label: "ce dutse model"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cesuleja1",
        label: "ce suleja 1"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cemadalla",
        label: "ce madalla"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cesuleja2",
        label: "ce suleja 2"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cedakwa",
        label: "ce dakwa"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cemadalla2",
        label: "ce madalla 2"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cesuleja3",
        label: "ce suleja 3"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cetungamaje2",
        label: "ce tungamaje 2"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cesulejamodel",
        label: "ce suleja model"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cebdivision",
        label: "ce b division"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cerafisenyi",
        label: "ce rafisenyi"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cezubamodel",
        label: "ce zuba model"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cekingsarena",
        label: "ce kings arena"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cegwazunu",
        label: "ce gwazunu"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cesabonwuse",
        label: "ce sabon wuse"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cezuba2",
        label: "ce zuba 2"
    },
    {
        zone_id: "abujavz",
        group_id: "sulejagroup",
        value: "cecitadelofgrace",
        label: "ce citadel of grace"
    },
    {
        zone_id: "abujavz",
        group_id: "zubagroup",
        value: "cezuba",
        label: "ce zuba"
    },
    {
        zone_id: "abujavz",
        group_id: "zubagroup",
        value: "cetungamaje",
        label: "ce tungamaje"
    },
    {
        zone_id: "abujavz",
        group_id: "zubagroup",
        value: "ceglada3",
        label: "ce glada3"
    },
    {
        zone_id: "abujavz",
        group_id: "zubagroup",
        value: "ceglada5",
        label: "ce glada 5"
    },
    {
        zone_id: "abujavz",
        group_id: "zubagroup",
        value: "ceabaji",
        label: "ce abaji"
    },
    {
        zone_id: "abujavz",
        group_id: "zubagroup",
        value: "ceanangada",
        label: "ce anangada"
    },
    {
        zone_id: "abujavz",
        group_id: "glorygroup",
        value: "ceglory1",
        label: "ce glory 1"
    },
    {
        zone_id: "abujavz",
        group_id: "glorygroup",
        value: "ceglory2",
        label: "ce glory 2"
    },
    {
        zone_id: "abujavz",
        group_id: "glorygroup",
        value: "ceglory4",
        label: "ce glory 4"
    },
    {
        zone_id: "abujavz",
        group_id: "glorygroup",
        value: "ceglory7",
        label: "ce glory 7"
    },
    {
        zone_id: "abujavz",
        group_id: "maitamagroup",
        value: "cemaitamamodel",
        label: "ce maitama model"
    },
    {
        zone_id: "abujavz",
        group_id: "maitamagroup",
        value: "cemississippi",
        label: "ce mississippi"
    },
    {
        zone_id: "abujavz",
        group_id: "maitamagroup",
        value: "ce1616",
        label: "ce 1616"
    },
    {
        zone_id: "abujavz",
        group_id: "maitamagroup",
        value: "cewusezones",
        label: "ce wuse zones"
    },
    {
        zone_id: "abujavz",
        group_id: "maitamagroup",
        value: "cezone6",
        label: "ce zone 6"
    },
    {
        zone_id: "abujavz",
        group_id: "ceazteenschurches",
        value: "cezonalchurchteens",
        label: "ce zonal church teens"
    },
    {
        zone_id: "abujavz",
        group_id: "ceazyouthchurches",
        value: "ceprime",
        label: "ce prime"
    },
    {
        zone_id: "abujavz",
        group_id: "ceazyouthchurches",
        value: "cewealthyplaceabjz",
        label: "ce wealthy place abjz"
    },
    {
        zone_id: "ewcvz3",
        group_id: "gabagroup",
        value: "tlm",
        label: "TLM"
    },
    {
        zone_id: "lz3",
        group_id: "loveworldplacegroup",
        value: "celoveworldplace1",
        label: "CE Loveworld Place 1"
    },
    {
        zone_id: "lz3",
        group_id: "loveworldplacegroup",
        value: "celoveworldplace2",
        label: "CE Loveworld Place 2"
    },
    {
        zone_id: "lz3",
        group_id: "loveworldplacegroup",
        value: "celoveworldplace3",
        label: "CE Loveworld Place 3"
    },
    {
        zone_id: "lz3",
        group_id: "loveworldplacegroup",
        value: "celoveworldplace4",
        label: "CE Loveworld Place 4"
    },
    {
        zone_id: "saz1",
        group_id: "randburggroup",
        value: "ceya",
        label: "CEYA"
    },
    {
        zone_id: "saz1",
        group_id: "portelizabethgroup",
        value: "cejoeslovo",
        label: "CE Joe Slovo"
    }
];

    //new variables

   const [names,setNames]=useState('');
   const [username,setUserName]=useState('');
   const { email } = route.params;
   const [zoneSS, setZoneSS] = useState('');
   const [groupSS, setGroupSS] = useState('');
   const [churchSS, setChurchSS] = useState('');
   const [password,setPassword]=useState('');
   const [passwordconfirm,setConfirmPassword]=useState('');
   const [formattedValue, setFormattedValue] = useState("");

   //form submitted
   const [isSubmit, setIsSubmit] = useState(false);


   //Error messages
   const [namesError,setNamesError]=useState(false);
   const [usernameError,setUserNameError]=useState(false);
   const [emailError,setEmailError]=useState(false);
//    const [zoneSS, setZoneSS] = useState('');
//    const [groupSS, setGroupSS] = useState('');
//    const [churchSS, setChurchSS] = useState('');
   const [passwordError,setPasswordError]=useState(false);
   const [passwordconfirmError,setConfirmPasswordError]=useState(false);
   const [formattedValueError, setFormattedValueError] = useState(false);
   const [phone, setPhone] = useState('');


  const onChangeZone = (value) => {
    setZoneSS(value);
  };

  const onChangeGroup = (value) => {
    setGroupSS(value);
  };

  const onChangeChurch = (value) => {
    setChurchSS(value);
  };


  //function to register user
  const getUserInfo = () => {
        console.log("Formatted text", formattedValue);
        setIsSubmit(true);

        if(names===""){
            setNamesError(true);

        }else if(username===""){
            setUserNameError(true);

        }else if(email===""){
            setEmailError(true);

        }else if(password===""){
            setPasswordError(true);

        }else if(passwordconfirm===""){
            setConfirmPasswordError(true);

        }else if(formattedValue===""){
            setFormattedValueError(true);
            setCountryCode(phoneInput.current);

        }else if(password!==passwordconfirm){
            setConfirmPasswordError(true);
            

        }else{
            //check if network is available
            if(isConnected===true){
                //Register user 
                  register(names, email, password, countryCode, formattedValue, username);
                //Register Rhapsdy plus user
                registerRhapsodyPlusUser();


            }else{
                //Internet Error Message 
                setInternetCheck(true);
            }

        }


  };


  const registerRhapsodyPlusUser=()=>{

    // Get IPv4 IP (priority: WiFi first, cellular second)
    NetworkInfo.getIPV4Address().then(ipv4Address => {
        console.log('IP Address',ipv4Address);
        setIpAddress(ipv4Address);
    });

    const data = {
        fullname:names,
        password:password,
        login:username,
        email:email,
        continent:getContinentName(RNLocalize.getCountry()),
        country:DeviceInfo.getDeviceCountry(),
        city:"",
        countrycode:countryCode,
        phone:formattedValue,
        zone_id:zoneSS,
        group_id:groupSS,
        church_id:churchSS,
        src:"app",
        referencetype:"personal",
        referenceid:"self",
        ip_address:ipAddress,
        password:"rabadaba"
      };

      console.log("Rhapsody plus user data",data);



      


//     Util.checkReadAndEarn(RegisterActivity.this, 
// Constant_Api.register_rhapsodyplus_user, jsonObject, new VolleyResultCallBack() {
//         @Override
//         public void onResultSuccess(JSONObject jsonObject) throws JSONException {
//             Log.e("Rhapsody Plus Success", jsonObject.toString());
//             //{"status":1,"shareid":"testermarch333759"}
//             int status = jsonObject.getInt("status");
//             if (status == 1) {
//                 editor.putBoolean("plus_registered", true);
//                 editor.commit();
//             } else if (status == 0 && jsonObject.getString("response").contains("already in use!")) {
//                 editor.putBoolean("plus_registered", true);
//                 editor.commit();
//             }
//         }

//         @Override
//         public void onResultError(VolleyError volleyError) throws JSONException {
//             Log.e("Rhapsody Plus Error", volleyError.toString());
//         }
//     }, null);
// }
if(Strings.REGISTER_RHAPSODYPLUS_USER==='https://backend3.rhapsodyofrealities.org/question/'){
    //request_method = Request.Method.GET;

}else{
    //request_method = Request.Method.POST


}

//     String key_string = "bGS6lzFqvvSQJhdslLOxatm7/Vk7mLQyzqaS34Q4oR1ew=";
//     SecretKey key = Keys.hmacShaKeyFor(key_string.getBytes());

//     //set specific issuer
//     let  issuer = "readandearn.reachoutworld.org";
//     if (url.equalsIgnoreCase(Constant_Api.universal_voucher_wallet_balance) ||
//             url.equalsIgnoreCase(Constant_Api.universal_voucher_deduct_from_wallet)){
//         issuer = "universalvoucher.org";
//     }

//     String jws = Jwts.builder()
//             //.setSubject(email)
//             .signWith(key)
//             .setIssuer(issuer)
//             .setIssuedAt(new Date(System.currentTimeMillis())) //new Date()
//             .setNotBefore(new Date(System.currentTimeMillis() + 100))
//             .setExpiration(new Date(System.currentTimeMillis() + 360000000))
//             .setId(String.valueOf(UUID.randomUUID()))
//             .claim("data", map_data)
//             .compact();

//     Log.e("Credentials", jws);
//     headers.put("Authorization", "Bearer " + jws);
//     headers.put("Content-Type", "application/json");

// const config = {
//          headers: {
//              "Content-type": "application/json",
//               "Authorization": `Bearer ${Cookies.get("jwt")}`,
//          },
//     }; 

axios.post(Strings.REGISTER_RHAPSODYPLUS_USER, data)
.then(response => {
  console.log("Registration Plus Response:",response.data.EBOOK_APP[0]);
//   if(response.data.EBOOK_APP[0].success==='1'){

//     let device_date= new Date().toDateString()
//     console.log("Device Date :",device_date);

//   }else {
//     setRegMessage(response.data.EBOOK_APP[0].msg); 
//     setRegError(true);
//     setIsLoading(false);
//   }

})
.catch(error => {
  console.error("Error sending data: 000 ", error);
  setIsLoading(false);
});


}


  const register =(names, email, password, countryCode, formattedValue, username)=>{

    const data = {
        name:names,
        email:email,
        username:username,
        password:password,
        code:countryCode,
        phone:formattedValue,
        src:"app",
        zone:zoneSS,
        church:churchSS,
        group:groupSS
      };

      console.log("Registration information",data);
      setIsLoading(true);
      
      axios.post(Strings.API_URL+'/registration', data)
        .then(response => {
          console.log("Registration Response:",response.data.EBOOK_APP[0]);
          if(response.data.EBOOK_APP[0].success==='1'){

            let device_date= new Date().toDateString()
            console.log("Device Date :",device_date);
                
            //insert data to database
                userDB.transaction(function (tx) {
                    tx.executeSql(
                    'INSERT INTO user (names,email,phone,password,lastlogin) VALUES (?,?,?,?,?)',
                    [username,email,formattedValue, password, device_date],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            console.log("SQL inserted sucessfully");
                        } else {
                            console.log("SQL Error Failed to insert to sql");
                        }
                    }
                    );
                });

                login(email, password);

          }else {
            setRegMessage(response.data.EBOOK_APP[0].msg); 
            setRegError(true);
            setIsLoading(false);
          }

        })
        .catch(error => {
          console.error("Error sending data: ", error);
          setIsLoading(false);
        });
    
  }

  //Login functionality
  const login =(email, password)=>{
    const loginData = {
        email:email,
        string:password,
      };

    let device_date= new Date().toDateString()
    console.log("Device Date :",device_date);

    axios.post(Strings.API_URL+'/login', loginData)
        .then(response => {
          console.log("Login Response Response:",response.data.result[0].success);
          let stat=response.data.result[0].subscription;
          if(response.data.result[0].success==='1'){

            userDB.transaction(function (txn) {
                txn.executeSql(
                  "SELECT email FROM user WHERE email=? ",
                  [email],
                  function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length > 0) {
                        
                        txn.executeSql(
                            'UPDATE user set status=?, lastlogin=?  where email=?',
                            [stat, device_date, email],
                            (tx, results) => {
                              
                              if (results.rowsAffected > 0) {
                                console.log("User DB Update Sucessfully ");
                                // Navigate to main Page
                                navigation.navigate('Welcome');
                                
                              } else{
                                console.log("User DB Update failed");
                              } 
                            }
                          );

                    }
                  }
                );
              });


          }else {

            setRegError('An error occured while logging in. Please try again');
            regError(true);

          }

        })
        .catch(error => {
          console.error("Error sending data: ", error);
          setIsLoading(false);
        });


  }

 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
      <ImageBackground source={require('../../assets/login_new_bg.png')} resizeMode="cover" style={styles.image}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{alignSelf:"flex-start",fontSize:28, marginTop:20,marginBottom:10,marginLeft:20}}>Sign Up</Text>
        <TextInput
          label="Full Names"
          onChangeText={newText => setNames(newText)}
          left={<TextInput.Icon icon="account" />}
          style={{width:Dimensions.get('window').width*0.9,marginBottom:10}}
        />

{isSubmit && names === "" ? <HelperText type="error" visible={true}>
           full name is Required
        </HelperText> : null} 

      <TextInput
        label="Username"
        onChangeText={newText => setUserName(newText)}
        left={<TextInput.Icon icon="account-circle" />}
        style={{width:Dimensions.get('window').width*0.9,marginBottom:10}}
      />

{isSubmit && username === "" ? <HelperText type="error" visible={true}>
           user name is Required
        </HelperText> : null} 

      <TextInput
        label="Email"
        value={email}
        left={<TextInput.Icon icon="email" />}
        style={{width:Dimensions.get('window').width*0.9,marginBottom:10}}
      />

{isSubmit && email === "" ? <HelperText type="error" visible={true}>
           email is Required
        </HelperText> : null} 

    <View style={styles.dropdowncontainer}>
          <Dropdown
              label="Select Zone (Optional)"
              enableSearch
              data={zones}
              value={zoneSS}
              onChange={onChangeZone}
              
          />
     </View>


     <View style={styles.dropdowncontainer}>
          <Dropdown
              label="Select Group (Optional)"
              enableSearch
              data={groups}
              value={groupSS}
              onChange={onChangeGroup}
              
          />
        </View>


    <View style={styles.dropdowncontainer}>
          <Dropdown
              label="Select Church (Optional)"
              enableSearch
              data={churches}
              value={churchSS}
              onChange={onChangeChurch}
              
          />

    </View>
  

      <TextInput
        label="Password"
        onChangeText={newText => setPassword(newText)}
        secureTextEntry={true}
        left={<TextInput.Icon icon="lock" />}
        style={{width:Dimensions.get('window').width*0.9,marginBottom:10}}
      />

{isSubmit && password === "" ? <HelperText type="error" visible={true}>
           password is Required
        </HelperText> : null} 

        <TextInput
          label="Confirm Password"
          onChangeText={newText => setConfirmPassword(newText)}
          secureTextEntry={true}
          left={<TextInput.Icon icon="lock" />}
          style={{width:Dimensions.get('window').width*0.9,marginBottom:10}}
        />

{isSubmit && passwordconfirm === "" ? <HelperText type="error" visible={true}>
           Confirm Password is Required
        </HelperText> : null} 

        {isSubmit && (password !== passwordconfirm) ? <HelperText type="error" visible={true}>
           name is Required
        </HelperText> : null} 

        <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            layout="first"
            onChangeText={(text) => {
              setPhone(text);
              setCountryCode(phoneInput.current?.getCountryCode() || '');
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
            containerStyle={{
              width:Dimensions.get('window').width*0.9,marginBottom:10
            }}
            
          />

{/* {isSubmit && name === "" ? <HelperText type="error" visible={true}>
           name is Required
        </HelperText> : null}  */}
         

      <TouchableOpacity
        style={styles.button}
        onPress={() => getUserInfo()}
      >
        <Text style={{color:'white'}}>Register</Text>
      </TouchableOpacity>

      {/* Network snack bar */}
      <SnackBar visible={internetCheck} textMessage="Registration Failed  Check Your Internet Conncetion" 
        actionHandler={()=>{setInternetCheck(false);}} actionText="OKAY"/>
      
      {/* failed Registration snack bar */}
      <SnackBar visible={regError} textMessage={regMessage} 
        actionHandler={()=>{setRegError(false);}} actionText="OKAY"/>

      {isLoading && (
        <View style={{  
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
          <ActivityIndicator
            style={{ height: 80 }}
            color="#C00"
            size="large"
          />
          </View>
        )}

      


      </View>
      </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  dropdowncontainer:{
     width:'90%',
     marginBottom:10
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  image2: {
    width: 96,
    height: 96,
    borderRadius: 24,
    marginBottom:20,
    marginTop:-20
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    height: 50,
    borderRadius:10,
    width: Dimensions.get('window').width*0.9,
    marginTop: 20,
    justifyContent: 'center',
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    width:60,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width:50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, width:50, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },


  dropdown3BtnStyle: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 0,
    borderRadius: 4,
    borderColor: '#444',
    marginBottom:10
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},
  

});

export default RegistrationPage;
