// Parts are being counted from -1?
// Parts for first-off and 






/*

starting break does not cancels ongoing part it needs to reset time now variable, you have to figure out what happens then, and Break have to be counted from the moment of end of the last part not from the moment break button was pressed

later to do:
make possible to hide canvas and some text fields through assigning it hidden
attribute or class with this , 
*/


var $ = function(x){return document.getElementById(x);}
var lastHourEntry;




var dset = new Date();
const weight = 30;
var wC = weight;
var status = "part";
var delOffs = 0;
var log = "";
var objsCounter = -1;
var partsCounter = 0;
var toDo = 0;
var sugAvg = 1000;
var avg = sugAvg;
var soFar = 0;
var objsList = {};
var breakObjsAmount = 0;
var breaksTaken = 0;
var whenstart = 0;
var toplimit =(avg*1.7);
var bottomlimit =(avg*0.2);
var endin = 0;
var endDate = new Date();
var timenow = Date.now();
var lowest = Number.POSITIVE_INFINITY;
var highest = Number.NEGATIVE_INFINITY;



var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height *= window.devicePixelRatio;

//THIS PROPABLY SHOULD BE CALLED EVERY TIME DRAWGRAPH() 
//WHY??
//TO ADJUST EVERYTHING TO CURRENT DEVICE ORIENTATION



var HEIGHT = canvas.height;
var WIDTH = canvas.width;

var ctx = canvas.getContext('2d');

var proGraphCanvas = document.getElementById('proGraphCanvas');
var data = {
    labels: ['1st-Off'],
    datasets: [
        {
            label: "Cycle Time",
            fill: false,
            lineTension: 0.2,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 4,
            data: [0,0],
        }
    ]
};



var option = {
	showLines: true,


xAxes: [{
    ticks: {
        autoSkip: false,
        autoSkipPadding: 20,
        maxTicksLimit: 1,
    }
}]


};







proGraph = Chart.Line(proGraphCanvas,{
									data:data,
  									options:option
									});



window.addEventListener('orientationchange',()=>{
drawGraph();
},false);



					/*
                            DRAWGRAPH
                         */



//later on in presets there should be multipliers
//(i.e. 1-5 bracket cycle cuts 22 rows)








