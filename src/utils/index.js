function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function initVal(n) {
  return n;
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function formatDate(date) {
  let _date = new Date(date);
  _date = Format(_date, "yyyy-MM-dd hh:mm:ss");
  return _date;
}

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
function Format(date, fmt) {
  //author: meizz   
  var o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export function formatVin(vin) {
  let final_data = '';
  let data_arr = [];
  let len = vin.length;  //长度
  final_data = vin;

  if (len > 12) {
    data_arr.push(vin.substr(0, 4));
    data_arr.push(vin.substr(4, 4));
    data_arr.push(vin.substr(8, 4));
    data_arr.push(vin.substr(12));
    final_data = data_arr.map(initVal).join(' ');
  } else if (len > 8) {
    data_arr.push(vin.substr(0, 4));
    data_arr.push(vin.substr(4, 4));
    data_arr.push(vin.substr(8));
    final_data = data_arr.map(initVal).join(' ');
  } else if (len > 4) {
    data_arr.push(vin.substr(0, 4));
    data_arr.push(vin.substr(4));
    final_data = data_arr.map(initVal).join(' ');
  }
  return final_data;
}

export function formatCost(price) {
  return Number(price).toFixed(2);
}

export function isMobile(no) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(no)) {
    return false;
  } else {
    return true;
  }

}

// 判断vin
var Arr = new Array();
var Brr = new Array();
Arr['A'] = 1;
Arr['B'] = 2;
Arr['C'] = 3;
Arr['D'] = 4;
Arr['E'] = 5;
Arr['F'] = 6;
Arr['G'] = 7;
Arr['H'] = 8;
Arr['J'] = 1;
Arr['K'] = 2;
Arr['L'] = 3;
Arr['M'] = 4;
Arr['N'] = 5;
Arr['P'] = 7;
Arr['R'] = 9;
Arr['S'] = 2;
Arr['T'] = 3;
Arr['U'] = 4;
Arr['V'] = 5;
Arr['W'] = 6;
Arr['X'] = 7;
Arr['Y'] = 8;
Arr['Z'] = 9;
Arr['1'] = 1;
Arr['2'] = 2;
Arr['3'] = 3;
Arr['4'] = 4;
Arr['5'] = 5;
Arr['6'] = 6;
Arr['7'] = 7;
Arr['8'] = 8;
Arr['9'] = 9;
Arr['0'] = 0;
Brr[1] = 8;
Brr[2] = 7;
Brr[3] = 6;
Brr[4] = 5;
Brr[5] = 4;
Brr[6] = 3;
Brr[7] = 2;
Brr[8] = 10;
Brr[9] = 0;
Brr[10] = 9;
Brr[11] = 8;
Brr[12] = 7;
Brr[13] = 6;
Brr[14] = 5;
Brr[15] = 4;
Brr[16] = 3;
Brr[17] = 2;
export function isVin(sVIN) {
  var sKYZF = "ABCDEFGHJKLMNPRSTUVWXYZ1234567890";
  var sJYW = '';
  var bl = false;
  var blKYZF = false;
  if (sVIN.length == 17) {
    var iJQS = 0, intTemp = 0;
    var ht = Arr;
    var htZM = Brr;
    try {
      for (var i = 0; i < sVIN.length; i++) {
        if (sKYZF.indexOf(sVIN.substr(i, 1)) != -1) {
          blKYZF = true;
          iJQS = iJQS + parseInt(ht[sVIN.substr(i, 1)]) * parseInt(htZM[(i + 1)]);
        } else {
          blKYZF = false;
          break;
        }
      }
      if (blKYZF) {
        intTemp = iJQS % 11;
        if (intTemp == 10) {
          sJYW = "X";
        }
        else {
          sJYW = intTemp.toString();
        }
        if (sJYW == sVIN.substr(8, 1)) bl = true;
      }
      else {
        bl = false;
      }
    }
    catch (err) {
      bl = false;
    }
  }

  // 如果纯数字，也返回false
  if(/^[0-9]*$/.test(sVIN)) {
    return false;
  }
  return bl;
}

export default {
  formatNumber,
  formatTime,
  formatDate,
  formatVin,
  formatCost,
  isMobile,
  isVin,
}
