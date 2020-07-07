/**
 * 格式化时间
 * @date   2017-08-23T16:28:01+0800
 * @author liheng
 */
 //只支持秒时间搓
export default function format(originTimeStr,fmt){

	if(!originTimeStr){
		return "";
	}
	// var originTimeStr =Date.now()/1000;

	var fmt = fmt || "yyyy-MM-dd";

	var newTimeStr =new Date(originTimeStr*1000);

	/*月份集合*/
	var MonthPool = [
		[
			"",
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		],[
			"",
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		]
	];

	/*星期集合*/
	var WeekPool = [
		"星期日",
		"星期一",
		"星期二",
		"星期三",
		"星期四",
		"星期五",
		"星期六"
	];

	/*匹配对应的字段取出相应的值*/
	function get_counterpart_date(f,len){

		var result = newTimeStr["get"+f]();

		if(!len){
			return result; 
		}else if(len == '2'){
			return (result >=10 ? result : ("0" + result));			
		}else if(len == 'm'){
			result = parseInt(result) + 1;
			return (result >=10 ? result : '0' + result);
		}else{
			var str = String(result);

			return str.substr(str.length-2);
		}
	}


	/*切割时间格式字符串*/
	function split_fmt_str(fmtstr){
		var fmt_str_arr = fmtstr.split(" "),splitPool=[".","-","/",":"],reg=/([-./:])/g;
		var ymd = [],hmm=[],ymdFmt="",hmmFmt="",ymd_result=[],hmm_result=[];

		var finalResult = reg.test(fmt_str_arr[0]);
		

		// 单一的直接额返回
		if(!finalResult){
			return date_fmt_string[fmt_str_arr[0]];
		}

		//年月日
		for(var i in splitPool){
			if(fmt_str_arr[0].indexOf(splitPool[i]) != '-1'){
				ymd = fmt_str_arr[0].split(splitPool[i]);
				ymdFmt = splitPool[i];
				break;
			}
		}

		//时分秒hours minute  seconds
		if(fmt_str_arr[1]){
			for(var j in splitPool){
				if(fmt_str_arr[1].indexOf(splitPool[j]) != '-1'){
					hmm = fmt_str_arr[1].split(splitPool[j]);
					hmmFmt = splitPool[j];
					break;
				}
			}
		}


		ymd.map(function(y){
			ymd_result.push(date_fmt_string[y]);
		});

		hmm.map(function(h){
			hmm_result.push(date_fmt_string[h]);
		});


		return ymd_result.join(ymdFmt)+" " + hmm_result.join(hmmFmt);

	}


	/*时间格式化对应参数*/
	var date_fmt_string={
		// 4位年份 2017
		"yyyy":get_counterpart_date("FullYear"),
		// 2位年份 17
		"yy":get_counterpart_date("FullYear","yy"),
		// Month in year (January-December)
		"MMMM":MonthPool[0][parseInt(get_counterpart_date("Month",'m'))],
		// Month in year (Jan-Dec)
		"MMM":MonthPool[1][parseInt(get_counterpart_date("Month",'m'))],
		// Month in year (01-12)
		"MM":get_counterpart_date("Month",'m'),
		// Month in year (1-12)
		"M":get_counterpart_date("Month",'m'),
		// Day in month (01-31)
		"dd":get_counterpart_date("Date",2),
		// Day in month (1-31)
		"d":get_counterpart_date("Date"),
		// hour 01-23
		"HH":get_counterpart_date("Hours",2),
		// hour 1-23
		"hh":get_counterpart_date("Hours"),
		// minute 00-59
		"mm":get_counterpart_date("Minutes",2),
		// minute 0-59
		"m":get_counterpart_date("Minutes"),
		// second 00-59
		"ss":get_counterpart_date("Seconds",2),
		// second 0-59
		"s":get_counterpart_date("Seconds"),
		// second 0-999
		"sss":get_counterpart_date("Milliseconds"),
	};


	return split_fmt_str(fmt)
};