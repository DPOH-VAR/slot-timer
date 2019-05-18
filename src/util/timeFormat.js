export default function (value){
	const sec = value/1000|0;
	const displaySec = String(sec%60).padStart(2, '0');
	const min = sec/60|0;
	const displayMin = String(min%60).padStart(2, '0');
	const hours = min/60|0;
	return hours + ':' + displayMin + ':' + displaySec;
}