var presets = [
{"name":"Select preset","averageCycle_ms":0,"orderSize":0,"partsPerCycle":"2(not supported yet-WIP)"},
{"name":"preset#8 wolniej 4.5.17","averageCycle_ms":42000,"orderSize":203,"partsPerCycle":"2(not supported yet-WIP)"},
{"name":"save ktorystam","averageCycle_ms":598000,"orderSize":8,"partsPerCycle":"2(not supported yet-WIP)","state":{"endProdSelInd":1,"endprodtime":"06:00","sAvg":"00:09","sAvgSec":58,"spph":"0","wC":23,"status":"part","objsCounter":6,"partsCounter":6,"toDo":8,"sugAvg":598000,"avg":629021.275862069,"soFar":4,"breakObjsAmount":0,"breaksTaken":0,"whenstart":1494274214713,"endDate":"2017-05-09T05:00:00.000Z","timenow":1494278104336,"lowest":530078,"highest":1251595,"objsList":{"0":{"id":0,"when":1494274214713,"cycle":0,"status":"start","partId":0,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"1":{"id":1,"when":1494274214713,"cycle":598000,"status":"first-off","partId":1,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"2":{"id":2,"when":1494274816833,"cycle":602114,"status":"part","partId":2,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"3":{"id":3,"when":1494276068428,"cycle":1251595,"status":"part","partId":3,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"4":{"id":4,"when":1494276598506,"cycle":530078,"status":"part","partId":4,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"5":{"id":5,"when":1494277215678,"cycle":617172,"status":"part","partId":5,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"6":{"id":6,"when":1494278104336,"cycle":888658,"status":"part","partId":6,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}}},"partproto":{"totalPartTime":4487617,"partsQty":6,"partIdsInObjList":[0,1,2,3,4,5,6]},"breakproto":{"breakIdsInObjList":[],"totalBreakTime":0}}},
{
name: "Ford parts",

averageCycle_ms: 39*1000,
orderSize: 600,
partsPerCycle: 2 + "/not supported yet WIP"

},

{
name: "Brackets 22per cycle",

averageCycle_ms: 12*60*1000,
orderSize: 15,
partsPerCycle: 22 + "/not supported yet WIP"

},
{"name":"banany do jag","averageCycle_ms":950000,"orderSize":8,"partsPerCycle":"2(not supported yet-WIP)"},

{"name":"stary save 3.4.15 RtoL może bugować","averageCycle_ms":40000,"orderSize":585,"partsPerCycle":"2(not supported yet-WIP)","state":{"endProdSelInd":0,"endprodtime":"06:00","sAvg":"00:00","sAvgSec":40,"spph":"0","wC":0,"status":"part","objsCounter":32,"partsCounter":31,"toDo":585,"sugAvg":40000,"avg":42819.77419354839,"soFar":247,"breakObjsAmount":1,"breaksTaken":0,"whenstart":1493853050321,"endDate":"2017-05-04T05:00:00.000Z","timenow":1493854818615,"lowest":24994,"highest":149824,"objsList":{"0":{"id":0,"when":1493853050321,"cycle":0,"status":"start","partId":0,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"1":{"id":1,"when":1493853050321,"cycle":40000,"status":"first-off","partId":1,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"2":{"id":2,"when":1493853088753,"cycle":38429,"status":"part","partId":2,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"3":{"id":3,"when":1493853130075,"cycle":41322,"status":"part","partId":3,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"4":{"id":4,"when":1493853164239,"cycle":34164,"status":"part","partId":4,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"5":{"id":5,"when":1493853205328,"cycle":41089,"status":"part","partId":5,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"6":{"id":6,"when":1493853247848,"cycle":42520,"status":"part","partId":6,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"7":{"id":7,"when":1493853289139,"cycle":41291,"status":"part","partId":7,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"8":{"id":8,"when":1493853324657,"cycle":35518,"status":"part","partId":8,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"9":{"id":9,"when":1493853371779,"cycle":47122,"status":"part","partId":9,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"10":{"id":10,"when":1493853406164,"cycle":34385,"status":"part","partId":10,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"11":{"id":11,"when":1493853445347,"cycle":39183,"status":"part","partId":11,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"12":{"id":12,"when":1493853483149,"cycle":37802,"status":"part","partId":12,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"13":{"id":13,"when":1493853521723,"cycle":38574,"status":"part","partId":13,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"14":{"id":14,"when":1493853560206,"cycle":38483,"status":"part","partId":14,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"15":{"id":15,"when":1493853600946,"cycle":40740,"status":"part","partId":15,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"16":{"id":16,"when":1493853656690,"cycle":55744,"status":"part","partId":16,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"17":{"id":17,"when":1493853681684,"cycle":24994,"status":"part","partId":17,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"18":{"id":18,"when":1493853719374,"cycle":37690,"status":"part","partId":18,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"19":{"id":19,"when":1493853761028,"cycle":41654,"status":"part","partId":19,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"20":{"id":20,"when":1493853799547,"cycle":38519,"status":"part","partId":20,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"21":{"id":21,"when":1493853838113,"cycle":38566,"status":"part","partId":21,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"22":{"id":22,"when":1493853876100,"cycle":37987,"status":"part","partId":22,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"23":{"id":23,"when":1493853920541,"cycle":44441,"status":"part","partId":23,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"24":{"id":24,"when":1493853968430,"cycle":47889,"status":"part","partId":24,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"25":{"id":25,"when":1493854008792,"cycle":40362,"status":"part","partId":25,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"26":{"id":26,"when":1493854049554,"cycle":40762,"status":"part","partId":26,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"27":{"id":27,"when":1493854078103,"cycle":28549,"status":"part","partId":27,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"28":{"id":28,"when":1493854119009,"cycle":40906,"status":"part","partId":28,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"29":{"id":29,"when":1493854156795,"cycle":37786,"status":"part","partId":29,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"30":{"id":30,"when":1493854637673,"cycle":480878,"status":"break","breakId":30},"31":{"id":31,"when":1493854668791,"cycle":31118,"status":"part","partId":31,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}},"32":{"id":32,"when":1493854818615,"cycle":149824,"status":"part","partId":32,"quality":1,"defects":{"placement_DefectCodes":[[1,3],[0,3],[4,0]],"reasons":"","scrap_rework":false}}},"partproto":{"totalPartTime":1327413,"partsQty":31,"partIdsInObjList":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32]},"breakproto":{"breakIdsInObjList":[30],"totalBreakTime":480878}}},


//problematic save made at start causes problems at drawGraph()

{"name":"save w/out objs - saved at start problems","averageCycle_ms":42000,"orderSize":480,"partsPerCycle":"2(not supported yet-WIP)","state":{"endProdSelInd":1,"endprodtime":"06:00","sAvg":"00:00","sAvgSec":42,"spph":"0","wC":30,"status":"part","objsCounter":-1,"partsCounter":0,"toDo":480,"sugAvg":42000,"avg":1000,"soFar":58,"breakObjsAmount":0,"breaksTaken":0,"whenstart":0,"endDate":"2017-05-05T05:00:00.000Z","timenow":1493928864701,"lowest":null,"highest":null,"objsList":{},"partproto":{"totalPartTime":0,"partsQty":0,"partIdsInObjList":[]},"breakproto":{"breakIdsInObjList":[],"totalBreakTime":0}}}


];




                            /*
                                    CYCLE FINISHED

                              when RUN/OK button is pressed
                            */
function cycleFinished(){
if (objsCounter == -1){//first time run-create startpart
  // run only first time and create startparts(2)
  whenstart = Date.now();
  // ----(when, cycle,status)
  addPart(whenstart,0,"start");
  addPart(whenstart,sugAvg,"first-off");
  partsCounter--;
  PartObj.prototype.partsQty--;
  //console.log('initialised . objsCounter=',objsCounter);
  //timenow varible needed to keep for next, part of "part" status
  //to compute then cycle duration
  timenow = Date.now();
  drawGraph();
  importantLog();  
  return;
}

//compute cycle duration since last part. storing previous and substracting from it timenow to get the cycle time
prevtime = timenow;
timenow = Date.now();
var cycletime = timenow - prevtime;


//creates different objects for different real world occurences,
//status is by default "part"

if (status=='part')
   {
     addPart(timenow,cycletime,status);
    //console.log('part cycle fin . objsCounter=',objsCounter);

    clearAndLog(minmax(cycletime),'L3');
        /* if this is part, checks/sets the new lowest and highest          and logs them to screen 
        */
   }

else if (status=='break')
   {
    addBreak(timenow,cycletime,status);
    status='part'; // changes the status since there is no case of 
               // taking two breaks in a row
    changeValue("Start Break",'btnbreak');
    changeValue("OK",'btnRUN');
   }


  

drawGraph();

importantLog();

asd(objsList[objsCounter]);// print out last object

}


                         /*
                         BREAKTIME
                         */

function breakTime()
{
if (status=='break')
 {
  cycleFinished();
  /*
  invokes cycle calculations (these are creating a break object 
  with global break status set by break btn when user goes on break
  then changes back to "part" status, and resets button 
  descriptions(values) to their default states.
  */
  status='part';
  changeValue("Start Break",'btnbreak');
  changeValue("OK",'btnRUN');
 }

else
 {
  /*
  changes global status on break, so next Cycle finished invoked
  will create a break obj instead of part. changes   
  values(descriptions) of both OK/RUN and START BREAK buttons
  to End Break
  */
  status='break';
  changeValue("End Break",'btnbreak');
  changeValue("End Break",'btnRUN');
 }

}





 



                       /*
                         IMPORTANTLOG
                       */

function importantLog(){
var average = objsCounter<2 ? sugAvg:avg ;
if (average && average>0){
	let progress= 100-Math.round((Date.now() - timenow)/average*50);
	let b = B.Id('myBar').style;
	if (progress<0){//progress bar 
		b.width = "0%";''
	}
	else{
		b.width = progress+"%";
		}
}
// when called on first part or just started use suggested average to compute finish time
//parts per hour value , based on average cycletime
let pph= Math.round(3600000/average) 
var partsDone = soFar + partsCounter
//OLD VERSION WAS var partsDone = soFar + objsCounter - breakObjsAmount;
clearAndLog(partsDone + " parts on " + toDate(Date.now()),'L1');
changeValue(partsDone,'L1c');
//validates pph value to avoid "infinty" on UI display
if(pph==Infinity)pph=0;
clearAndLog(pph,'L1pph');
if (toDo>0)
   {
    var leftToDo = toDo - partsDone;
    endin=leftToDo*average;
    var endon = endin + Date.now();//timenow;
    //replaced to get accurate result even if no part been done since some time  
    endon = toDate(endon);
    // console.log(average)
    var what = 
     ("All "+toDo+" pcs will be ready on : <br><b>"+ endon + "</b><br>(future breaks not included)<br>")
/*
you can calculate how much brake time left here 
something like: 
breakTimeAllowance-BreakObj.prototype.totalBreakTime+" breaktime Left"
*/
    }
else
    {
     var what=
     "Order Size :not specified<br>Cannot estimate <br> finish date<br>";
    }
let whatEnd="";
let planEndIn= endDate.valueOf()-Date.now();
let sss= new Date(planEndIn)
 //console.log(planEndIn/(60*60*1000));
 //console.log(sss)
let estAmnt= Math.floor(planEndIn/average)+partsDone;
whatEnd="planned finish:<br>"+endDate+"<br>It\'s possible to get <b>"+estAmnt+"</b> parts by then."
if (estAmnt==Infinity)whatEnd="planned finish:<br>"+endDate+"<br><b>Need more parts to get estimates</b>" ;
clearAndLog(whatEnd,'L2e');
what += "Total Breaks taken:<b>"+msToDHMS(BreakObj.prototype.totalBreakTime)+"</b>";
clearAndLog(what,'L2');
}



















//
//

function addData(){
	let dateofprod = new Date(objsList[objsCounter].when)
	let hourEntry = dateofprod.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
	if (hourEntry == lastHourEntry){
		hourEntry=""}
	else{   
		lastHourEntry = hourEntry;} 
 proGraph.data.labels[objsCounter] = hourEntry; 
	proGraph.data.datasets[0].data[objsCounter] = (objsList[objsCounter].cycle)
  	proGraph.update();
}



function drawGraph(){
	HEIGHT = canvas.height;
	WIDTH = canvas.width;
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	if (objsCounter<2){
          let countdown = (objsCounter==-1)? "2 cycles":"1 cycle";
		ctx.save()
		ctx.textAlign= "center";
		ctx.font = "15px Arial"
		ctx.fillText("Graph will Display after "+countdown,WIDTH/2,HEIGHT/2);
		ctx.restore()
		return
	;}
	
	
	
	addData();
	const maxY= highest;
	const minY= lowest;
	const avg = countTotalAvg();
	
	var sZ = 
	(objsList[objsCounter].when - whenstart); 
	
	var sclX= ( WIDTH / sZ );
	var sclY= ( HEIGHT / maxY );
	
 
 	var x=0;
 	var y=avg;
 	//var y=y-minY;
 	var y=avg*sclY;
 	var x2=WIDTH-3
	
	
	//.................DRAW AVG
	
	 ctx.save();
	
	 ctx.fillStyle = "yellow";
	 
	   
	 ctx.fillRect(
	    x,
	    y-2,
	    x2,
	    4
	    );
	
	 ctx.fillStyle = "red";
	ctx.fillRect(
	    x+x2,
	    0,
	    x2+3,
	    HEIGHT
	    );
	
	 ctx.restore();
	
	
	for(var id=1;id<=objsCounter;id++){
		
		objsList[id].draw(sclX,sclY);
	}

}








/*
part, break object from loading savestate have no prototypal properties, they're nameless objects, w/out draw function, only


*/



function loadFromJSON(string){
  if (string.length>2){
    //alert(string);
    loadedPreset = JSON.parse(string);
    if (loadedPreset){
      mode = loadedPreset.state ? "save state":"preset";
     // alert([mode,loadedPreset.name]);
      setInpStartVals (loadedPreset,()=>{ inpt(mode,  
      loadedPreset.name , "pasted" )});
      alert("Preset/State loaded succesfully!");
      inpt();
      return;
    }
  }

alert('String is invalid or empty');
return;
}









function setInpStartVals(preset,doThisNext){

//console.log(JSON.stringify(preset));
B.Id("sAvginp").value= (preset.averageCycle_ms)? 
msToDHMS(preset.averageCycle_ms,"HH:MM") : B.Id("sAvginp").value;

B.Id("sAvgSecinp").selectedIndex= (preset.averageCycle_ms)? 
msToDHMS(preset.averageCycle_ms,"s") : B.Id("sAvgSecinp").selectedIndex;

B.Id("trgtinp").value= (preset.orderSize)?
preset.orderSize : B.Id("trgtinp").value;



/*
B.Id("").value/selectedIndex=(preset.prop)?
preset.prop : B.Id("").value
*/


if (preset.state){

if(!(confirm("load \""+preset.name+"\" saved state?"))){return};

//alert(JSON.stringify(preset.state))
let o=preset.state;




if (typeof o.endDate==="object"){endDate=new Date(o.endDate.getTime());}
else if (typeof o.endDate==="string"){endDate=new Date(o.endDate);}
else{alert("invalid End Date")}


var oi =o.objsList;
var oiarr = Object.keys(oi).map(function (key) { return oi[key]; });







objsList = [];
let outo;

for (ix=0;ix<oiarr.length;ix++){
let ob=oiarr[ix]
console.log(JSON.stringify(ob));

/*
have to make each object an instance or the same prototype as part/break depending on the ob status value.
*/

switch(ob.status){

case("break"):
let ebo=new BreakObj();

let fbo = Object.assign(ebo,ob);
asd(fbo,console.log);
outo = fbo
break;

default:
//for start,first-off and part

let epo = new PartObj();

let fpo = Object.assign(epo,ob);
asd(fpo,console.log);
outo = fpo
}
objsList.push(outo) ;

asd(objsList,console.log)


PartObj.prototype.totalPartTime = (o.partproto.totalPartTime) || 0;
BreakObj.prototype.totalBreakTime = (o.breakproto.totalBreakTime) || 0;
PartObj.prototype.partIdsInObjList = (o.partproto.partIdsInObjList) || [];
BreakObj.prototype.breakIdsInObjList = (o.breakproto.breakIdsInObjList) || [];



}


/*
			"endProdSelInd" : endProdSelInd,
			"endprodtime" : timeEnd[0]+":"+timeEnd[1],
			"sAvg" : sAvg,
			"sAvgSec" : sAvgSec,
			"spph" : spph,
*/
			wC=o.wC;
			status=o.status;
			objsCounter=o.objsCounter;
			partsCounter=o.partsCounter;
			toDo=o.toDo;
			sugAvg=o.sugAvg;
			avg=o.avg;
			soFar=o.soFar;
			breakObjsAmount=o.breakObjsAmount;
			breaksTaken=o.breaksTaken;
			whenstart=o.whenstart;
			timenow=o.timenow;
			lowest=o.lowest;
			highest=o.highest;



if (!doThisNext){			
inpt();
return;
}


//alert(["doThisNext:",doThisNext])
doThisNext();



}


}














//----------------------------------------------------------------

//----------------------------------------------------------------

//----------------------------------------------------------------

//----------------------------------------------------------------

//----------------------------------------------------------------


//value of sugavg shall change when you set start date and sofarinp value is nonfalsy zero



function avgCalc(mode){
let sofar = B.Id('sofarinp');
let stTim = B.Id('starttiminp');
let stDat = B.Id('startinp');
let stStr = B.Id('sLd2');
let btn = B.Id('avgcalc');

if(sofar.value>0 && 
   stTim.style.borderColor!='red'){

       if (mode=="toggle button disable")     
            {btn.className="arrow_box";return;}
	let ds=new Date(stStr.innerHTML.slice(5));
     let prddur=Date.now()-ds.getTime();
     let cyc=prddur/sofar.value;
     setInpStartVals({averageCycle_ms:cyc})
       
     }
else
       //alert('fill in \"So Far\" and \"start date\"');
       if (mode=="toggle button disable")     
            {btn.className="arrow_box disabled";return;}
}



                             /*
                               INPT
                             */


function inpt(mode,presetName,prefix)
{
/*
reads user input and assingns its values validating each one and parsing into floats
*/

toDo = document.getElementById("trgtinp").value
toDo = undefcheck(toDo,0);
toDo = Number(toDo);

soFar = document.getElementById("sofarinp").value
soFar = undefcheck(soFar,0);
soFar = Number(soFar);

let endProd= document.getElementById('endprodinp');
let endProdSelInd = endProd.selectedIndex;
let nowDate = new Date();
let atim = getDate_n_DaysFromGiven(nowDate,Number(endProd.value),true);



let timeEnd = document.getElementById("endprodtiminp").value.split(":")


//     let hours = timeEnd[0];
//     let minutes = timeEnd[1];

let hours = Number(timeEnd[0]);
let minutes = Number(timeEnd[1]);
//console.log('time:'+[hours,minutes]);

// MAKE atim BE DATE OBJECT!!!! in fuction or after
// ok i need an object outputted by getDate_n_Days~ 
//console.log([atim.getFullYear(),atim.getMonth(),atim.getDate(),hours,minutes])

endDate = new Date(atim.getFullYear(),atim.getMonth(),atim.getDate(),hours,minutes,0,0)

//console.log('submitted:'+endDate);


/*
new Date(year, month, day, hours, minutes, seconds, milliseconds);

endDate = 
new Date(

)
*/

let sAvg = document.getElementById("sAvginp").value || "00:00";
let sAvgSec = B.Id('sAvgSecinp').selectedIndex;
let spph = document.getElementById("pphinp").value || 0;


if (!document.getElementById("pphinp").disabled && spph!=0){

//count sugAvg from pph
sugAvg = Number(1000*Math.round((60*60)/spph));
//console.log("pph")
}
else{

//count sugAvg from sAvg

let sAvgarr = sAvg.split(":");

sugAvg = (sAvgarr[0] *60*60000) + (sAvgarr[1] *1000*60 + sAvgSec*1000)

//console.log("time")
}



//console.log(sAvg+" and "+spph+"\nsubm: "+ sugAvg);

if (sugAvg==0){wC=0};

 





if (B.Id("inputs")){

B.Id('frm2').innerHTML = B.Id('inputs').innerHTML;
/*
B.Id("").value =
*/

B.Id('frm1').innerHTML = '';
B.Id("sofarinp").value = soFar;
B.Id("trgtinp").value = toDo;
B.Id("endprodinp").selectedIndex = endProdSelInd;
B.Id("endprodtiminp").value = timeEnd[0]+":"+timeEnd[1];
B.Id("sAvginp").value = sAvg;
B.Id("sAvgSecinp").value = sAvgSec;
B.Id("pphinp").value = spph;
}


if (mode){
   //  alert([mode,presetName,prefix]);
     prefix = prefix ? prefix:"";
	placeholder = presetName ? presetName+"("+prefix+")" : mode+"#"+(presets.length+1);


	let presetname = prompt("Please enter name for a new "+prefix+" "+ mode,
	placeholder);
	
	if(presetname==null){alert("Aborted");return;}

	var datasave = {

		preset: {
			name : presetname,

			averageCycle_ms: sugAvg,
			orderSize: toDo,
			partsPerCycle: 2 + "(not supported yet-WIP)"


			}
		};
	
	if (mode=='save state'){	
		datasave.preset.state = {
			"endProdSelInd" : endProdSelInd,
			"endprodtime" : timeEnd[0]+":"+timeEnd[1],
			"sAvg" : sAvg,
			"sAvgSec" : sAvgSec,
			"spph" : spph,
			wC:wC,
			status:status,
			objsCounter:objsCounter,
			partsCounter:partsCounter,
			toDo:toDo,
			sugAvg:sugAvg,
			avg:avg,
			soFar:soFar,
			breakObjsAmount:breakObjsAmount,
			breaksTaken:breaksTaken,
			whenstart:whenstart,
			endDate:new Date(endDate.getTime()),
			timenow:timenow,
			lowest:lowest,
			highest:highest,
			objsList:objsList,
                partproto:PartObj.prototype,
                breakproto:BreakObj.prototype
			}
		}

	B.Id('datasave').innerHTML = JSON.stringify(datasave.preset) 
	
	presets.push(datasave.preset);
	B.Id("presetsinp").innerHTML = "";
     
	populateDropdown("presetsinp",(a,i)=>{return presets[i].name+a+msToDHMS(presets[i].averageCycle_ms)},[],0,presets.length-1,1,": ",presets.length-1);

	return;
	}






if (!mode){
	B.Id('counterinterface').hidden = false;
	importantLog();
     drawGraph();
	setInterval(importantLog,1000);
     /*
     find a way to return pointer-events value you to default
     B.Id("btnbreak").style.opacity = 0.3;
	B.Id("btnbreak").style.pointerEvents = "none";*/
	
	}



window.scrollTo(0,0);

}















function msToDHMS(ms,mode){

let tmpAbsDate = new Date(ms)
let output,
sd="days ",
sh="hr ",
sm="min ",
ss="sec ",
mss="ms ",
d,h,m,s;


d=tmpAbsDate.getDate()-1;
h=tmpAbsDate.getHours();
m=tmpAbsDate.getMinutes();
s=tmpAbsDate.getSeconds();


switch(mode){

case ("s"):
output=s;
break;

case ("HH:MM"):
output=tmpAbsDate.toTimeString().slice(0,5);
break;


default:
//do not display days and hours if there is none
d = (d==0)? (sd="",""):d;
h = (h==0)? (sh="",""):h;
m = (m==0)? (sm="",""):m;
s = (s==0)? (ss="",""):s;
output= d+sd+h+sh+m+sm+s+ss;
output = (output=="")? ms+mss:output; // in case miliseconds<1 second display  only miliseconds
}

return output;
}




// LOAD EVENT LISTENER------------------------



window.addEventListener('load', function(e) {
endDate = new Date();
let endDate2 = new Date();
dn =  new Date();
let startDate= new Date();


// console.log(dn.toTimeString().slice(0,5))


//here you can add some logic to decide for example what value should end up in inputs np. ustawienie 6 rano wtedy kiedy czas jeszcze pozostał do zakończenia nocki i ustawienie np. ósmej po południu przypadku start
//endDate2.setHours(dn.getHours()+8);
//endDate2.setMinutes(0)
//document.getElementById("endprodtiminp").value =
// /endDate2.toTimeString().slice(0,5);
//endDate2.setHours(dn.getHours()-8);

// console.log(document.getElementById("endprodtiminp").value)



populateDropdown("sAvgSecinp",(refVal,i)=>(i>9)?refVal+i:refVal+"0"+i,[],0,60,1,":",0);

populateDropdown("startinp",getDate_n_DaysFromGiven,["TODAY","YESTERDAY"],0,-7,-1,dn);

populateDropdown("endprodinp",getDate_n_DaysFromGiven,["TODAY","TOMORROW"],0,7,1,dn);

populateDropdown("presetsinp",(a,i)=>{return presets[i].name+a+msToDHMS(presets[i].averageCycle_ms)},[],0,presets.length-1,1,": ",0);


logValidateDDLValue('endprodinp','endprodtiminp',(a,b)=>a>b,Date.now(),endDate);

logValidateDDLValue('startinp','starttiminp',(a,b)=>a<b,Date.now(),startDate);

avgCalc("toggle button disable");

setInpStartVals(presets[B.Id('presetsinp').selectedIndex])

}, false);




 // END OF LOAD EVENT LISTENER-------------------------







function populateDropdown (dropdownId, doSthFunction, descriptions,
start_i, max_i, incr_i, refVal, selected_i){

 var 
 select = document.getElementById(dropdownId), 
 option = null;
 
 for(let ind = 0; ind <= select.length; ind+=1) {
     
    select.remove(ind);
    }


 for(let i = start_i; Math.abs(i) <= Math.abs(max_i); i+=incr_i) {
     
     option = document.createElement("option");
     
	option.value = i;
     
	option.innerHTML = 
     (descriptions[Math.abs(i)] || "" )+
     " " + doSthFunction(refVal,i)
;
     select.appendChild(option);
     // //console.log("optioninHTML:"+option.innerHTML)
    }

     select.selectedIndex=selected_i || 0;
}

















B.Id("savebtn").addEventListener('click',(e)=>{
toCopy = e.target.nextElementSibling;
alert(toCopy.innerHTML);

  
  toCopy.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    //alert(toCopy);
	console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }




},false);




function sAvgToBTB(caller,tOutp,sOutp){
/*
B.Id('sAvginp').disabled = caller.value ? true : false;
B.Id('sAvgSecinp').disabled = caller.value ? true : false;*/
let pph0 = caller.value;
let avg0 = 60*60/pph0;//ilosc sekund naczesc
let avtim = new Date(avg0*1000);


alert([avtim.toTimeString().slice(0,5),avtim.getSeconds()]);
tOutp.value = avtim.toTimeString().slice(0,5);
sOutp.selectedIndex = avtim.getSeconds();



}







// do it reusable for start date input
// todosomething fuction ||(or) false or making it return the same number, in case of seconds and minutes input of your ownREUSE CODE
/* adding multiple orders, one after another, maybe graphical interface where they will be put like lego on the timesheet so you can see if multiple orders will be able to be finished . multiple orders will be avalable only if you have at least end date, and average for each job
ech job then should have their own:
-avg
-todo
-color?
SettingTime object between them if more than one job


*/ 





                                                        
function getDate_n_DaysFromGiven(given,n,objRet){

let othday= new Number(given.getDate())
othday+=n
given.setDate(othday);

date_n_DaysFromGiven= objRet ? (
    new Date(given.getTime())
    ):(
    given.toLocaleDateString(undefined,{
       weekday:"long",
       day:"numeric",
       month:"numeric",
       year:"numeric"
     })+" "
    );

given.setDate(Number(given.getDate())-n);

return date_n_DaysFromGiven;
}





function calculatePphSavgBTB(e){


}








function logValidateDDLValue(inpDatName,inpTimName,validator,comparedTo,output){




//WHY I AM NOT USING timeDDL ???
let datDDL = document.getElementById(inpDatName);
let timDDL = document.getElementById(inpTimName);
timDDL.value = timDDL.value || '00:00'




let dn = new Date(comparedTo)
let ati = getDate_n_DaysFromGiven(output,Number(datDDL.value),true);//put' giveMeObj' instead true
let timeArr = timDDL.value.split(":");
let hours = Number(timeArr[0]);
let minutes = Number(timeArr[1]);
console.log('time:'+[hours,minutes]); console.log([ati.getFullYear(),ati.getMonth(),ati.getDate(),hours,minutes]);
let dset = new Date(ati.getFullYear(),ati.getMonth(),ati.getDate(),hours,minutes,0,0)
console.log(validator);
let set = dset.valueOf();
let thresh = comparedTo.valueOf();
console.log(validator(set,thresh));




//comparator 
//is any function that returns boolean and really, should involve relation between set and thresh variables

if (!validator(set,thresh)){
     
	datDDL.style.borderColor = 'red';
     timDDL.style.borderColor = 'red';
     
     //DO NOT USE YET BECAUSE DATES SHOULD BE OPTIONAL
     //document.getElementById('go').disabled = true;
     //datDDL.selectedIndex = (datDDL.selectedIndex != 1)? 1:(1);
     //datDDL.disabled = true;

	}

else{
	timDDL.style.borderColor = '';
     datDDL.style.borderColor = '';
	

     //DO NOT USE YET BECAUSE DATES SHOULD BE OPTIONAL
     //datDDL.disabled = false ;
     //document.getElementById('go').disabled = false;
	}


//???this has to be changed (-) will give -value in startDate
// turn into Math.Abs

let diff = msToDHMS(Math.abs(dset.getTime()-dn.getTime()))
console.log(timDDL.nextElementSibling.id)
clearAndLog('now: '+dn,timDDL.nextElementSibling.id);
clearAndLog('set: '+dset,timDDL.nextElementSibling.nextElementSibling.id);
clearAndLog('in: '+ diff,
timDDL.nextElementSibling.nextElementSibling.nextElementSibling.id);
}







/*
Shiftchanges = ["06:00","01:00"];

shiftchanges could be an object, like Date.

it should allow to add shift changeover points 

-setter method based on push, that asks :
     -is changeovertimepoint is allweekdays, weekend or only friday
     -is changeover input valid 

getNextChangeoverDateTime
-getter: get closest changeover in future of some date(takes date, and returns the closest changeover as a date object

getPrevChangeoverDateTime
-as above but searches in the past from given date

maybe something like GetTime, GetHours, GetMinutes
so you need to create it probably from new Date object

-getArray of changeover dates(all of changeovers) for i.e. populating dropdowns


*/





 


 






// FINISH ENDDATE BUSINESS so show it on DISPLAY BELOW COUNTER AND BUTTONS AND 
//MAKE IMPORTANT LOG CALCULATE HOW MANY PARTS WILL BY DONE AT THAT TIME

//math performed at the beginning - you can give two values
 
/*
Make   suggested average displayed on the graphe

BOTH SUG AVG AND AVG SHOULD BE DESCRIBED ON THE GRAPH (FILLTEXT)
*/






//MISSING PARTS FORM
/*




STANDARD DEVIATION calculation needed to make missing parts prompt show only if cycle exceeds standard deviation+ avg
minimum time trigger needed for running it could be:
cycle>2*avg
po prostu?
jesli chcialbym jednoczesnie zarejestrowac downtime który moze byc microdowntime to nie ale potrzebowałbym wtedy samego cyklu masszynowego , bez ładowania
*/

//WIP: check weighted average

/*
SOLVED
PROBLEM 
weighted avg broken
looks like it is not using the sugAvg 

there was if(wC=0){} statement in Weighted Average function, changed to ==
not helped too much 
weigted log shows sugAvg(savg onscreen) value as 0.

the same mistake as above = instead of == was in Inpt function

*/


/*
SOLVED
CHART OUT OF PROPORTION
while changing the way of drawing parts on graph. Starting from breakObjects something is still wrong,parts getting very long after third fourth button press. Word start square start when finish minus cycle time and has length of cycle (*sclX obvsly). removed avg from sclX calculation in DRAWGRAPH !! there's still a problem but not with breaks. 
*/

/*
SOLVED
PROBLEM:
parts are being drawn from the time the cycle finishes 
onwards and this is a mistake -they should be run backwards thus representing time needed to produce them
*/




/*

EASY TODO:


- additional whenstart input on the beginning to be able to count how many part you would do at the end if you work from this tyime22

-"when shift finishes" mode (no target just how many parts could be done till given time/date. need to parse given date to miliseconds.

-add time interval axis one per oclock houR






- DONE  - parts per hour display 





- total breaktime taken display
- DOWNTIME , but there must be more data to differentiate downtime from slow,steady pace
- suggested breaktime left NOT SO EASY


TODO: 



-display brake time from-to

-create  machine cycle time ?

-implement forgot function

-separate counting time function that will be returning all what needed in ... object argument? try to do similarly with all hlonal vatiables to get rid of them.

-factor out two methods from draw. one for counting xy in scale or like break no scale y avg no scale x 

-avg object to factor out draw method and to have other methods    
      in it like:
    .- minmax
    .- to store previous averages
    .- it can be "object no 0" in lisT

-move variables to nonglobal object

-blank cutting graph x,y etc. 

-export data to JSON data file import or at least produce them insert a form of format on separate html screen for copy /paste


- display/queryask for quality.
 or design Ok button in such a way that clicking it simultaneously passes the quality info. Ok button can be a scale 0-10;


- AFTER TOTAL OBJECTIFICATION later maybe include setting time periods and different jobs /orders each having own avg, minmax, defects and so on, but still counting in total how much no-stress time left and if you can make it and so on



*/

// reimplemented call function at the top of PartObj and BreakObj, together with putting in inheritance through inheritsFrom(sub,sup), which introduces object.create for cloning prototypes from parent to child.

//SOLVED:  WIP use Object.create() with call() to resupply missing prototype methods;
//PARTS DO NOT INHERUT THE Draw method . i think it is because of obj. prototypes part after things is not enclosed in function brackets, but then again you need to check it how then the same lines after breakobj ant part obj are working fine being outside of their construcors? second reason is that in drawgraph the draw method may be called for nonexisting object, as they are enumerated 0-length of objsList. draw may not exist there as well.





//disposed of addPart addBreak id argument. Now these functions keep track of objscounter. and  with an id value or objscounter, addpart and ddbreak functions now assign an id (copy of objscounter) to each one while takiing only three arguments. 
//finish checking for things that depend on objsCounter and Breaks

/*
OBJSCOUNTER AS ID INSIDE THE OBJECT?????:

for now partobjs, and break objs are. created with key-number on the objList[key] 

and this is fine

but every object stores its objId inside the object itself, which is redundant,  could be that in its place parts store PartId and breaks store BreakId.

*/

// later add separate part id it may help deleting things
// this.partId = partsCounter // (objcounter-breakAmount)
//or use multiple keys!!!!!!!!!!!!!! for objlist ofkoz!
//dont know how yet but definitely possible



/*
      HERE'S AN IDEA:
      use "start part" - objsList[0] or some separate object as a   
      storage for most of the        
      variables as avg lth objsCounter etc you can assign them in       
      functions this way : storage.property = blahblah storage    
      object may have methods like CountTotalAverage etc.
      
    */

/*

total average still takes into account breaks and it should not be working that way when counting time spent on producing parts from start of producing to the last part. You need to take away cycletime length of each object having break property

use filter method

*/


/* INIT A LOT OF GLOBAL VALUES THAT MAKE THINGS FASTER 
   BUT MESSIER IN THE SAME TIME.
   ENCLOSE THEM IN OBJECTS LATER ON, AT LEAST



*/





                            /*
                            OBJ CONSTRUCTOR
                            CLASS : OBJ
                            */





var Obj = function(when,id,cycle,status){
this.id=id;  // see note at the top
this.when=when;
this.cycle=cycle;
this.status=status
}

Obj.prototype.color = function(){
if (this.status=='part'){return 'rgba(0,0,0,.7)'}
else if (this.status=='downtime'){return 'rgba(255,128,0,.7)'}
else{return 'rgba(255,0,255,.7)'};
}

Obj.prototype.draw = function(sclX,sclY)
{
let cycl = msToDHMS(this.cycle);
const thck= 4;
let x=(this.when-whenstart)*sclX;
let y=this.cycle*sclY;
let x2=this.cycle*sclX;

ctx.save();
ctx.imageSmoothingEnabled = false;
ctx.fillStyle = this.color();
ctx.fillRect
    (
    x-x2,
    y-thck/2,
    x2,
    thck,
    );

ctx.font="9px Arial"
ctx.fillText(cycl,x-x2,y-1-thck/2,x2);
    
ctx.restore();

}




                            /*
                            PART ADDER
                            PART CONSTRUCTOR
                            */
 



function addPart(when,cycle,status){
if (wC>0){wC--;};
objsCounter++;
partsCounter++;
PartObj.prototype.partsQty++;
PartObj.prototype.totalPartTime += cycle;
PartObj.prototype.partIdsInObjList.push(objsCounter);

objsList[objsCounter] = new PartObj(when,objsCounter,cycle,status);

//console.log(JSON.stringify(objsList));
asd(objsList[objsCounter])
}






var PartObj = function (when,id,cycle,status)
{
Obj.call(this,when,id,cycle,status);

this.partId = id; // this must be something more complex
              // see note at the top

this.quality = 1; // 0.1 poor,1 excellent
this.defects = 
  {
  placement_DefectCodes: [[1,3],[0,3],[4,0],],
  reasons: "",
  scrap_rework:false
  }
}
inheritsFrom(PartObj,Obj);


PartObj.prototype.totalPartTime = 0;

PartObj.prototype.partsQty = 0;

PartObj.prototype.partIdsInObjList = [];

PartObj.prototype.color = function(){
let r=0; // more red - worse quality
let g=0; // more green - better quality
let b=0;
let a=.8; 

let color = ('rgba('+r+','+g+','+b+','+a+')');

//later on make separate quality points on the chart with color coding

return color;
}

PartObj.prototype.defectCodesToNames = function(){
}

PartObj.prototype.defectCodesSet = function(){
}







                            /*
                            BREAK ADDER
                            BREAK CONSTRUCTOR
                            */




function addBreak(when,cycle,status){
objsCounter++;
breakObjsAmount++;
BreakObj.prototype.totalBreakTime += cycle;
BreakObj.prototype.breakIdsInObjList.push(objsCounter);

objsList[objsCounter] = new BreakObj(when,objsCounter,cycle,status);

//console.log(JSON.stringify(objsList));
}








function BreakObj(when,id,cycle,status){

Obj.call(this,when,id,cycle,status);

this.breakId = id;                  // USELESS
                             // see note at the top
}

inheritsFrom(BreakObj,Obj);

BreakObj.prototype.breakIdsInObjList = [];
BreakObj.prototype.totalBreakTime = 0; // OR function selfcounting sum of all Breakobjs?

BreakObj.prototype.draw = function(sclX,sclY)
 {
  // overwrites .draw method - breaks are now blue transparent areas across chart


  let cycl = msToDHMS(this.cycle);
  const thck= 16;
  let x=(this.when-whenstart)*sclX;
  let x2=this.cycle*sclX;

  ctx.save();

  
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = 'rgba(0,0,255,.3)';
  ctx.fillRect
    (
    x-x2, //when finished - duration = when started
    0,
    x2,     //rect length= duration
    HEIGHT,
    );

  ctx.font="10px Arial"
  ctx.fillStyle = 'rgba(0,0,255,1)';
  ctx.fillText(cycl,x-x2,HEIGHT,x2);
    
  ctx.restore();
 }












  

                       /*
                         PARTPLUS
                       */



function partPlus()
{
soFar++;
importantLog();
}


                       /*
                         PARTMINUS
                       */



function partMinus()
{
 if (soFar>0){soFar--;importantLog();}
else{alert("so far = 0 ,nie usuwam jeszcze obiektow")}

}



/*
UNACTIVE PARTMINUS need checking


    if (objsCounter>0)
     {
 
      if (objsList[objsCounter].status=='break')
       { 
        if (confirm('delete break?'))
           {
        breaksTaken -= objsList[objsCounter].cycle;
        delete objsList[objsCounter];
        objsCounter--;
        breakObjsAmount--;

        return; //get out to not delete nothing else yet
       }
     else
       {
        alert("since app is still in development and creator has no  idea how to resolve this problem yet, you need to delete break in order to be able to carry on. Sorry.\n \n NOTE: I plan to change each deleted part into downtime , since how you could waste time spent on it. or possibly ask first is deleted part a scrap, downtime or miscalculation.")
        return;
       }
       
      
     }
                
     delete objsList[objsCounter]; // delOffs 
     objsCounter--;
     clearAndLog(minmaxfull(),
     'L3');//resets lowest and highest and logs it to L3
    //why this above does not affect the graph? due to average?
     drawGraph();
    }
    else
    {    
     alert("reached zero parts in this session,now changing soFar")
     if (soFar>0){soFar--;}
     };


if (wC<weight){wC++;};
importantLog();
}
*/


                             /*
                               CHANGE
                               VALUE
                             */


function changeValue(msg,where)
{
let there = where || 'bottomlog';

document.getElementById(there).value=msg
}








function toDate(milis)
{
let date = new Date(milis);
return date.toLocaleString();
}


function countTotalAvg2()
{
var what="- Average between Maximum/Minimum "

var average = (lowest+highest)/2;
return average;
}


///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!neeeeeeeed.  change




function countTotalAvg(){


var what = "average?"


let pC = partsCounter;

var timesincestart = PartObj.prototype.totalPartTime;//could be any part?

// console.log(timesincestart);

/*

if(timesincestart<1)
  {timesincestart=objsList[pC].cycle}
*/


avg=timesincestart/pC;        //  WHY !?



//console.log(pC+","+avg);
if((avg<lowest)||(avg>highest))
  {avg=countTotalAvg2()};

avg= weightedAverage(sugAvg,avg,pC,wC);



var txtavg = msToDHMS(avg);



clearAndLog(txtavg+what+"<br>min="+msToDHMS(lowest)+
            "<br>max="+msToDHMS(highest)+" weight:"+wC);


return avg;
}





                                                 /*
                                          WEIGHTED
                                              AVERAGE
                                                 */


function weightedAverage(savg,cavg,pC,wC){

loginhtml("<br><i>Suggested Average: "+msToDHMS(savg)+" <br>Calculated Average: "+msToDHMS(cavg)+"<br>Data Set: "+pC+"<br>Suggested Average Weight: "+wC+" <br><I>log from weightedAverage() function</I></i>",'L3')

 if(wC==0){return cavg;}
 // makes sure that weighted is  
 // computed only when weight is 
 // still applicable, if not this returns quickly
 // total average passed as argument

// //console.log("savg:"+savg+"cavg:"+cavg+"pC:"+pC+"wC:"+wC+" log from weighted function",'L3')

 var wavg=(savg*wC+cavg*pC)/(pC+wC);

// console.log(wavg);
 return wavg;
}


      /*

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
               UTILITIESh
|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||


                            
                         */


function inheritsFrom(child, parent){
child.prototype = Object.create(parent.prototype);
};

                   /*
                     ASD

                     logs into html all properties and 
                     values of an object/event/thing
                   */


function asd(thing,outf) 
{
let log ="";
 for(var propname in thing)
  {
   if (true)//(thing.hasOwnProperty(propname))
   {log += propname + ":" + thing[propname] + "<br>" ;}
  }

if (!outf){loginhtml(log);}else{outf(log);}
log="";
}

function asdalert(thing,out) 
{
 for(var propname in thing)
  {
   if (true)//(thing.hasOwnProperty(propname))
   {log += propname + ":" + thing[propname] + "<br>" ;}
  }

alert(log);
log="";
}





function asd2(thing) 
{
 for(var propname in thing)
  {
   if (true)//(thing.hasOwnProperty(propname))
   {log += propname + ":" + thing[propname] + "<br>" ;}
  }

//console.log(log);
log="";
}








function clearAndLog(msg,where)
{
var there = where || 'bottomlog'
document.getElementById(there).innerHTML = msg
}


function loginhtml(msg,where){

var there = where || 'bottomlog'
document.getElementById(there).innerHTML = document.getElementById(there).innerHTML + msg
}


function minmax(tmp)
{
if (status=='part')
 {
  if (tmp < lowest) lowest = tmp;
  if (tmp > highest) highest = tmp;
  return [lowest,highest];
 }
}


function minmaxfull()
{
 
 var tmp;
 var lth =   
 Object.keys(objsList).length;

 for (var i=lth-1; i>=2; i--)
 {
  if (objsList[i].status=='part')
   {
    tmp = objsList[i].cycle;
    if (tmp < lowest) lowest = tmp;
    if (tmp > highest) highest = tmp;
   }
 }
return [lowest,highest];

}

function undefcheck(val,trgt0val)
{
trgt0val= trgt0val || 0;
loginhtml(val);
return val || trgt0val;
}







                         /*

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||

/*               
GARBAGE
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

*/





/*


function OLDpartMinus()
{
if (objsCounter>0)
 {
 
  if (objsList[objsCounter].status=='break')
   { 
    if (confirm('delete break?'))
       {
        breaksTaken -= objsList[objsCounter].cycle;
        delete objsList[objsCounter];
        objsCounter--;
        breakObjsAmount--;

        return; //get out to not delete nothing else yet
       }
     else
       {
        alert("since app is still in development and creator has no  idea how to resolve this problem yet, you need to delete break in order to be able to carry on. Sorry.\n \n NOTE: I plan to change each deleted part into downtime , since how you could waste time spent on it. or possibly ask first is deleted part a scrap, downtime or miscalculation.")
        return;
       }
       
      
 }

 delete objsList[objsCounter]; // delOffs 
 objsCounter--;
 clearAndLog(minmaxfull(),
 'L3');//resets lowest and highest and logs it to L3
//why this above does not affect the graph? due to average?
 drawGraph();
}
else
{
 alert("reached zero parts in this session,now changing soFar")
 if (soFar>0){soFar--;}
 };

if (wC<weight){wC++;};
importantLog();
}

*/


                        /*
                         PROMPTUSER
                         */


//function promptuser()
//{
/***********************************
inject HTML with three buttons:

YES (counter)
NO+
NO-

YES + counter with missing amount added with default value of how many parts were predicted from avg to be on the counter now. it may be easier for user to have correct amount of parts missing

NO +/ NO-
e two buttons: up/down. It may help avoiding missfilling the field.Every time you press one of them

THE VALUE OF YES BUTTON SHOULD CHANGE ASWELL.
that way you have :

ONLY ONE BIG BUTTON for continuing
and can always quickly confirm

BREAKTIME
this registers last part as a
 break 

***********************************/

//storehtml = document.getElementById('graphandbutton').innerHTML


//var DQ="444";


//clearAndLog(DQ,"graphandbutton");

//}












/*
function sinceZero(till){
var c = (objsList[till].when
    - whenstart);
//console.log(c);
return c;

}




// ....Draw Obj REMOVE LATER


ctx.save();
    
ctx.fillStyle = colorrgb;
    
ctx.fillRect
    (
    x,
    y-thck*sclY,
    x2,
    thck*sclY,
    );

ctx.font="15px Arial"
    
ctx.fillText(cycl,x,y-8*sclY,nxtX-x);
    
ctx.restore();

// .....End Draw Obj REMOVE LATER



  
      
      //START OF FORGOT FUNCTION
      //is part missed or pissed -check

      toplimit =(avg*1.7);
      bottomlimit =(avg*0.2);

      if (cycletime>toplimit)
       {
        alert(cycletime+" > "+
        toplimit+
        "what took you so long?");
        promptuser();
       }
       else 
      if (cycletime<bottomlimit)
       {
        alert(cycletime + " < " +
              bottomlimit +
              "trying to cheat?")
       } 
    


       //END OF FORGOT FUNCTION




       */
