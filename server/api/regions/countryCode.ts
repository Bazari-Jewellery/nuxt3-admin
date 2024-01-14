import { CountryCode } from "~/types"

export default defineEventHandler(async(event)=>{
  let data = [
    {
      "country_code": "AF",
      "label": "Afghanistan",
      "phoneCode": 93,
      "avatar": {
        "src": "https://flagcdn.com/af.svg",
        "alt": "Afghanistan"
      }
    },
    {
      "country_code": "AL",
      "label": "Albania",
      "phoneCode": 355,
      "avatar": {
        "src": "https://flagcdn.com/al.svg",
        "alt": "Albania"
      }
    },
    {
      "country_code": "DZ",
      "label": "Algeria",
      "phoneCode": 213,
      "avatar": {
        "src": "https://flagcdn.com/dz.svg",
        "alt": "Algeria"
      }
    },
    {
      "country_code": "AS",
      "label": "American Samoa",
      "phoneCode": 1684,
      "avatar": {
        "src": "https://flagcdn.com/as.svg",
        "alt": "American Samoa"
      }
    },
    {
      "country_code": "AD",
      "label": "Andorra",
      "phoneCode": 376,
      "avatar": {
        "src": "https://flagcdn.com/ad.svg",
        "alt": "Andorra"
      }
    },
    {
      "country_code": "AO",
      "label": "Angola",
      "phoneCode": 244,
      "avatar": {
        "src": "https://flagcdn.com/ao.svg",
        "alt": "Angola"
      }
    },
    {
      "country_code": "AI",
      "label": "Anguilla",
      "phoneCode": 1264,
      "avatar": {
        "src": "https://flagcdn.com/ai.svg",
        "alt": "Anguilla"
      }
    },
    {
      "country_code": "AQ",
      "label": "Antarctica",
      "phoneCode": 0,
      "avatar": {
        "src": "https://flagcdn.com/aq.svg",
        "alt": "Antarctica"
      }
    },
    {
      "country_code": "AR",
      "label": "Argentina",
      "phoneCode": 54,
      "avatar": {
        "src": "https://flagcdn.com/ar.svg",
        "alt": "Argentina"
      }
    },
    {
      "country_code": "AM",
      "label": "Armenia",
      "phoneCode": 374,
      "avatar": {
        "src": "https://flagcdn.com/am.svg",
        "alt": "Armenia"
      }
    },
    {
      "country_code": "AW",
      "label": "Aruba",
      "phoneCode": 297,
      "avatar": {
        "src": "https://flagcdn.com/aw.svg",
        "alt": "Aruba"
      }
    },
    {
      "country_code": "AU",
      "label": "Australia",
      "phoneCode": 61,
      "avatar": {
        "src": "https://flagcdn.com/au.svg",
        "alt": "Australia"
      }
    },
    {
      "country_code": "AT",
      "label": "Austria",
      "phoneCode": 43,
      "avatar": {
        "src": "https://flagcdn.com/at.svg",
        "alt": "Austria"
      }
    },
    {
      "country_code": "AZ",
      "label": "Azerbaijan",
      "phoneCode": 994,
      "avatar": {
        "src": "https://flagcdn.com/az.svg",
        "alt": "Azerbaijan"
      }
    },
    {
      "country_code": "BH",
      "label": "Bahrain",
      "phoneCode": 973,
      "avatar": {
        "src": "https://flagcdn.com/bh.svg",
        "alt": "Bahrain"
      }
    },
    {
      "country_code": "BD",
      "label": "Bangladesh",
      "phoneCode": 880,
      "avatar": {
        "src": "https://flagcdn.com/bd.svg",
        "alt": "Bangladesh"
      }
    },
    {
      "country_code": "BB",
      "label": "Barbados",
      "phoneCode": 1246,
      "avatar": {
        "src": "https://flagcdn.com/bb.svg",
        "alt": "Barbados"
      }
    },
    {
      "country_code": "BY",
      "label": "Belarus",
      "phoneCode": 375,
      "avatar": {
        "src": "https://flagcdn.com/by.svg",
        "alt": "Belarus"
      }
    },
    {
      "country_code": "BE",
      "label": "Belgium",
      "phoneCode": 32,
      "avatar": {
        "src": "https://flagcdn.com/be.svg",
        "alt": "Belgium"
      }
    },
    {
      "country_code": "BZ",
      "label": "Belize",
      "phoneCode": 501,
      "avatar": {
        "src": "https://flagcdn.com/bz.svg",
        "alt": "Belize"
      }
    },
    {
      "country_code": "BJ",
      "label": "Benin",
      "phoneCode": 229,
      "avatar": {
        "src": "https://flagcdn.com/bj.svg",
        "alt": "Benin"
      }
    },
    {
      "country_code": "BM",
      "label": "Bermuda",
      "phoneCode": 1441,
      "avatar": {
        "src": "https://flagcdn.com/bm.svg",
        "alt": "Bermuda"
      }
    },
    {
      "country_code": "BT",
      "label": "Bhutan",
      "phoneCode": 975,
      "avatar": {
        "src": "https://flagcdn.com/bt.svg",
        "alt": "Bhutan"
      }
    },
    {
      "country_code": "BO",
      "label": "Bolivia",
      "phoneCode": 591,
      "avatar": {
        "src": "https://flagcdn.com/bo.svg",
        "alt": "Bolivia"
      }
    },
    {
      "country_code": "BW",
      "label": "Botswana",
      "phoneCode": 267,
      "avatar": {
        "src": "https://flagcdn.com/bw.svg",
        "alt": "Botswana"
      }
    },
    {
      "country_code": "BV",
      "label": "Bouvet Island",
      "phoneCode": 0,
      "avatar": {
        "src": "https://flagcdn.com/bv.svg",
        "alt": "Bouvet Island"
      }
    },
    {
      "country_code": "BR",
      "label": "Brazil",
      "phoneCode": 55,
      "avatar": {
        "src": "https://flagcdn.com/br.svg",
        "alt": "Brazil"
      }
    },
    {
      "country_code": "IO",
      "label": "British Indian Ocean Territory",
      "phoneCode": 246,
      "avatar": {
        "src": "https://flagcdn.com/io.svg",
        "alt": "British Indian Ocean Territory"
      }
    },
    {
      "country_code": "BN",
      "label": "Brunei",
      "phoneCode": 673,
      "avatar": {
        "src": "https://flagcdn.com/bn.svg",
        "alt": "Brunei"
      }
    },
    {
      "country_code": "BG",
      "label": "Bulgaria",
      "phoneCode": 359,
      "avatar": {
        "src": "https://flagcdn.com/bg.svg",
        "alt": "Bulgaria"
      }
    },
    {
      "country_code": "BF",
      "label": "Burkina Faso",
      "phoneCode": 226,
      "avatar": {
        "src": "https://flagcdn.com/bf.svg",
        "alt": "Burkina Faso"
      }
    },
    {
      "country_code": "BI",
      "label": "Burundi",
      "phoneCode": 257,
      "avatar": {
        "src": "https://flagcdn.com/bi.svg",
        "alt": "Burundi"
      }
    },
    {
      "country_code": "KH",
      "label": "Cambodia",
      "phoneCode": 855,
      "avatar": {
        "src": "https://flagcdn.com/kh.svg",
        "alt": "Cambodia"
      }
    },
    {
      "country_code": "CM",
      "label": "Cameroon",
      "phoneCode": 237,
      "avatar": {
        "src": "https://flagcdn.com/cm.svg",
        "alt": "Cameroon"
      }
    },
    {
      "country_code": "CA",
      "label": "Canada",
      "phoneCode": 1,
      "avatar": {
        "src": "https://flagcdn.com/ca.svg",
        "alt": "Canada"
      }
    },
    {
      "country_code": "CV",
      "label": "Cape Verde",
      "phoneCode": 238,
      "avatar": {
        "src": "https://flagcdn.com/cv.svg",
        "alt": "Cape Verde"
      }
    },
    {
      "country_code": "KY",
      "label": "Cayman Islands",
      "phoneCode": 1345,
      "avatar": {
        "src": "https://flagcdn.com/ky.svg",
        "alt": "Cayman Islands"
      }
    },
    {
      "country_code": "CF",
      "label": "Central African Republic",
      "phoneCode": 236,
      "avatar": {
        "src": "https://flagcdn.com/cf.svg",
        "alt": "Central African Republic"
      }
    },
    {
      "country_code": "TD",
      "label": "Chad",
      "phoneCode": 235,
      "avatar": {
        "src": "https://flagcdn.com/td.svg",
        "alt": "Chad"
      }
    },
    {
      "country_code": "CL",
      "label": "Chile",
      "phoneCode": 56,
      "avatar": {
        "src": "https://flagcdn.com/cl.svg",
        "alt": "Chile"
      }
    },
    {
      "country_code": "CN",
      "label": "China",
      "phoneCode": 86,
      "avatar": {
        "src": "https://flagcdn.com/cn.svg",
        "alt": "China"
      }
    },
    {
      "country_code": "CX",
      "label": "Christmas Island",
      "phoneCode": 61,
      "avatar": {
        "src": "https://flagcdn.com/cx.svg",
        "alt": "Christmas Island"
      }
    },
    {
      "country_code": "CC",
      "label": "Cocos (Keeling) Islands",
      "phoneCode": 672,
      "avatar": {
        "src": "https://flagcdn.com/cc.svg",
        "alt": "Cocos (Keeling) Islands"
      }
    },
    {
      "country_code": "CO",
      "label": "Colombia",
      "phoneCode": 57,
      "avatar": {
        "src": "https://flagcdn.com/co.svg",
        "alt": "Colombia"
      }
    },
    {
      "country_code": "KM",
      "label": "Comoros",
      "phoneCode": 269,
      "avatar": {
        "src": "https://flagcdn.com/km.svg",
        "alt": "Comoros"
      }
    },
    {
      "country_code": "CK",
      "label": "Cook Islands",
      "phoneCode": 682,
      "avatar": {
        "src": "https://flagcdn.com/ck.svg",
        "alt": "Cook Islands"
      }
    },
    {
      "country_code": "CR",
      "label": "Costa Rica",
      "phoneCode": 506,
      "avatar": {
        "src": "https://flagcdn.com/cr.svg",
        "alt": "Costa Rica"
      }
    },
    {
      "country_code": "CU",
      "label": "Cuba",
      "phoneCode": 53,
      "avatar": {
        "src": "https://flagcdn.com/cu.svg",
        "alt": "Cuba"
      }
    },
    {
      "country_code": "CY",
      "label": "Cyprus",
      "phoneCode": 357,
      "avatar": {
        "src": "https://flagcdn.com/cy.svg",
        "alt": "Cyprus"
      }
    },
    {
      "country_code": "DK",
      "label": "Denmark",
      "phoneCode": 45,
      "avatar": {
        "src": "https://flagcdn.com/dk.svg",
        "alt": "Denmark"
      }
    },
    {
      "country_code": "DJ",
      "label": "Djibouti",
      "phoneCode": 253,
      "avatar": {
        "src": "https://flagcdn.com/dj.svg",
        "alt": "Djibouti"
      }
    },
    {
      "country_code": "DM",
      "label": "Dominica",
      "phoneCode": 1767,
      "avatar": {
        "src": "https://flagcdn.com/dm.svg",
        "alt": "Dominica"
      }
    },
    {
      "country_code": "DO",
      "label": "Dominican Republic",
      "phoneCode": 1809,
      "avatar": {
        "src": "https://flagcdn.com/do.svg",
        "alt": "Dominican Republic"
      }
    },
    {
      "country_code": "EC",
      "label": "Ecuador",
      "phoneCode": 593,
      "avatar": {
        "src": "https://flagcdn.com/ec.svg",
        "alt": "Ecuador"
      }
    },
    {
      "country_code": "EG",
      "label": "Egypt",
      "phoneCode": 20,
      "avatar": {
        "src": "https://flagcdn.com/eg.svg",
        "alt": "Egypt"
      }
    },
    {
      "country_code": "SV",
      "label": "El Salvador",
      "phoneCode": 503,
      "avatar": {
        "src": "https://flagcdn.com/sv.svg",
        "alt": "El Salvador"
      }
    },
    {
      "country_code": "GQ",
      "label": "Equatorial Guinea",
      "phoneCode": 240,
      "avatar": {
        "src": "https://flagcdn.com/gq.svg",
        "alt": "Equatorial Guinea"
      }
    },
    {
      "country_code": "ER",
      "label": "Eritrea",
      "phoneCode": 291,
      "avatar": {
        "src": "https://flagcdn.com/er.svg",
        "alt": "Eritrea"
      }
    },
    {
      "country_code": "EE",
      "label": "Estonia",
      "phoneCode": 372,
      "avatar": {
        "src": "https://flagcdn.com/ee.svg",
        "alt": "Estonia"
      }
    },
    {
      "country_code": "ET",
      "label": "Ethiopia",
      "phoneCode": 251,
      "avatar": {
        "src": "https://flagcdn.com/et.svg",
        "alt": "Ethiopia"
      }
    },
    {
      "country_code": "FK",
      "label": "Falkland Islands",
      "phoneCode": 500,
      "avatar": {
        "src": "https://flagcdn.com/fk.svg",
        "alt": "Falkland Islands"
      }
    },
    {
      "country_code": "FO",
      "label": "Faroe Islands",
      "phoneCode": 298,
      "avatar": {
        "src": "https://flagcdn.com/fo.svg",
        "alt": "Faroe Islands"
      }
    },
    {
      "country_code": "FI",
      "label": "Finland",
      "phoneCode": 358,
      "avatar": {
        "src": "https://flagcdn.com/fi.svg",
        "alt": "Finland"
      }
    },
    {
      "country_code": "FR",
      "label": "France",
      "phoneCode": 33,
      "avatar": {
        "src": "https://flagcdn.com/fr.svg",
        "alt": "France"
      }
    },
    {
      "country_code": "GF",
      "label": "French Guiana",
      "phoneCode": 594,
      "avatar": {
        "src": "https://flagcdn.com/gf.svg",
        "alt": "French Guiana"
      }
    },
    {
      "country_code": "PF",
      "label": "French Polynesia",
      "phoneCode": 689,
      "avatar": {
        "src": "https://flagcdn.com/pf.svg",
        "alt": "French Polynesia"
      }
    },
    {
      "country_code": "TF",
      "label": "French Southern Territories",
      "phoneCode": 0,
      "avatar": {
        "src": "https://flagcdn.com/tf.svg",
        "alt": "French Southern Territories"
      }
    },
    {
      "country_code": "GA",
      "label": "Gabon",
      "phoneCode": 241,
      "avatar": {
        "src": "https://flagcdn.com/ga.svg",
        "alt": "Gabon"
      }
    },
    {
      "country_code": "GE",
      "label": "Georgia",
      "phoneCode": 995,
      "avatar": {
        "src": "https://flagcdn.com/ge.svg",
        "alt": "Georgia"
      }
    },
    {
      "country_code": "DE",
      "label": "Germany",
      "phoneCode": 49,
      "avatar": {
        "src": "https://flagcdn.com/de.svg",
        "alt": "Germany"
      }
    },
    {
      "country_code": "GH",
      "label": "Ghana",
      "phoneCode": 233,
      "avatar": {
        "src": "https://flagcdn.com/gh.svg",
        "alt": "Ghana"
      }
    },
    {
      "country_code": "GI",
      "label": "Gibraltar",
      "phoneCode": 350,
      "avatar": {
        "src": "https://flagcdn.com/gi.svg",
        "alt": "Gibraltar"
      }
    },
    {
      "country_code": "GR",
      "label": "Greece",
      "phoneCode": 30,
      "avatar": {
        "src": "https://flagcdn.com/gr.svg",
        "alt": "Greece"
      }
    },
    {
      "country_code": "GL",
      "label": "Greenland",
      "phoneCode": 299,
      "avatar": {
        "src": "https://flagcdn.com/gl.svg",
        "alt": "Greenland"
      }
    },
    {
      "country_code": "GD",
      "label": "Grenada",
      "phoneCode": 1473,
      "avatar": {
        "src": "https://flagcdn.com/gd.svg",
        "alt": "Grenada"
      }
    },
    {
      "country_code": "GP",
      "label": "Guadeloupe",
      "phoneCode": 590,
      "avatar": {
        "src": "https://flagcdn.com/gp.svg",
        "alt": "Guadeloupe"
      }
    },
    {
      "country_code": "GU",
      "label": "Guam",
      "phoneCode": 1671,
      "avatar": {
        "src": "https://flagcdn.com/gu.svg",
        "alt": "Guam"
      }
    },
    {
      "country_code": "GT",
      "label": "Guatemala",
      "phoneCode": 502,
      "avatar": {
        "src": "https://flagcdn.com/gt.svg",
        "alt": "Guatemala"
      }
    },
    {
      "country_code": "GN",
      "label": "Guinea",
      "phoneCode": 224,
      "avatar": {
        "src": "https://flagcdn.com/gn.svg",
        "alt": "Guinea"
      }
    },
    {
      "country_code": "GW",
      "label": "Guinea-Bissau",
      "phoneCode": 245,
      "avatar": {
        "src": "https://flagcdn.com/gw.svg",
        "alt": "Guinea-Bissau"
      }
    },
    {
      "country_code": "GY",
      "label": "Guyana",
      "phoneCode": 592,
      "avatar": {
        "src": "https://flagcdn.com/gy.svg",
        "alt": "Guyana"
      }
    },
    {
      "country_code": "HT",
      "label": "Haiti",
      "phoneCode": 509,
      "avatar": {
        "src": "https://flagcdn.com/ht.svg",
        "alt": "Haiti"
      }
    },
    {
      "country_code": "HN",
      "label": "Honduras",
      "phoneCode": 504,
      "avatar": {
        "src": "https://flagcdn.com/hn.svg",
        "alt": "Honduras"
      }
    },
    {
      "country_code": "HU",
      "label": "Hungary",
      "phoneCode": 36,
      "avatar": {
        "src": "https://flagcdn.com/hu.svg",
        "alt": "Hungary"
      }
    },
    {
      "country_code": "IS",
      "label": "Iceland",
      "phoneCode": 354,
      "avatar": {
        "src": "https://flagcdn.com/is.svg",
        "alt": "Iceland"
      }
    },
    {
      "country_code": "IN",
      "label": "India",
      "phoneCode": 91,
      "avatar": {
        "src": "https://flagcdn.com/in.svg",
        "alt": "India"
      }
    },
    {
      "country_code": "ID",
      "label": "Indonesia",
      "phoneCode": 62,
      "avatar": {
        "src": "https://flagcdn.com/id.svg",
        "alt": "Indonesia"
      }
    },
    {
      "country_code": "IR",
      "label": "Iran",
      "phoneCode": 98,
      "avatar": {
        "src": "https://flagcdn.com/ir.svg",
        "alt": "Iran"
      }
    },
    {
      "country_code": "IQ",
      "label": "Iraq",
      "phoneCode": 964,
      "avatar": {
        "src": "https://flagcdn.com/iq.svg",
        "alt": "Iraq"
      }
    },
    {
      "country_code": "IE",
      "label": "Ireland",
      "phoneCode": 353,
      "avatar": {
        "src": "https://flagcdn.com/ie.svg",
        "alt": "Ireland"
      }
    },
    {
      "country_code": "IL",
      "label": "Israel",
      "phoneCode": 972,
      "avatar": {
        "src": "https://flagcdn.com/il.svg",
        "alt": "Israel"
      }
    },
    {
      "country_code": "IT",
      "label": "Italy",
      "phoneCode": 39,
      "avatar": {
        "src": "https://flagcdn.com/it.svg",
        "alt": "Italy"
      }
    },
    {
      "country_code": "JM",
      "label": "Jamaica",
      "phoneCode": 1876,
      "avatar": {
        "src": "https://flagcdn.com/jm.svg",
        "alt": "Jamaica"
      }
    },
    {
      "country_code": "JP",
      "label": "Japan",
      "phoneCode": 81,
      "avatar": {
        "src": "https://flagcdn.com/jp.svg",
        "alt": "Japan"
      }
    },
    {
      "country_code": "JO",
      "label": "Jordan",
      "phoneCode": 962,
      "avatar": {
        "src": "https://flagcdn.com/jo.svg",
        "alt": "Jordan"
      }
    },
    {
      "country_code": "KZ",
      "label": "Kazakhstan",
      "phoneCode": 7,
      "avatar": {
        "src": "https://flagcdn.com/kz.svg",
        "alt": "Kazakhstan"
      }
    },
    {
      "country_code": "KE",
      "label": "Kenya",
      "phoneCode": 254,
      "avatar": {
        "src": "https://flagcdn.com/ke.svg",
        "alt": "Kenya"
      }
    },
    {
      "country_code": "KI",
      "label": "Kiribati",
      "phoneCode": 686,
      "avatar": {
        "src": "https://flagcdn.com/ki.svg",
        "alt": "Kiribati"
      }
    },
    {
      "country_code": "KW",
      "label": "Kuwait",
      "phoneCode": 965,
      "avatar": {
        "src": "https://flagcdn.com/kw.svg",
        "alt": "Kuwait"
      }
    },
    {
      "country_code": "KG",
      "label": "Kyrgyzstan",
      "phoneCode": 996,
      "avatar": {
        "src": "https://flagcdn.com/kg.svg",
        "alt": "Kyrgyzstan"
      }
    },
    {
      "country_code": "LA",
      "label": "Laos",
      "phoneCode": 856,
      "avatar": {
        "src": "https://flagcdn.com/la.svg",
        "alt": "Laos"
      }
    },
    {
      "country_code": "LV",
      "label": "Latvia",
      "phoneCode": 371,
      "avatar": {
        "src": "https://flagcdn.com/lv.svg",
        "alt": "Latvia"
      }
    },
    {
      "country_code": "LB",
      "label": "Lebanon",
      "phoneCode": 961,
      "avatar": {
        "src": "https://flagcdn.com/lb.svg",
        "alt": "Lebanon"
      }
    },
    {
      "country_code": "LS",
      "label": "Lesotho",
      "phoneCode": 266,
      "avatar": {
        "src": "https://flagcdn.com/ls.svg",
        "alt": "Lesotho"
      }
    },
    {
      "country_code": "LR",
      "label": "Liberia",
      "phoneCode": 231,
      "avatar": {
        "src": "https://flagcdn.com/lr.svg",
        "alt": "Liberia"
      }
    },
    {
      "country_code": "LY",
      "label": "Libya",
      "phoneCode": 218,
      "avatar": {
        "src": "https://flagcdn.com/ly.svg",
        "alt": "Libya"
      }
    },
    {
      "country_code": "LI",
      "label": "Liechtenstein",
      "phoneCode": 423,
      "avatar": {
        "src": "https://flagcdn.com/li.svg",
        "alt": "Liechtenstein"
      }
    },
    {
      "country_code": "LT",
      "label": "Lithuania",
      "phoneCode": 370,
      "avatar": {
        "src": "https://flagcdn.com/lt.svg",
        "alt": "Lithuania"
      }
    },
    {
      "country_code": "LU",
      "label": "Luxembourg",
      "phoneCode": 352,
      "avatar": {
        "src": "https://flagcdn.com/lu.svg",
        "alt": "Luxembourg"
      }
    },
    {
      "country_code": "MK",
      "label": "Macedonia",
      "phoneCode": 389,
      "avatar": {
        "src": "https://flagcdn.com/mk.svg",
        "alt": "Macedonia"
      }
    },
    {
      "country_code": "MG",
      "label": "Madagascar",
      "phoneCode": 261,
      "avatar": {
        "src": "https://flagcdn.com/mg.svg",
        "alt": "Madagascar"
      }
    },
    {
      "country_code": "MW",
      "label": "Malawi",
      "phoneCode": 265,
      "avatar": {
        "src": "https://flagcdn.com/mw.svg",
        "alt": "Malawi"
      }
    },
    {
      "country_code": "MY",
      "label": "Malaysia",
      "phoneCode": 60,
      "avatar": {
        "src": "https://flagcdn.com/my.svg",
        "alt": "Malaysia"
      }
    },
    {
      "country_code": "MV",
      "label": "Maldives",
      "phoneCode": 960,
      "avatar": {
        "src": "https://flagcdn.com/mv.svg",
        "alt": "Maldives"
      }
    },
    {
      "country_code": "ML",
      "label": "Mali",
      "phoneCode": 223,
      "avatar": {
        "src": "https://flagcdn.com/ml.svg",
        "alt": "Mali"
      }
    },
    {
      "country_code": "MT",
      "label": "Malta",
      "phoneCode": 356,
      "avatar": {
        "src": "https://flagcdn.com/mt.svg",
        "alt": "Malta"
      }
    },
    {
      "country_code": "MH",
      "label": "Marshall Islands",
      "phoneCode": 692,
      "avatar": {
        "src": "https://flagcdn.com/mh.svg",
        "alt": "Marshall Islands"
      }
    },
    {
      "country_code": "MQ",
      "label": "Martinique",
      "phoneCode": 596,
      "avatar": {
        "src": "https://flagcdn.com/mq.svg",
        "alt": "Martinique"
      }
    },
    {
      "country_code": "MR",
      "label": "Mauritania",
      "phoneCode": 222,
      "avatar": {
        "src": "https://flagcdn.com/mr.svg",
        "alt": "Mauritania"
      }
    },
    {
      "country_code": "MU",
      "label": "Mauritius",
      "phoneCode": 230,
      "avatar": {
        "src": "https://flagcdn.com/mu.svg",
        "alt": "Mauritius"
      }
    },
    {
      "country_code": "YT",
      "label": "Mayotte",
      "phoneCode": 269,
      "avatar": {
        "src": "https://flagcdn.com/yt.svg",
        "alt": "Mayotte"
      }
    },
    {
      "country_code": "MX",
      "label": "Mexico",
      "phoneCode": 52,
      "avatar": {
        "src": "https://flagcdn.com/mx.svg",
        "alt": "Mexico"
      }
    },
    {
      "country_code": "FM",
      "label": "Micronesia",
      "phoneCode": 691,
      "avatar": {
        "src": "https://flagcdn.com/fm.svg",
        "alt": "Micronesia"
      }
    },
    {
      "country_code": "MD",
      "label": "Moldova",
      "phoneCode": 373,
      "avatar": {
        "src": "https://flagcdn.com/md.svg",
        "alt": "Moldova"
      }
    },
    {
      "country_code": "MC",
      "label": "Monaco",
      "phoneCode": 377,
      "avatar": {
        "src": "https://flagcdn.com/mc.svg",
        "alt": "Monaco"
      }
    },
    {
      "country_code": "MN",
      "label": "Mongolia",
      "phoneCode": 976,
      "avatar": {
        "src": "https://flagcdn.com/mn.svg",
        "alt": "Mongolia"
      }
    },
    {
      "country_code": "MS",
      "label": "Montserrat",
      "phoneCode": 1664,
      "avatar": {
        "src": "https://flagcdn.com/ms.svg",
        "alt": "Montserrat"
      }
    },
    {
      "country_code": "MA",
      "label": "Morocco",
      "phoneCode": 212,
      "avatar": {
        "src": "https://flagcdn.com/ma.svg",
        "alt": "Morocco"
      }
    },
    {
      "country_code": "MZ",
      "label": "Mozambique",
      "phoneCode": 258,
      "avatar": {
        "src": "https://flagcdn.com/mz.svg",
        "alt": "Mozambique"
      }
    },
    {
      "country_code": "NA",
      "label": "Namibia",
      "phoneCode": 264,
      "avatar": {
        "src": "https://flagcdn.com/na.svg",
        "alt": "Namibia"
      }
    },
    {
      "country_code": "NR",
      "label": "Nauru",
      "phoneCode": 674,
      "avatar": {
        "src": "https://flagcdn.com/nr.svg",
        "alt": "Nauru"
      }
    },
    {
      "country_code": "NP",
      "label": "Nepal",
      "phoneCode": 977,
      "avatar": {
        "src": "https://flagcdn.com/np.svg",
        "alt": "Nepal"
      }
    },
    {
      "country_code": "NC",
      "label": "New Caledonia",
      "phoneCode": 687,
      "avatar": {
        "src": "https://flagcdn.com/nc.svg",
        "alt": "New Caledonia"
      }
    },
    {
      "country_code": "NZ",
      "label": "New Zealand",
      "phoneCode": 64,
      "avatar": {
        "src": "https://flagcdn.com/nz.svg",
        "alt": "New Zealand"
      }
    },
    {
      "country_code": "NI",
      "label": "Nicaragua",
      "phoneCode": 505,
      "avatar": {
        "src": "https://flagcdn.com/ni.svg",
        "alt": "Nicaragua"
      }
    },
    {
      "country_code": "NE",
      "label": "Niger",
      "phoneCode": 227,
      "avatar": {
        "src": "https://flagcdn.com/ne.svg",
        "alt": "Niger"
      }
    },
    {
      "country_code": "NG",
      "label": "Nigeria",
      "phoneCode": 234,
      "avatar": {
        "src": "https://flagcdn.com/ng.svg",
        "alt": "Nigeria"
      }
    },
    {
      "country_code": "NU",
      "label": "Niue",
      "phoneCode": 683,
      "avatar": {
        "src": "https://flagcdn.com/nu.svg",
        "alt": "Niue"
      }
    },
    {
      "country_code": "NF",
      "label": "Norfolk Island",
      "phoneCode": 672,
      "avatar": {
        "src": "https://flagcdn.com/nf.svg",
        "alt": "Norfolk Island"
      }
    },
    {
      "country_code": "MP",
      "label": "Northern Mariana Islands",
      "phoneCode": 1670,
      "avatar": {
        "src": "https://flagcdn.com/mp.svg",
        "alt": "Northern Mariana Islands"
      }
    },
    {
      "country_code": "NO",
      "label": "Norway",
      "phoneCode": 47,
      "avatar": {
        "src": "https://flagcdn.com/no.svg",
        "alt": "Norway"
      }
    },
    {
      "country_code": "OM",
      "label": "Oman",
      "phoneCode": 968,
      "avatar": {
        "src": "https://flagcdn.com/om.svg",
        "alt": "Oman"
      }
    },
    {
      "country_code": "PK",
      "label": "Pakistan",
      "phoneCode": 92,
      "avatar": {
        "src": "https://flagcdn.com/pk.svg",
        "alt": "Pakistan"
      }
    },
    {
      "country_code": "PW",
      "label": "Palau",
      "phoneCode": 680,
      "avatar": {
        "src": "https://flagcdn.com/pw.svg",
        "alt": "Palau"
      }
    },
    {
      "country_code": "PA",
      "label": "Panama",
      "phoneCode": 507,
      "avatar": {
        "src": "https://flagcdn.com/pa.svg",
        "alt": "Panama"
      }
    },
    {
      "country_code": "PY",
      "label": "Paraguay",
      "phoneCode": 595,
      "avatar": {
        "src": "https://flagcdn.com/py.svg",
        "alt": "Paraguay"
      }
    },
    {
      "country_code": "PE",
      "label": "Peru",
      "phoneCode": 51,
      "avatar": {
        "src": "https://flagcdn.com/pe.svg",
        "alt": "Peru"
      }
    },
    {
      "country_code": "PH",
      "label": "Philippines",
      "phoneCode": 63,
      "avatar": {
        "src": "https://flagcdn.com/ph.svg",
        "alt": "Philippines"
      }
    },
    {
      "country_code": "PL",
      "label": "Poland",
      "phoneCode": 48,
      "avatar": {
        "src": "https://flagcdn.com/pl.svg",
        "alt": "Poland"
      }
    },
    {
      "country_code": "PT",
      "label": "Portugal",
      "phoneCode": 351,
      "avatar": {
        "src": "https://flagcdn.com/pt.svg",
        "alt": "Portugal"
      }
    },
    {
      "country_code": "PR",
      "label": "Puerto Rico",
      "phoneCode": 1787,
      "avatar": {
        "src": "https://flagcdn.com/pr.svg",
        "alt": "Puerto Rico"
      }
    },
    {
      "country_code": "QA",
      "label": "Qatar",
      "phoneCode": 974,
      "avatar": {
        "src": "https://flagcdn.com/qa.svg",
        "alt": "Qatar"
      }
    },
    {
      "country_code": "RO",
      "label": "Romania",
      "phoneCode": 40,
      "avatar": {
        "src": "https://flagcdn.com/ro.svg",
        "alt": "Romania"
      }
    },
    {
      "country_code": "RU",
      "label": "Russia",
      "phoneCode": 70,
      "avatar": {
        "src": "https://flagcdn.com/ru.svg",
        "alt": "Russia"
      }
    },
    {
      "country_code": "RW",
      "label": "Rwanda",
      "phoneCode": 250,
      "avatar": {
        "src": "https://flagcdn.com/rw.svg",
        "alt": "Rwanda"
      }
    },
    {
      "country_code": "WS",
      "label": "Samoa",
      "phoneCode": 684,
      "avatar": {
        "src": "https://flagcdn.com/ws.svg",
        "alt": "Samoa"
      }
    },
    {
      "country_code": "SM",
      "label": "San Marino",
      "phoneCode": 378,
      "avatar": {
        "src": "https://flagcdn.com/sm.svg",
        "alt": "San Marino"
      }
    },
    {
      "country_code": "SA",
      "label": "Saudi Arabia",
      "phoneCode": 966,
      "avatar": {
        "src": "https://flagcdn.com/sa.svg",
        "alt": "Saudi Arabia"
      }
    },
    {
      "country_code": "SN",
      "label": "Senegal",
      "phoneCode": 221,
      "avatar": {
        "src": "https://flagcdn.com/sn.svg",
        "alt": "Senegal"
      }
    },
    {
      "country_code": "RS",
      "label": "Serbia",
      "phoneCode": 381,
      "avatar": {
        "src": "https://flagcdn.com/rs.svg",
        "alt": "Serbia"
      }
    },
    {
      "country_code": "SC",
      "label": "Seychelles",
      "phoneCode": 248,
      "avatar": {
        "src": "https://flagcdn.com/sc.svg",
        "alt": "Seychelles"
      }
    },
    {
      "country_code": "SL",
      "label": "Sierra Leone",
      "phoneCode": 232,
      "avatar": {
        "src": "https://flagcdn.com/sl.svg",
        "alt": "Sierra Leone"
      }
    },
    {
      "country_code": "SG",
      "label": "Singapore",
      "phoneCode": 65,
      "avatar": {
        "src": "https://flagcdn.com/sg.svg",
        "alt": "Singapore"
      }
    },
    {
      "country_code": "SK",
      "label": "Slovakia",
      "phoneCode": 421,
      "avatar": {
        "src": "https://flagcdn.com/sk.svg",
        "alt": "Slovakia"
      }
    },
    {
      "country_code": "SI",
      "label": "Slovenia",
      "phoneCode": 386,
      "avatar": {
        "src": "https://flagcdn.com/si.svg",
        "alt": "Slovenia"
      }
    },
    {
      "country_code": "SB",
      "label": "Solomon Islands",
      "phoneCode": 677,
      "avatar": {
        "src": "https://flagcdn.com/sb.svg",
        "alt": "Solomon Islands"
      }
    },
    {
      "country_code": "SO",
      "label": "Somalia",
      "phoneCode": 252,
      "avatar": {
        "src": "https://flagcdn.com/so.svg",
        "alt": "Somalia"
      }
    },
    {
      "country_code": "ZA",
      "label": "South Africa",
      "phoneCode": 27,
      "avatar": {
        "src": "https://flagcdn.com/za.svg",
        "alt": "South Africa"
      }
    },
    {
      "country_code": "SS",
      "label": "South Sudan",
      "phoneCode": 211,
      "avatar": {
        "src": "https://flagcdn.com/ss.svg",
        "alt": "South Sudan"
      }
    },
    {
      "country_code": "ES",
      "label": "Spain",
      "phoneCode": 34,
      "avatar": {
        "src": "https://flagcdn.com/es.svg",
        "alt": "Spain"
      }
    },
    {
      "country_code": "LK",
      "label": "Sri Lanka",
      "phoneCode": 94,
      "avatar": {
        "src": "https://flagcdn.com/lk.svg",
        "alt": "Sri Lanka"
      }
    },
    {
      "country_code": "SD",
      "label": "Sudan",
      "phoneCode": 249,
      "avatar": {
        "src": "https://flagcdn.com/sd.svg",
        "alt": "Sudan"
      }
    },
    {
      "country_code": "SR",
      "label": "Suriname",
      "phoneCode": 597,
      "avatar": {
        "src": "https://flagcdn.com/sr.svg",
        "alt": "Suriname"
      }
    },
    {
      "country_code": "SZ",
      "label": "Swaziland",
      "phoneCode": 268,
      "avatar": {
        "src": "https://flagcdn.com/sz.svg",
        "alt": "Swaziland"
      }
    },
    {
      "country_code": "SE",
      "label": "Sweden",
      "phoneCode": 46,
      "avatar": {
        "src": "https://flagcdn.com/se.svg",
        "alt": "Sweden"
      }
    },
    {
      "country_code": "CH",
      "label": "Switzerland",
      "phoneCode": 41,
      "avatar": {
        "src": "https://flagcdn.com/ch.svg",
        "alt": "Switzerland"
      }
    },
    {
      "country_code": "SY",
      "label": "Syria",
      "phoneCode": 963,
      "avatar": {
        "src": "https://flagcdn.com/sy.svg",
        "alt": "Syria"
      }
    },
    {
      "country_code": "TW",
      "label": "Taiwan",
      "phoneCode": 886,
      "avatar": {
        "src": "https://flagcdn.com/tw.svg",
        "alt": "Taiwan"
      }
    },
    {
      "country_code": "TJ",
      "label": "Tajikistan",
      "phoneCode": 992,
      "avatar": {
        "src": "https://flagcdn.com/tj.svg",
        "alt": "Tajikistan"
      }
    },
    {
      "country_code": "TZ",
      "label": "Tanzania",
      "phoneCode": 255,
      "avatar": {
        "src": "https://flagcdn.com/tz.svg",
        "alt": "Tanzania"
      }
    },
    {
      "country_code": "TH",
      "label": "Thailand",
      "phoneCode": 66,
      "avatar": {
        "src": "https://flagcdn.com/th.svg",
        "alt": "Thailand"
      }
    },
    {
      "country_code": "TG",
      "label": "Togo",
      "phoneCode": 228,
      "avatar": {
        "src": "https://flagcdn.com/tg.svg",
        "alt": "Togo"
      }
    },
    {
      "country_code": "TK",
      "label": "Tokelau",
      "phoneCode": 690,
      "avatar": {
        "src": "https://flagcdn.com/tk.svg",
        "alt": "Tokelau"
      }
    },
    {
      "country_code": "TO",
      "label": "Tonga",
      "phoneCode": 676,
      "avatar": {
        "src": "https://flagcdn.com/to.svg",
        "alt": "Tonga"
      }
    },
    {
      "country_code": "TN",
      "label": "Tunisia",
      "phoneCode": 216,
      "avatar": {
        "src": "https://flagcdn.com/tn.svg",
        "alt": "Tunisia"
      }
    },
    {
      "country_code": "TR",
      "label": "Turkey",
      "phoneCode": 90,
      "avatar": {
        "src": "https://flagcdn.com/tr.svg",
        "alt": "Turkey"
      }
    },
    {
      "country_code": "TM",
      "label": "Turkmenistan",
      "phoneCode": 7370,
      "avatar": {
        "src": "https://flagcdn.com/tm.svg",
        "alt": "Turkmenistan"
      }
    },
    {
      "country_code": "TV",
      "label": "Tuvalu",
      "phoneCode": 688,
      "avatar": {
        "src": "https://flagcdn.com/tv.svg",
        "alt": "Tuvalu"
      }
    },
    {
      "country_code": "UG",
      "label": "Uganda",
      "phoneCode": 256,
      "avatar": {
        "src": "https://flagcdn.com/ug.svg",
        "alt": "Uganda"
      }
    },
    {
      "country_code": "UA",
      "label": "Ukraine",
      "phoneCode": 380,
      "avatar": {
        "src": "https://flagcdn.com/ua.svg",
        "alt": "Ukraine"
      }
    },
    {
      "country_code": "AE",
      "label": "United Arab Emirates",
      "phoneCode": 971,
      "avatar": {
        "src": "https://flagcdn.com/ae.svg",
        "alt": "United Arab Emirates"
      }
    },
    {
      "country_code": "GB",
      "label": "United Kingdom",
      "phoneCode": 44,
      "avatar": {
        "src": "https://flagcdn.com/gb.svg",
        "alt": "United Kingdom"
      }
    },
    {
      "country_code": "US",
      "label": "United States",
      "phoneCode": 1,
      "avatar": {
        "src": "https://flagcdn.com/us.svg",
        "alt": "United States"
      }
    },
    {
      "country_code": "UY",
      "label": "Uruguay",
      "phoneCode": 598,
      "avatar": {
        "src": "https://flagcdn.com/uy.svg",
        "alt": "Uruguay"
      }
    },
    {
      "country_code": "UZ",
      "label": "Uzbekistan",
      "phoneCode": 998,
      "avatar": {
        "src": "https://flagcdn.com/uz.svg",
        "alt": "Uzbekistan"
      }
    },
    {
      "country_code": "VU",
      "label": "Vanuatu",
      "phoneCode": 678,
      "avatar": {
        "src": "https://flagcdn.com/vu.svg",
        "alt": "Vanuatu"
      }
    },
    {
      "country_code": "VE",
      "label": "Venezuela",
      "phoneCode": 58,
      "avatar": {
        "src": "https://flagcdn.com/ve.svg",
        "alt": "Venezuela"
      }
    },
    {
      "country_code": "VN",
      "label": "Vietnam",
      "phoneCode": 84,
      "avatar": {
        "src": "https://flagcdn.com/vn.svg",
        "alt": "Vietnam"
      }
    },
    {
      "country_code": "EH",
      "label": "Western Sahara",
      "phoneCode": 212,
      "avatar": {
        "src": "https://flagcdn.com/eh.svg",
        "alt": "Western Sahara"
      }
    },
    {
      "country_code": "YE",
      "label": "Yemen",
      "phoneCode": 967,
      "avatar": {
        "src": "https://flagcdn.com/ye.svg",
        "alt": "Yemen"
      }
    },
    {
      "country_code": "ZM",
      "label": "Zambia",
      "phoneCode": 260,
      "avatar": {
        "src": "https://flagcdn.com/zm.svg",
        "alt": "Zambia"
      }
    },
    {
      "country_code": "ZW",
      "label": "Zimbabwe",
      "phoneCode": 26,
      "avatar": {
        "src": "https://flagcdn.com/zw.svg",
        "alt": "Zimbabwe"
      }
    }
  ]
  

  
  
  return data.map((x)=>{
    return {
      ...x,
      country_code: x.country_code.toLowerCase()
    }
  }) as CountryCode[]
  
})
